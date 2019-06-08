import React from "react";
import { Link } from "gatsby";
import {
    Container,
    Navbar,
    NavbarMenu,
    NavbarItem,
    NavbarBrand,
    NavbarStart,
    NavbarEnd,
    NavbarBurger
} from "bloomer";
import { FaTwitter, FaEnvelope } from 'react-icons/fa'

const NavBar = () => (
    <Navbar>
        <Container>
            <NavbarBrand>
                <NavbarItem>Professeur B.</NavbarItem>
                {/* <NavbarStart> */}
                <NavbarItem>
                    <Link to="/articles">Articles</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/ipt/sup">IPT Sup</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/ipt/spe">IPT Spé</Link>
                </NavbarItem>
                {/* </NavbarStart> */}
            </NavbarBrand>
            <NavbarMenu>
                <NavbarEnd>
                    <NavbarItem><a href="mailto:professeurb at free.fr"><FaEnvelope /></a></NavbarItem>
                    <NavbarItem><a href="https://twitter.com/professeur_b/"><FaTwitter /></a></NavbarItem>
                </NavbarEnd>
            </NavbarMenu>
            {/* <NavbarBrand>
                <NavbarItem>Professeur B.</NavbarItem>
                <NavbarBurger />
            </NavbarBrand>
            <NavbarMenu>
                <NavbarStart>
                    <NavbarItem>
                        <Link to="/articles">Articles</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="/ipt/sup">IPT Sup</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="/ipt/spe">IPT Spé</Link>
                    </NavbarItem>
                </NavbarStart>
                <NavbarEnd>
                    <NavbarItem><a href="mailto:professeurb at free.fr"><FaEnvelope /></a></NavbarItem>
                    <NavbarItem><a href="https://twitter.com/professeur_b/"><FaTwitter /></a></NavbarItem>
                </NavbarEnd>
            </NavbarMenu>*/}
        </Container>
    </Navbar>
);

export default NavBar;
