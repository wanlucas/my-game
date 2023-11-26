import GameObject, { Position } from './GameObject';

export interface Velocity {
  x: number;
  y: number;
}

export default class Entity extends GameObject {
  velocity: Position;

  constructor(position: Position, width: number, height: number) {
    super(position, width, height);

    this.velocity = {
      x: 0,
      y: 0,
    };
  }
}