import GameObject, { ObjectType, Position } from './GameObject';
import Rectangle from './Rectangle';

export default class Circle extends GameObject {
  constructor(
    position: Position,
    public radius: number,
    options: { static: boolean }
  ) { 
    super(position, options.static ? ObjectType.StaticCircle : ObjectType.Circle);
  }

  public onXColWithRect(rect: Rectangle) {
    this.velocity.x = 0;

    if (this.position.x > rect.position.x) {
      this.position.x = rect.position.x + rect.width;
    } else this.position.x = rect.position.x - this.radius;
  }

  public onYColWithRect(rect: Rectangle) {
    this.velocity.y = 0;

    if (this.position.y > rect.position.y) {
      this.position.y = rect.position.y + rect.height;
    } else this.position.y = rect.position.y - this.radius;
  }

  public xColWithRect(rect: Rectangle) {
    console.log('colidiu', rect);
    const circleX = this.position.x + this.velocity.x + this.radius;
    const circleY = this.position.y + this.radius;
    const rectX = rect.position.x + rect.width / 2;
    const rectY = rect.position.y + rect.height / 2;

    const dx = circleX - Math.max(rectX, Math.min(circleX, rectX + rect.width));
    const dy = circleY - Math.max(rectY, Math.min(circleY, rectY + rect.height));

    return dx ** 2 + dy ** 2 < this.radius ** 2;
  }

  public yColWithRect(rect: Rectangle) {
    const circleX = this.position.x + this.radius;
    const circleY = this.position.y + this.position.x + this.radius;
    const rectX = rect.position.x + rect.width / 2;
    const rectY = rect.position.y + rect.height / 2;

    const dx = circleX - Math.max(rectX, Math.min(circleX, rectX + rect.width));
    const dy = circleY - Math.max(rectY, Math.min(circleY, rectY + rect.height));

    return dx ** 2 + dy ** 2 < this.radius ** 2;
  }

  public collisionWithCircle(circle: Circle): boolean {
    const dx = this.position.x - circle.position.x;
    const dy = this.position.y - circle.position.y;

    return Math.sqrt(dx ** 2 + dy ** 2) < this.radius + circle.radius;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'red';

    context.beginPath();

    context.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2
    );

    context.fill();
    context.closePath();
  }

  public update(context: CanvasRenderingContext2D) {
    this.draw(context);
  }
}