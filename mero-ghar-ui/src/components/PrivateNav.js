import React, { useState } from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';

import logo from "../images/logo.png";


const Example = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


    return (
        <div>
            <Navbar light expand="md" id="navbar" className="navbar-fixed-top">
                <NavbarBrand>
                    <img src={logo} clasName="logo" alt="Mero Ghar" width="200px">
                    </img>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem className='navitem' >
                            <NavLink href="/dashboard"><span className='nav-text'>Home</span></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/properties"><span className='nav-text'>Properties</span></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/dashboard"><span className='nav-text'>Dashboard</span></NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Example;