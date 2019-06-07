import React from "react";
import { Link } from "gatsby";

function manageSlug(slug) {
    let s = slug.split("/");
    let path = ["/"];
    s.pop();
    s.shift();
    return s.map(s => {
        path[0] = path[0].concat(s, "/");
        return [s, path[0]];
    });
}

const BreadCrumbs = ({ slug }) => (
    <nav className="breadcrumb">
        <ul>
            {manageSlug(slug).map((s, index) => {
                return (
                    <li key={index}>
                        <Link to={s[1]}>{s[0]}</Link>
                    </li>
                );
            })}
        </ul>
    </nav>
);

export default BreadCrumbs;
