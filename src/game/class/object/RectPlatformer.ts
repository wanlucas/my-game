import settings from '../../settings';
import { Position } from './GameObject';
import Rectangle from './Rectangle';
import Sprite from '../service/Sprite';

export default class RectPlatformer extends Rectangle {
  constructor (
    position: Position,
    sprite: Sprite,
  ) {
    super(
      position,
      settings.tileWidth,
      settings.tileHeight,
      sprite,
    );
  }
}
