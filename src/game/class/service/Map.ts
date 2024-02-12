import settings from '../../settings';
import platformers from '../platformer';
import Rectangle from '../object/Rectangle';
import Player, { id as PLAYER_ID } from '../entity/Player';
import maps from '../../data/maps';

export type MapData = string;

export default class Map {
  private i = 0;
  public blocks: Rectangle[] = [];
  public player!: Player;
  public width = settings.width;
  public height = settings.height;

  get current() {
    return maps[this.i];
  }

  constructor() {
    this.parse(this.current);
  }

  private parse(data: MapData) {
    const rows = data
      .split('\n')
      .map((row) => row.trim())
      .map((row) => row.split(''));

    // TODO - implement render by chunks
    rows.forEach((row, i) => {
      row.forEach((tile, j) => {
        if (tile === '-') return;

        const x = j * settings.tileWidth;
        const y = i * settings.tileHeight;
        const position = { x, y };

        if (tile === PLAYER_ID) this.player = new Player(position);
        else {
          const Block = platformers[tile];

          if (!Block) throw new Error(`Invalid block type: ${tile}`);

          this.blocks.push(new Block(position));
        }
      });
    });

    if (!this.player) {
      throw new Error('No player found');
    }
  }
}
