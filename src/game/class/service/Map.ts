import settings from '../../settings';
import platformers from '../platformer';
import entities from '../monster';
import maps from '../../data/maps';
import Player, { id as playerId } from '../entity/Player';
import RectPlatformer from '../object/RectPlatformer';
import Monster from '../object/Monster';

const objects = Object.assign(platformers, entities);

export type MapData = string[][];

export default class Map {
  private i = 0;
  public blocks = RectPlatformer.list;
  public monsters = Monster.list;
  public player!: Player;
  public width: number;
  public height: number;
  public sprain = {
    x: 0,
    y: 0,
  };

  get current() {
    return maps[this.i]
      .split('\n')
      .map((row) => row.trim())
      .map((row) => row.split(''));
  }

  constructor() {
    const data = this.current;

    this.parse(data);

    this.width = data[0].length * settings.tileWidth;
    this.height = data.length * settings.tileHeight;
  }

  public offsetX(x: number) {
    this.sprain.x = Math.min(this.sprain.x + x, this.width - settings.width);
  }

  public offsetY(y: number) {
    this.sprain.y += y;
  }

  private parse(data: MapData) {
    data.forEach((row, i) => {
      row.forEach((tile, j) => {
        if (tile === '-') return;

        const x = j * settings.tileWidth;
        const y = (i - 1) * settings.tileHeight;

        if (tile === playerId) return this.player = new Player({ x, y });

        const GameObject = objects[tile];

        GameObject && new GameObject({ x, y });
      });
    });
  }

  public clear(context: CanvasRenderingContext2D) {
    context.clearRect(
      this.sprain.x,
      this.sprain.y,
      settings.width + this.sprain.x,
      settings.height + this.sprain.y
    );
  }
}
