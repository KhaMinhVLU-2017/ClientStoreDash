import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import Avatarimg from '../upload/images/avatar.jpg'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap'

class AmAccount extends Component {
  render() {
    return (
      <Row style={{ background: 'white', padding: 20, boxShadow: '1px 1px 11px 6px #888888' }}>
        <Card md={5} sm={5} xs={5} style={{ background: '#5a96da' }}>
          <CardImg style={{ borderRadius: '50%' }} top width='100%' src={Avatarimg} alt='avatar' />
          <CardBody>
            <CardTitle>Gia Cac Luong</CardTitle>
            <CardSubtitle>UserName: JudasFate</CardSubtitle>
            <br />
            <CardText>
              Email: judasfate@gmail.com
            </CardText>
            <CardText>
              Group: Nhi store's Staff
            </CardText>
            <CardText>
              Phone: 0937740808
            </CardText>
            <CardText>
              Hometown: Cai Lay, Tien Giang
            </CardText>
          </CardBody>
        </Card>
        <Col md={7} xs={7} sm={7}>
          {/* something inside */}
        </Col>
      </Row>
    )
  }
}

export default AmAccount
