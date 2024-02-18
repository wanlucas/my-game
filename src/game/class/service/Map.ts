import settings from '../../settings';
import platformers from '../platformer';
import entities from '../monster';
import testers from '../test';
import maps from '../../data/maps';
import Player, { id as playerId } from '../entity/Player';
import Background from './Background';

const objects = Object.assign(platformers, entities, testers);

export type MapData = string[][];

export interface Sprain {
  x: number;
  y: number;
}

export default class Map {
  private i = 0;
  public width: number;
  public height: number;
  private bg: Background;
  

  public sprain: Sprain = {
    x: 0,
    y: 0,
  };

  get current() {
    return maps[this.i];
  }

  get data() {
    return this.current.data
      .split('\n')
      .map((row) => row.trim())
      .map((row) => row.split(''));
  }

  constructor() {
    const data = this.data;

    this.parse(data);
    this.width = data[0].length * settings.tileWidth;
    this.height = data.length * settings.tileHeight;
    this.bg = new Background(this.width, this.height);

    this.current.bg.forEach((bg) => this.bg.create(bg.data, bg.rate));
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

        if (tile === playerId) return new Player({ x, y });

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

  public draw(context: CanvasRenderingContext2D) {
    this.bg.draw(context, this.sprain);
  }
}
