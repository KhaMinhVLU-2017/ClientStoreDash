import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import LogoStore from '../upload/images/LogoNhiPNG.png'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap'
import AmsiTable from './am_si_table'

class AmStoreinfo extends Component {
  render() {
    return (
      <Row style={{ background: 'white', padding: 20, boxShadow: '1px 1px 11px 6px #888888' }}>
        <Card md={5} sm={5} xs={5} style={{ background: '#5a96da' }}>
          <CardImg style={{ borderRadius: '50%', width: 500 }} src={LogoStore} alt='Logo Store' />
          <CardBody>
            <CardTitle>Nhi Cosmetics</CardTitle>
            <CardSubtitle>Cosmetics Store </CardSubtitle>
            <br />
            <CardText>
              Date: 3-2-2018
            </CardText>
            <CardText>
              Group: Nhi store's Staff
            </CardText>
          </CardBody>
        </Card>
        <Col md={7} xs={7} sm={7}>
          <h1>Nhi Cosmetic Group</h1>
          <br />
          <AmsiTable />
        </Col>
      </Row>
    )
  }
}

export default AmStoreinfo
