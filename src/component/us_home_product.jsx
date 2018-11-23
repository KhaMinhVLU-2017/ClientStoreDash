import React, { Component } from 'react'
import {
  Container, Row, Col, Table, Button
  , Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import axios from 'axios'
import { api } from '../config';
import UsHomeTable from './us_home_table'

const initialState = {
  modal: false, arrCells: []
}

class UsHomeProduct extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.toggle = this.toggle.bind(this)
    this.appendCell = this.appendCell.bind(this)
    this.onHanlerChange = this.onHanlerChange.bind(this)
    this.eventTab = this.eventTab.bind(this)
    this.submitSever = this.submitSever.bind(this)
  }
  toggle() {
    this.setState({ modal: !this.state.modal })
  }
  appendCell() {
    let arr = [...this.state.arrCells]
    let count = arr.length
    let data = ['id_pd_' + count, 'id_qt_' + count, 'id_pc_' + count, 'id_total_' + count]
    arr.push(data)
    this.setState({ arrCells: arr, [data[0]]: '', [data[1]]: 0, [data[2]]: 0, [data[3]]: 0 })
  }
  onHanlerChange(e) {
    let id = e.target.id
    let value = e.target.value
    let getNumberId = id.split('_') // get Count of Index
    let count = getNumberId[2]
    var regex = RegExp('id_pd_[0-9]')
    if (regex.test(id)) {
      this.setState({ [id]: value })
    }
    if (/^\d+$/.test(value)) {
      this.setState({ [id]: value })
    }
    if (/^\d+$/.test(value) && id === 'id_pc_' + count) {
      let total = this.state['id_qt_' + count] * value
      this.setState({ [id]: value, ['id_total_' + count]: total })
    }
    if (/^\d+$/.test(value) && id === 'id_qt_' + count) {
      let total = this.state['id_pc_' + count] * value
      this.setState({ [id]: value, ['id_total_' + count]: total })
    }
  }
  eventTab(e) {
    let id = e.target.id
    let countCr = id.split('_')
    let numberCr = countCr[2]
    let count = this.state.arrCells.length - 1
    if (e.keyCode === 9 && numberCr === count.toString()) {
      this.appendCell()
    }
  }
  submitSever() {
    let self = this
    let { arrCells } = this.state
    let json = []
    for (let item of arrCells) {
      let obj = Object.create(null)
      for (let sub of item) {
        let arr = sub.split('_')
        let name = arr[0] + arr[1]
        obj[name] = this.state[sub]
      }
      json.push(obj)
    }
    let data = json.filter(item => item.idpd !== '' && item.idqt!==0 && item.idpc!==0)
    let id_store= '5bd2de667496b64ea0b41685'
    let id_user = '5bd2de667496b64ea0b41682'
    axios.post(api.local + '/api/crBill',{data, id_user, id_store})
    .then(response => {
      if(response.status===200) {
        self.setState(initialState)
      }
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
  }
  render() {
    // console.table(this.state.arrCells)
    return (
      <Container>
        <Row>
          <h1 className='us-home-product-title'>Invoice list of the day</h1>
          <Col xs={12} sm={12} md={12}  >
            <Button style={{margin: '20px 0'}} onClick={this.toggle} color='primary'>Create Bill</Button>
            <UsHomeTable />
          </Col>
          <Modal isOpen={this.state.modal} size='lg' toggle={this.toggle}>
            <ModalHeader>
              Invoice
            </ModalHeader>
            <ModalBody>
              <Col md={12} xs={12} sm={12}>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price(VND)</th>
                      <th>Total(VND)</th>
                      <th><Button onClick={this.appendCell} color='danger'>+</Button></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.arrCells.map((item, index) =>
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td><input id={item[0]} onChange={this.onHanlerChange} value={this.state[item[0]]} style={{ width: '100%', border: 1 }} type='text' /></td>
                        <td><input id={item[1]} onChange={this.onHanlerChange} value={this.state[item[1]]} style={{ width: '100%', border: 1 }} type='text' /></td>
                        <td><input id={item[2]} onChange={this.onHanlerChange} value={this.state[item[2]]} style={{ width: '100%', border: 1 }} type='text' onKeyDown={this.eventTab} /></td>
                        <td>{this.state[item[3]]}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Col>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.submitSever}>Save</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </Row>
      </Container>
    )
  }
}

export default UsHomeProduct
