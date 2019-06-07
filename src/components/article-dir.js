import React from "react";
import { graphql, Link } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from "@mdx-js/tag";
import {
  Title,
  Section,
  Container,
  Columns,
  Column,
  Content,
  Media,
  MediaContent,
  MediaLeft,
  Tag
} from "bloomer";
import { FaFolder, FaFile, FaSearch } from "react-icons/fa";

import Helmet from "react-helmet";

import Header from "./article-header";

function PageTemplate({ data: { mdx, allMdx } }) {
  console.log(mdx);
  console.log(allMdx);
  return (
    <MDXProvider
      components={{
        h1: props => <Title {...props} isSize={2} />,
        h2: props => <Title {...props} isSize={3} />,
        h3: props => <Title {...props} isSize={4} />,
        h4: props => <Title {...props} isSize={5} />,
        h5: props => <Title {...props} isSize={6} />
        // h2: DesignSystem.H2,
        // h3: DesignSystem.H3,
        // p: props => <p {...props} style={{ color: 'rebeccapurple' }} />,
      }}
    >
      <Helmet
        title={mdx.frontmatter.title}
        meta={[
          { name: "description", content: "Sample" },
          { name: "keywords", content: "sample, something" }
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
                <MDXRenderer>{mdx.code.body}</MDXRenderer>
                {/* <ul> */}
                {/* <p className="control has-icons-left">
                  <input className="input" type="search" placeholder="Rechercher" />
                  <span className="icon is-small is-left">
                    <FaSearch />
                  </span>
                </p> */}
                {/* <Content> */}
                {allMdx.edges.map((edge, index) => (
                  <div className="gloup">
                    <Link to={edge.node.fields.slug}>
                      <Media key={index}>
                        <MediaLeft>
                          <Title isSize={4}>
                            {(edge.node.frontmatter.type &&
                              edge.node.frontmatter.type === "dir" && (
                                <FaFolder />
                              )) || <FaFile />}
                          </Title>
                        </MediaLeft>
                        <MediaContent>
                          <Title isSize={4}>
                            {edge.node.frontmatter.title}
                          </Title>
                          {edge.node.frontmatter.tags && (
                            <div className="tags" style={{ margin: "0" }}>
                              {edge.node.frontmatter.tags.map((tag, index) => {
                                return (
                                  <Tag key={index} isColor="info">
                                    {tag}
                                  </Tag>
                                );
                              })}
                            </div>
                          )}
                          <p>{edge.node.frontmatter.subtitle}</p>
                        </MediaContent>
                      </Media>
                    </Link>
                  </div>
                ))}
                {/* </Content> */}
              </Content>
            </Column>
          </Columns>
        </Container>
      </Section>
    </MDXProvider>
  );
}

export const pageQuery = graphql`
  query($id: String!, $slug: String!) {
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
    allMdx(filter: { fields: { slug: { regex: $slug } } }) {
      edges {
        node {
          id
          frontmatter {
            title
            subtitle
            tags
            type
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default PageTemplate;
