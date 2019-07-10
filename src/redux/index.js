import { createStore, applyMiddleware, compose } from 'redux';
import { InitialState, Reducer } from './movies';
import { hybernate } from './persist';

export default createStore(
    Reducer, 
    InitialState,
    compose(
        applyMiddleware(hybernate),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
); 