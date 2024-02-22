import settings from '../../../settings';
import { Position } from '../../object/GameObject';
import Monster from '../../object/Monster';
import Sprite from '../../service/Sprite';
import Orb, { Direction } from './Orb';

export const id = 'j';

enum JennySprite {
  Idle = 'idle',
  Walk = 'walk',
  Attack = 'attack',
}

export default class Jenny extends Monster {
  public static width = settings.tileWidth * 0.7;
  public static height = settings.tileHeight;

  private orb: Orb | null = null;
  private direction = Direction.Left;

  constructor(position: Position) {
    super(
      position,
      Jenny.width,
      Jenny.height,
      new Sprite('data/sprites/jenny.png')
    );

    this.sprite.create(JennySprite.Idle, [
      [11, 8, 56, 85],
      [92, 8, 56, 85],
      [172, 8, 56, 85],
      [254, 8, 56, 85],
      [333, 8, 56, 85],
      [411, 8, 56, 85],
    ], {
      loop: true,
      interval: 15
    });

    this.sprite.create(JennySprite.Walk, [
      [11, 247, 56, 85],
      [92, 247, 56, 85],
      [172, 247, 56, 85],
      [254, 247, 56, 85],
      [333, 247, 56, 85],
      [411, 247, 56, 85],
    ], {
      loop: true,
      interval: 8
    });

    this.sprite.create(JennySprite.Attack, [
      [19, 486, 56, 85, 10, {
        onEnd: () => {
          this.orb = new Orb({
            x: this.position.x + (this.direction === Direction.Right ? this.width : 0),
            y: this.position.y - Orb.radius - 10,
          }, this.direction);
        },
      }],
      [19, 486, 56, 85, 50, {
        onTick: () => {
          this.orb!.radius += 0.5;
          this.orb!.position.y -= 0.5;
        },
      }],
      [101, 486, 56, 85, 40, {
        onEnd: () => {
          this.width = Jenny.width * 1.6;
          this.orb!.throw();
          this.orb = null;
        }
      }],
      [180, 486, 80, 85],
      [303, 486, 80, 80],
      [430, 486, 80, 72, 20, {
        onEnd:  () => {
          this.width = Jenny.width;
          this.sprite.set(JennySprite.Idle);
        }
      }],
    ], {
      loop: false,
      interval: 10,
    });

    this.sprite.set(JennySprite.Attack);
  }

  private attack() {
    this.sprite.set(JennySprite.Attack);
  }

  private turnLeft() {
    this.sprite.set(JennySprite.Walk);
    this.sprite.revertX();
    this.direction = Direction.Left;
    this.velocity.x = -2;
  }

  private turnRight() {
    this.sprite.set(JennySprite.Walk);
    this.sprite.invertX();
    this.direction = Direction.Right;
    this.velocity.x = 2;
  }

  private stop() {
    this.sprite.set(JennySprite.Idle);
    this.velocity.x = 0;
  }

  public update(context: CanvasRenderingContext2D) {
    super.update(context);
  }
}
