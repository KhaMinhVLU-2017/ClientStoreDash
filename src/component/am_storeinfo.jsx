import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import LogoStore from '../upload/images/LogoNhiPNG.png'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap'
import AmsiTable from './am_si_table'

class AmStoreinfo extends Component {
  render () {
    return (
      <Row style={{ background: 'white', padding: 20, boxShadow: '1px 1px 11px 6px #888888' }}>
        <Card md={4} sm={4} xs={4} style={{ background: '#5a96da' }}>
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
        <Col md={{size: 7}} xs={{size: 7}} sm={{size: 7}}>
          <h1>Nhi Cosmetic Group</h1>
          <br />
          <AmsiTable />
        </Col>
      </Row>
    )
  }
}

export default AmStoreinfo
