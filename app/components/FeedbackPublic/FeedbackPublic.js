import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import styles from './styles.css'
// import { Select } from 'antd'
import FeedbackItem from '../FeedbackComponent/FeedbackItem'
import FeedbackStatsBar from '../FeedbackComponent/FeedbackStatsBar'
import { Row, FeedbackList, Filter, NewsFeedEmpty, FilterBlock } from 'styles'

const propTypes = {
  stats: PropTypes.object.isRequired,
  feedbacks: PropTypes.array,
}

class FeedbackPublic extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      stats,
      feedbacks,
    } = this.props
    return (
      <div>
        <FeedbackStatsBar stats={stats} />
        <Row lastRow>
          <Filter>
            {/* <FilterBlock>
              <span className="feedback__cate-title">Type:</span>
              <Select
                defaultValue="all"
                style={{ width: 80 }}
                onSelect={this.handleSelectType}
              >
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="positive">Positive</Select.Option>
                <Select.Option value="negative">Negative</Select.Option>
              </Select>
            </FilterBlock> */}
          </Filter>
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

FeedbackPublic.propTypes = propTypes

export default FeedbackPublic
