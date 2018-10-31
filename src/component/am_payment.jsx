import React, { Component } from 'react'
import { Col } from 'reactstrap'
import AmpmTable from './am_pm_table'
import AmpmModal from './am_pm_modal'

class AmPayment extends Component {
  render () {
    return (
      <div>
        <Col style={{margin: '50px 0px'}} md={12} xs={12} sm={12}>
          <AmpmModal />
        </Col>
        <Col md={12} xs={12} sm={12}>
          <AmpmTable />
        </Col>
      </div>
    )
  }
}

export default AmPayment
