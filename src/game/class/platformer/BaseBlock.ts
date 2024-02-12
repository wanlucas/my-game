import settings from '../../settings';
import { Position } from '../object/GameObject';
import Rectangle from '../object/Rectangle';

export const id = '1';

export default class BaseBlock extends Rectangle {
  constructor (
    position: Position,
  ) {
    super(
      position,
      settings.tileWidth,
      settings.tileHeight,
    );
  }
}
