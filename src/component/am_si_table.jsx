import React from 'react'
import { Table } from 'reactstrap'
import axios from 'axios'
import { api } from '../config'

export default class AmsiTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { list: [] }
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
          self.setState({ list: response.data.listdata })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    if (this.state.list.length === 0) {
      return (<h1>Found user in group</h1>)
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
                return (<tr>
                  <th scope='row'>{index + 1}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role.name}</td>
                  <td>X</td>
                </tr>)
              })
            }
          </tbody>
        </Table>
      )
    }
  }
}
