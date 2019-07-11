import { createStore } from 'redux';
import { InitialState, Reducer } from './movies';

export default createStore(
  Reducer,
  InitialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__()
); 