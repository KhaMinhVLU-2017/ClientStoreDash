import React, { Component } from 'react'
import { Row, Col, Alert, Table } from 'reactstrap'

class AmHome extends Component {
  render() {
    return (
      <div style={{ background: 'white', padding: 20, boxShadow: '1px 1px 11px 6px #888888' }}>
        <h1>Membership Management Homepage</h1>
        <hr />
        <Row>
          <Col md={6} sm={6} xs={6} style={{ border: 'solid 1px #b8daff', margin: 0, padding: 0, borderRadius: 6 }}>
            <Alert color='primary'>Online Recently</Alert>
            <Col xs={12} sm={12} md={12}>
              <Table hover bordered >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Account</th>
                    <th>Online</th>
                    <th>Recently</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Online</td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Offline</td>
                    <td>2m</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>Offline</td>
                    <td>2h</td>
                  </tr>
                </tbody>
              </Table>
            </Col>

          </Col>
          <Col md={6} sm={6} xs={6}>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AmHome
