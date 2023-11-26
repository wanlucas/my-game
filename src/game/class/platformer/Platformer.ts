import GameObject, { type Position } from '../object/GameObject';

export default class Platformer extends GameObject {
  constructor (
    public position: Position,
    public width: number,
    public height: number
  ) {
    super(position, width, height);
  }

  public draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'green';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
