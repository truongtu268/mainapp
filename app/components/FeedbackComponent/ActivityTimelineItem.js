import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Timeline, Icon, Card } from 'antd'
import UserAvatar from '../UserProfileComponent/UserAvatar'
import activityStyles from './ActivityStyles.css'

class ActivityTimelineItem extends PureComponent {
  render() {
    const {
      activityData: {
        type,
        user,
        createdAt,
        data,
      },
      isAnonymous,
    } = this.props

    switch (type) {
      case 'open': {
        const authorEl = isAnonymous ? (
          <span className={activityStyles.giver}>Anonymous user</span>
        ) : (
          <Link to={`/u/${user.code}`} className={activityStyles.giver}>
            {`${user.firstName} ${user.lastName}`}
          </Link>
        )
        return (
          <Timeline.Item
            dot={
              <Icon
                style={{ color: '#ffbf00', fontSize: '16px' }}
                type="exclamation-circle"
              />
            }
            color="#ffbf00"
          >
            {authorEl} opened this issue at {moment(createdAt).format('MMMM DD, YYYY')}
          </Timeline.Item>
        )
      }
      case 'close':
        return (
          <Timeline.Item
            dot={<Icon type="check-circle" style={{ fontSize: '16px' }} />}
            color="#00a854"
          >
            <Link to={`/u/${user.code}`} className={activityStyles.giver}>
              {`${user.firstName} ${user.lastName}`}
            </Link> closed this issue at {moment(createdAt).format('MMMM DD, YYYY')}
          </Timeline.Item>
        )
      case 'vote':
        return (
          <Timeline.Item
            dot={<Icon type="check-circle" style={{ fontSize: '16px' }} />}
            color="#00a854"
          >
            <Link to={`/u/${user.code}`} className={activityStyles.giver}>
              {`${user.firstName} ${user.lastName}`}
            </Link> voted at {moment(createdAt).format('MMMM DD, YYYY')}
          </Timeline.Item>
        )
      case 'receive':
      case 'seen': {
        if (!data || !data.length) {
          return null
        }
        return (
          <Timeline.Item
            dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}
            color="#00a854"
          >
            {data.map((activity, index) => {
              return (
                <UserAvatar
                  key={index}
                  user={activity.user}
                  size="small"
                  style={{ marginRight: 4, float: 'left' }}
                />
              )
            })}
            <span style={{ display: 'inline-block', lineHeight: '24px', float: 'left' }}>
              {type === 'receive' ? 'Received' : 'Seen'}
            </span>
          </Timeline.Item>
        )
      }
      case 'comment':
        return (
          <Timeline.Item
            dot={
              <UserAvatar user={user} size="large" color="#fee3cf" />
            }
            color="red"
          >
            <Card bodyStyle={{ padding: 0 }} className={activityStyles.commentBody}>
              <div className={activityStyles.commentContent}>
                {data.text}
              </div>
            </Card>
          </Timeline.Item>
        )
      case 'edit' : case 'competencies': case 'compentencies': return null
      default: return <Timeline.Item>{data.text}</Timeline.Item>
    }
  }
}

ActivityTimelineItem.propTypes = {
  activityData: PropTypes.object.isRequired,
  isAnonymous: PropTypes.bool.isRequired,
}

export default ActivityTimelineItem
