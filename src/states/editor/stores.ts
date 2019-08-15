import { EditorState } from 'draft-js';
import { openedNovel } from './../novels/stores';
import { editorDomain } from './domain';
import { change, load, open } from './events';

export type Editor =
  | { id: number }
  | {
    id: number;
    partId: number;
    editorState: EditorState;
  };

export const editors = editorDomain
  .store<Editor[]>([])
  .on(open, state => [...state, { id: state.length }])
  .on(load, (state, { editorId, partId }) => {
    const novel = openedNovel.getState();
    if (!novel) {
      throw new Error('novel is not opened.');
    }
    if (!novel.parts[partId]) {
      throw new Error(
        `partId: ${partId} is not found in novel: ${novel.title}`,
      );
    }
    const editorState = EditorState.createWithContent(novel.parts[partId]);
    return state.map((editor, i) =>
      i === editorId ? { ...editor, editorState } : editor,
    );
  })
  .on(change, (state, { editorState, editorId }) =>
    state.map(editor =>
      editor.id === editorId ? { ...editor, editorState } : editor,
    ),
  );
