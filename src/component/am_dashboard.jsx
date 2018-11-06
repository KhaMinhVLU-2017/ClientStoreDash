import React, { Component } from 'react'
import { calDecreMoney, dataChart, calMoneyDayMonth, dataChartV2 } from '../calculator'
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'
import { Col } from 'reactstrap'

class AmDashboard extends Component {
  render () {
    // All payment
    let dateMeo = new Date('2018-11-16')
    let meo = calMoneyDayMonth('2018-9-15', 2, 5, 1000000, dateMeo)
    let tango = calDecreMoney('2018-9-15', 2, 5, 1000000)
    // Map design date comportable with chart
    let json = {}
    for (let i = 1; i <= meo.countDayOfMonthCr; i++) {
      json['2018-9' + '-' + i] = parseInt(meo.moneyMonthly)
    }
    let cumeo = dataChartV2(15641, 30)
    let jsonChart2 = dataChart(tango.datetime, tango.paytotal)
    let data = [
      { 'name': 'Payment', 'data': json },
      { 'name': 'Profits', 'data': jsonChart2 }
    ]

    console.log(tango)
    console.log(meo)
    console.log(cumeo)
    /*
    * cost profits
    * get total invoice
    */
    return (
      <div style={{ background: 'white', padding: 20, boxShadow: '1px 1px 11px 6px #888888' }}>
        <Col md={{ size: 8 }} xs={12} sm={{ size: 8 }}>
          <LineChart data={data} />
        </Col>
      </div>
    )
  }
}

export default AmDashboard
