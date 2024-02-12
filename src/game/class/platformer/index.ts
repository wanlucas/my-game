import { Position } from '../object';
import GameObject from '../object/Rectangle';

export default class Platformer extends GameObject {
  constructor (
    public position: Position,
    public width: number,
    public height: number
  ) {
    super(position, width, height);
  }
}
