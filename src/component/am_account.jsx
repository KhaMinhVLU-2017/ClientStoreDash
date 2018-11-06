import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import Avatar from '../upload/images/avatar.jpg'

class AmAccount extends Component {
  render() {
    return (
      <Row style={{ background: 'white', padding: 20, boxShadow: '1px 1px 11px 6px #888888' }}>
        <Col md={4} xs={4} sm={4}>
          <img src={Avatar} alt='avatar' />
        </Col>
        <Col md={8} xs={8} sm={8}>
          <h3>Name: Gia Cac Luong</h3>
          <h3>Username: JudasFate</h3>
          <h3>Email: judasfate@gmail.com</h3>
          <h3>Group: Nhi store's Staff</h3>
          <h3>Phone: 0937740808</h3>
          <h3>Hometown: Cai Lay, Tien Giang</h3>
        </Col>
      </Row>
    )
  }
}

export default AmAccount
