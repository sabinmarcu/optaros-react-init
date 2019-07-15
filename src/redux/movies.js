import { hydrate } from './middleware';

const localStorageData = hydrate();

export const Key = 'movies';

const parseData = data => ({
  ids: data.map(({ id }) => id),
  list: data.reduce(
    (prev, movie) => ({
      ...prev,
      [movie.id]: movie,
    }),
    {},
  ),
});

export const InitialState = 
  localStorageData && localStorageData[Key]
  ? { 
    ids: localStorageData[Key].ids,
    list: localStorageData[Key].list,
  } 
  : {
    ids: [],
    list: {},
  };

const prefix = 'movies/';
export const Types = [
  'ADD',
  'UPDATE',
  'REMOVE',
  'INIT',
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
  INIT: data => ({
    type: Types.INIT,
    payload: data,
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
      fetch(`http://localhost:8000/movies/${payload}`, {
        method: "DELETE",
      });
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
      const updatedObject = {
        ...list[payload.id],
        ...payload.data
      };
      fetch(`http://localhost:8000/movies/${payload.id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedObject),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      return {
        ids,
        list: { 
          ...list,
          [payload.id]: updatedObject,
        }
      };
    case Types.INIT:
      return parseData(payload);
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