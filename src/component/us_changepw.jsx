import React, { Component } from 'react'
import { Row, Col, Container, Alert, Form, Input, Label, FormGroup, Button } from 'reactstrap'
import bg from '../upload/images/bg-01.jpg'
import axios from 'axios'
import { api } from '../config'
import { Link } from 'react-router-dom'

const styleButton = {
  width: 100,
  background: 'linear-gradient(to left, #a445b2, #d41872, #fa4299)',
  color: 'white',
  fontWeight: 'bold'
}
const styleHeader = {
  fontWeight: 'bold',
  color: 'white',
  marginBottom: 30
}
class ChangePw extends Component {
  constructor(props) {
    super(props)
    this.state = { oldpass: '', newpass: '', cfnewpass: '', check: false, message: '', emptyEmail: false }
    this.onSubmitServer = this.onSubmitServer.bind(this)
    this.onHandlerChange = this.onHandlerChange.bind(this)
  }
  onSubmitServer(e) {
    e.preventDefault()
    let { email, phone } = this.state
    let self = this
    axios.post(api.local + '/staff/forgetpw', { phone, email })
      .then(response => {
        if (response.data.status === 200) {
          self.setState({ check: true, message: 'Please check your\'s email and' })
        } else {
          self.setState({ emptyEmail: true, message: response.data.message })
          setTimeout(() => {
            self.setState({ emptyEmail: false })
          }, 2000)
        }
      })
      .catch(err => {
        if (err) console.log(err)
      })

  }
  onHandlerChange(e) {
    let name = e.target.id
    let value = e.target.value
    this.setState({
      [name]: value
    })
  }
  render() {
    return (
      <Container fluid >
        <Row >
          <img src={bg} style={{ width: '100vw', position: 'relative', height: '100vh', filter: 'brightness(50%)' }} alt='img' />
          {this.state.check ?
            <Col style={{ position: 'absolute', maxWidth: 450, textAlign: 'center', left: 0, right: 0, top: 0, bottom: 0, margin: '25vh auto' }} md={12} sm={12} xs={12}>
              <h3 style={styleHeader}>{this.state.message}&ensp;<Link to='/'>Login</Link></h3>
            </Col>
            :
            this.state.emptyEmail ?
              <Col style={{ position: 'absolute', maxWidth: 450, textAlign: 'center', left: 0, right: 0, top: 0, bottom: 0, margin: '25vh auto' }} md={12} sm={12} xs={12}>
                <h3 style={styleHeader}><Alert color='danger'>{this.state.message}</Alert></h3>
              </Col>
              :
              <Col style={{ position: 'absolute', maxWidth: 450, textAlign: 'center', left: 0, right: 0, top: 0, bottom: 0, margin: '25vh auto' }} md={12} sm={12} xs={12}>
                <h3 style={styleHeader}>CHANGE PASSWORD</h3>
                <Form onSubmit={this.onSubmitServer} style={{ background: 'white', borderRadius: 19, padding: '30px 20px' }}>
                  <FormGroup row style={{ marginTop: 30, marginBottom: 30 }}>
                    <Label for='oldpass' sm={4}>Old Pass</Label>
                    <Col sm={8}>
                      <Input value={this.state.oldpass} onChange={this.onHandlerChange} type='text' name='oldpass' id='oldpass' placeholder='Old Password' required />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginTop: 30, marginBottom: 30 }}>
                    <Label for='newpass' sm={4}>New Pass</Label>
                    <Col sm={8}>
                      <Input value={this.state.newpass} onChange={this.onHandlerChange} type='text' name='newpass' id='newpass' placeholder='New Password' required />
                    </Col>
                  </FormGroup>
                  <FormGroup row style={{ marginTop: 30, marginBottom: 30 }}>
                    <Label for='cfnewpass' sm={4}>Confirm Pass</Label>
                    <Col sm={8}>
                      <Input value={this.state.cfnewpass} onChange={this.onHandlerChange} type='text' name='cfnewpass' id='cfnewpass' placeholder='Confirm Password' required />
                    </Col>
                  </FormGroup>
                  <hr />
                  <Button type='submit' id='btn_login' style={styleButton} >Submit</Button>
                </Form>
                <Link to='/login'><p style={{ float: 'right' }}>Are you login ?</p></Link>
              </Col>
          }
        </Row>
      </Container>
    )
  }
}

export default ChangePw