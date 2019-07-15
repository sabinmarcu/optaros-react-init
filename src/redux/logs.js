import { hydrate } from './middleware';

const localStorageData = hydrate();

export const Key = 'logs'

export const InitialState = localStorageData && localStorageData[Key]
  ? { list: localStorageData[Key].list }
  : { list: [] };

export const Reducer = (
  { list } = InitialState, 
  { type, payload }
) => {
  return { 
    list: [...list, `${type}: ${JSON.stringify(payload)}`],
  };
};

export const Selectors = {
  all: ({ [Key]: { list } }) => list,
};