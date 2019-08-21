import { ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import database, { NovelModel } from '../../database';
import { change } from './../editor/events';
import { editors } from './../editor/stores';
import { novlesDomain } from './domain';
import { openedNovel } from './stores';
import { NovelState, PartState } from './types';

const partModelToState = (partModel: PartModel): PartState => ({...partModel, content: convertFromRaw(partModel.content)})

const partStateToModel = (partState:PartState): PartModel => ({...partState, content: convertToRaw(partState.content)})

const novelModelToState = (novelModel: NovelModel): NovelState => ({...novelModel, parts: novelModel.parts.map(partModelToState)})
const novelStateToModel = (novelState: NovelState): NovelModel => ({...novelState, parts: novelState.parts.map(partStateToModel)})

let lastDelayedSave: {
  timeoutId: number;
  promiseReject: (reason?: any) => void;
} | null = null;

const waitForDelayedSave = () =>
  new Promise<void>((resolve, reject) => {
    if (lastDelayedSave != null) {
      clearTimeout(lastDelayedSave.timeoutId);
      lastDelayedSave.promiseReject(
        new Error('Canceled due to continuous saving.'),
      );
    }

    const timeoutId = setTimeout(() => {
      resolve();
      lastDelayedSave = null;
    },                           3000);

    lastDelayedSave = {
      timeoutId,
      promiseReject: reject,
    };
  });

export const open = novlesDomain.effect<{ id: number }, NovelState>('open', {
  handler: async ({ id }) => {
    const novel = await database.novels.get(id);
    if (!novel) throw new Error(`novelId: ${id} not found.`);
    localStorage.setItem('openedNovelId', id.toString(10));
    return {
      ...novel,
      parts: novel.parts.map(content => convertFromRaw(content)),
    };
  },
});

export const saveInfo = novlesDomain.effect<
  { changes: Partial<Omit<NovelModel, 'parts' | 'id'>> },
  void
>('save', {
  handler: async ({ changes }) => {
    const opened = openedNovel.getState();
    if (opened == null) throw new Error('novel is not opened');

    if (opened.id == null) {
      throw new Error('novel.id is not granted.');
    }

    await database.novels.update(opened.id, changes);
  },
});

export const savePart = novlesDomain.effect<
  { partId: number; content: ContentState },
  void
>('savePart', {
  handler: async ({ partId, content }) => {
    await waitForDelayedSave();

    const opened = openedNovel.getState();
    if (opened == null) throw new Error('novel is not opened');

    if (opened.id == null) throw new Error('novel.id is not granted.');

    await database.novels.update(opened.id, {
      parts: opened.parts.map((part, i) =>
        convertToRaw(i === partId ? content : part),
      ),
    });
  },
});

export const createNovel = novlesDomain.effect<
  Pick<NovelModel, 'title' | 'author'>,
  NovelState
>('createNovel', {
  handler: async ({ title, author }) => {
    const id = await database.novels.add({
      title,
      author,
      parts: [convertToRaw(ContentState.createFromText(''))],
    });

    const novel = await database.novels.get(id);

    if (novel == null) throw new Error(`novelId: ${id} is not found.`);

    return {
      ...novel,
      parts: novel.parts.map(content => convertFromRaw(content)),
    };
  },
});

change.watch(({ editorId, editorState }) => {
  const editor = editors.getState().find(({ id }) => id === editorId);

  if (editor != null && editor.partId != null) {
    savePart({
      partId: editor.partId,
      content: editorState.getCurrentContent(),
    });
  }
});
