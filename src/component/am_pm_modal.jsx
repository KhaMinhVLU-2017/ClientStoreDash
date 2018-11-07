import React, { Component } from 'react'
import {
  Col, Modal, ModalHeader, ModalBody, ModalFooter, Button,
  Form, FormGroup, Label, Input, Alert
} from 'reactstrap'
import { api } from '../config'
import axios from 'axios'

class AmpmModal extends Component {
  constructor(props) {
    super(props)
    this.state = { modal: false, money: '', interest: '', begintime: '', name: '', duration: '', notifi: false }
    this.toggle = this.toggle.bind(this)
    this.submitCrePay = this.submitCrePay.bind(this)
    this.onChangeKey = this.onChangeKey.bind(this)
  }
  toggle() {
    this.setState({ modal: !this.state.modal })
  }
  submitCrePay() {
    // Front-end Submit server
    let self = this
    let name = this.state.name
    let money = this.state.money
    let interest = this.state.interest
    let begintime = this.state.begintime
    let duration = this.state.duration
    if (duration !== '' && begintime !== '' && interest !== '' && money !== '' && name !== '') {
      axios.post(api.local + '/api/createPayment', { name, money, interest, begintime, duration })
        .then(response => {
          if (response.status === 200) {
            self.setState({ modal: false, money: '', interest: '', begintime: '', name: '', duration: '', notifi: false })
          }
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      this.setState({ notifi: true })
    }
    // Server exist API but not handler inside
  }
  onChangeKey(e) {
    let name = e.target.id
    let valueS = e.target.value
    if (/^\d+$/.test(valueS)) {
      this.setState({ [name]: valueS })
    }
    if (name === 'begintime' || name === 'name') {
      this.setState({ [name]: valueS })
    }
    console.log(valueS)
  }
  render() {
    console.log(api)
    return (
      <Col xs='12' md='12' sm='12'>
        <Button outline color='primary' onClick={this.toggle} >Add payment</Button>
        <Modal size='lg' autoFocus={this.state.modal} centered={this.state.modal} isOpen={this.state.modal} >
          <ModalHeader >Payment</ModalHeader>
          <ModalBody>
            <Form >
              <FormGroup row>
                <Label for='name' sm={2}>Name</Label>
                <Col sm={10}>
                  <Input value={this.state.name} onChange={this.onChangeKey} type='text' name='name' id='name' placeholder='Name for Cost' />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='money' sm={2}>Money (VND)</Label>
                <Col sm={10}>
                  <Input value={this.state.money} onChange={this.onChangeKey} type='number' name='money' id='money' placeholder='VND' />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='interest' sm={2}>Interest (%/year)</Label>
                <Col sm={10}>
                  <Input value={this.state.interest} onChange={this.onChangeKey} type='number' name='interest' id='interest' placeholder='%' />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='begintime' sm={2}>Begin Time </Label>
                <Col sm={10}>
                  <Input value={this.state.begintime} onChange={this.onChangeKey} type='date' name='begintime' id='begintime' placeholder='YYYY/MM/DD' />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='duration' sm={2}>Duration (month)</Label>
                <Col sm={10}>
                  <Input value={this.state.duration} onChange={this.onChangeKey} type='number' name='duration' id='duration' placeholder='Quantity month' />
                </Col>
              </FormGroup>
            </Form>
            {this.state.notifi && <Alert color='danger'> Please input all field</Alert>}
          </ModalBody>
          <ModalFooter>
            <Button outline color='primary' onClick={this.submitCrePay}>Save</Button>{' '}
            <Button outline color='secondary' onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Col>
    )
  }
}
export default AmpmModal
