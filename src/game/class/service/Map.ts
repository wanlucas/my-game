import settings from '../../settings';
import platformers from '../platformer';
import entities from '../entity';
import Rectangle from '../object/Rectangle';
import Player, { id as PLAYER_ID } from '../entity/Player';
import maps from '../../data/maps';
import RectEntity from '../object/RectEntity';

export type MapData = string[][];

export default class Map {
  private i = 0;
  public blocks: Rectangle[] = [];
  public monsters: RectEntity[] = [];
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
        const position = { x, y };

        if (tile === PLAYER_ID) return this.player = new Player(position);
      
        const Block = platformers[tile];

        if (Block) return this.blocks.push(new Block(position));

        const Monster = entities[tile];

        if (Monster) return this.monsters.push(new Monster(position));   
      });
    });

    if (!this.player) {
      throw new Error('No player found');
    }
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
