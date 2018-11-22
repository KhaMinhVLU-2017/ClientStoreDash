import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

class UserHomePage extends Component {
    render() {
        return (
            <Row>
                <Col md={3} xs={3} sx={3}>
                    <ul>
                        <li></li>
                    </ul>
                </Col>
                <Col md={9} xs={9} sx={9}>Content</Col>
            </Row>
        )
    }
}

export default UserHomePage
