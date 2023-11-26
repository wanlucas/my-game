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
  -----------------
  11111111111111111
`;

export type MapData = string;

export default class Map {
  public blocks: Platformer[];
  public player!: Player;

  constructor(data: MapData = test) {
    this.blocks = [];
    this.parse(data);

    if (!this.player) {
      throw new Error('No player found');
    }
  }

  private parse(data: MapData) {
    const tiles = data.split('/')
      .map((slice) => slice.trim().split('\n')
        .map((row) => row.trim())
        .map((row) => row.split('')));

    if (tiles.some((slice) => (
      slice.length !== settings.rows
      || slice.some((row) => row.length < settings.lines)
    ))) throw new Error('Invalid map');

    // TODO - implement render by chunks
    tiles.forEach((slice) => {
      slice.forEach((row, i) => {
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
    });
  }

  public draw(context: CanvasRenderingContext2D) {
    this.blocks.forEach((block) => block.draw(context));
    this.player.draw(context);
  }
}