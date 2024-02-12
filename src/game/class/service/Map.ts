import settings from '../../settings';
import { Position } from '../object/GameObject';
import Player from '../object/Player';
import BaseBlock from '../platformer/BaseBlock';
import Platformer from '../platformer/Platformer';

const blocksMapper = {
  1: BaseBlock,
} as Record<string, { new (position: Position): Platformer }>;

const test = `
  -----------------
  -----------------
  -----------------
  -----------------
  -----------------
  -----------------
  p----------------
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
