import React, { Component } from 'react';
import './index.less'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './index.less'
import * as goMokuAction from '../../actions/gomoku'
/* Redux bind */
function mapStateToProps (state) {
  let index = state.get('index')
  let gomoku = state.get('gomoku').get(index)
  return {
    index: index,
    gomoku: gomoku,
    win: state.get('win')
  };
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, goMokuAction), dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Piece extends Component {
  componentWillReceiveProps (nextProps) {
    let x = this.props.x
    let y = this.props.y
    if (nextProps.gomoku.get(x).get(y) == this.props.gomoku.get(x).get(y)) {
      return false
    }
  }

  goMoku = () => {
    // 黑: 2, 白: 1, 空: 0
    let x = this.props.x
    let y = this.props.y
    if ( this.props.gomoku.get(x).get(y) !== 0 || this.props.win.role !== 0) return
    let isCurrent = this.props.index % 2 === 0 ? 2 : 1
    let newGoMoku = this.props.gomoku.setIn([x, y], isCurrent)
    this.props.actions.pushGoMoku(newGoMoku, this.props.index + 1)
    this.props.actions.changeGoMokuIndex(this.props.index + 1)
    this.props.isWin(x, y, isCurrent)
  }

  render() {
    let clsName = 'gomoku-piece '
    let color = this.props.gomoku.get(this.props.x).get(this.props.y)
    if (color === 1) {
      clsName += 'gomoku-white'
    }
    if (color === 2) {
      clsName += 'gomoku-black'
    }
    return (
      <div onClick={this.goMoku} className={clsName} />
    );
  }
}