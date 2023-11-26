import Map from './service/Map';

export default class Game {
  private map: Map = new Map();

  constructor (
    private readonly context: CanvasRenderingContext2D,
    private readonly width: number,
    private readonly height: number
  ) {
    this.draw();
  }

  public draw () {
    this.context.clearRect(0, 0, this.width, this.height);
    this.map.draw(this.context);
  }
}
