import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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
import ForgetPw from './component/us_forgetpw'
// Import Component of User
import UsHomeRoute from './component/us_home_route'
// import UserHomePage from './component/us_homepage'
import UserLogin from './component/us_login'
import ErrorNotFound from './component/error'
// import ChangePw from './component/us_changepw'
//Async await
import 'babel-polyfill'

const store = init({
  models
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/login' render={props => <UserLogin {...props} />} />
          <Route path='/home' render={props => <UsHomeRoute {...props} />} />
          {/* <Route path='/home/changepw' render={props => <ChangePw {...props} />} /> */}
          <Route path='/forgetpassword' render={props => <ForgetPw {...props} />} />
          <Route path='/admin' component={AmDrawer} />
          <Route component={ErrorNotFound} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
)

module.hot.accept()
