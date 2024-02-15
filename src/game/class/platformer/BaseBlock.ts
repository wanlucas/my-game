import { Position } from '../object/GameObject';
import RectPlatformer from '../object/RectPlatformer';
import Sprite from '../service/Sprite';

export const id = '1';

export default class BaseBlock extends RectPlatformer {
  constructor (
    position: Position,
  ) {
    super(position, new Sprite('data/sprites/base-block.png'));

    this.sprite.make([[753, 46, 125, 130]]);

    // this.sprite.create('middle', [[391, 226, 43, 43]]);

    // this.sprite.create('right', [[406, 226, 43, 43]]);
  }
}
