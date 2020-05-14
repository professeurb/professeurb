import React from 'react'
import { Link, graphql } from 'gatsby'
// import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
// import MarkdownLink from '@components/markdownlink.js'
import Layout from '../components/page'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    // const siteTitle = this.props.data.site.siteMetadata.title

    return (
      // <MDXProvider
      //   components={[
      //     {
      //       // a: props => <MarkdownLink {...props} />,
      //     },
      //   ]}
      // >
      <Layout
        title={post.frontmatter.title}
        subtitle={post.frontmatter.subtitle}
      >
        <MDXRenderer>{post.body}</MDXRenderer>
      </Layout>
      // </MDXProvider>
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
        description
      }
    }
  }
`
