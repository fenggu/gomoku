import { PUSH_GOMOKU, CHANGE_GOMOKU_INDEX, CHANGE_IS_CURRENT, CHANGE_WIN, GOMOKU_RESTORE } from '../constants/actionTypes'

/*
 * 下棋
 */
export const pushGoMoku = (moku, index) => ({
  type: PUSH_GOMOKU,
  moku,
  index
})

/*
 * 重来
 */
export const gomokuRestore = () => ({
  type: GOMOKU_RESTORE
})

/*
 * 历史记录
 */
export const changeGoMokuIndex = (index) => ({
  type: CHANGE_GOMOKU_INDEX,
  index
})


/*
 * WIN
 */
export const changeWin = (win) => ({
  type: CHANGE_WIN,
  win
})
