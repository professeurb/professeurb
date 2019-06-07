/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createFilePath } = require('gatsby-source-filesystem')
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  // We only want to operate on `Mdx` nodes. If we had content from a
  // remote CMS we could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      // Name of the field you are adding
      name: 'slug',
      // Individual MDX node
      node,
      // Generated value based on filepath with "blog" prefix
      value: `${value}`,
    })
  }
}

// in gatsby-node.js
const path = require('path')
exports.createPages = ({ graphql, actions }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  id
                  frontmatter {
                    type
                  }
                  fields {
                    # Slug field created in the last section
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        // this is some boilerlate to handle errors
        if (result.errors) {
          console.error(result.errors)
          reject(result.errors)
        }
        // We'll call `createPage` for each result
        // console.log('Pages creation')
        result.data.allMdx.edges.forEach(({ node }) => {
          // console.log(node.fields.slug, node.frontmatter.type)
          if (node.frontmatter.type && node.frontmatter.type === 'dir') {
            let regslug = node.fields.slug.replace(/\//g, '\\/')
            let regexpr = '/^' + regslug + '[^\\/]+\\/$/'
            // console.log('<-', regexpr)
            createPage({
              path: node.fields.slug,
              component: path.resolve(`./src/components/article-dir.js`),
              context: { id: node.id, slug: regexpr },
            })
          } else {
            // console.log('->', node.id)
            createPage({
              path: node.fields.slug,
              component: path.resolve(`./src/components/article-layout.js`),
              context: { id: node.id },
            })
          }
        })
      })
    )
  })
}
