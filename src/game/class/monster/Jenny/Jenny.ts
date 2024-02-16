import settings from '../../../settings';
import { Position } from '../../object/GameObject';
import Monster from '../../object/Monster';
import Keyboard from '../../service/Keyboard';
import Sprite from '../../service/Sprite';
import Orb from './Orb';

export const id = 'j';

enum JennySprite {
  Idle = 'idle',
  Walk = 'walk',
  Attack = 'attack',
}

const config = {
  width: settings.tileWidth * 0.7,
  height: settings.tileHeight,
};

export default class Jenny extends Monster {
  constructor(position: Position) {
    super(
      position,
      config.width,
      config.height,
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
      [19, 486, 56, 85, 40],
      [101, 486, 56, 85, 80, () => {
        this.width = config.width * 1.6;
        new Orb({
          x: this.position.x,
          y: this.position.y - (Orb.radius * 2 + 10),
        
        });
      }],
      [180, 486, 80, 85],
      [303, 486, 80, 80],
      [430, 486, 80, 72, 20, () => {
        this.width = config.width;
        this.sprite.set(JennySprite.Idle);
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
    this.velocity.x = -2;
  }

  private turnRight() {
    this.sprite.set(JennySprite.Walk);
    this.sprite.invertX();
    this.velocity.x = 2;
  }

  private stop() {
    this.sprite.set(JennySprite.Idle);
    this.velocity.x = 0;
  }

  public update(context: CanvasRenderingContext2D) {
    super.update(context);
  }

  public listen(keyboard: Keyboard) {
    keyboard.onDown('d', () => {
      this.turnRight();
    });

    keyboard.onDown('a', () => {
      this.turnLeft();
    });

    keyboard.onUp('d', () => {
      this.stop();
    });

    keyboard.onUp('a', () => {
      this.stop();
    });

    keyboard.onDown(' ', () => {
      this.attack();
    });
  }
}
