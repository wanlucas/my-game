import settings from '../../settings';
import platformers from '../platformer';
import Rectangle from '../object/Rectangle';
import Player, { id as PLAYER_ID } from '../entity/Player';
import maps from '../../data/maps';

export type MapData = string[][];

export default class Map {
  private i = 0;
  public blocks: Rectangle[] = [];
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
    console.log(data);

    data.forEach((row, i) => {
      row.forEach((tile, j) => {
        if (tile === '-') return;

        const x = j * settings.tileWidth;
        const y = (i - 1) * settings.tileHeight;
        const position = { x, y };

        if (tile === PLAYER_ID) this.player = new Player(position, this.sprain);
        else {
          const Block = platformers[tile];

          if (!Block) throw new Error(`Invalid block type: ${tile}`);

          this.blocks.push(new Block(position, this.sprain));
        }
      });
    });

    if (!this.player) {
      throw new Error('No player found');
    }
  }
}
