import { Position } from '../object/GameObject';
import RectEntity from '../object/RectEntity';
import Jenny, { id as jennyId } from './Jenny';

export default {
  [jennyId]: Jenny,
} as Record<string, { new (position: Position): RectEntity }>;
