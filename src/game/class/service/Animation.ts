export type FrameDuration = number;

export type Slice = [number, number, number, number, FrameDuration?];

export default class Animation {
  public slices: Slice[];
  public frame: number;
  public frameTick: number;
  public image: HTMLImageElement;

  constructor(image: HTMLImageElement, slices: Slice[]) {
    this.frame = 0;
    this.frameTick = 0;
    this.image = image;
    this.slices = slices.map(([sx, sy, sw, sh]: Slice) => [sx, sy, sw, sh]);
  }

  public nextFrame() {
    this.frame = (this.frame + 1) % this.slices.length;
  }

  public draw(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    const [sx, sy, sw, sh, frameDuration = 1] = this.slices[this.frame];

    context.drawImage(
      this.image,
      sx, sy,
      sw, sh,
      -width / 2, -height / 2,
      width, height,
    );
		
    if (this.frameTick === frameDuration) {
      this.nextFrame();
      this.frameTick = 0;
    }

    this.frameTick++;
  }
}

