import React, { Component } from 'react'
import { calDecreMoney, dataChart, calMoneyDayMonth, dataChartV2 } from '../calculator'
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'
import { Col, Badge } from 'reactstrap'
import axios from 'axios'
import { api } from '../config'

class AmDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = { payments: null, bills: null }
    this.getListPayment = this.getListPayment.bind(this)
    this.getListBills = this.getListBills.bind(this)
  }
  componentWillMount() {
    this.getListPayment()
  }
  componentDidMount() {
    this.getListBills()
  }
  getListPayment() {
    let id_store = '5bd2de667496b64ea0b41685'
    let self = this
    axios.get(api.local + '/api/payments' + id_store)
      .then(response => {
        if (response.status === 200) {
          self.setState({ payments: response.data })
        }
        // console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }
  getListBills() {
    let id_store = '5bd2de667496b64ea0b41685'
    let self = this
    axios.get(api.local + '/api/invoicecr' + id_store)
      .then(response => {
        if (response.status === 200) {
          self.setState({ bills: response.InVoiceMonth })
        }
        // console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    if (this.state.bills === null || this.state.payments === null) {
      return <h1><Badge color='warning' pill>Loading</Badge></h1>
    } else {
      let { bills } = this.state
      let { payments } = this.state
      let date = new Date()
      let yearCr = date.getFullYear()
      let monthCr = date.getMonth() + 1
      let day = date.getDate()
      let timecurrent = yearCr + '-' + monthCr + '-' + day
      let formatTimeCurrent = new Date(timecurrent)
      /**
       * Get payment and calculator
       */
      let sumPayments = 0
      let countDayPayment = 0
      for (let item of payments) {
        let pay = calMoneyDayMonth(item.beginTime, item.duration, item.interestRate, item.cost, formatTimeCurrent)
        if (typeof pay !== 'undefined') {
          sumPayments = sumPayments + pay.moneyMonthly
          countDayPayment = pay.countDayOfMonthCr
          console.log(pay)
        }
      }
      let chartPayments = dataChartV2(sumPayments, countDayPayment)
      let data = [
        { 'name': 'Payments', 'data': chartPayments },
        // { 'name': 'Profits', 'data': jsonChart2 }
      ]
      // // All payment
      // let dateMeo = new Date('2018-11-16')
      // let meo = calMoneyDayMonth('2018-9-15', 3, 5, 1000000, dateMeo)
      // let tango = calDecreMoney('2018-9-15', 2, 5, 1000000)
      // // Map design date comportable with chart
      // let json = {}
      // for (let i = 1; i <= meo.countDayOfMonthCr; i++) {
      //   json['2018-9' + '-' + i] = parseInt(meo.moneyMonthly)
      // }
      // let cumeo = dataChartV2(15641, 30)
      // let jsonChart2 = dataChart(tango.datetime, tango.paytotal)
  

      // console.log(timecurrent)
      // console.log(dataChartV2(meo.moneyDaily, meo.countDayOfMonthCr))
      // console.log(meo)
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
}

export default AmDashboard
