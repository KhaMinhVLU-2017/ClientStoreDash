import React from 'react'
import { Table } from 'reactstrap'

export default class AmsiTable extends React.Component {
  render () {
    return (
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Avatar</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Luu Gia Kho</td>
            <td>glc@gmail.com</td>
            <td>Avatar</td>
            <td>Employee</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    )
  }
}
