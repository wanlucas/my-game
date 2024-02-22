import Sprite from '../interface/Sprite';
import Circle from './Circle';
import { Position } from './GameObject';

export default class ArcEntity extends Circle {
  constructor(position: Position, radius: number, sprite: Sprite) {
    super( position, radius, sprite, {
      static: false,
    });
  }

  public update(context: CanvasRenderingContext2D) {
    super.update(context);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
