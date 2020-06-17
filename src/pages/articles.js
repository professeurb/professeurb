import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/page'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { FaSearch } from 'react-icons/fa'
import Fuse from 'fuse.js'

function Entry({ node }) {
  const title = node.frontmatter.title || node.fields.slug
  return (
    <Card key={node.fields.slug}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <small className='text-muted'>{node.frontmatter.date} </small>
        </Card.Text>

        {node.frontmatter.tags && (
          <Card.Text>
            {node.frontmatter.tags.map(tag => {
              // console.log(id, tag)
              return (
                <Badge key={tag} variant='primary'>
                  {tag}
                </Badge>
              )
            })}
          </Card.Text>
        )}
        <Card.Text>{node.frontmatter.subtitle || node.excerpt}</Card.Text>
        <a className='stretched-link' href={node.fields.slug}>
          Lire…
        </a>
      </Card.Body>
    </Card>
  )
}

class BlogIndex extends React.Component {
  constructor(props) {
    super(props)
    var options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'node.frontmatter.tags',
        'node.frontmatter.title',
        'node.frontmatter.subtitle',
      ],
    }

    console.log(props)
    this.state = {
      entries: props.data.allMdx.edges,
      fuse: new Fuse(props.data.allMdx.edges, options),
    }
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout
        title='Articles'
        subtitle="Où le professeur B. parle de choses et d'autres…"
      >
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type='text'
            placeholder='Rechercher'
            onChange={evt => {
              if (evt.target.value == '') {
                this.setState({ entries: posts })
              } else {
                const news = this.state.fuse.search(evt.target.value)
                this.setState({
                  entries: news.map(obj => obj.item),
                })
              }
            }}
          />
        </InputGroup>
        <br />
        <CardColumns>{this.state.entries.map(Entry)}</CardColumns>
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
    allMdx(
      filter: { fields: { slug: { regex: "/articles/" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMM YYYY")
            title
            subtitle
            tags
          }
        }
      }
    }
  }
`
