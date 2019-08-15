import { ContentState } from 'draft-js';
import { NovelModel } from '../../database';

export type NovelState = Omit<NovelModel, 'parts'> & { parts: ContentState[] };
