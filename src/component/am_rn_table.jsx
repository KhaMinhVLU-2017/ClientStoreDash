import React from 'react'
import { Table, Badge } from 'reactstrap'
import axios from 'axios'
import { api } from '../config'

class AmrnTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { bills: null }
    this.getListBills = this.getListBills.bind(this)
  }
  componentDidMount() {
    this.getListBills()
  }
  getListBills() {
    let id_store = '5bd2de667496b64ea0b41685'
    let self = this
    axios.get(api.local + '/api/bills' + id_store)
      .then(response => {
        if (response.data.status === 200) {
          self.setState({ bills: response.data.bills })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    if (this.state.bills === null) {
      return <h1><Badge color='warning' pill>Loading</Badge></h1>
    }
    let arrayTotal = []
    for (let item of this.state.bills) {
      let sumbilldetail = 0
      for (let subitem of item.billDetails) {
        sumbilldetail = sumbilldetail + parseInt(subitem.price) * parseInt(subitem.quantity)
      }
      arrayTotal.push(sumbilldetail)
    }
    console.log(arrayTotal)
    return (
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Bill</th>
            <th>Date</th>
            <th>Author</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {this.state.bills.map((item, index) =>
            <tr key={index}>
              <th scope='row'>{index + 1}</th>
              <td><Badge color='info'>{item.code}</Badge></td>
              <td>{item.title}</td>
              <td>{item.date}</td>
              <td>{item.user}</td>
              <td>{arrayTotal[index]}</td>
            </tr>
          )
          }
        </tbody>
      </Table>
    )
  }
}


export default AmrnTable