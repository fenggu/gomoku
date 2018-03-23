import React, { Component } from 'react';
import './index.less'
import Piece from './Piece'
/* Redux bind */
export default class DomGoMoku extends Component {
  shouldComponentUpdate () {
    return false
  }
  renderPieces = () => {
    let boxs = []
    for (let i = 0; i < 15; i ++) {
      for (let j = 0; j < 15; j++) {
        boxs.push(<Piece key={`${i}-${j}`} x={i} y={j} isWin={this.props.isWin} class='gomoku-box'></Piece>)
      }
    }
    return (boxs)
  }
  renderBox = () => {
    let boxs = []
    for (let i = 0; i < 14; i ++) {
      for (let j = 0; j < 14; j++) {
        boxs.push(<div key={`b-${i}-${j}`} className='gomoku-box'></div>)
      }
    }
    return boxs
  }
  render() {
    return (
      <div className="gomoku">
        <div className="gomoku-pieces">
          { this.renderPieces() }
        </div>
        <div className="gomoku-back">
          { this.renderBox() }
        </div>
      </div>
    );
  }
}