import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import FeedbackPublic from '../../components/FeedbackPublic/FeedbackPublic'
import {
  getAllFeedbackPublicStats,
  getAllFeedbackPublic,
} from './actions'

const mapStateToProps = (state) => ({
  feedbacks: state.feedbackPublic.feedbacks,
  stats: state.feedbackPublic.stats,
  hasLoading: state.feedbackPublic.hasLoading,
  hasError: state.feedbackPublic.hasError,
})

// Return dipacth action immediately
const mapDispatchToProps = {
  getAllFeedbackPublicStats,
  getAllFeedbackPublic,
}

const propTypes = {
  getAllFeedbackPublicStats: PropTypes.func.isRequired,
  getAllFeedbackPublic: PropTypes.func.isRequired,
  stats: PropTypes.object.isRequired,
  feedbacks: PropTypes.array.isRequired,
  hasLoading: PropTypes.bool,
  hasError: PropTypes.bool,
}

class FeedbackPublicContainer extends Component {
  componentDidMount() {
    this.props.getAllFeedbackPublicStats()
    this.props.getAllFeedbackPublic()
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
    return (
      <FeedbackPublic
        stats={stats}
        feedbacks={feedbacks}
      />
    )
  }
}

FeedbackPublicContainer.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackPublicContainer)
