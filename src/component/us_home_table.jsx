import React, { Component, Fragment } from 'react'
import { Table, Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { api } from '../config'
import axios from 'axios'
import { dateConvertUI } from '../calculator'
import { connect } from 'react-redux'

const styleModal = {
  maxWidth: '500px',
  margin: '100px auto'
}

class UsHomeTable extends Component {
  constructor(props) {
    super(props)
    this.state = { bills: null, modal: false, bill: null }
    this.getListInvoice = this.getListInvoice.bind(this)
    this.toggle = this.toggle.bind(this)
  }
  componentDidMount() {
    this.getListInvoice()
  }
  getListInvoice() {
    let self = this
    let id_store = '5bd2de667496b64ea0b41685'
    let id_user = '5bd2de667496b64ea0b41682'
    axios.get(api.local + '/staff/invoice/' + id_user + '/' + id_store)
      .then(response => {
        if (response.data.status === 200) {
          self.props.reloadProp && self.props.reload(false)
          self.setState({ bills: response.data.InVoiceDaily })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  toggle(e) {
    let index = e.target.id
    let bill = this.state.bills[index]
    this.setState({ modal: !this.state.modal, bill })
  }
  render() {
    this.props.reloadProp && this.getListInvoice()
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
      for (let meo of this.state.bill.billDetails) {
        let costRow = meo.quantity * meo.price
        countQuantity = countQuantity + meo.quantity
        costTotal = costTotal + costRow
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
                <td><Badge color='danger'>{item.code}</Badge></td>
                <td>{item.title}</td>
                <td>{dateConvertUI(item.date)}</td>
                <td>{item.user.username}</td>
                <td>{arrayTotal[index]}</td>
                <td><Button id={index} color='warning' onClick={this.toggle}>Detail</Button></td>
              </tr>
            )}
          </tbody>
        </Table>
        {this.state.bill && <Modal style={styleModal} isOpen={this.state.modal} toggle={() => this.setState({ modal: false })}>
          <ModalHeader style={{ fontFamily: 'initial' }}><strong>{this.state.bill.title}</strong></ModalHeader>
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
          <ModalFooter><Button color='success' onClick={() => this.setState({ modal: false })}>Done</Button></ModalFooter>
        </Modal>}
      </div>
    )
  }
}

const mapStatetoProps = state => {
  return {
    reloadProp: state.addInvoiceStaff
  }
}
const mapDispatchtoProp = dispatch => ({
  reload: dispatch.addInvoiceStaff.reload
})
export default connect(mapStatetoProps, mapDispatchtoProp)(UsHomeTable)