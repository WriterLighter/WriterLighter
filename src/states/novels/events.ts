import database, { Novel } from '../../database';
import { novlesDomain } from './domain';

export const open = novlesDomain.effect<{ id: number }, Novel>('open', {
  handler: async ({ id }) => {
    const novel = await database.novels.get(id);
    if (!novel) throw new Error(`novelId: ${id} not found.`);
    localStorage.setItem('openedNovelId', id.toString(10));
    return novel;
  },
});
