import settings from '../../settings';
import { Position, Sprain } from './GameObject';
import Rectangle from './Rectangle';
import Sprite from '../service/Sprite';

export default class RectPlatformer extends Rectangle {
  constructor (
    position: Position,
    sprain: Sprain,
    sprite: Sprite,
  ) {
    super(
      position,
      sprain,
      settings.tileWidth,
      settings.tileHeight,
      sprite,
    );
  }
}
