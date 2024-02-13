type Coordinates = [number, number, number, number, number?];

export class Slice {
  constructor(
    private sx: number,
    private sy: number,
    private sw: number,
    private sh: number,
    public duration: number = 1
  ) {}

  public draw(
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ) {
    context.drawImage(
      image,
      this.sx,
      this.sy,
      this.sw,
      this.sh,
      dx,
      dy,
      dw,
      dh
    );
  }
}

export class Animation {
  private slices: Slice[] = [];
  private loop: boolean;
  private frame = 0;
  private tick = 0;

  get current() {
    return this.slices[this.frame];
  }

  constructor(slices: Coordinates[], loop: boolean) {
    this.slices = slices.map((slice) => new Slice(...slice));
    this.loop = loop;
  }

  public next() {
    if (this.loop) this.frame = (this.frame + 1) % this.slices.length;
    else this.frame = Math.min(this.frame + 1, this.slices.length - 1);

    this.tick = 0;
  }

  public reset() {
    this.frame = 0;
    this.tick = 0;
  }

  public draw(
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ) {
    this.current.draw(context, image, dx, dy, dw, dh);
    this.tick++ > this.current.duration && this.next();
  }
}

export default class Sprite {
  private image: HTMLImageElement;
  private slices: Map<string, Animation | Slice>;
  private selected: Animation | Slice | null = null;
  private xAxis = 1;
  private yAxis = 1;

  constructor(src: string) {
    const image = new Image();

    image.src = src;

    this.slices = new Map();
    this.image = image;
  }

  public create(name: string, slices: Coordinates[], { loop = true } = {}) {
    if (slices.length > 1) this.slices.set(name, new Animation(slices, loop));
    else this.slices.set(name, new Slice(...slices[0]));
  }

  public set(name: string) {
    const selected = this.slices.get(name);

    if (!selected) return;

    this.selected = selected;

    if (selected instanceof Animation) selected.reset();
  }

  public invertX() {
    this.xAxis = -1;
  }

  public revertX() {
    this.xAxis = 1;
  }

  public draw(
    context: CanvasRenderingContext2D,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ) {
    context.save();
    context.translate(this.xAxis === 1 ? 0 : dw, 0);
    context.scale(this.xAxis, 1);

    this.selected?.draw(
      context,
      this.image,
      dx * this.xAxis,
      dy,
      dw,
      dh
    );

    context.restore();
  }
}
