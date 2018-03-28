import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as goMokuAction from '../../actions/gomoku'
export default (ComposedComponent) => {
  /* Redux bind */
  function mapStateToProps (state) {
    let index = state.get('index')
    return {
      index: index,
      gomoku: state.get('gomoku').get(index),
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
  class goMokuMixin extends Component {
    isWin = (x, y, isCurrent) => {
      this.props.actions.changeWin({
        role: 0,
        size: null
      })
      let pieces = this.props.gomoku
      let sum = {
        lrCount: {
          count: 1,
          order: {
            0: [-1, 0],
            1: [1, 0]
          }
        },
        udCount: {
          count: 1,
          order: {
            0: [0, -1],
            1: [0, 1]
          }
        },
        luCount: {
          count: 1,
          order: {
            0: [-1, 1],
            1: [1, -1]
          }
        },
        rdCount: {
          count: 1,
          order: {
            0: [1, 1],
            1: [-1, -1]
          }
        }
      }
      for (let co in sum) {
        for (let o in sum[co].order) {
          let constantX = sum[co].order[o][0]
          let constantY = sum[co].order[o][1]
          for (let i = 1; i < 5; i++) {
            if ((x + constantX * i) >= 15 || (x + constantX * i) < 0 || (y + constantY * i) >= 15 || (y + constantY * i) < 0) {
              break;
            }
            if (pieces.get(x + constantX * i).get(y + constantY * i) !== isCurrent) {
              break;
            }
            sum[co].count++
            this.isOverCount(sum[co].count)
          }
        }
      }
    }

    isOverCount = (count) => {
      let isCurrent = this.props.index % 2 === 0 ? 2 : 1
      if (count >= 5) {
        this.props.actions.changeWin({
          role: isCurrent,
          size: this.props.size
        })
      }
    }

    render() {
      return (<ComposedComponent isWin={this.isWin} />);
    }
  }


  return goMokuMixin
}
