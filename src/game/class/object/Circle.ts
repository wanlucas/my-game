import Sprite from '../service/Sprite';
import GameObject, { ObjectType, Position } from './GameObject';
import Rectangle from './Rectangle';

export default class Circle extends GameObject {
  constructor(
    position: Position,
    public radius: number,
    protected sprite: Sprite,
    options: { static: boolean }
  ) {
    super(
      position,
      options.static ? ObjectType.StaticCircle : ObjectType.Circle
    );
  }

  public onXColWithRect(rect: Rectangle) {
    this.velocity.x = 0;

    if (this.position.x > rect.position.x) {
      if (this.velocity.x > 0) {
        this.position.x = rect.position.x + rect.width + this.radius;
      }

      this.onLeftCol(rect);
    } else {
      if (this.velocity.x < 0) {
        this.position.x = rect.position.x - this.radius;
      }

      this.onRightCol(rect);
    }

    this.onCollision(rect);
  }

  public onYColWithRect(rect: Rectangle) {
    this.velocity.y = 0;

    if (this.position.y > rect.position.y) {
      if (this.velocity.y > 0) {
        this.position.y = rect.position.y + rect.height + this.radius;
      }

      this.onTopCol(rect);
    } else {
      if (this.velocity.y < 0) {
        this.position.y = rect.position.y - this.radius;
      }

      this.onBottomCol(rect);
    }

    this.onCollision(rect);
  }

  public xColWithRect(rect: Rectangle) {
    const thisX = this.position.x + this.velocity.x;

    const closestX = Math.max(rect.position.x, Math.min(thisX, rect.position.x + rect.width));
    const closestY = Math.max(rect.position.y, Math.min(this.position.y, rect.position.y + rect.height));
    const dx = thisX - closestX;
    const dy = this.position.y - closestY;

    return dx * dx + dy * dy < this.radius ** 2;
  }

  public yColWithRect(rect: Rectangle) {
    const thisY = this.position.y + this.velocity.y;

    const closestX = Math.max(rect.position.x, Math.min(this.position.x, rect.position.x + rect.width));
    const closestY = Math.max(rect.position.y, Math.min(thisY, rect.position.y + rect.height));
    const dx = this.position.x - closestX;
    const dy = thisY - closestY;

    return dx * dx + dy * dy < this.radius ** 2;
  }

  public draw(context: CanvasRenderingContext2D) {
    this.sprite.draw(    
      context,
      this.position.x - this.radius,
      this.position.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );      
  }

  public update(context: CanvasRenderingContext2D) {
    this.draw(context);
  }
}
