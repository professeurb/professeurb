// Regarder https://github.com/jlengstorf/lengstorf.com/

path = require("path");
// import { path } from 'path'

module.exports = {
  siteMetadata: {
    title: "Le Professeur B. raconte"
  },
  plugins: [
    {
      resolve: "gatsby-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/layout.js")
        },
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-copy-linked-files`
          }
        ],
        rehypePlugins: [
          require("rehype-katex"),
          require("rehype-highlight")
        ],
        remarkPlugins: [require("remark-math")]
      }
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "articles",
        path: `${__dirname}/src/content/`
      }
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        src: path.join(__dirname, "src"),
        components: path.join(__dirname, "src/components")
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8,
        includePaths: [require("path").resolve(__dirname, "node_modules")]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-121104091-1"
      }
    }
  ]
};
