

import { combineReducers } from 'redux-immutable'
import router from './router'
import gomoku from './gomoku'
import index from './mokuIndex'
import win from './win'
const indexReducer = combineReducers({
  router,
  index,
  gomoku,
  win
})

export default indexReducer
