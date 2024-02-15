export interface Position {
  x: number;
  y: number;
}

export interface Sprain {
  x: number;
  y: number;
}

export default class GameObject {
  get position(): Position {
    return {
      x: this._position.x - this.sprain.x,
      y: this._position.y - this.sprain.y,
    };
  }

  public setX(x: number) {
    this._position.x = x;
  }

  public setY(y: number) {
    this._position.y = y;
  }

  public incrementX(x: number) {
    this._position.x += x;
  }

  public incrementY(y: number) {
    this._position.y += y;
  }

  public decrementX(x: number) {
    this._position.x -= x;
  }

  public decrementY(y: number) {
    this._position.y -= y;
  }

  constructor(
    private _position: Position,
    public sprain: Sprain,
  ) { }
}
