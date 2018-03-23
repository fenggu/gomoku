import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import DomGoMoku from '../components/DomGoMoku'
import CanvasGoMoku from '../components/CanvasGoMoku'
import goMokuMixin from '../components/mixins/goMokuMixin'

import BtnControls from '../components/BtnControls'
import './index.less'
const ReactRouterHistory = withRouter(({ history }) => {
  window.reactRouterHistory = history
  return <span />
})
@connect((state) => {
  return { win: state.get('win') }
})
export default class App extends Component {
  renderWin () {
    if (this.props.win.role !== 0) {
      return (<h1 style={{
        width: '100%',
        textAlign: 'center'
      }}>{this.props.win.role === 2 ? '黑' : '白'} 棋赢了</h1>)
    }
  }
  render() {
    return (
      <div>
        <Router>
          <div style={{width: '100%', textAlign: 'center'}}>
            {this.renderWin()}
            <Link to='/'><button className="btn">Dom</button></Link>
            <Link to='/canvas'><button className="btn">Canvas</button></Link>
            <ReactRouterHistory />
            <Route exact path="/" component={goMokuMixin(DomGoMoku)}/>
            <Route exact path="/canvas" component={goMokuMixin(CanvasGoMoku)}/>
            <BtnControls />
          </div>
        </Router>
      </div>
    );
  }
}