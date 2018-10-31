import React from 'react'
import { Table } from 'reactstrap'

export default class AmrnTable extends React.Component {
  render () {
    return (
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Bill</th>
            <th>Date</th>
            <th>Author</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
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
