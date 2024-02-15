import { Position, Sprain } from '../object/GameObject';
import RectPlatformer from '../object/RectPlatformer';
import Sprite from '../service/Sprite';

export const id = '1';

export default class BaseBlock extends RectPlatformer {
  constructor(position: Position, sprain: Sprain) {
    super(position, sprain, new Sprite('data/sprites/base-block.png'));

    this.sprite.make([[753, 46, 125, 130]]);
  }
}
