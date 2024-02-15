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

    this.map.monsters.forEach((monster) => {
      monster.listen && monster.listen!(this.keyboard);
    });
  }

  public update() {
    this.map.clear(this.context);

    this.map.blocks.forEach((block) => {
      block.update(this.context);

      if (this.map.player.xCollisionWithRect(block)) {
        this.map.player.onXRectCollision(block);
      }

      if (this.map.player.yCollisionWithRect(block)) {
        this.map.player.onYRectCollision(block);
      }

      this.map.monsters.forEach((monster) => {
        if (monster.xCollisionWithRect(block)) {
          monster.onXRectCollision(block);
        }

        if (monster.yCollisionWithRect(block)) {
          monster.onYRectCollision(block);
        }
      });
    });

    this.map.monsters.forEach((monster) => {
      monster.update(this.context);
    });

    this.map.player.update(this.context);

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
    }, 1000 / 60);
  }

  public start() {
    this.loop();
  }
}
