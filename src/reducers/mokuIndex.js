import { CHANGE_GOMOKU_INDEX } from '../constants/actionTypes'
const initialState = 0
export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_GOMOKU_INDEX:
      return action.index
    default:
      return state;
  }
}
