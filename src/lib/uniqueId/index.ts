export type UniqueId = string;

let lastId = 0;

export const generate = (): UniqueId => `${++lastId}`;
