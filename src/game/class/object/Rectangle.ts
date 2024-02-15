import Sprite from '../service/Sprite';
import GameObject, { Position } from './GameObject';

export default class Rectangle extends GameObject {
  constructor(
    position: Position,
    public width: number,
    public height: number,
    protected sprite: Sprite,
  ) { 
    super(position);
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