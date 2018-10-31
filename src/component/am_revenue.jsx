import React, {Component} from 'react'
import AmrnTable from './am_rn_table'
import {Col} from 'reactstrap'

class AmRevenue extends Component {
  render () {
    return (
      <div>
        <Col md={12} xs={12} sm={12}>
          <AmrnTable />
        </Col>
      </div>
    )
  }
}

export default AmRevenue
