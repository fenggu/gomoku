import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './index.less'
import * as goMokuAction from '../../actions/gomoku'

/* Redux bind */
function mapStateToProps (state) {
  return {
    index: state.get('index'),
    win: state.get('win'),
    size: state.get('gomoku').size
  };
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, goMokuAction), dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class BtnControls extends Component {
  cancelBack = () => {
    let index = this.props.index
    let size = this.props.size
    if (index < size - 1) {
      this.props.actions.changeGoMokuIndex(this.props.index + 1)
    }
    if (this.props.win.size === size && index + 1 === size - 1 ) {
      this.props.actions.changeWin(({
        role: (this.props.index) % 2 === 0 ? 2 : 1,
        size: this.props.size
      }))
    }
  }

  backPrevious = () => {
    let index = this.props.index
    if (index > 0) {
      this.props.actions.changeGoMokuIndex(this.props.index - 1)
      if (this.props.win.role !== 0) {
        this.props.actions.changeWin({
          role: 0,
          size: this.props.size
        })
      }
    }
  }

  rePlay = () => {
    this.props.actions.changeGoMokuIndex(0)
    this.props.actions.changeWin({
      role: 0,
      size: null
    })
    this.props.actions.gomokuRestore()
  }
  viewHistory = () => {
    if (this.props.win.role !== 0) {
      this.props.actions.changeGoMokuIndex(0)
      let i = 0
      const delay = () => {
        setTimeout(()=>{
          i++
          if (i < this.props.size) {
            this.props.actions.changeGoMokuIndex(i)
            delay()
          }
        }, 1000)
      }
      delay()
    }
  }
  render() {
    return (
      <div className="btn-controls">
        <button
          disabled={this.props.index === 0 ? 'disabled' : ''}
          onClick={this.backPrevious}>
            悔棋
        </button>
        <button
          disabled={this.props.index < this.props.size - 1 ? '' : 'disabled'}
          onClick={this.cancelBack}>
            撤销悔棋
        </button>
        <button
          disabled={this.props.win === 0 ? 'disabled' : ''}
          onClick={this.viewHistory}>
            对局回放
        </button>
        <button style={{ 'marginRight': 0 }} onClick={this.rePlay}>重新开始</button>
      </div>
    );
  }
}