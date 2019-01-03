import React, { Component, Fragment } from 'react'

import ChangePw from './us_changepw'
import UserHomePage from './us_homepage'
import { Route, Redirect } from 'react-router-dom'
import {withCookies} from 'react-cookie'

class UsHomeRoute extends Component {
  constructor(props) {
    super(props)
    this.state= {isAuthen: false}
  }
  componentWillMount() {
    const {cookies} = this.props
    let username = cookies.get('__username')
    if(typeof username !== 'undefined') {
      this.setState({isAuthen: true})
    }else {
      this.setState({isAuthen: false})
    }
  }

  render() {
    let { url } = this.props.match
    return (
      <Fragment>
        {/* <Route path={url} exact render={props => <UserHomePage {...props} />} /> */}
        <PrivateRoute path={url} exact component={UserHomePage} pathMeo='/login' isAuCheck={this.state.isAuthen} />
        <PrivateRoute path={url + '/changepw'} exact component={ChangePw} pathMeo='/login' isAuCheck={this.state.isAuthen} />
      </Fragment>
    )
  }
}


const PrivateRoute = ({ component: Component, ...rest}) => {
  let {isAuCheck,pathMeo} = rest
  return (
    <Route {...rest} render={props => isAuCheck ? ( <Component {...props} />) : 
    (<Redirect to={{ pathname: pathMeo, state: { from: props.location } }} /> )
      }
    />
  )
}

export default withCookies(UsHomeRoute)
