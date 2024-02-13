import Entity from '../object/RectEntity';
import settings from '../../settings';
import { Position } from '../object/GameObject';
import Keyboard from '../service/Keyboard';
import Rectangle from '../object/Rectangle';
import Sprite from '../service/Sprite';

export const id = 'p';

export default class Player extends Entity {
  private sprite = new Sprite('data/sprites/player.png');
  private maxSpeed = 5;
  private speed = 1.5;
  private jumps = 2;
  private jumpCount = 0;
  private movingR = () => false;
  private movingL = () => false;

  constructor(position: Position) {
    super(position, settings.tileWidth / 2, settings.tileHeight);

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

  private move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.movingR())
      this.velocity.x = Math.min(this.velocity.x + this.speed, this.maxSpeed);
    else if (this.movingL())
      this.velocity.x = Math.max(this.velocity.x - this.speed, -this.maxSpeed);
    else if (!this.jumpCount) this.velocity.x = 0;
  }

  private jump() {
    if (this.jumpCount >= this.jumps) return;

    this.jumpCount++;
    this.speed = 0.1;
    this.velocity.y = -10;

    this.sprite.set('jump');
  }

  public resetJump() {
    if (!this.jumpCount) return;

    this.jumpCount = 0;
    this.speed = 1.5;

    if (this.movingL()) this.sprite.set('run');
    else if (this.movingR()) this.sprite.set('run');
    else this.sprite.set('idle');
  }

  public listen(keyboard: Keyboard) {
    keyboard.onDown(' ', () => this.jump());

    keyboard.onDown('d', () => {
      this.sprite.set('run');
      this.sprite.revertX();
    });

    keyboard.onUp('d', () => this.sprite.set('idle'));

    keyboard.onDown('a', () => {
      this.sprite.set('run');
      this.sprite.invertX();
    });

    keyboard.onUp('a', () => this.sprite.set('idle'));

    this.movingR = () => keyboard.pressed('d');
    this.movingL = () => keyboard.pressed('a');
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
