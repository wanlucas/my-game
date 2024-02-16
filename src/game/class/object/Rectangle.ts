import Sprite from '../service/Sprite';
import GameObject, { ObjectType, Position } from './GameObject';

export default class Rectangle extends GameObject {
  constructor(
    position: Position,
    public width: number,
    public height: number,
    protected sprite: Sprite,
    options: {
      static: boolean;
    }
  ) {
    super(
      position,
      options.static ? ObjectType.StaticRect : ObjectType.Rect
    );
  }

  protected onTopCollisionRect(rect: Rectangle) {
    this.velocity.y = 0;
    this.position.y = rect.position.y + rect.height;
  }

  protected onBottomCollisionRect(rect: Rectangle) {
    this.velocity.y = 0;
    this.position.y = rect.position.y - this.height;
  }

  public onYColWithRect(rect: Rectangle) {
    if (this.position.y > rect.position.y) this.onTopCollisionRect(rect);
    else this.onBottomCollisionRect(rect);
  }

  public onXColWithRect(rect: Rectangle) {
    this.velocity.x = 0;

    if (this.position.x > rect.position.x) {
      this.position.x = rect.position.x + rect.width;
    } else this.position.x = rect.position.x - this.width;
  }

  public leftCollisionWithBoundary(x: number) {
    return this.position.x + this.velocity.x < x;
  }

  public rightCollisionWithBoundary(x: number) {
    return this.position.x + this.velocity.x + this.width > x;
  }

  public xColWithRect(rect: Rectangle) {
    return (
      this.position.x + this.velocity.x + this.width >
        rect.position.x + rect.velocity.x &&
      this.position.x + this.velocity.x <
        rect.position.x + rect.velocity.x + rect.width &&
      this.position.y + this.height > rect.position.y &&
      this.position.y < rect.position.y + rect.height
    );
  }

  public yColWithRect(rect: Rectangle) {
    return (
      this.position.y + this.velocity.y + this.height >
        rect.position.y + rect.velocity.y &&
      this.position.y + this.velocity.y <
        rect.position.y + rect.velocity.y + rect.height &&
      this.position.x + this.width > rect.position.x &&
      this.position.x < rect.position.x + rect.width
    );
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

  public update(context: CanvasRenderingContext2D) {
    this.draw(context);
  }
}
