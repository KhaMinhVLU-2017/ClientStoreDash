import React from 'react'
import { Table, Button, Badge, Alert } from 'reactstrap'
import axios from 'axios'
import { api } from '../config'
import {connect} from 'react-redux'

class AmsiTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { list: [] , message: '', error: false}
    this.getListAccount = this.getListAccount.bind(this)
  }
  componentDidMount() {
    this.getListAccount()
  }
  getListAccount() {
    let id_group = '5bd2de667496b64ea0b41684'
    let self = this
    axios.get(api.local + '/api/GroupUsers' + id_group)
      .then(response => {
        // console.log(response)
        if (response.data.status === 200) {
          self.props.handlerReload(false)
          self.setState({ list: response.data.listdata })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  RemoveAccount (e) {
    let _id = e.target.id
    let self = this
    axios.delete(api.local + '/api/user', {data: {_id}})
    .then(response => {
      if(response.data.status ===200) {
        self.getListAccount()
      } else {
        self.setState({error: true, message: 'Excuse me..!You should rework do it again'})
        setTimeout(()=> {
          self.setState({error: false})
        }, 3000)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  render() {
    this.props.reloadPage && this.getListAccount()
    if (this.state.error) return (<Alert color='danger'>{this.state.message}</Alert>)
    if (this.state.list.length === 0) {
      return (<Alert color='danger'>Found user in group</Alert>)
    } else {
      return (
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.list.map((item, index) => {
                return (<tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td><Badge color='primary'>{item.role.name}</Badge></td>
                  <td><Button color='danger' id={item._id} onClick={this.RemoveAccount.bind(this)}>X</Button></td>
                </tr>)
              })
            }
          </tbody>
        </Table>
      )
    }
  }
}

const mapStatetoProps = state => {
  return {
    reloadPage: state.addstaff
  }
}
const mapDispatchToProps = dispatch => ({
  handlerReload: dispatch.addstaff.reload
})
export default connect(mapStatetoProps, mapDispatchToProps)(AmsiTable)