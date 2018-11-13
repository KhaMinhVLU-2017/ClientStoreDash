import React, { Component } from 'react'
import {
  Col, Modal, ModalHeader, ModalBody, ModalFooter, Button,
  Form, FormGroup, Label, Input, Alert
} from 'reactstrap'
import { api } from '../config'
import axios from 'axios'
import { connect } from 'react-redux'

class AmpmModal extends Component {
  constructor (props) {
    super(props)
    this.state = { modal: false, cost: '', interest: '', begintime: '', name: '', duration: '', notifi: false, message: '' }
    this.toggle = this.toggle.bind(this)
    this.submitCrePay = this.submitCrePay.bind(this)
    this.onChangeKey = this.onChangeKey.bind(this)
  }
  toggle () {
    this.setState({ modal: !this.state.modal, notifi: false })
  }
  submitCrePay () {
    // Front-end Submit server
    let self = this
    let name = this.state.name
    let cost = this.state.cost
    let interest = this.state.interest
    let begintime = this.state.begintime
    let duration = this.state.duration
    if (duration !== '' && begintime !== '' && interest !== '' && cost !== '' && name !== '') {
      axios.post(api.local + '/api/createPayment', { name, cost, interest, begintime, duration })
        .then(response => {
          if (response.status === 200) {
            self.props.reload(!self.props.reloadProp)
            self.setState({ modal: false, cost: '', interest: '', begintime: '', name: '', duration: '', notifi: false })
          } else {
            let messa = 'Error Please repeat submit'
            self.setState({ notifi: true, message: messa })
          }
        })
        .catch(err => {
          if (err) {
            let messa = 'Error Please repeat submit'
            self.setState({ notifi: true, message: messa })
          }
        })
    } else {
      let messa = 'Please input all field'
      this.setState({ notifi: true, message: messa })
    }
    // Server exist API but not handler inside
  }
  onChangeKey (e) {
    let name = e.target.id
    let valueS = e.target.value
    if (/^\d+$/.test(valueS)) {
      this.setState({ [name]: valueS })
    }
    if (name === 'begintime' || name === 'name') {
      this.setState({ [name]: valueS })
    }
  }
  render () {
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
                <Label for='cost' sm={2}>Cost (VND)</Label>
                <Col sm={10}>
                  <Input value={this.state.cost} onChange={this.onChangeKey} type='text' name='cost' id='cost' placeholder='VND' />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='interest' sm={2}>Interest (%/year)</Label>
                <Col sm={10}>
                  <Input value={this.state.interest} onChange={this.onChangeKey} type='text' name='interest' id='interest' placeholder='%' />
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
                  <Input value={this.state.duration} onChange={this.onChangeKey} type='text' name='duration' id='duration' placeholder='Quantity month' />
                </Col>
              </FormGroup>
            </Form>
            {this.state.notifi && <Alert color='danger'>{this.state.message}</Alert>}
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

const mapDispatchtoProps = dispatch => ({
  reload: dispatch.payment.reload
})
const mapStatetoProp = state => {
  return {
    reloadProp: state.payment
  }
}
export default connect(mapStatetoProp, mapDispatchtoProps)(AmpmModal)
