import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import FeedbackGiveComponent from '../../components/FeedbackGiveComponent'
import {
  getAllFeedbackGiveStats,
  getAllFeedbackGive,
} from './actions'

const mapStateToProps = (state) => ({
  feedbacks: state.feedbackGive.feedbacks,
  stats: state.feedbackGive.stats,
  hasLoading: state.feedbackGive.hasLoading,
  hasError: state.feedbackGive.hasError,
})

const mapDispatchToProps = {
  getAllFeedbackGiveStats,
  getAllFeedbackGive,
}

const propTypes = {
  getAllFeedbackGiveStats: PropTypes.func.isRequired,
  getAllFeedbackGive: PropTypes.func.isRequired,
  stats: PropTypes.object.isRequired,
  feedbacks: PropTypes.array.isRequired,
  hasLoading: PropTypes.bool,
  hasError: PropTypes.bool,
}

export class FeedbackGiveContainer extends PureComponent {
  componentDidMount() {
    this.props.getAllFeedbackGiveStats()
    this.props.getAllFeedbackGive()
  }
  render() {
    const {
      stats,
      hasLoading,
      feedbacks,
    } = this.props

    if (hasLoading) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      )
    }
    return <FeedbackGiveComponent stats={stats} feedbacks={feedbacks} />
  }
}

FeedbackGiveContainer.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackGiveContainer)
