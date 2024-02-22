import ArcEntity from '../../object/ArcEntity';
import { Position } from '../../object/GameObject';
import Sprite from '../../service/Sprite';

enum OrbSprites {
  Idle = 'idle',
  Hit = 'Hit',
}

export enum Direction {
  Left,
  Right,
}

export default class Orb extends ArcEntity {
  public static radius = 0;
  private static velocity = 15;

  constructor(position: Position, private direction: Direction = Direction.Left) {
    super(position, Orb.radius,  new Sprite('data/sprites/orb.png'));

    this.sprite.create(OrbSprites.Idle, [
      [20, 235, 140, 135],
      [200, 235, 140, 135],
      [380, 235, 140, 135],
      [560, 235, 140, 135],
      [15, 435, 145, 140],
      [200, 435, 145, 145],
      [383, 435, 145, 145],
      [566, 435, 145, 145],
    ], {
      loop: true,
      interval: 3
    });

    this.sprite.create(OrbSprites.Hit, [
      [16, 640, 145, 145],
      [200, 640, 145, 145],
      [380, 640, 145, 145],
      [16, 16, 145, 145, 10, {
        onEnd: () => this.destroy()
      }],
    ], {
      loop: false,
      interval: 3
    });

    this.sprite.set(OrbSprites.Idle);

    if (direction === Direction.Right) {
      this.sprite.invertX();
    }
  }

  public throw() {
    this.velocity.x = this.direction === Direction.Right ? Orb.velocity : -Orb.velocity; 
  }

  private colliding() {
    return this.sprite.is(OrbSprites.Hit);
  }

  public onCollision() {
    if (!this.colliding()) this.sprite.set(OrbSprites.Hit);
  }
}