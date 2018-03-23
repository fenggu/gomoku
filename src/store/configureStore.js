import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import indexReducer from '../reducers/index'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import Immutable from 'immutable';
const initialState = Immutable.Map();
const history = createHistory()
const middleware = routerMiddleware(history)

const stateTransformer = (state) => {
  if (Immutable.Iterable.isIterable(state)) return state.toJS();
  else return state;
};

const logger = createLogger({
  stateTransformer
})

const composeCreateStore = compose(
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk, middleware)
    : applyMiddleware(thunk, middleware, logger)
)(createStore)


export default function configureStore (initialState) {
  return composeCreateStore(indexReducer, initialState)
}
