import settings from '../../settings';
import Entity from './Entity';
import { Position } from './GameObject';

export default class Player extends Entity {
  constructor(position: Position) {
    super(
      position,
      settings.tileWidth,
      settings.tileHeight * 2,
    );
  }

  public draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'white';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}