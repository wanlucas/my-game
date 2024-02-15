import settings from '../settings';
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

    if (this.map.player.position.x > this.width / 3 && this.map.player.velocity.x > 0) {
      this.map.offsetX(this.map.player.velocity.x);
    }
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
