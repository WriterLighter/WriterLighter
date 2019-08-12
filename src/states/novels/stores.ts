import { Novel } from '../../database';
import { novlesDomain } from './domain';
import { open } from './events';

export const openedNovel = novlesDomain
  .store<Novel | null>(null)
  .on(open.done, (_, { result }) => result);
