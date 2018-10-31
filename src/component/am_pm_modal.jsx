import React, { Component } from 'react'
import { Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { prototype } from 'events';

class AmpmModal extends Component {
  constructor (props) {
    super(props)
    this.state = { modal: false }
    this.toggle = this.toggle.bind(this)
  }
  toggle () {
    this.setState({ modal: !this.state.modal })
  }
  render () {
    return (
      <Col xs='12' md='12' sm='12'>
        <Button outline color='primary' onClick={this.toggle} >Add payment</Button>
        <Modal autoFocus={this.state.modal} centered={this.state.modal} isOpen={this.state.modal} >
          <ModalHeader >Payment</ModalHeader>
          <ModalBody>
            <h1>JudasFate</h1>
          </ModalBody>
          <ModalFooter>
            <Button outline color='primary' onClick={this.toggle}>Save</Button>{' '}
            <Button outline color='secondary' onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Col>
    )
  }
}
export default AmpmModal
