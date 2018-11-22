import React from 'react'
import { Table, Button} from 'reactstrap'
import axios from 'axios'
import { api } from '../config'
import { connect } from 'react-redux'

class AmpmTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { payments: [] , refesh: false}
    this.rmPayment = this.rmPayment.bind(this)
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
  rmPayment (e) {
    let _id = e.target.id
    let id_store = '5bd2de667496b64ea0b41685'
    let self = this
    axios.delete(api.local + '/api/payments', {data: {_id, id_store}})
    .then(response => {
      if(response.data.status === 200) {
        let list = self.state.payments.filter(item => item._id !== _id)
        self.setState({payments: list})
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  render () {
    this.props.reloadProp && this.getListPayment()
    // console.log(this.props.reloadProp)
    // console.table(this.state.payments)
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
            <th>Edit</th>
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
              <td><Button id={item._id} onClick={this.rmPayment} color='danger'>X</Button></td>
            </tr>)
          }) : (<tr>
            <th scope='row'>1</th>
            <td>null</td>
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
