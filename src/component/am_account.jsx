import React, { Component } from 'react'
import { Col, Row, Badge } from 'reactstrap'
import Avatarimg from '../upload/images/avatar.jpg'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap'
import { api } from '../config'
import axios from 'axios'

class AmAccount extends Component {
  constructor(props) {
    super(props)
    this.state = { account: null }
    this.getInformationUser = this.getInformationUser.bind(this)
  }
  componentDidMount() {
    this.getInformationUser()
  }
  getInformationUser() {
    let self = this
    let _id = '5bd2de667496b64ea0b41682'
    axios.get(api.local + '/api/user' + _id)
      .then(response => {
        if (response.data.status === 200) {
          self.setState({ account: response.data.account })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    let { account } = this.state
    if (account === null) {
      return <h1><Badge color="warning" pill>Loading</Badge></h1>
    }
    return (
      <Row style={{ background: 'white', padding: 20, boxShadow: '1px 1px 11px 6px #888888' }}>
        <Card md={5} sm={5} xs={5} style={{ background: '#5a96da' }}>
          <CardImg style={{ borderRadius: '50%' }} top width='100%' src={Avatarimg} alt='avatar' />
          {account && <CardBody>
            <CardTitle>{account.infoUser.fullname}</CardTitle>
            <CardSubtitle>UserName: {account.username}</CardSubtitle>
            <br />
            <CardText>
              Email: {account.email}
            </CardText>
            <CardText>
              Group: {account.groups[0].name}
            </CardText>
            <CardText>
              Phone: {account.infoUser.phonenumber}
            </CardText>
            <CardText>
              Hometown: {account.infoUser.hometown}
            </CardText>
          </CardBody>
          }
        </Card>
        <Col md={7} xs={7} sm={7}>
          {/* something inside */}
        </Col>
      </Row>
    )
  }
}

export default AmAccount
