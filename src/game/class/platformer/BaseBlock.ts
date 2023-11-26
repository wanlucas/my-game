import settings from '../../settings';
import { type Position } from '../object/GameObject';
import Platformer from './Platformer';

export default class BaseBlock extends Platformer {
  constructor (
    public position: Position,
  ) {
    super(
      position,
      settings.tileWidth,
      settings.tileHeight,
    );
  }
}
