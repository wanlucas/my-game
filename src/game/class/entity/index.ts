import { Position } from '../object';
import GameObject from '../object/Rectangle';


export interface Velocity {
  x: number;
  y: number;
}

export default class Entity extends GameObject {
  velocity: Velocity;

  constructor(position: Position, width: number, height: number) {
    super(position, width, height);

    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  public xCollisionWithBlock(block: GameObject) {
    return (
      this.position.x + this.velocity.x + this.width > block.position.x
      && this.position.x + this.velocity.x < block.position.x + block.width
      && this.position.y + this.height > block.position.y
      && this.position.y < block.position.y + block.height
    );
  }

  public yCollisionWithBlock(block: GameObject) {
    return (
      this.position.y + this.velocity.y + this.height > block.position.y
      && this.position.y + this.velocity.y < block.position.y + block.height
      && this.position.x + this.width > block.position.x
      && this.position.x < block.position.x + block.width
    );
  }

  public xCollisionWithEntity(entity: Entity) {
    return (
      this.position.x + this.velocity.x + this.width > entity.position.x + entity.velocity.x
      && this.position.x + this.velocity.x < entity.position.x + entity.velocity.x + entity.width
      && this.position.y + this.height > entity.position.y
      && this.position.y < entity.position.y + entity.height
    );
  }

  public yCollisionWithEntity(entity: Entity) {
    return (
      this.position.y + this.velocity.y + this.height > entity.position.y + entity.velocity.y
      && this.position.y + this.velocity.y < entity.position.y + entity.velocity.y + entity.height
      && this.position.x + this.width > entity.position.x
      && this.position.x < entity.position.x + entity.width
    );
  }

  public collidesWithBlock(block: GameObject) {
    return (
      this.position.x + this.velocity.x + this.width > block.position.x
      && this.position.x + this.velocity.x < block.position.x + block.width
      && this.position.y + this.velocity.y + this.height > block.position.y
      && this.position.y + this.velocity.y < block.position.y + block.height
    );
  }

  public collidesWithEntity(entity: Entity) {
    return (
      this.position.x + this.velocity.x + this.width > entity.position.x + entity.velocity.x
      && this.position.x + this.velocity.x < entity.position.x + entity.velocity.x + entity.width
      && this.position.y + this.velocity.y + this.height > entity.position.y + entity.velocity.y
      && this.position.y + this.velocity.y < entity.position.y + entity.velocity.y + entity.height
    );
  }
}