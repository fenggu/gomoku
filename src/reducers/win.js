import { CHANGE_WIN } from '../constants/actionTypes'
const initialState = {
  role: 0,
  size: null
}
export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_WIN:
      return action.win
    default:
      return state;
  }
}
