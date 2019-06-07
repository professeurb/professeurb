import React from "react";
import { Hero, HeroBody, Container, Title } from "bloomer";

import NavBar from "./navbar.jsx";

const Header = ({ title }) => (
  <>
    <NavBar />
    <Hero isColor="info">
      <HeroBody>
        <Container>
          <Title isSize={1}>{title}</Title>
        </Container>
      </HeroBody>
    </Hero>
  </>
);

export default Header;
