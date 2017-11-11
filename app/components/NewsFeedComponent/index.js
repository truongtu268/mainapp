import React from 'react'
import PropTypes from 'prop-types'
import { NewsFeedItem, NewsFeedName, NewsFeedTime, NewsFeedEmpty } from 'styles'
import moment from 'moment'
import { Icon } from 'antd'

const propTypes = {
  logProccesses: PropTypes.func.isRequired,
  newsfeed: PropTypes.object.isRequired,
  newsfeedList: PropTypes.array,
  token: PropTypes.string.isRequired,
}

class NewsFeedComponent extends React.Component {
  // componentDidMount() {
  //   const { token } = this.props
  //   this.props.logProccesses(token)
  // }

  render() {
    const { newsfeedList } = this.props.newsfeed

    if (newsfeedList.length === 0) {
      return <NewsFeedEmpty>Empty Newsfeed</NewsFeedEmpty>
    }

    return (
      <div>
        {
          newsfeedList.map((newsfeedItem, index) => (
            <NewsFeedItem key={index}>
              <NewsFeedName>
                <Icon type="user-add" style={{ fontSize: 16, marginRight: 5 }} />
                <span>{newsfeedItem.content.username}</span> {newsfeedItem.content.action}
              </NewsFeedName>
              <NewsFeedTime>{moment(newsfeedItem.createdAt).format('HH:mm - MMMM DD, YYYY')}</NewsFeedTime>
            </NewsFeedItem>
          ))
        }
      </div>
    )
  }
}

NewsFeedComponent.propTypes = propTypes

export default NewsFeedComponent
