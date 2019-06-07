import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Title, Section, Container, Columns, Column, Content } from 'bloomer'

import Header from './header'
// import 'bulma/css/bulma.min.css'
import 'katex/dist/katex.min.css'

import { MDXProvider } from '@mdx-js/tag'

const Layout = ({ title, children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <MDXProvider
        components={{
          h1: props => <Title {...props} isSize={1} />,
          h2: props => <Title {...props} isSize={2} />,
          h3: props => <Title {...props} isSize={3} />,
          // h2: DesignSystem.H2,
          // h3: DesignSystem.H3,
          // p: props => <p {...props} style={{ color: 'rebeccapurple' }} />,
        }}
      >
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header title={ title } />
        <Section>
          <Container>
            <Columns isCentered>
              <Column isSize="3/4">
                <Content>{children}</Content>
              </Column>
            </Columns>
          </Container>
        </Section>
      </MDXProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
