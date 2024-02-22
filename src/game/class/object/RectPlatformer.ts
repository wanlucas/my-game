import settings from '../../settings';
import { Position } from './GameObject';
import Rectangle from './Rectangle';
import Sprite from '../interface/Sprite';

export default class RectPlatformer extends Rectangle {
  public static width = settings.tileWidth;
  public static height = settings.tileHeight;

  constructor(position: Position, sprite: Sprite) {
    super(
      position,
      RectPlatformer.width, 
      RectPlatformer.height, 
      sprite, {
        static: true,
      }
    );
  }
}
