import Sprite from '../../interface/Sprite';
import { Position } from '../../object/GameObject';
import Projectile from '../../object/Projectile';
import { Direction } from '../Jenny/Orb';

enum OrbSprites {
  Idle = 'idle',
  Hit = 'Hit',
}

export default class Orb extends Projectile {
  public static radius = 15;
  public static speed = 17;
    
  constructor(position: Position, private direction: Direction = Direction.Left) {
    super(
      position,
      Orb.radius,  
      Orb.speed,
      new Sprite('data/sprites/diana.png')
    );

    console.log(position);

    this.sprite.create(
      OrbSprites.Idle,
      [
        [1389, 191, 19, 13],
        [1481, 191, 21, 13],
        [1513, 191, 21, 13],
        [1578, 194, 21, 13],
        [1642, 193, 21, 13],
      ], {
        loop: true,
        interval: 5
      }
    );

    this.sprite.create(
      OrbSprites.Hit,
      [
        [1710, 176, 21, 41],
        [1774, 176, 21, 41],
        [1839, 176, 21, 41],
        [1901, 176, 21, 41],
        [1976, 176, 21, 41],
        [2028, 176, 21, 41, 3, {
          onEnd: () => this.destroy()
        }],
      ], {
        loop: false,
        interval: 3
      }
    );

    this.sprite.set(OrbSprites.Idle);

    if (direction === Direction.Left) {
      this.sprite.invertX();
    }
  }

  private colliding() {
    return this.sprite.is(OrbSprites.Hit);
  }

  public hit() {
    this.sprite.set(OrbSprites.Hit);
  }

  public onCollision() {
    if (!this.colliding()) this.hit();
  }
}