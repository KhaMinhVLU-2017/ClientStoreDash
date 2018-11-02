import React, { Component } from 'react'
import { calDecreMoney, dataChart } from '../calculator'
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'
import { Col } from 'reactstrap'

class AmDashboard extends Component {
  render () {
    let meo = calDecreMoney('3-1-2015', 35, 5, 1000000)
    let tango = calDecreMoney('3-1-2017', 12, 5, 2000000)
    // Map design date comportable with chart
    let jsonChart1 = dataChart(meo.datetime, meo.paytotal)
    let jsonChart2 = dataChart(tango.datetime, tango.paytotal)
    let data = [
      { 'name': 'Chart1', 'data': jsonChart1 },
      { 'name': 'Chart2', 'data': jsonChart2 }
    ]
    console.log(jsonChart1)
    return (
      <div>
        <Col md={12} xs={12} sm={12}>
          <LineChart data={data} />
        </Col>
      </div>
    )
  }
}

export default AmDashboard
