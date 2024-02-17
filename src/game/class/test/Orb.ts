import Orb from '../monster/Jenny/Orb';
import { Position } from '../object/GameObject';
import Keyboard from '../service/Keyboard';

export const id = 'o';

export default class OrbTester extends Orb {
  private static i = 0;
  private static velocity = 2;

  private keyboard = new Keyboard();

  constructor(position: Position) {
    super(position);

    if (!OrbTester.i++)  this.listen(this.keyboard);
    this.radius = 100;
  }

  public onCollision(): void {
      
  }

  private listen(keyboard: Keyboard) {
    keyboard.onDown('d', () => this.velocity.x = OrbTester.velocity);

    keyboard.onDown('a', () => this.velocity.x = -OrbTester.velocity);

    keyboard.onUp('a', () => this.velocity.x = 0);

    keyboard.onUp('d', () => this.velocity.x = 0);

    keyboard.onDown('w', () => this.velocity.y = -OrbTester.velocity);

    keyboard.onDown('s', () => this.velocity.y = OrbTester.velocity);

    keyboard.onUp('w', () => this.velocity.y = 0);

    keyboard.onUp('s', () => this.velocity.y = 0);
  }
}