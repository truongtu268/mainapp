import React from 'react'
// import PropTypes from 'prop-types'
import styles from './styles.css'
import FeedbackStatsBar from '../FeedbackComponent/FeedbackStatsBar'
import FeedbackItem from '../FeedbackComponent/FeedbackItem'
import { NewsFeedEmpty, Row, FeedbackList } from 'styles'

class FeedbackGiveComponent extends React.PureComponent {
  render() {
    const {
      stats,
      feedbacks,
    } = this.props
    return (
      <div className={styles.feedbackReceivedComponent}>
        <FeedbackStatsBar stats={stats} />
        <Row lastRow>
          {feedbacks.length > 0 ?
            <FeedbackList>
              {
                feedbacks.map((feedback, index) =>
                  <FeedbackItem
                    key={index}
                    data={feedback}
                  />
                )
              }
            </FeedbackList> :
            <NewsFeedEmpty>
              You did not send any feedback yet!
            </NewsFeedEmpty>
          }
        </Row>
      </div>
    )
  }
}

export default FeedbackGiveComponent
