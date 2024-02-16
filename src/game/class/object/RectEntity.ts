import Sprite from '../service/Sprite';
import { Position } from './GameObject';
import Rectangle from './Rectangle';

export interface Velocity {
  x: number;
  y: number;
}

export default class RectEntity extends Rectangle {
  constructor(
    position: Position,
    width: number,
    height: number,
    sprite: Sprite
  ) {
    super(position, width, height, sprite, {
      static: false,   
    });
  }

  public update(context: CanvasRenderingContext2D) {
    super.update(context);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.y += 0.5;
  }
}
