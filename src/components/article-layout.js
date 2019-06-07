import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { MDXProvider } from '@mdx-js/tag'
import { Title, Section, Container, Columns, Column, Content } from 'bloomer'
import Helmet from 'react-helmet'

import Header from './article-header'

function PageTemplate ({ data: { mdx } }) {
  // console.log(mdx)
  return (
    <MDXProvider
      components={{
        h1: props => <Title {...props} isSize={2} />,
        h2: props => <Title {...props} isSize={3} />,
        h3: props => <Title {...props} isSize={4} />,
        h4: props => <Title {...props} isSize={5} />,
        h5: props => <Title {...props} isSize={6} />,
        // h2: DesignSystem.H2,
        // h3: DesignSystem.H3,
        // p: props => <p {...props} style={{ color: 'rebeccapurple' }} />,
      }}
    >
      <Helmet
        title={mdx.frontmatter.title}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      >
        <html lang="fr" />
      </Helmet>

      <Header
        slug={mdx.fields.slug}
        title={mdx.frontmatter.title}
        subtitle={mdx.frontmatter.subtitle}
        tags={mdx.frontmatter.tags}
      />
      <Section>
        <Container>
          <Columns isCentered>
            <Column isSize="3/4">
              <Content>
                {/* {mdx.frontmatter.tags} */}
                <MDXRenderer>{mdx.code.body}</MDXRenderer>
              </Content>
            </Column>
          </Columns>
        </Container>
      </Section>
    </MDXProvider>
  )
}
export const pageQuery = graphql`
  query Query($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        subtitle
        tags
      }
      fields {
        slug
      }
      code {
        body
      }
    }
  }
`

export default PageTemplate
