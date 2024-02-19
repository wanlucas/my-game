import Entity from '../object/RectEntity';
import settings from '../../settings';
import GameObject, { Position } from '../object/GameObject';
import Keyboard from '../service/Keyboard';
import Sprite from '../service/Sprite';
import Orb from '../monster/Jenny/Orb';
import Monster from '../object/Monster';

export const id = 'p';

enum PlayerSprite {
  Idle = 'idle',
  Run = 'run',
  Jump = 'jump',
  Crouch = 'crouch',
}

export default class Player extends Entity {
  public static speed = 7;
  public static maxSpeed = 10;
  public static lowAcc = 0.5;
  public static acc = 1;
  public static jumps = 2;
  public static width = settings.tileWidth / 2;
  public static height = settings.tileHeight;
  public static crouchedHeight = settings.tileHeight * 0.7;


  private movingR = () => false;
  private movingL = () => false;
  private jumpCount = 0;
  private speed = Player.speed;

  static instance: Player;

  constructor(position: Position) {
    super(
      position,
      Player.width,
      Player.height,
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

    Player.instance = this;
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
    return this.height === Player.crouchedHeight;
  }

  private acc() {
    return !this.fallingDown() && !this.jumping() ? Player.acc : Player.lowAcc;
  }

  private run() {
    this.speed = Player.maxSpeed;
  }

  private walk() {
    this.speed = Player.speed;
  }

  private move() {
    if (this.movingR()) {
      this.velocity.x = Math.min(this.velocity.x + this.acc(), this.speed);
    } else if (this.movingL()) {
      this.velocity.x = Math.max(this.velocity.x - this.acc(), -this.speed);
    } else if (!this.jumping()) {
      this.velocity.x = Math.max(
        Math.abs(this.velocity.x) - (Player.lowAcc * 2), 0
      )  * (this.velocity.x > 0 ? 1 : -1);
    }
  }

  private jump() {
    if (this.jumpCount >= Player.jumps || this.crouched()) return;

    this.jumpCount++;
    this.velocity.y = -15;
    this.sprite.set('jump');
  }

  private resetJump() {
    if (!this.jumping()) return;

    this.jumpCount = 0;

    if (this.crouched()) this.sprite.set(PlayerSprite.Crouch);
    else if (this.moving()) this.sprite.set(PlayerSprite.Run);
    else this.sprite.set(PlayerSprite.Idle);
  }

  private crouch() {
    this.sprite.set(PlayerSprite.Crouch);
    this.height = Player.crouchedHeight;
    this.position.y += Player.height - Player.crouchedHeight;
  }

  private standUp() {
    this.sprite.set(PlayerSprite.Idle);
    this.height = Player.height;
    this.position.y -= Player.height - Player.crouchedHeight;
  }

  public onCollision(col: GameObject) {
    if (col instanceof Orb) {
      this.velocity.y = -5;
      this.velocity.x = col.velocity.x;
    }

    if (col instanceof Monster) {
      if (col.position.x > this.position.x) {
        this.velocity.x = -20;
      } else this.velocity.x = 20;

      this.velocity.y = -5;
    }
  }

  public onBottomCol() {
    this.resetJump();
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

  public async update(context: CanvasRenderingContext2D) {
    super.update(context);
    this.move();
  }
}
