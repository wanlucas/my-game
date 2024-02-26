import Diana from '../monster/Diana';
import { Position } from '../object/GameObject';
import Keyboard from '../service/Keyboard';

export const id = 't';

export default class Tester extends Diana {
  private keyboard = new Keyboard();
  public speed = 2;

  constructor(position: Position) {
    console.log(position);
    super(position);

    this.keyboard.onDown('d', () => this.turnRight());
    
    this.keyboard.onDown('a', () => this.turnLeft());

    this.keyboard.onDown(' ', () => this.attack());
    
    this.keyboard.onUp('a', () => this.stop());
    
    this.keyboard.onUp('d', () => this.stop());
    
    this.keyboard.onDown('w', () => this.velocity.y = -this.speed);
    
    this.keyboard.onDown('s', () => this.velocity.y = this.speed);
    
    this.keyboard.onUp('w', () => this.velocity.y = 0);
    
    this.keyboard.onUp('s', () => this.velocity.y = 0);
  }

}