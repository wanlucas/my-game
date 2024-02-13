import { Position } from './GameObject';
import Rectangle from './Rectangle';

export interface Velocity {
  x: number;
  y: number;
}

export default class RectEntity extends Rectangle {
  velocity: Velocity;

  constructor(position: Position, width: number, height: number) {
    super(position, width, height);

    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  protected onTopCollisionRect(rect: Rectangle) {
    this.velocity.y = 0;
    this.position.y = rect.position.y + rect.height;
  }

  protected onBottomCollisionRect(rect: Rectangle) {
    this.velocity.y = 0;
    this.position.y = rect.position.y - this.height;
  }

  public onYRectCollision(rect: Rectangle) {
    if (this.position.y > rect.position.y) this.onTopCollisionRect(rect);
    else this.onBottomCollisionRect(rect);
  }

  public onXRectCollision(rect: Rectangle) {
    this.velocity.x = 0;
    
    if (this.position.x > rect.position.x) {
      this.position.x = rect.position.x + rect.width;
    } else this.position.x = rect.position.x - this.width;
  }  

  public xCollisionWithRect(block: Rectangle) {
    return (
      this.position.x + this.velocity.x + this.width > block.position.x
      && this.position.x + this.velocity.x < block.position.x + block.width
      && this.position.y + this.height > block.position.y
      && this.position.y < block.position.y + block.height
    );
  }

  public yCollisionWithRect(block: Rectangle) {
    return (
      this.position.y + this.velocity.y + this.height > block.position.y
      && this.position.y + this.velocity.y < block.position.y + block.height
      && this.position.x + this.width > block.position.x
      && this.position.x < block.position.x + block.width
    );
  }

  public xCollisionWithRectEntity(entity: RectEntity) {
    return (
      this.position.x + this.velocity.x + this.width > entity.position.x + entity.velocity.x
      && this.position.x + this.velocity.x < entity.position.x + entity.velocity.x + entity.width
      && this.position.y + this.height > entity.position.y
      && this.position.y < entity.position.y + entity.height
    );
  }

  public yCollisionWithRectEntity(entity: RectEntity) {
    return (
      this.position.y + this.velocity.y + this.height > entity.position.y + entity.velocity.y
      && this.position.y + this.velocity.y < entity.position.y + entity.velocity.y + entity.height
      && this.position.x + this.width > entity.position.x
      && this.position.x < entity.position.x + entity.width
    );
  }
}