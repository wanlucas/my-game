import Keyboard from './service/Keyboard';
import Map from './service/Map';

export default class Game {
  private map: Map = new Map();
  private keyboard: Keyboard = new Keyboard();

  constructor(
    private readonly context: CanvasRenderingContext2D,
    private readonly width: number,
    private readonly height: number
  ) {
    this.map.player.listen(this.keyboard);
  }

  public draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.map.blocks.forEach((block) => block.draw(this.context));
    this.map.player.draw(this.context);
  }

  public update() {
    this.map.player.update(this.keyboard);

    this.map.player.velocity.y += 0.5;

    this.map.blocks.forEach((block) => {
      if (this.map.player.xCollisionWithBlock(block)) {
        this.map.player.velocity.x = 0;
      }

      if (this.map.player.yCollisionWithBlock(block)) {
        this.map.player.velocity.y = 0;
      }
    });
  }

  public loop() {
    setInterval(() => {
      this.update();
      this.draw();
    }, 1000 / 60);
  }

  public start() {
    this.loop();
  }
}
