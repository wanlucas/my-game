import ArcEntity from '../../object/ArcEntity';
import GameObject, { Position } from '../../object/GameObject';
import Sprite from '../../service/Sprite';

enum OrbSprites {
  Idle = 'idle',
  Hit = 'Hit',
}

export default class Orb extends ArcEntity {
  static radius = 0;

  constructor(position: Position) {
    super(position, Orb.radius, new Sprite('data/sprites/orb.png'));

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
  }

  public onCollision() {
    this.sprite.set(OrbSprites.Hit);
  }
}