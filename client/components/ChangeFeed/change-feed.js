import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Tab, Tabs, Jumbotron} from 'react-bootstrap'
import PreviewChanges from '../ChangePreview/change-preview'
import styles from './changeFeed.module.css'
const arrOfChanges = [
  {
    id: 1,
    author: 'Andrew Paulino',
    title: 'First',
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor auctor lacus at semper. Fusce dictum quam ante, at tempor augue tincidunt vitae...'
  },
  {
    id: 2,
    author: 'Alex Javier',
    title: 'Second',
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor auctor lacus at semper. Fusce dictum quam ante, at tempor augue tincidunt vitae. Aenea...'
  }
]

class ChangesFeed extends React.Component {
  constructor(props) {
    super()
    this.state = {
      activeTab: 1,
      dummy: 'Hey'
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.getChanges = this.getChanges.bind(this)
  }

  handleSelect(selectedTab) {
    this.setState({
      activeTab: selectedTab
    })
    this.getChanges(selectedTab)
  }

  getChanges(selectedTab) {
    console.log(this.state.dummy)
    console.log(selectedTab)
  }

  render() {
    return (
      <div className={styles.FeedContainer}>
        <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
          <Tab eventKey={1} title="Trending">
            <Jumbotron>
              <PreviewChanges
                props={arrOfChanges}
                name=" That Are Happening Now"
              />
            </Jumbotron>
          </Tab>
          <Tab eventKey={2} title="Public Feed">
            <Jumbotron>
              <PreviewChanges props={arrOfChanges} name=" In Public Feed" />
            </Jumbotron>
          </Tab>
          <Tab eventKey={3} title="Your Communities">
            <Jumbotron>
              <PreviewChanges
                props={arrOfChanges}
                name=" In Your Communities"
              />
            </Jumbotron>
          </Tab>
          <Tab eventKey={4} title="Your Subscriptions">
            <Jumbotron>
              <PreviewChanges
                props={arrOfChanges}
                name=" in Your Subscriptions"
              />
            </Jumbotron>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

//   const mapDispatch = dispatch => {
//     return {
//       handleClick() {
//         dispatch(logout())
//       }
//     }
//   }

export default connect(mapState, null)(ChangesFeed)
