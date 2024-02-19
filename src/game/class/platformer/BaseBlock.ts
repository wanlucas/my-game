import { Position } from '../object/GameObject';
import RectPlatformer from '../object/RectPlatformer';
import Sprite from '../service/Sprite';

export const id = '1';

export default class BaseBlock extends RectPlatformer {
  constructor(position: Position) {
    super(position, new Sprite('data/sprites/base-block.png'));

    this.sprite.make([[0, 0, 128, 128]]);
  }
}