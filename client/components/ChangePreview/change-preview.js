import React from 'react'
import {Carousel, Image} from 'react-bootstrap'
import styles from './changePreview.module.css'
const arrOfChanges = ['abc', 'def', 'ghi', 'jhk']
const arrOfSupporterting = ['xyx', 'fhs', 'ada', 'njk']

export default function PreviewChanges(props) {
  return (
    <div>
      <h3>Changes {props.name} </h3>
      {props.props.map((change, index) => {
        return (
          <div key={index}>
            <ChangeSmall props={change} />
          </div>
        )
      })}
    </div>
  )
}

export function ChangeSmall(props) {
  return (
    <div className={styles.SmallChangeClass}>
      <div className={styles.SmallChangeContent}>
        <h3>{props.props.title}</h3>
        <p>
          {props.props.body}
          <a className={styles.changeLink} href="/linkToArticle">
            Read More
          </a>
        </p>
        <p className={styles.Author}>
          Written By, <span className={styles.bold}>{props.props.author}</span>{' '}
        </p>
      </div>
    </div>
  )
}
