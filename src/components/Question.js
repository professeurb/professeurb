import React from "react";
import style from "./question.module.css";

export default function Question (props) {
  return (
    <strong className={style.question}>
      {props.children ? " (" + props.children + ")" : ""}
    </strong>
  );
}
