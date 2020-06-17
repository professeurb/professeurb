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
      <Container fluid>
        <Row>
          <Col xs={1} md={2}></Col>
          <Col xs={10} md={8}>
            <h1>{title}</h1>
            {subtitle && <p className="lead">{subtitle}</p>}
          </Col>
          <Col xs={1} md={2}></Col>
        </Row>
      </Container>
    </Jumbotron>
  </>
)

export default Header
