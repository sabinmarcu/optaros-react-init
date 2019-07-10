import diskData from '../data/movies.json';

const key = 'app:persist';
export const hydrate = () => {
    try {
        const data = localStorage.getItem(key);
        if (!data) {
            throw new Error("No data recovered");
        }
        return JSON.parse(data);
    } catch (e) {
        console.log(diskData);
        return {
            ids: diskData.movies.map(({ id }) => id),
            movies: diskData.movies.reduce((prev, { id, ...rest }) => ({
                ...prev,
                [id]: { id, ...rest },
            }), {}),
        };;
    }
}

export const hybernate = ({ getState }) => 
    next => action => {
        const returnValue = next(action);
        localStorage.setItem(key, JSON.stringify(getState()));
        return returnValue;
    }