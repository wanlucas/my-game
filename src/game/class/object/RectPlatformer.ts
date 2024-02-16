import settings from '../../settings';
import { Position } from './GameObject';
import Rectangle from './Rectangle';
import Sprite from '../service/Sprite';

export default class RectPlatformer extends Rectangle {
  static list: RectPlatformer[] = [];

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

    RectPlatformer.list.push(this);
  }

  public destroy() {
    RectPlatformer.list = RectPlatformer.list.filter(
      (platform) => platform !== this
    );
  }
}
