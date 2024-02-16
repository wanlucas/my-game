import ArcEntity from '../../object/ArcEntity';
import { Position } from '../../object/GameObject';

export default class Orb extends ArcEntity {
  static radius = 10;

  constructor(position: Position) {
    super(position, Orb.radius);

    this.velocity.x = -10;
  }
}