import Collision from '../service/Collision';
import Sprite from '../interface/Sprite';
import Circle from './Circle';
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

  public leftCollisionWithBoundary(x: number) {
    return this.position.x + this.velocity.x < x;
  }

  public rightCollisionWithBoundary(x: number) {
    return this.position.x + this.velocity.x + this.width > x;
  }

  public xColWithCircle(circle: Circle) {
    return Collision.xRectCircle(this, circle);
  }

  public yColWithCircle(circle: Circle) {
    return Collision.xRectCircle(this, circle);
  }

  public xColWithRect(rect: Rectangle) {
    return Collision.xRectRect(this, rect);
  }

  public yColWithRect(rect: Rectangle) {
    return Collision.yRectRect(this, rect);
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
