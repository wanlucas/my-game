import Entity from '.';
import settings from '../../settings';
import { Position } from '../object';
import Keyboard from '../service/Keyboard';

export default class Player extends Entity {
  private speed = 5;
  private acceleration = 0.5;

  constructor(position: Position) {
    super(position, settings.tileWidth, settings.tileHeight * 2);
  }

  private move(keyboard: Keyboard) {
    if (!keyboard.pressed('d') && !keyboard.pressed('a')) {
      this.velocity.x = 0;
    } else if (keyboard.pressed('d')) {
      this.velocity.x = Math.min(
        this.velocity.x + this.acceleration,
        this.speed
      );
    } else {
      this.velocity.x = Math.max(
        this.velocity.x - this.acceleration,
        -this.speed
      );
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  private jump() {
    this.velocity.y = -10;
  }

  public listen(keyboard: Keyboard) {
    keyboard.onDown(' ', () => this.jump());
  }

  public draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'white';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  public update(keyboard: Keyboard) {
    this.move(keyboard);
  }
}
