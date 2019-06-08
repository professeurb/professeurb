import React from "react";
import { Link } from "gatsby";
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

import Layout from "../components/layout";

const IndexPage = () => (
  <Layout title="Le Professeur B. raconte…">
    <h1>Bienvenue chez le Professeur B.</h1>
    <p>
      Ce site regroupe un certain nombre de ressources pédagogiques et
      d'articles divers sur l'informatique et son enseignement.
    </p>
    <p>
      La plupart des pages sont munies de labels indiquant en particulier les
      classes où le sujet de l'article rencontre le programme. Cela est en
      grande partie expérimental.
    </p>
    <h1>
      <Link to="/articles">Articles</Link>
    </h1>
    <p>Des articles divers et variés tournant autour de la programmation.</p>
    <h1>
      <Link to="/ipt/sup">IPT Sup</Link>
    </h1>
    <p>
      Des sujets prévus pour être donnés en première année de CPGE scientifique.
    </p>
    <h1>
      <Link to="/ipt/spe">IPT Spé</Link>
    </h1>
    <p>
      Des sujets prévus pour être donnés en deuxième année de CPGE scientifique.
    </p>
  </Layout>
);

export default IndexPage;
