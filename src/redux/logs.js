import { hydrate } from './middleware';

const localStorageData = hydrate();

export const Key = 'logs'

export const InitialState = localStorageData && localStorageData[Key]
  ? { logs: localStorageData[Key].logs }
  : { logs: [] };

export const Reducer = ({ logs } = InitialState, { type, payload }) => {
  return { 
    logs: [...logs, `${type}: ${JSON.stringify(payload)}`],
  };
};

export const Selectors = {
  all: ({ [Key]: { logs } }) => logs,
};