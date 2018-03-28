import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './index.less'
import * as goMokuAction from '../../actions/gomoku'

/* Redux bind */
function mapStateToProps (state) {
  let index = state.get('index')
  return {
    index: index,
    gomoku: state.get('gomoku').get(index),
    win: state.get('win')
  };
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, goMokuAction), dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class CanvasGoMoku extends Component {
  componentDidMount () {
    this.renderBox(this.props.gomoku)
  }
  componentWillReceiveProps (nextProps) {
    this.renderBox(nextProps.gomoku)
  }
  goMoku = (e) => {
    let y = Math.floor((e.pageX - e.target.offsetLeft) / 30)
    let x = Math.floor((e.pageY - e.target.offsetTop) / 30)
    // 黑: 2, 白: 1, 空: 0
    if (this.props.gomoku.get(x).get(y) !== 0 || this.props.win.role !== 0) return
    let isCurrent = this.props.index % 2 === 0 ? 2 : 1
    let newGoMoku = this.props.gomoku.setIn([x, y], isCurrent)
    this.props.actions.pushGoMoku(newGoMoku, this.props.index + 1)
    this.props.actions.changeGoMokuIndex(this.props.index + 1)
    this.props.isWin(x, y, isCurrent)
  }

  renderBox = (gomoku) => {
    let canvas = this.refs.canvas
    if (canvas.getContext) {
      let ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, 450, 450)
      ctx.fillStyle = '#333';
      ctx.beginPath()
      for (let i = 0; i < 16; i++) {
        ctx.moveTo(15, 30 * i + 15)
        ctx.lineTo(435, 30 * i + 15)
        ctx.stroke()
      }
      for (let i = 0; i < 16; i++) {
        ctx.moveTo(30 * i + 15, 15)
        ctx.lineTo(30 * i + 15, 435)
        ctx.stroke()
      }
      for (let x = 0; x < gomoku.size; x ++) {
        for (let y = 0; y < gomoku.get(x).size; y++) {
          if (gomoku.get(x).get(y) !== 0) {
            ctx.beginPath()
            ctx.fillStyle = gomoku.get(x).get(y) === 1 ? '#fff' : '#000'
            ctx.arc(15 + y * 30, 15 + x * 30, 15, 0, Math.PI*2, true)
            ctx.fill()
            ctx.fillStyle = gomoku.get(x).get(y) === 1 ? '#000' : '#fff'
            ctx.arc(15 + y * 30, 15 + x * 30, 15, 0, Math.PI*2, true)
            ctx.stroke()
            ctx.closePath();
          }
        }
      }
    }
  }
  render() {
    return (
      <div className="canvas-div">
        <canvas onClick={this.goMoku} ref="canvas" width="450" height="450" className="gomoku-canvas">
        </canvas>
      </div>
    );
  }
}

