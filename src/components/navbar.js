import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'gatsby'
import { FaTwitter, FaEnvelope } from 'react-icons/fa'

const NaviBar = () => (
  <Navbar
    className='sticky-top navbar-light bg-light'
    collapseOnSelect
    expand='md'
  >
    <Container>
      <Navbar.Brand href='/'>Professeur&nbsp;B.</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='/articles'>Articles</Nav.Link>
          <NavDropdown title='Enseignement' id='basic-nav-dropdown'>
            <NavDropdown.Item href='#action/3.1'>IPT Sup</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.2'>IPT Spé</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='#action/3.3'>Option Sup</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.4'>Option Spé</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href='mailto:professeurb at free.fr'>
            <FaEnvelope />
          </Nav.Link>
          <Nav.Link href='https://twitter.com/professeur_b/'>
            <FaTwitter />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

export default NaviBar
