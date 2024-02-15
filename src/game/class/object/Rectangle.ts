import Sprite from '../service/Sprite';
import GameObject, { Position, Sprain } from './GameObject';

export default class Rectangle extends GameObject {
  constructor(
    position: Position,
    sprain: Sprain,
    public width: number,
    public height: number,
    protected sprite: Sprite,
  ) { 
    super(position, sprain);
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

}