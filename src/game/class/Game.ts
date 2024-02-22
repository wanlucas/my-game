import Player from './entity/Player';
import GameObject from './object/GameObject';
import Monster from './object/Monster';
import Keyboard from './service/Keyboard';
import Map from './Map';

export default class Game {
  private map: Map = new Map();
  private keyboard: Keyboard = new Keyboard();

  constructor(
    private readonly context: CanvasRenderingContext2D,
    private readonly width: number,
    private readonly height: number
  ) {
    Player.instance.listen(this.keyboard);

    Monster.list.forEach((monster) => {
      monster.listen(Player.instance);
    });
  }

  public update() {
    this.map.clear(this.context);
    this.map.draw(this.context);

    GameObject.update(this.context);

    if (Player.instance.leftCollisionWithBoundary(this.map.sprain.x)) {
      Player.instance.velocity.x = 0;
      Player.instance.position.x = this.map.sprain.x;
    }

    if (Player.instance.rightCollisionWithBoundary(this.map.width)) {
      Player.instance.velocity.x = 0;
      Player.instance.position.x = this.map.width - Player.instance.width;
    }

    if (Player.instance.rightCollisionWithBoundary(this.width / 2 + this.map.sprain.x) && Player.instance.velocity.x > 0) {
      this.map.offsetX(Player.instance.velocity.x);
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
