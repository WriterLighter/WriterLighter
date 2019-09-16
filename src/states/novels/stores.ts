import { novlesDomain } from './domain';
import { open, saveInfo, savePart } from './events';
import { NovelState } from './types';

export const openedNovel = novlesDomain
  .store<NovelState | null>(null)
  .on(open.done, (_, { result }) => result)
  .on(
    savePart,
    (state, { partId, content }) =>
      state && {
        ...state,
        parts: state.parts.map((part, id) => (id === partId ? { ...part, content } : part)),
      },
  )
  .on(
    saveInfo.done,
    (state, { params: { changes } }) =>
      state && {
        ...state,
        ...changes,
      },
  );

export const unsavedPart = novlesDomain
  .store<Set<number>>(new Set())
  .on(savePart, (state, { partId }) => new Set([...Array.from(state), partId]))
  .on(
    savePart.done,
    (state, { params: { partId } }) => new Set(Array.from(state).filter(id => id !== partId)),
  );
