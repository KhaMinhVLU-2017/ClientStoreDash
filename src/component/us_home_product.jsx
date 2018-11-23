import React, { Component } from 'react'
import {
  Container, Row, Col, Table, Button
  , Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

class UsHomeProduct extends Component {
  constructor(props) {
    super(props)
    this.state = { modal: false, arrCells: [] }
    this.toggle = this.toggle.bind(this)
    this.appendCell = this.appendCell.bind(this)
    this.onHanlerChange = this.onHanlerChange.bind(this)
    this.eventTab = this.eventTab.bind(this)
  }
  toggle() {
    this.setState({ modal: !this.state.modal })
  }
  appendCell() {
    let arr = [...this.state.arrCells]
    let count = arr.length
    let data = ['id_pd_' + count, 'id_qt_' + count, 'id_pc_' + count, 'id_total_' + count]
    arr.push(data)
    this.setState({ arrCells: arr, [data[0]]: '', [data[1]]: 0,[data[2]]: 0, [data[3]]: 0 })
  }
  onHanlerChange(e) {
    let id = e.target.id
    let value = e.target.value
    let getNumberId = id.split('_') // get Count of Index
    let count = getNumberId[2]
    var regex = RegExp('id_pd_[0-9]')
    if (regex.test(id)) {
      this.setState({[id]: value})
    }
    if (/^\d+$/.test(value)) {
      this.setState({[id]: value})
    }
    if (/^\d+$/.test(value) && id === 'id_pc_'+count) {
      let total = this.state['id_qt_'+count] * value
      this.setState({[id]: value, ['id_total_'+count]: total})
    }
    if (/^\d+$/.test(value) && id === 'id_qt_'+count) {
      let total = this.state['id_pc_'+count] * value
      this.setState({[id]: value, ['id_total_'+count]: total})
    }
    console.log(id)
    console.log(value)
    console.log(regex.test(id))
  }
  eventTab(e) {
    /**
     * Set Event tab auto append Cells in table
     */
  }
  render() {
    console.log(this.state.arrCells)
    return (
      <Container>
        <Row>
          <h1 className='us-home-product-title'>Invoice list of the day</h1>
          <Col xs={12} sm={12} md={12}  >
            <Button onClick={this.toggle} color='primary'>Create Bill</Button>
            <Table hover bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Modal isOpen={this.state.modal} size='lg' toggle={this.toggle}>
            <ModalHeader>
              Invoice
            </ModalHeader>
            <ModalBody>
              <Col md={12} xs={12} sm={12}>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price(VND)</th>
                      <th>Total(VND)</th>
                      <th><Button onClick={this.appendCell} color='danger'>+</Button></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.arrCells.map((item, index) =>
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td><input id={item[0]} onChange={this.onHanlerChange} value={this.state[item[0]] } style={{ width: '100%' }} type='text' /></td>
                        <td><input id={item[1]} onChange={this.onHanlerChange} value={this.state[item[1]] } style={{ width: '100%' }} type='text' /></td>
                        <td><input id={item[2]} onChange={this.onHanlerChange} value={this.state[item[2]] } style={{ width: '100%' }} type='text' onkeydown={this.eventTab}/></td>
                        <td>{this.state[item[3]]}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Col>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Save</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </Row>
      </Container>
    )
  }
}

export default UsHomeProduct
