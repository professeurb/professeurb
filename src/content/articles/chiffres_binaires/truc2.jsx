import React, { Component } from 'react'
import style from './binop.module.css'

const Binop = () => {
  return (
    <div className={style.truc}>
      <div className={style.binop}>
        <div className={style.header}>et logique</div>
        <code></code> <code></code> <code>0</code> <code>0</code> <code>1</code> <code>1</code>
        <code className={style.line}>&</code>
          <code className={style.line}></code>
          <code className={style.line}>0</code>
          <code className={style.line}>1</code>
          <code className={style.line}>0</code>
          <code className={style.line}>1</code>
        <code></code> <code></code> <code>0</code> <code>0</code> <code>0</code> <code>1</code>
      </div>
      <div className={style.binop}>
        <div className={style.header}>ou logique</div>
        <code></code> <code></code> <code>0</code> <code>0</code> <code>1</code> <code>1</code>
        <code className={style.line}>|</code>
          <code className={style.line}></code>
          <code className={style.line}>0</code>
          <code className={style.line}>1</code>
          <code className={style.line}>0</code>
          <code className={style.line}>1</code>
        <code></code> <code></code> <code>0</code> <code>1</code> <code>1</code> <code>1</code>
      </div>
      <div className={style.binop}>
        <div className={style.header}>ou exclusif</div>
        <code></code> <code></code> <code>0</code> <code>0</code> <code>1</code> <code>1</code>
        <code className={style.line}>^</code>
          <code className={style.line}></code>
          <code className={style.line}>0</code>
          <code className={style.line}>1</code>
          <code className={style.line}>0</code>
          <code className={style.line}>1</code>
        <code></code> <code></code> <code>0</code> <code>1</code> <code>1</code> <code>0</code>
      </div>
    </div>
  )
}

export default Binop
