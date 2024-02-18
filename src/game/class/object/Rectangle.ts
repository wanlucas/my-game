import Sprite from '../service/Sprite';
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

  public onYColWithRect(rect: Rectangle) {
    this.velocity.y = 0;
  
    if (this.position.y > rect.position.y) {
      this.position.y = rect.position.y + rect.height;
      this.onTopCol(rect);
    } else {
      this.position.y = rect.position.y - this.height;
      this.onBottomCol(rect);
    }

    this.onCollision(rect);
  }

  public onXColWithRect(rect: Rectangle) {
    this.velocity.x = 0;

    if (this.position.x > rect.position.x) {
      this.position.x = rect.position.x + rect.width;
      this.onLeftCol(rect);
    } else {
      this.position.x = rect.position.x - this.width;
      this.onRightCol(rect);
    }

    this.onCollision(rect);
  }

  public onXColWithCircle(circle: Circle) {
    this.velocity.x = 0;

    if (this.position.x > circle.position.x) {
      this.onLeftCol(circle);
    } else {
      this.onRightCol(circle);
    }

    this.onCollision(circle);
  }

  public onYColWithCircle(circle: Circle) {
    this.velocity.y = 0;

    if (this.position.y > circle.position.y) {
      this.onTopCol(circle);
    } else {
      this.onBottomCol(circle);
    }

    this.onCollision(circle);
  }

  public leftCollisionWithBoundary(x: number) {
    return this.position.x + this.velocity.x < x;
  }

  public rightCollisionWithBoundary(x: number) {
    return this.position.x + this.velocity.x + this.width > x;
  }

  public xColWithCircle(circle: Circle) {
    const thisX = this.position.x + this.velocity.x;

    const closestX = Math.max(thisX, Math.min(circle.position.x, thisX + this.width));
    const closestY = Math.max(this.position.y, Math.min(circle.position.y, this.position.y + this.height));
    const dx = circle.position.x - closestX;
    const dy = circle.position.y - closestY;

    return dx * dx + dy * dy < circle.radius ** 2;
  }

  public yColWithCircle(circle: Circle) {
    const thisY = this.position.y + this.velocity.y;

    const closestX = Math.max(this.position.x, Math.min(circle.position.x, this.position.x + this.width));
    const closestY = Math.max(thisY, Math.min(circle.position.y, thisY + this.height));
    const dx = circle.position.x - closestX;
    const dy = circle.position.y - closestY;

    return dx * dx + dy * dy < circle.radius ** 2;
  }

  public xColWithRect(rect: Rectangle) {
    return (
      this.position.x + this.velocity.x + this.width > rect.position.x
      && this.position.x + this.velocity.x < rect.position.x + rect.width
      && this.position.y + this.height > rect.position.y
      && this.position.y < rect.position.y + rect.height
    );
  }

  public yColWithRect(rect: Rectangle) {
    return (
      this.position.y + this.velocity.y + this.height > rect.position.y
      && this.position.y + this.velocity.y < rect.position.y + rect.height
      && this.position.x + this.width > rect.position.x
      && this.position.x < rect.position.x + rect.width
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
