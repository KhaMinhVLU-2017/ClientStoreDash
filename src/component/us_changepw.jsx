import React, { Component, Fragment } from 'react'
import { Row, Col, Container, Alert, Form, Input, Label, FormGroup, Button } from 'reactstrap'
import bg from '../upload/images/bg-01.jpg'
import axios from 'axios'
import { api } from '../config'
import { Link, Redirect } from 'react-router-dom'
import { withCookies } from 'react-cookie'

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
    this.state = { oldpass: '', newpass: '', cfnewpass: '', check: false, message: '', label: false }
    this.onSubmitServer = this.onSubmitServer.bind(this)
    this.onHandlerChange = this.onHandlerChange.bind(this)
  }
  onSubmitServer(e) {
    e.preventDefault()
    let { cookies } = this.props
    let id_user = cookies.get('__id')
    let { newpass, oldpass, cfnewpass } = this.state
    let self = this
    // post with token ... todo
    axios.post(api.local + '/staff/changepw', { oldpass, cfnewpass, newpass, id_user })
      .then(response => {
        if (response.data.status === 200) {
          self.setState({ check: true, message: 'Change password complete auto redirect to login in ' })
        }else {
          let {message} = response.data
          self.setState({ label: true, message })
          setTimeout(() => self.setState({label: false}),2000)
        }
      })
      .catch(err => {
        if (err) console.log(err)
      })

  }
  onHandlerChange(e) {
    let name = e.target.name
    let value = e.target.value
    this.setState({ [name]: value })
    let pwconfirm = this.state.cfnewpass
    let pass = this.state.newpass
    if (name === 'newpass' && value !== pwconfirm || name === 'cfnewpass' && value !== pass) {
      this.setState({ label: true, message: 'Password with Password Confirm not match' })
    } else if (pass.length === 0 && pwconfirm.length === 0) {
      this.setState({ label: false })
    } else {
      this.setState({ label: false })
    }
    // console.table(this.state)
  }
  render() {
    let count = 30
    return (
      <Container fluid >
        <Row >
          <img src={bg} style={{ width: '100vw', position: 'relative', height: '100vh', filter: 'brightness(50%)' }} alt='img' />
          {this.state.check ?
            <Col style={{ position: 'absolute', maxWidth: 450, textAlign: 'center', left: 0, right: 0, top: 0, bottom: 0, margin: '25vh auto' }} md={12} sm={12} xs={12}>
              <h3 style={styleHeader}>{this.state.message}<Timmer pathDirect='/'/>&ensp;<Link to='/'>Login</Link></h3>
            </Col>
            :
            <Col style={{ position: 'absolute', maxWidth: 450, textAlign: 'center', left: 0, right: 0, top: 0, bottom: 0, margin: '25vh auto' }} md={12} sm={12} xs={12}>
              <h3 style={styleHeader}>CHANGE PASSWORD</h3>
              <Form onSubmit={this.onSubmitServer} style={{ background: 'white', borderRadius: 19, padding: '30px 20px' }}>
                <FormGroup row style={{ marginTop: 30, marginBottom: 30 }}>
                  <Label for='oldpass' sm={4}>Old Pass</Label>
                  <Col sm={8}>
                    <Input value={this.state.oldpass} onChange={this.onHandlerChange} type='password' name='oldpass' id='oldpass' placeholder='Old Password' required />
                  </Col>
                </FormGroup>
                <FormGroup row style={{ marginTop: 30, marginBottom: 30 }}>
                  <Label for='newpass' sm={4}>New Pass</Label>
                  <Col sm={8}>
                    <Input value={this.state.newpass} onChange={this.onHandlerChange} type='password' name='newpass' id='newpass' placeholder='New Password' required />
                  </Col>
                </FormGroup>
                <FormGroup row style={{ marginTop: 30, marginBottom: 30 }}>
                  <Label for='cfnewpass' sm={4}>Confirm Pass</Label>
                  <Col sm={8}>
                    <Input value={this.state.cfnewpass} onChange={this.onHandlerChange} type='password' name='cfnewpass' id='cfnewpass' placeholder='Confirm Password' required />
                  </Col>
                </FormGroup>
                <hr />
                {this.state.label ? <Alert color='danger'>{this.state.message}</Alert> : <Button type='submit' id='btn_login' style={styleButton} >Submit</Button>}
              </Form>
              <Link to='/login'><p style={{ float: 'right' }}>Are you login ?</p></Link>
            </Col>
          }
        </Row>
      </Container>
    )
  }
}

class Timmer extends Component {
  constructor(props){
    super(props)
    this.state= {count: 3, interVal: '',checkRedi: false}
    this.timmer = this.timmer.bind(this)
  }
  componentDidMount() {
    let self = this
    let interVal = setInterval(() => self.timmer(),1000)
    this.setState({interVal})
  }
  timmer() {
    // console.log(this.state.count)
    if(this.state.count!==0) {
      let countNews = this.state.count
      countNews--
      this.setState({count: countNews})
    }else {
      clearInterval(this.state.interVal)
      this.setState({checkRedi: true})
    }
  }
  render() {
    if(this.state.checkRedi) {
      return <Redirect to={this.props.pathDirect} />
    }
    return (
      <Fragment>
        {this.state.count}
      </Fragment>
    )
  }
}

export default withCookies(ChangePw)