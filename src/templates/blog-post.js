import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/page'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx

    return (
      <Layout
        title={post.frontmatter.title}
        subtitle={post.frontmatter.subtitle}
      >
        <MDXRenderer>{post.body}</MDXRenderer>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        subtitle
        date(formatString: "DD/MM/YYYY")
      }
    }
  }
`
