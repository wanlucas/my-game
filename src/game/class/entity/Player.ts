import Entity from '../object/RectEntity';
import settings from '../../settings';
import { Position } from '../object';
import Keyboard from '../service/Keyboard';
import Rectangle from '../object/Rectangle';

export default class Player extends Entity {
  private maxSpeed = 5;
  private speed = 1.5;
  private jumps = 2;
  private jumpCount = 0;
  private movingR = () => false;
  private movingL = () => false;

  constructor(position: Position) {
    super(position, settings.tileWidth, settings.tileHeight * 2);
  }

  public onBottomCollisionRect(rect: Rectangle) {
    this.resetJump();
    super.onBottomCollisionRect(rect);
  }

  private move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.movingR()) this.velocity.x = Math.min(this.velocity.x + this.speed, this.maxSpeed);
    else if (this.movingL()) this.velocity.x = Math.max(this.velocity.x - this.speed, -this.maxSpeed);
    else if (!this.jumpCount) this.velocity.x = 0;
  }

  private jump() {
    if (this.jumpCount >= this.jumps) return;

    this.jumpCount++;
    this.speed = 0.1;
    this.velocity.y = -10;
  }

  public resetJump() {
    this.jumpCount = 0;
    this.speed = 1.5;
  }

  public listen(keyboard: Keyboard) {
    keyboard.onDown(' ', () => this.jump());

    this.movingR = () => keyboard.pressed('d');
    this.movingL = () => keyboard.pressed('a');
  }

  public draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'white';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  public update() {
    this.move();  
  }
}
