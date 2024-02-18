import settings from '../../settings';
import { Sprain } from './Map';

interface Layer {
  data: HTMLImageElement;
  rate: number;
  x: number;
}

export default class Background {
  private layers: Layer[] = [];

  constructor(private width: number, private height: number) {}

  public create(layer: string, rate: number) {
    const image = new Image();

    image.src = layer;

    const xl = Math.ceil(this.width / image.width);

    for (let i = 0; i <= xl; i++) {
      this.layers.push({
        data: image,
        rate,
        x: i * settings.width,
      });
    }
  }

  public draw(context: CanvasRenderingContext2D, sprain: Sprain) {
    this.layers.forEach(({ data, rate, x }) => {
      context.drawImage(
        data,
        0,
        0,
        data.width,
        data.height,
        x + sprain.x * (1 - rate),
        sprain.y * (1 - rate),
        settings.width + 1,
        settings.height
      );
    });
  }
}
