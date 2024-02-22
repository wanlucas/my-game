import settings from '../../../settings';
import Player from '../../entity/Player';
import GameObject, { Position } from '../../object/GameObject';
import Monster from '../../object/Monster';
import Sprite from '../../service/Sprite';
import { Direction } from '../Jenny/Orb';

export const id = 'l';

enum LornaSprites {
  Idle = 'idle',
  Walk = 'walk',
  Attack = 'attack',
}

export default class Lorna extends Monster {
  public static width = settings.tileWidth / 2;
  public static height = Math.round(settings.tileHeight * 1.2);
  public static speed = 2;

  private direction = Direction.Left;

  constructor(position: Position) {
    super(
      position,
      Lorna.width,
      Lorna.height,
      new Sprite('data/sprites/lorna.png')
    );

    this.sprite.create(LornaSprites.Idle, [
      [41, 54, 36, 75],
      [169, 54, 36, 75],
      [297, 54, 36, 75],
      [425, 54, 36, 75],
      [553, 54, 36, 75],
    ], {
      loop: true,
      interval: 10
    });

    this.sprite.create(LornaSprites.Walk, [
      [33, 183, 36, 75],
      [161, 183, 36, 75],
      [289, 183, 36, 75],
      [417, 183, 36, 75],
      [545, 183, 36, 75],
    ], {
      loop: true,
      interval: 8
    });

    this.sprite.create(LornaSprites.Attack, [
      [33, 440, 52, 75],
      [157, 440, 52, 75],
      [290, 440, 52, 75],
      [420, 440, 52, 75, 20],
      [33, 440, 52, 75, 20, {
        onEnd: () => {
          this.sprite.set(LornaSprites.Walk);
          this.turn();
        }
      }],
    ], {
      loop: false,
      interval: 3,
    });

    this.sprite.set(LornaSprites.Walk);

    this.turnLeft();
  }

  private turnLeft() {
    this.velocity.x = -Lorna.speed;
    this.sprite.invertX();
    this.direction = Direction.Left;
  }

  private turnRight() {
    this.velocity.x = Lorna.speed;
    this.sprite.revertX();
    this.direction = Direction.Right;
  }

  private turn() {
    this.direction === Direction.Left ? this.turnRight() : this.turnLeft();
  }

  private attack() {
    this.sprite.set(LornaSprites.Attack);
  }

  public onXCol(col: GameObject): void {
    if (col instanceof Player) {
      if (col.position.x > this.position.x) {
        this.sprite.revertX();
      } else this.sprite.invertX();

      this.attack();
    } else this.turn();
  }
}
