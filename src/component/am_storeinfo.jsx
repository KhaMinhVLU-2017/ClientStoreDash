import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import LogoStore from '../upload/images/LogoNhiPNG.png'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, Alert
} from 'reactstrap'
import AmsiTable from './am_si_table'
import axios from 'axios'
import {api} from '../config'
import {connect} from 'react-redux'

class AmStoreinfo extends Component {
  constructor(props) {
    super(props)
    this.state = { modal: false, username: '', password: '', pwconfirm: '', email: '', label: false, message: '' }
    this.toggle = this.toggle.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.submitServer = this.submitServer.bind(this)
  }
  toggle() {
    this.setState({ modal: !this.state.modal, username: '', password: '', pwconfirm: '', email: '', label: false, message: '' })
  }
  onChangeHandler(e) {
    let name = e.target.name
    let value = e.target.value
    this.setState({ [name]: value })
    let pwconfirm = this.state.pwconfirm
    let pass = this.state.password
    if (name === 'password' && value === pwconfirm || name === 'pwconfirm' && value === this.state.password) {
      this.setState({ label: false })
    } else if (this.state.password.length === 0 && this.state.pwconfirm.length === 0) {
      this.setState({ label: false })
    } else {
      this.setState({ label: true, message: 'Password with Password Confirm not match' })
    }
  }
  submitServer() {
    let self = this
    if (!this.state.label) {
      let {username, password, pwconfirm, email} = this.state
      let id_group = '5bd2de667496b64ea0b41684'
      let id_roles = '5bd2de667496b64ea0b41682'
      axios.post(api.local +'/api/AccountCr',{username, password, pwconfirm, email, id_group, id_roles})
      .then(response => {
        if (response.data.status===200) {
          self.props.handerReload(true)
          self.setState({modal: false})
        }
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    }
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
        <Col md={{ size: 6 }} xs={{ size: 6 }} sm={{ size: 6 }}>
          <Row>
            <Col md={8}>
              <h1>Nhi Cosmetic Group</h1>
            </Col>
            <Col md={{ size: 2, offset: 2 }}>
              <Button onClick={this.toggle} color='primary'>Add Staff</Button>
            </Col>
          </Row>
          <br />
          <Modal size='lg' centered={true} isOpen={this.state.modal}>
            <ModalHeader>
              Create Account Staff
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup row>
                  <Label for='username' sm={3}>Username</Label>
                  <Col sm={8}>
                    <Input type='username' value={this.state.username} onChange={this.onChangeHandler} name='username' id='username' placeholder='Your User' />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='email' sm={3}>Email</Label>
                  <Col sm={8}>
                    <Input type='email' value={this.state.email} onChange={this.onChangeHandler} name='email' id='email' placeholder='Your email' />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='password' sm={3}>Password</Label>
                  <Col sm={8}>
                    <Input type='password' value={this.state.password} onChange={this.onChangeHandler} name='password' id='password' placeholder='Password' />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='password' sm={3}>Password Confirm</Label>
                  <Col sm={8}>
                    <Input type='password' value={this.state.pwconfirm} onChange={this.onChangeHandler} name='pwconfirm' id='pwconfirm' placeholder='Pass confirm' />
                  </Col>
                </FormGroup>
                {this.state.label && <Alert color='danger'>{this.state.message}</Alert>}
              </Form>
            </ModalBody>
            <ModalFooter>
              <Row>
                <Col md={5}>
                  <Button onClick={this.submitServer} color='success'>Save</Button>
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

const mapdispatchtoProps = dispatch => ({
  handerReload: dispatch.addstaff.reload
})

export default connect(null, mapdispatchtoProps)(AmStoreinfo)
