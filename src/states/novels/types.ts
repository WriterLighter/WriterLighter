import { ContentState } from 'draft-js';
import { NovelModel, PartModel } from '../../database';

export type PartState = Omit<PartModel, 'content'> & { content: ContentState };

export type NovelState = Omit<NovelModel, 'parts'> & { parts: PartState[] };
