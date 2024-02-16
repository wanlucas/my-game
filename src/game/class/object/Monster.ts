import Sprite from '../service/Sprite';
import { Position } from './GameObject';
import RectEntity from './RectEntity';

export default class Monster extends RectEntity {
  public static list: Monster[] = [];
    
  constructor(
    position: Position,
    width: number,
    height: number,
    sprite: Sprite
  ) {
    super(position, width, height, sprite);
    
    Monster.list.push(this);
  }
}