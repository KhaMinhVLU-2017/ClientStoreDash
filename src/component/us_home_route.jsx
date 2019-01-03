import React, { Component, Fragment } from 'react'

import ChangePw from './us_changepw'
import UserHomePage from './us_homepage'
import { Route } from 'react-router-dom'


class UsHomeRoute extends Component {
	render() {
		let { url } = this.props.match
		return (
			<Fragment>
				<Route path={url} exact render={props => <UserHomePage {...props} />} />
				<Route path={url + '/changepw'} render={props => <ChangePw {...props} />} />
			</Fragment>
		)
	}
}

export default UsHomeRoute
