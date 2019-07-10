import data from '../data/movies.json';

export const InitialState = {
    ids: data.movies.map(({ id }) => id),
    movies: data.movies.reduce((prev, { id, ...rest }) => ({
        ...prev,
        [id]: { id, ...rest },
    }), {}),
};

const prefix = "movies/";
export const Types = [
    "ADD",
    "REMOVE",
    "UPDATE",
].reduce((prev, it) => ({
    ...prev,
    [it]: `${prefix}${it}`,
}), {});

export const Actions = {
    [Types.ADD]: data => ({
        type: Types.ADD,
        payload: data,
    }),
    [Types.REMOVE]: id => ({
        type: Types.REMOVE,
        payload: id,
    }),
    [Types.UPDATE]: (id, data) => ({
        type: Types.UPDATE,
        payload: { id, data },
    }),
}

export const Selectors = {
    ids: ({ ids }) => ids,
    movie: id => ({ movies }) => movies[id],
};

export const Reducer = (
    { ids, movies }, 
    { type, payload }
) => {
    switch (type) {
        case Types.ADD: 
            return {
                movies: { ...movies, [payload.id]: payload },
                ids: [ ...ids, payload.id ],
            };
        case Types.REMOVE:
            const newIds = [...ids].filter(it => it !== payload.id)
            return {
                ids: newIds,
                movies: newIds.map(id => movies[id]),
            };
        case Types.UPDATE: 
            return {
                ids,
                movies: ids.reduce((prev, id) => ({
                    ...prev,
                    [id]: id === payload.id
                        ? { ...movies[id], ...payload.data }
                        : movies[id]
                }), {})
            };
        default: 
            return { ids, movies };
    }
}