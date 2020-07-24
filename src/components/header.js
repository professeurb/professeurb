import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import NaviBar from '@components/navbar.js'

const Header = ({ title, subtitle }) => (
  <>
    <NaviBar />
    <Jumbotron fluid>
      <Container className='container-md'>
        <Row>
          <Col></Col>
          <Col lg={9}>
            <h1>{title}</h1>
            {subtitle && <p className='lead'>{subtitle}</p>}
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </Jumbotron>
  </>
)

export default Header
