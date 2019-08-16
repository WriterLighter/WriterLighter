import { ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import database, { NovelModel } from '../../database';
import { novlesDomain } from './domain';
import { openedNovel } from './stores';
import { NovelState } from './types';

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
