import GameObject, { Position } from '.';

export default class Rectangle extends GameObject {
  constructor(
    position: Position,
    public width: number,
    public height: number,
  ) { 
    super(position);
  }

  public draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'green';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}