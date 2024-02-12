import settings from '../../settings';
import Player from '../entity/Player';
import { Position } from '../object';
import Platformer from '../platformer';
import BaseBlock from '../platformer/BaseBlock';

const blocksMapper = {
  1: BaseBlock,
} as Record<string, { new (position: Position): Platformer }>;

const test = `
  -----------------
  -----------------
  -----------------
  ----1------------
  ---1-1-----------
  -----------------
  p------1---------
  ------1----------
  11111111111111111
`;

export type MapData = string;

export default class Map {
  public blocks: Platformer[];
  public player!: Player;
  public width = settings.width;
  public height = settings.height;

  constructor(data: MapData = test) {
    this.blocks = [];
    this.parse(data);
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

        if (tile === 'p') this.player = new Player(position);
        else {
          const Block = blocksMapper[tile];

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
