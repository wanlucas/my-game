interface SliceArgs {
  onEnd?: () => void;
  onTick?: () => void;
}

export type Coordinates = [number, number, number, number, number?, SliceArgs?];

export class Slice {
  public onEnd: () => void;
  public onTick: () => void;

  constructor(
    private sx: number,
    private sy: number,
    private sw: number,
    private sh: number,
    public duration: number = 5,
    args: SliceArgs = {}
  ) {
    this.onEnd = args.onEnd || (() => {});
    this.onTick = args.onTick || (() => {});
  }

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

interface AnimationArgs {
  loop?: boolean;
  interval?: number;
}

export class Animation {
  private slices: Slice[] = [];
  private loop: boolean;
  private frame = 0;
  private tick = 0;

  get current() {
    return this.slices[this.frame];
  }

  constructor(slices: Coordinates[], { loop, interval }: AnimationArgs = {}) {
    this.slices = slices.map((
      [sx, sy, sw, sh, duration, args]
    ) => new Slice(
      sx,
      sy,
      sw,
      sh,
      duration || interval,
      args,
    ));

    this.loop = loop ?? true;
  }

  public next() {
    this.current.onEnd();

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
    ++this.tick >= this.current.duration && this.next();
    this.current.onTick();
  }
}

export default class Sprite {
  private image: HTMLImageElement;
  private slices: Map<string, Animation | Slice>;
  private selected?: Animation | Slice;
  private selectedName?: string;
  private xAxis = 1;
  private yAxis = 1;

  public width: number;
  public height: number;

  constructor(src: string) {
    const image = new Image();

    image.src = src;

    this.slices = new Map();
    this.width = image.width;
    this.height = image.height;
    this.image = image;
  }

  public invertX() {
    this.xAxis = -1;
  }

  public revertX() {
    this.xAxis = 1;
  }

  public is(name: string) {
    return this.selectedName === name;
  }

  public make(slices: Coordinates[], args?: AnimationArgs) {
    if (slices.length > 1) return (this.selected = new Animation(slices, args));
    return (this.selected = new Slice(...slices[0]));
  }

  public create(name: string, slices: Coordinates[], args?: AnimationArgs) {
    if (slices.length > 1) this.slices.set(name, new Animation(slices, args));
    else this.slices.set(name, new Slice(...slices[0]));
  }

  public set(name: string) {
    const selected = this.slices.get(name);

    if (!selected) return;

    this.selected = selected;
    this.selectedName = name;

    if (selected instanceof Animation) selected.reset();
  }

  public translate(from: string | string[], to: string) {
    if (!this.selectedName) return this.set(to);

    if (typeof from === 'string') {
      if (this.selectedName !== from) return;
    } else if (!from.includes(this.selectedName)) return;

    this.set(to);
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

    this.selected!.draw(context, this.image, dx * this.xAxis, dy, dw, dh);

    context.restore();
  }

  public drawSlice(
    name: string,
    context: CanvasRenderingContext2D,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ) {
    this.slices.get(name)!.draw(context, this.image, dx, dy, dw, dh);
  }
}
