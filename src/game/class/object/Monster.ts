import Sprite from '../interface/Sprite';
import GameObject, { Position } from './GameObject';
import RectEntity from './RectEntity';

export default class Monster extends RectEntity {
  public static list: Monster[] = [];
  public target: GameObject | null = null;
    
  constructor(
    position: Position,
    width: number,
    height: number,
    sprite: Sprite
  ) {
    super(position, width, height, sprite);
    
    Monster.list.push(this);
  }

  public listen(target: GameObject) {
    this.target = target;
  }
}