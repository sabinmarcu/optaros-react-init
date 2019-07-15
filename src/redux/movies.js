import data from '../data/movies.json';
import { hydrate } from './middleware';

const localStorageData = hydrate();

export const Key = 'movies';

export const InitialState = 
  localStorageData && localStorageData[Key]
  ? { 
    ids: localStorageData[Key].ids,
    movies: localStorageData[Key].movies,
  } 
  : {
    ids: data.movies.map(({ id }) => id),
    movies: data.movies.reduce(
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

console.log(Types);

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
  { ids, movies } = InitialState,
  { type, payload },
) => {
  if (payload && typeof(payload) === 'object') {
    payload.id = payload.id || ids.sort()[ids.length - 1] + 1;
  }
  switch(type) {
    case Types.ADD: 
      return {
        ids: [...ids, payload.id],
        movies: {
          ...movies,
          [payload.id]: payload,
        },
      };
    case Types.REMOVE:
      const newIds = [...ids].filter((id) => id !== payload);
      return {
        ids: newIds,
        movies: newIds.reduce(
          (prev, movieId) => ({
            ...prev,
            [movieId]: movies[movieId],
          }),
          {},
        ),
      }
    case Types.UPDATE:
      return {
        ids,
        movies: { 
          ...movies,
          [payload.id]: {
            ...movies[payload.id], 
            ...payload.data
          }
        }
      };
    default: 
      return { ids, movies };
  }
}

export const Selectors = {
  ids: ({ [Key]: { ids } }) => ids,
  movie: id => ({ [Key] : { movies } }) => movies[id],
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