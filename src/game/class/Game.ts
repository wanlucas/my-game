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
    this.map.clear(this.context);
    this.map.blocks.forEach((block) => block.draw(this.context));
    this.map.player.draw(this.context);
  }

  public update() {
    this.map.blocks.forEach((block) => {
      if (this.map.player.xCollisionWithRect(block)) {
        this.map.player.onXRectCollision(block);
      }

      if (this.map.player.yCollisionWithRect(block)) {
        this.map.player.onYRectCollision(block);
      }
    });

    this.map.player.update();

    this.map.player.velocity.y += 0.5;

    if (this.map.player.leftCollisionWithBoundary(this.map.sprain.x)) {
      this.map.player.velocity.x = 0;
      this.map.player.position.x = this.map.sprain.x;
    }

    if (this.map.player.rightCollisionWithBoundary(this.map.width)) {
      this.map.player.velocity.x = 0;
      this.map.player.position.x = this.map.width - this.map.player.width;
    }

    if (this.map.player.position.x > this.width / 3 && this.map.player.velocity.x > 0) {
      this.map.offsetX(this.map.player.velocity.x);
    }

    this.context.setTransform(1, 0, 0, 1, -this.map.sprain.x, -this.map.sprain.y);
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
