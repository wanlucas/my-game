import settings from '../../../settings';
import Player from '../../entity/Player';
import Sprite from '../../interface/Sprite';
import GameObject, { Position } from '../../object/GameObject';
import Monster from '../../object/Monster';
import { Direction } from '../Jenny/Orb';
import Orb from './Orb';

export const id = 'd';

enum DianaSprite {
  Idle = 'idle',
  Run = 'run',
  Melee = 'melee',
  Attack = 'attack',
}

export default class Diana extends Monster {
  public static width = Math.round(settings.tileWidth / 1.5);
  public static height = Math.round( settings.tileHeight * 1.2);
  private static attackInt = 100;
  private static attackDis = 600;
  public static speed = 8;

  private orb: Orb | null = null;
  private attackInt = 0;
  private direction = Direction.Left;

  constructor(position: Position) {
    super(
      position,
      Diana.width,
      Diana.height,
      new Sprite('data/sprites/diana.png')
    );

    this.sprite.create(DianaSprite.Idle, [
      [25, 48, 49, 78],
      [157, 48, 49, 78],
      [281, 48, 49, 78],
      [409, 48, 49, 78],
      [537, 48, 49, 78],
      [665, 48, 49, 78],
      [793, 48, 49, 78],
      [921, 48, 49, 78],
    ], {
      interval: 8
    });

    this.sprite.create(DianaSprite.Run, [
      [12, 300, 55, 85],
      [143, 300, 55, 85],
      [268, 300, 55, 85],
      [395, 300, 55, 85],
      [522, 300, 55, 85],
      [650, 300, 55, 85],
      [778, 300, 55, 85],
      [906, 300, 55, 85],
    ], {
      interval: 5
    });

    this.sprite.create(DianaSprite.Melee, [
      [276, 560, 58, 80],
      [806, 560, 49, 80],
      [1071, 560, 54, 80],
      [1199, 560, 54, 80, 15, {
        onEnd: () => this.walk()
      }],
    ], {
      interval: 1,
      loop: false,
    });

    this.sprite.create(DianaSprite.Attack, [
      [22, 678, 70, 90],
      [144, 678, 70, 90],
      [271, 678, 68, 90],
      [402, 678, 68, 90],
      [530, 678, 68, 90],
      [658, 678, 68, 90],
      [786, 678, 68, 90],
      [914, 678, 68, 90],
      [1042, 678, 68, 90, 6, {
        onEnd: () => {
          this.updateDirection(this.target!);

          const x = this.direction === Direction.Right 
            ? this.position.x + this.width + 30 
            : this.position.x - 30;

          const y = this.position.y + this.height / 2.2;

          this.orb = new Orb({ x, y }, this.direction);
          this.orb.throw(this.target!);
        }
      }],
      [1170, 678, 68, 90, 15, {
        onEnd: () => this.walk()
      }],
    ], {
      interval: 6,
      loop: false,
    });

    this.sprite.set(DianaSprite.Run);

    this.sprite.invertX();

    this.walk();
  }

  private attacking() {
    return this.sprite.is(DianaSprite.Attack) || this.sprite.is(DianaSprite.Melee);
  }

  public walk() {
    this.velocity.x = this.direction === Direction.Left ? -Diana.speed : Diana.speed;
    this.sprite.set(DianaSprite.Run);
  }

  public turnLeft() {
    this.direction = Direction.Left;
    this.sprite.invertX();
  }

  public turnRight() {
    this.direction = Direction.Right;
    this.sprite.revertX();
  }

  private updateDirection(target: GameObject) {
    if (target.position.x < this.position.x) this.turnLeft();
    else this.turnRight();
  }

  public goLeft() {
    this.turnLeft();
    this.velocity.x = -Diana.speed;
  }

  public goRight() {
    this.turnRight();
    this.velocity.x = Diana.speed;
  }

  public attack() {
    this.stop();
    this.sprite.set(DianaSprite.Attack);
    this.attackInt = Diana.attackInt;
  }

  public jump() {
    this.velocity.y = -20;
  }

  public onXCol(col: GameObject): void {
    if (col instanceof Player) {
      if (col.position.x > this.position.x) {
        this.sprite.revertX();
      } else this.sprite.invertX();

      this.sprite.set(DianaSprite.Melee);
    } else this.jump();
  }

  public stop() {
    this.velocity.x = 0;
    this.sprite.set(DianaSprite.Idle);
  }

  public update(context: CanvasRenderingContext2D) {
    super.update(context);

    if (!this.target || this.attacking()) return;

    if (this.target.position.x < this.position.x) this.goLeft();
    else this.goRight();

    if (this.attackInt-- > 0) return;

    if (Math.abs(this.target.position.x - this.position.x) < Diana.attackDis) {
      this.attack();
    }
  }
}