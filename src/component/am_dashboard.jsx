import React, { Component } from 'react'
import { calDecreMoney, dataChart, calMoneyDayMonth } from '../calculator'
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'
import { Col } from 'reactstrap'

class AmDashboard extends Component {
  render() {
    let dateMeo = new Date('2018-10-3')
    let meo = calMoneyDayMonth('1-9-2018', 35, 5, 1000000, dateMeo)
    let tango = calDecreMoney('1-9-2018', 35, 5, 1000000)
    // Map design date comportable with chart
    // let jsonChart1 = dataChart(meo.datetime, meo.paytotal)
    // let jsonChart2 = dataChart(tango.datetime, tango.paytotal)
    // let data = [
    //   { 'name': 'Chart1', 'data': jsonChart1 },
    //   { 'name': 'Chart2', 'data': jsonChart2 }
    // ]

    console.log(tango)
    console.log(meo)
    return (
      <div>
        <Col md={{ size: 8 }} xs={12} sm={{ size: 8 }}>
          {/* <LineChart data={data} /> */}
        </Col>
      </div>
    )
  }
}

export default AmDashboard
