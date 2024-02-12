export interface Position {
  x: number;
  y: number;
}

export default class GameObject {
  constructor(
    public position: Position,
  ) {}
}
