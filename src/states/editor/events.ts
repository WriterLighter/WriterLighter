import { EditorState } from 'draft-js';
import { editorDomain } from './domain';

export const change = editorDomain.event<{
  editorId: number;
  editorState: EditorState;
}>('change');

export const open = editorDomain.event('open');

export const load = editorDomain.event<{ partId: number; editorId: number }>(
  'load',
);

