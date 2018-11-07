import React from 'react'
import { Table } from 'reactstrap'

export default class AmpmTable extends React.Component {
  render () {
    return (
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Money</th>
            <th>Interest rate/year</th>
            <th>Begin Time</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Tien gop xe</td>
            <td>1000000</td>
            <td>5%</td>
            <td>3-11-2015</td>
            <td>38</td>
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
