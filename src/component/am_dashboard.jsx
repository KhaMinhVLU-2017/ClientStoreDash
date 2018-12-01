import React, { Component } from 'react'
import { calMoneyDayMonth, dataChartV2, dateConvertBills } from '../calculator'
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
          self.setState({ bills: response.data.InVoiceMonth })
        }
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
          sumPayments = sumPayments + pay.moneyDaily
          countDayPayment = pay.countDayOfMonthCr
        }
      }
      let chartPayments = dataChartV2(sumPayments, countDayPayment)
      /**
       * Get revenua
       */
      let chartRevenua = dateConvertBills(bills)
      // console.log(chartRevenua)
      // console.log(chartRevenua)
      /**
       * Draw Chart
       */
      let data = [
        { 'name': 'Payments', 'data': chartPayments },
        { 'name': 'Profits', 'data': chartRevenua }
      ]
      return (
        <div style={{ background: 'white', padding: 20, boxShadow: '1px 1px 11px 6px #888888' }}>
          <Col md={{ size: 11 }} xs={10} sm={{ size: 12 }}>
            <LineChart data={data} />
          </Col>
        </div>
      )
    }
  }
}

export default AmDashboard
