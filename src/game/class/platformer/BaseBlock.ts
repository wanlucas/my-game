import Platformer from '.';
import settings from '../../settings';
import { Position } from '../object';

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
