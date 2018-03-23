import React from 'react'
import { render } from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import configureStore from '../store/configureStore'
import Root from '../containers/Root'
const history = createHistory()
const store = configureStore()
const root = document.getElementById('root')

window.defaultStore = store

render(
  <Root store={store} history={history} />,
  root
)

