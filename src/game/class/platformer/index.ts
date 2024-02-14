import { Position } from '../object/GameObject';
import Rectangle from '../object/Rectangle';
import BaseBlock, { id as baseBlockId } from './BaseBlock';

export default {
  [baseBlockId]: BaseBlock,
} as Record<string, { new (position: Position): Rectangle }>;