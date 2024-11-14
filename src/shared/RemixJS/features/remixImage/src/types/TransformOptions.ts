import { TypeOf } from 'zod';
import { transformOptions } from '../utils/transformOptionsSchema';

type FullTransformOptions = TypeOf<typeof transformOptions>;

interface TransformOptionsForGIF extends Omit<FullTransformOptions, 'contentType'> {
  contentType?: Extract<'image/gif', Required<FullTransformOptions>['contentType']>;
  loop?: FullTransformOptions['loop'];
  delay?: FullTransformOptions['delay'];
}

interface TransformOptionsNotForGIF extends Omit<FullTransformOptions, 'contentType'> {
  contentType?: Exclude<Required<FullTransformOptions>['contentType'], 'image/gif'>;
}

export type TransformOptions = TransformOptionsNotForGIF | TransformOptionsForGIF;
