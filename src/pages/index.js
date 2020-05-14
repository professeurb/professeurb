import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/page'
import { MDXRenderer } from 'gatsby-plugin-mdx'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout title={siteTitle} subtitle={'Prout'}>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <header>
                <h2>
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h2>
                <small>{node.frontmatter.date}</small>
              </header>
                {/* {/* <MDXRenderer> */}
                  {node.frontmatter.subtitle || node.excerpt}
                {/* </MDXRenderer> */}
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            subtitle
          }
        }
      }
    }
  }
`
