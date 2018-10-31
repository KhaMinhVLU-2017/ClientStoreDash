import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
/**
 * Component Import
 */
import HomePage from './component/homepage'
import AmDrawer from './component/am_drawer'

ReactDOM.render(
  <BrowserRouter>
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route path='/admin' component={AmDrawer} />
    </Fragment>
  </BrowserRouter>
  , document.getElementById('root')
)

module.hot.accept()
