import data from '../data/movies.json';
import { hydrate } from './middleware';

const localStorageData = hydrate();

export const Key = 'movies';

export const InitialState = 
  localStorageData && localStorageData[Key]
  ? { 
    ids: localStorageData[Key].ids,
    list: localStorageData[Key].list,
  } 
  : {
    ids: data.movies.map(({ id }) => id),
    list: data.movies.reduce(
      (prev, movie) => ({
        ...prev,
        [movie.id]: movie,
      }),
      {},
    ),
  };

const prefix = 'movies/';
export const Types = [
  'ADD',
  'UPDATE',
  'REMOVE',
].reduce(
  (prev, action) => ({
    ...prev,
    [action]: `${prefix}${action}`,
  }),
  {},
);

export const Actions = {
  ADD: data => ({
    type: Types.ADD,
    payload: data,
  }),
  REMOVE: id => ({
    type: Types.REMOVE,
    payload: id,
  }),
  UPDATE: (id, data) => ({
    type: Types.UPDATE,
    payload: { id, data },
  }),
};

export const Reducer = (
  { ids, list } = InitialState,
  { type, payload },
) => {
  if (payload && typeof(payload) === 'object') {
    payload.id = payload.id || ids.sort()[ids.length - 1] + 1;
  }
  switch(type) {
    case Types.ADD: 
      return {
        ids: [...ids, payload.id],
        list: {
          ...list,
          [payload.id]: payload,
        },
      };
    case Types.REMOVE:
      const newIds = [...ids].filter((id) => id !== payload);
      return {
        ids: newIds,
        list: newIds.reduce(
          (prev, movieId) => ({
            ...prev,
            [movieId]: list[movieId],
          }),
          {},
        ),
      }
    case Types.UPDATE:
      return {
        ids,
        list: { 
          ...list,
          [payload.id]: {
            ...list[payload.id], 
            ...payload.data
          }
        }
      };
    default: 
      return { ids, list };
  }
}

export const Selectors = {
  ids: ({ [Key]: { ids }}) => ids,
  movie: id => ({ [Key]: { list } }) => list[id],
};

// payload { id, data }

/*

{
  type: 'movies/ADD',
  payload: { title: "Something Cool!", poster: "//lorempixel.com/400/400" }
}

{
type: 'movies/UPDATE',
payload: { id: 5, data: { year: 1994, genre: "Awesome Stuff" } }
}

*/