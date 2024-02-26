import Sprite from '../interface/Sprite';
import ArcEntity from './ArcEntity';
import GameObject, { Position } from './GameObject';
import Rectangle from './Rectangle';

export default class Projectile extends ArcEntity {
  private static lifespan = 400;

  private lifespan = Projectile.lifespan;
  public speed: number;

  constructor(position: Position, radius: number, speed: number, sprite: Sprite) {
    super(position, radius, sprite);
    this.speed = speed;
  }

  public hit() {
    this.destroy();
  }

  public throw(target: GameObject) {
    const px = target instanceof Rectangle ? target.position.x + target.width / 2 : target.position.x;
    const py = target instanceof Rectangle ? target.position.y + target.height / 2 : target.position.y;
    const dx = px - this.position.x;
    const dy = py - this.position.y;

    const angle = Math.atan2(dy, dx);

    this.velocity.x = Math.cos(angle) * this.speed;
    this.velocity.y = Math.sin(angle) * this.speed;
  }

  public update(context: CanvasRenderingContext2D): void {
    super.update(context);

    if (this.lifespan-- === 0) {
      this.hit();
    }
  }
}