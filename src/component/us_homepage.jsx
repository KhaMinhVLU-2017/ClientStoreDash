import React, { Component } from 'react'
import {
    Row, Col, Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'
import UsHomeProduct from './us_home_product'

class UserHomePage extends Component {
    constructor(props) {
        super(props)
        this.state = { isOpen: false }
        this.toggle = this.toggle.bind(this)
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        return (
            <Row>
                <Col xs={12} md={12} sm={12}>
                    <Navbar color='danger' light expand="md">
                        <NavbarBrand href="/">Cosmetics Store</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        JudasFate
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <NavLink active href='/home/changepw'>Change password</NavLink>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            <NavLink active href='/home/changepw'>Logout</NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </Col>
                <UsHomeProduct />
            </Row>
        )
    }
}

export default UserHomePage
