import Entity from '../object/RectEntity';
import settings from '../../settings';
import { Position } from '../object/GameObject';
import Keyboard from '../service/Keyboard';
import Rectangle from '../object/Rectangle';
import Sprite from '../service/Sprite';

export const id = 'p';

const config = {
  maxSpeed: 5,
  lowAcc: 0.1,
  acc: 1.5,
  jumps: 2,
  width: settings.tileWidth / 2,
  height: settings.tileHeight,
};

export default class Player extends Entity {
  private sprite = new Sprite('data/sprites/player.png');
  private jumpCount = 0;
  private movingR = () => false;
  private movingL = () => false;

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

    this.sprite.set('idle');
  }

  protected onBottomCollisionRect(rect: Rectangle) {
    this.resetJump();
    super.onBottomCollisionRect(rect);
  }

  private running() {
    return this.movingL() || this.movingR();
  }

  private jumping() {
    return this.jumpCount > 0;
  }

  private faling() {
    return this.velocity.y > 0;
  }

  private acc() {
    return !this.faling() && !this.jumping() ? config.acc : config.lowAcc;
  }

  private move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.movingR())
      this.velocity.x = Math.min(this.velocity.x + this.acc(), config.maxSpeed);
    else if (this.movingL())
      this.velocity.x = Math.max(this.velocity.x - this.acc(), -config.maxSpeed);
    else if (!this.jumpCount) this.velocity.x = 0;
  }

  private jump() {
    if (this.jumpCount >= config.jumps) return;

    this.jumpCount++;
    this.velocity.y = -10;
    this.sprite.set('jump');
  }

  public resetJump() {
    if (!this.jumping()) return;

    this.jumpCount = 0;

    if (this.running()) this.sprite.set('run');
    else this.sprite.set('idle');
  }

  public listen(keyboard: Keyboard) {
    this.movingR = () => keyboard.pressed('d');
    this.movingL = () => keyboard.pressed('a');

    keyboard.onDown(' ', () => this.jump());

    keyboard.onDown('d', () => {
      this.sprite.revertX();
      
      if (!this.jumping()) {
        this.sprite.set('run');
      }
    });

    keyboard.onUp('d', () => {
      !this.movingL() && !this.jumping() && this.sprite.set('idle');
    });

    keyboard.onDown('a', () => {
      this.sprite.invertX();

      if (!this.jumping()) {
        this.sprite.set('run');
      }
    });

    keyboard.onUp('a', () => {
      !this.movingR() && !this.jumping() && this.sprite.set('idle');
    });
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
