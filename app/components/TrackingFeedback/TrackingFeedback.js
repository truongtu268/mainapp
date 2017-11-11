import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import moment from 'moment'
import {
  Button, Layout, Input,
  Icon, Timeline, Radio,
  Avatar, Card,
} from 'antd'
// import TrackingRow from './TrackingRow'
import styles from './styles.css'
// import { AnswerHighLight } from 'styles/anonymous-layout'
import ActivityTimelineItem from '../FeedbackComponent/ActivityTimelineItem'
import activityStyles from '../FeedbackComponent/ActivityStyles.css'
import iconImgPositive from '../../images/positive.png'
import iconImgNegative from '../../images/negative.png'
import iconTracking from '../../images/tracking-icon.png'
import iconImgAnonymous from '../../images/anonymous.jpg'

const propTypes = {
  listFeedback: PropTypes.array.isRequired,
  trackingUrl: PropTypes.string.isRequired,
  fullUrl: PropTypes.string.isRequired,
  ratingFeedbackItem: PropTypes.func.isRequired,
  sendTrackingUrlToEmail: PropTypes.func.isRequired,
}

class TrackingFeedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      email: '',
      value: 0,
      activities: [
        {
          type_action: 'received_feedback',
          createdAt: '2017-08-09T18:55:24.000Z',
          user: {
            firstName: 'Kim',
            avatarUrl: '',
          },
        }, {
          type_action: 'seen_feedback',
          createdAt: '2017-08-09T18:55:24.000Z',
          user: {
            firstName: 'Kim',
            avatarUrl: '',
          },
        }, {
          type_action: 'comment',
          createdAt: '2017-08-09T18:55:24.000Z',
          user: {
            firstName: 'K',
            avatarUrl: '',
          },
          data: {
            text: 'Thank for your feedback, I will take action',
          },
        },
      ],
    }
    this.getValueEmail = this.getValueEmail.bind(this)
    this.sendFeedbackUrl = this.sendFeedbackUrl.bind(this)
  }

  getValueEmail(e) {
    const email = e.target.value
    this.setState({ email })
  }

  sendFeedbackUrl() {
    this.props.sendTrackingUrlToEmail({ email: this.state.email, url: this.props.fullUrl })
    this.setState({ isVisible: false })
  }

  render() {
    return (
      <Layout className={styles.trackingFeedbackComponent}>
        <Layout.Content className={styles.content}>
          <div>
            <div style={{ textAlign: 'center' }}>
              <img width="80" src={iconTracking} alt="" />
            </div>
            <h2 style={{ textAlign: 'center' }}>
              Tracking and evaluation the take action
            </h2>
            <br />
            <p>
              This page use for tracking and evaluation the take action after your feedback. Please save this link <br />
            </p>
            <div style={{ textAlign: 'center' }}>
              Or backup this link to your email: <br />
              <Input
                className={styles.inputSendMail}
                placeholder="Your email"
                onChange={this.getValueEmail}
                value={this.state.email}
                addonAfter={
                  <Button
                    type="primary"
                    onClick={this.sendFeedbackUrl}
                  ><Icon type="mail" /> Send</Button>
                }
              />
            </div>
          </div>
          <Timeline
            className={activityStyles.conversation}
          >
            <Timeline.Item
              dot={
                <Avatar src={iconImgAnonymous} />
              }
              color="red"
            >
              <Card bodyStyle={{ padding: 0 }} className={activityStyles.commentBody}>
                <div className={activityStyles.commentContent}>
                  <h3>Feedback:</h3>
                  <p>A short content of feedback here!</p>
                </div>
              </Card>
            </Timeline.Item>
            {this.state.activities.map((activity, index) => {
              return <ActivityTimelineItem key={index} activityData={activity} />
            })}
            <Timeline.Item
              dot={<Icon type="clock-circle" style={{ fontSize: 24 }} />}
              color="red"
              style={{ textAlign: 'center' }}
            >
              <p>It's been 1 month since you sent your feedback.</p>
              <h3>
                How would you rate the improvement of this?
              </h3>
              <Radio.Group defaultValue="a" size="large">
                <Radio.Button value="happy" className={styles.evaluationIcon}>
                  <img src={iconImgPositive} alt="" />
                  <p>Happy</p>
                </Radio.Button>
                <Radio.Button value="unhappy" className={styles.evaluationIcon}>
                  <img src={iconImgNegative} alt="" />
                  <p>Unhappy</p>
                </Radio.Button>
              </Radio.Group>
            </Timeline.Item>
          </Timeline>
        </Layout.Content>
      </Layout>
    )
  }
}

TrackingFeedback.propTypes = propTypes

export default TrackingFeedback
