import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { init } from '@rematch/core'
import * as models from './Model/models'

/**
 * Component Import
 */
import HomePage from './component/homepage'
import AmDrawer from './component/am_drawer'

const store = init({
  models
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Route exact path='/' component={HomePage} />
        <Route path='/admin' component={AmDrawer} />
      </Fragment>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
)

module.hot.accept()
