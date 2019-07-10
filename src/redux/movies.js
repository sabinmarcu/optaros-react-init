import { hydrate } from './persist';

export const InitialState = hydrate();

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
}

export const Selectors = {
    ids: ({ ids }) => ids,
    movie: id => ({ movies }) => movies[id],
};

export const Reducer = (
    { ids, movies }, 
    { type, payload }
) => {
    if (payload && typeof(payload) === "object") {
        payload.id = payload.id || ids.sort()[ids.length - 1] + 1; 
    }
    switch (type) {
        case Types.ADD: 
            return {
                movies: { ...movies, [payload.id]: payload },
                ids: [ ...ids, payload.id ],
            };
        case Types.REMOVE:
            const newIds = [...ids].filter(it => it !== payload)
            return {
                ids: newIds,
                movies: newIds.reduce((prev, id) => ({
                    ...prev,
                    [id]: movies[id]
                }), {}),
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