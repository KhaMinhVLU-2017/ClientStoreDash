import React from 'react'
import { Table } from 'reactstrap'
import axios from 'axios'
import { api } from '../config'
import { connect } from 'react-redux'

class AmpmTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { payments: [] }

    this.getListPayment = this.getListPayment.bind(this)
  }
  componentDidMount() {
    this.getListPayment()
  }
  getListPayment() {
    let id_store = '5bd2de667496b64ea0b41685'
    let self = this
    axios.get(api.local + '/api/payments'+id_store)
      .then(response => {
        self.props.reloadProp && self.props.reload(false)
        self.setState({ payments: response.data })
      })
      .catch(err => {
        console.log(err)
      })
  }
  render () {
    this.props.reloadProp && this.getListPayment()
    // console.log(this.props.reloadProp)
    return (
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Cost (VND)</th>
            <th>Interest rate/year (%)</th>
            <th>Begin Time</th>
            <th>Duration (Month)</th>
          </tr>
        </thead>
        <tbody>
          {this.state.payments.length !== 0 ? this.state.payments.map((item, index) => {
            return (<tr key={index}>
              <th scope='row'>{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.cost}</td>
              <td>{item.interestRate}</td>
              <td>{item.beginTime}</td>
              <td>{item.duration}</td>
            </tr>)
          }) : (<tr>
            <th scope='row'>1</th>
            <td>null</td>
            <td>null</td>
            <td>null</td>
            <td>null</td>
            <td>null</td>
          </tr>)
          }
        </tbody>
      </Table>
    )
  }
}

const mapStatetoProp = state => {
  return {
    reloadProp: state.payment
  }
}

const mapDispatchtoProps = dispatch => ({
  reload: dispatch.payment.reload
})

export default connect(mapStatetoProp, mapDispatchtoProps)(AmpmTable)
