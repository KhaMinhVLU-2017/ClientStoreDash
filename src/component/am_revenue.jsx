import React, {Component} from 'react'
import AmrnTable from './am_rn_table'
import {Col} from 'reactstrap'

class AmRevenue extends Component {
  render () {
    return (
      <div style={{ background: 'white', padding: 20, boxShadow: '1px 1px 11px 6px #888888' }}>
        <Col md={12} xs={12} sm={12}>
          <AmrnTable />
        </Col>
      </div>
    )
  }
}

export default AmRevenue
