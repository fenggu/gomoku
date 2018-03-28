import Immutable from 'immutable';
import { PUSH_GOMOKU, GOMOKU_RESTORE } from '../constants/actionTypes'

const createData = () => {
  let boxs = []
  for (let x = 0; x < 15; x++) {
    boxs.push([])
    for (let y = 0; y < 15; y++) {
      boxs[x].push(0)
    }
  }
  return [boxs]
}

const initialState = Immutable.fromJS(createData())
export default (state = initialState, action) => {
  switch (action.type) {
    case PUSH_GOMOKU:
      return state.splice(action.index).push(action.moku)
    case GOMOKU_RESTORE:
      return initialState
    default:
      return state;
  }
}
