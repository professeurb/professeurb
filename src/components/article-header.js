import React from "react";
import {
  Hero,
  HeroBody,
  Container,
  Title,
  Subtitle,
  Tag,
  Columns,
  Column
} from "bloomer";
import BreadCrumbs from "./breadcrumbs.jsx";
import NavBar from "./navbar.jsx";

const Header = ({ slug, title, subtitle, tags }) => (
  <>
    <NavBar />
    <Hero isColor="info">
      <HeroBody>
        <Container>
          <Columns isCentered>
            <Column isSize="3/4">
              <BreadCrumbs slug={slug} />
              <Title isSize={1}>{title}</Title>
              {subtitle && <Subtitle>{subtitle}</Subtitle>}
              {tags && (
                <div className="tags">
                  {tags.map((tag, index) => {
                    return (
                      <Tag key={index} isColor="black">
                        {tag}
                      </Tag>
                    );
                  })}
                </div>
              )}
            </Column>
          </Columns>
        </Container>
      </HeroBody>
    </Hero>
  </>
);

export default Header;
