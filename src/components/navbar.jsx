import React from "react";
import { Link } from "gatsby";
import {
    Container,
    Navbar,
    NavbarMenu,
    NavbarItem,
    NavbarBrand,
    NavbarEnd
} from "bloomer";
import { FaTwitter, FaEnvelope } from 'react-icons/fa'

const NavBar = () => (
    <Navbar>
        <Container>
            <NavbarBrand>
                <NavbarItem>Professeur B.</NavbarItem>
            </NavbarBrand>
            <NavbarMenu>
                <NavbarItem>
                    <Link to="/articles">Articles</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/ipt/sup">IPT Sup</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/ipt/spe">IPT Spé</Link>
                </NavbarItem>
            </NavbarMenu>
            <NavbarEnd>
                <NavbarItem><a href="mailto:professeurb at free.fr"><FaEnvelope /></a></NavbarItem>
                <NavbarItem><a href="https://twitter.com/professeur_b/"><FaTwitter /></a></NavbarItem>
            </NavbarEnd>
        </Container>
    </Navbar>
);

export default NavBar;
