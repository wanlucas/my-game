import Entity from '../object/RectEntity';
import settings from '../../settings';
import { Position } from '../object/GameObject';
import Keyboard from '../service/Keyboard';
import Rectangle from '../object/Rectangle';
import Sprite from '../service/Sprite';

export const id = 'p';

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
  private sprite = new Sprite('data/sprites/player.png');
  private movingR = () => false;
  private movingL = () => false;
  private jumpCount = 0;
  private speed = config.speed;

  constructor(position: Position) {
    super(position, config.width, config.height);

    this.sprite.create('idle', [[56, 15, 28, 47]]);

    this.sprite.create(
      'run',
      [
        [88, 15, 28, 47, 3],
        [121, 15, 28, 47, 3],
        [154, 15, 28, 47, 3],
        [183, 15, 28, 47, 3],
        [219, 15, 28, 47, 3],
        [154, 15, 28, 47, 3],
      ],
      { loop: true }
    );

    this.sprite.create(
      'jump',
      [
        [190, 128, 28, 47, 30],
        [270, 128, 28, 47, 30],
      ],
      { loop: false }
    );

    this.sprite.create('crouch', [[540, 136, 28, 28]]);

    this.sprite.set('idle');
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
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.movingR()) {
      this.velocity.x = Math.min(this.velocity.x + this.acc(), this.speed);
    } else if (this.movingL()) {
      this.velocity.x = Math.max(this.velocity.x - this.acc(), -this.speed); 
    } else if (this.crouched()) {
      this.velocity.x = Math.max(Math.abs(this.velocity.x) - config.lowAcc, 0) * (this.velocity.x > 0 ? 1 : -1);
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

    if (this.crouched()) this.sprite.set('crouch');
    else if (this.moving()) this.sprite.set('run');
    else this.sprite.set('idle');
  }

  private crouch() {
    this.sprite.set('crouch');
    this.height = config.crouchedHeight;
    this.position.y += config.height - config.crouchedHeight;
  }

  private standUp() {
    this.sprite.set('idle');
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
      this.sprite.translate('idle', 'run');
    });

    keyboard.onUp('d', () => {
      this.sprite.translate('run', 'idle');
    });

    keyboard.onDown('a', () => {
      keyboard.bulkRelease('d', 's');
      this.sprite.invertX();
      this.sprite.translate('idle', 'run');
    });

    keyboard.onUp( 'a', () => {
      this.sprite.translate('run', 'idle');
    });

    keyboard.onDown('s', () => {
      keyboard.bulkRelease('a', 'd');
      this.crouch();
    });

    keyboard.onUp('s', () => this.standUp());

    keyboard.onDown('shift', () => this.run());

    keyboard.onUp('shift', () => this.walk());
  }

  public draw(context: CanvasRenderingContext2D) {
    this.sprite.draw(
      context,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  public update() {
    this.move();
  }
}
