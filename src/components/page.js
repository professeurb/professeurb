import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Header from '@components/header.js'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

class Layout extends React.Component {
  render() {
    const { title, subtitle, children } = this.props
    return (
      <>
        <Header title={title} subtitle={subtitle}></Header>
        <Container fluid>
          <Row>
            <Col xs={1} md={2}></Col>
            <div style={{ width: 677 }}>
              <MDXProvider
                components={{
                  pre: props => (
                    <Card>
                      <Card.Body {...props} />
                    </Card>
                  ),
                }}
              >
                {children}
              </MDXProvider>
            </div>
            <Col xs={1} md={2}></Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Layout
