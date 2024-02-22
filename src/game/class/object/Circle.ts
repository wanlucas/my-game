import Collision from '../service/Collision';
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

  public xColWithRect(rect: Rectangle) {
    return Collision.xRectCircle(rect, this);
  }

  public yColWithRect(rect: Rectangle) {
    return Collision.yRectCircle(rect, this);
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
