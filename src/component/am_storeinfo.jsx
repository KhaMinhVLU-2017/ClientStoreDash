import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import LogoStore from '../upload/images/LogoNhiPNG.png'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, FormFeedback, FormText
} from 'reactstrap'
import AmsiTable from './am_si_table'

class AmStoreinfo extends Component {
  constructor(props) {
    super(props)
    this.state = { modal: false }
    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    this.setState({ modal: !this.state.modal })
  }
  render() {
    return (
      <Row style={{ background: 'white', padding: 20, boxShadow: '1px 1px 11px 6px #888888' }}>
        <Card md={4} sm={4} xs={4} style={{ background: '#5a96da' }}>
          <CardImg style={{ borderRadius: '50%', width: 500 }} src={LogoStore} alt='Logo Store' />
          <CardBody>
            <CardTitle>Nhi Cosmetics</CardTitle>
            <CardSubtitle>Cosmetics Store </CardSubtitle>
            <br />
            <CardText>
              Date: 3-2-2018
            </CardText>
            <CardText>
              Group: Nhi store's Staff
            </CardText>
          </CardBody>
        </Card>
        <Col md={{ size: 7 }} xs={{ size: 7 }} sm={{ size: 7 }}>
          <Row>
            <Col md={8}>
              <h1>Nhi Cosmetic Group</h1>
            </Col>
            <Col md={{ size: 2, offset: 2 }}>
              <Button onClick={this.toggle} color='primary'>Add Staff</Button>
            </Col>
          </Row>
          <br />
          <Modal size='lg' centered='true' isOpen={this.state.modal}>
            <ModalHeader>
              Create Account Staff
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup row>
                  <Label for='username' sm={3}>Username</Label>
                  <Col sm={8}>
                    <Input type='username' name='username' id='username' placeholder='Your User' />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='email' sm={3}>Email</Label>
                  <Col sm={8}>
                    <Input type='email' name='email' id='exampleEmail' placeholder='Your email' />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='password' sm={3}>Password</Label>
                  <Col sm={8}>
                    <Input type='password' name='password' id='password' placeholder='Password' />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='password' sm={3}>Password Confirm</Label>
                  <Col sm={8}>
                    <Input type='password' name='pwconfirm' id='pwconfirm' placeholder='Pass confirm' />
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Row>
                <Col md={5}>
                  <Button onClick={this.toggle} color='success'>Save</Button>
                </Col>
                <Col md={5}>
                  <Button onClick={this.toggle} color='danger'>Cancel</Button>
                </Col>
              </Row>
            </ModalFooter>
          </Modal>
          <AmsiTable />
        </Col>
      </Row>
    )
  }
}

export default AmStoreinfo
