import { 
  createStore, 
  applyMiddleware, 
  compose,
  combineReducers  
} from 'redux';
import { 
  Reducer as MovieReducer, 
  Key as MovieKey 
} from './movies';
import { 
  Reducer as LoggerReducer, 
  Key as LoggerKey 
} from './logs'; 
import { hybernate, logger } from './middleware';

export default createStore(
  combineReducers({
    [MovieKey]: MovieReducer,
    [LoggerKey]: LoggerReducer,
  }),
  compose(
    applyMiddleware(hybernate),
    applyMiddleware(logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ 
      && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
); 