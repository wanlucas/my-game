import Entity from '../object/RectEntity';
import settings from '../../settings';
import { Position } from '../object/GameObject';
import Keyboard from '../service/Keyboard';
import Rectangle from '../object/Rectangle';
import Sprite from '../service/Sprite';

export const id = 'p';

enum PlayerSprite {
  Idle = 'idle',
  Run = 'run',
  Jump = 'jump',
  Crouch = 'crouch',
}

const config = {
  speed: 4,
  maxSpeed: 8,
  lowAcc: 0.2,
  acc: 0.5,
  jumps: 2,
  width: settings.tileWidth / 2,
  height: settings.tileHeight,
  crouchedHeight: settings.tileHeight * 0.7,
};

export default class Player extends Entity {
  private movingR = () => false;
  private movingL = () => false;
  private jumpCount = 0;
  private speed = config.speed;

  constructor(position: Position) {
    super(
      position,
      config.width,
      config.height,
      new Sprite('data/sprites/player.png')
    );

    this.sprite.create(PlayerSprite.Idle, [[56, 15, 28, 47]]);

    this.sprite.create(
      'run',
      [
        [88, 15, 28, 47],
        [121, 15, 28, 47],
        [154, 15, 28, 47],
        [183, 15, 28, 47],
        [219, 15, 28, 47],
        [154, 15, 28, 47],
      ], {
        loop: true,
        interval: 3,
      });

    this.sprite.create(
      'jump',
      [
        [190, 128, 28, 47],
        [270, 128, 28, 47],
      ], {
        loop: false, 
        interval: 30 
      });

    this.sprite.create(PlayerSprite.Crouch, [[540, 136, 28, 28]]);

    this.sprite.set(PlayerSprite.Idle);
  }

  protected onBottomCollisionRect(rect: Rectangle) {
    this.resetJump();
    super.onBottomCollisionRect(rect);
  }

  private moving() {
    return this.movingL() || this.movingR();
  }

  private jumping() {
    return this.jumpCount > 0;
  }

  private fallingDown() {
    return this.velocity.y > 0;
  }

  private crouched() {
    return this.height === config.crouchedHeight;
  }

  private acc() {
    return !this.fallingDown() && !this.jumping() ? config.acc : config.lowAcc;
  }

  private run() {
    this.speed = config.maxSpeed;
  }

  private walk() {
    this.speed = config.speed;
  }

  private move() {
    if (this.movingR()) {
      this.velocity.x = Math.min(this.velocity.x + this.acc(), this.speed);
    } else if (this.movingL()) {
      this.velocity.x = Math.max(this.velocity.x - this.acc(), -this.speed);
    } else if (this.crouched()) {
      this.velocity.x =
        Math.max(Math.abs(this.velocity.x) - config.lowAcc, 0) *
        (this.velocity.x > 0 ? 1 : -1);
    } else if (!this.jumping()) this.velocity.x = 0;
  }

  private jump() {
    if (this.jumpCount >= config.jumps || this.crouched()) return;

    this.jumpCount++;
    this.velocity.y = -10;
    this.sprite.set('jump');
  }

  public resetJump() {
    if (!this.jumping()) return;

    this.jumpCount = 0;

    if (this.crouched()) this.sprite.set(PlayerSprite.Crouch);
    else if (this.moving()) this.sprite.set(PlayerSprite.Run);
    else this.sprite.set(PlayerSprite.Idle);
  }

  private crouch() {
    this.sprite.set(PlayerSprite.Crouch);
    this.height = config.crouchedHeight;
    this.position.y += config.height - config.crouchedHeight;
  }

  private standUp() {
    this.sprite.set(PlayerSprite.Idle);
    this.height = config.height;
    this.position.y -= config.height - config.crouchedHeight;
  }

  public listen(keyboard: Keyboard) {
    this.movingR = () => keyboard.pressed('d');
    this.movingL = () => keyboard.pressed('a');

    keyboard.onDown(' ', () => this.jump());

    keyboard.onDown('d', () => {
      keyboard.bulkRelease('a', 's');
      this.sprite.revertX();
      this.sprite.translate(PlayerSprite.Idle, PlayerSprite.Run);
    });

    keyboard.onUp('d', () => {
      this.sprite.translate(PlayerSprite.Run, PlayerSprite.Idle);
    });

    keyboard.onDown('a', () => {
      keyboard.bulkRelease('d', 's');
      this.sprite.invertX();
      this.sprite.translate(PlayerSprite.Idle, PlayerSprite.Run);
    });

    keyboard.onUp('a', () => {
      this.sprite.translate(PlayerSprite.Run, PlayerSprite.Idle);
    });

    keyboard.onDown('s', () => {
      keyboard.bulkRelease('a', 'd');
      this.crouch();
    });

    keyboard.onUp('s', () => this.standUp());

    keyboard.onDown('shift', () => this.run());

    keyboard.onUp('shift', () => this.walk());
  }

  public update(context: CanvasRenderingContext2D) {
    super.update(context);
    this.move();
  }
}
