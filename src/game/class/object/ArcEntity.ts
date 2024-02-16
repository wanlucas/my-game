import Circle from './Circle';
import { Position } from './GameObject';

export default class ArcEntity extends Circle {
  constructor(position: Position, public radius: number) {
    super(position, radius, {
      static: false,
    });
  }

  public update(context: CanvasRenderingContext2D) {
    super.update(context);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
