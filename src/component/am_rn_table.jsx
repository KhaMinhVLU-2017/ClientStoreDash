import React from 'react'
import { Table, Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import axios from 'axios'
import { api } from '../config'

class AmrnTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { bills: null, modal: false, bill: null }
    this.getListBills = this.getListBills.bind(this)
    this.toggle = this.toggle.bind(this)
  }
  componentDidMount() {
    this.getListBills()
  }
  toggle(e) {
    let index = e.target.id
    let bill = this.state.bills[index]
    this.setState({ modal: !this.state.modal, bill })
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
    let countQuantity = 0
    let costTotal = 0
    if (this.state.bill !== null) {
      for(let meo of this.state.bill.billDetails) {
        let costRow = meo.quantity * meo.price
        countQuantity = countQuantity + meo.quantity
        costTotal =costTotal + costRow
      }
    }
    return (
      <div>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Bill</th>
              <th>Date</th>
              <th>Author</th>
              <th>Total</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {this.state.bills.map((item, index) =>
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td><Badge color='info'>{item.code}</Badge></td>
                <td>{item.title}</td>
                <td>{item.date}</td>
                <td>{item.user.username}</td>
                <td>{arrayTotal[index]}</td>
                <td><Button id={index} color='primary' onClick={this.toggle}>Detail</Button></td>
              </tr>
            )}
          </tbody>
        </Table>
        {this.state.bill && <Modal centered={true} isOpen={this.state.modal}>
          <ModalHeader><h3 style={{fontFamily: 'initial', fontWeight: 'bold'}}>{this.state.bill.title}</h3></ModalHeader>
          <ModalBody>
            <Table borderless hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price(VND)</th>
                  <th>Total(VND)</th>
                </tr>
              </thead>
              <tbody>
                {this.state.bill.billDetails.map((item, index) =>
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
                )}
                <tr>
                  <th key={'MeoNguyen'} scope='row' colSpan={2}>Cost Total</th>
                  <th>{countQuantity}</th>
                  <td></td>
                  <th>{costTotal}</th>
                </tr>
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter><Button color='success' onClick={() => this.setState({modal: false})}>Done</Button></ModalFooter>
        </Modal>}
      </div>
    )
  }
}


export default AmrnTable