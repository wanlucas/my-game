import ArcEntity from '../../object/ArcEntity';
import { Position } from '../../object/GameObject';

export default class Orb extends ArcEntity {
  static radius = 0;

  constructor(position: Position) {
    super(position, Orb.radius);
  }

  public onCollision() {
    this.destroy();
  }
}