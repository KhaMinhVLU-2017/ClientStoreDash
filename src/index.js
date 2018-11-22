import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { init } from '@rematch/core'
import * as models from './Model/models'
import './assert/contents/myStyles.css'
/**
 * Component Import
 */
import HomePage from './component/homepage'
import AmDrawer from './component/am_drawer'
// import UserRegister from './component/us_register'
// Import Component of User
import UserHomePage from './component/us_homepage'
import UserLogin from './component/us_login'

const store = init({
  models
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Route exact path='/' component={HomePage} />
        <Route path='/login' render={props => <UserLogin {...props} />} />
        <Route path='/home' render= {props => <UserHomePage {...props} />} />
        {/* <Route path='/register' render={props => <UserRegister {...props} />} /> */}
        <Route path='/admin' component={AmDrawer} />
      </Fragment>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
)

module.hot.accept()
