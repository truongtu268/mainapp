import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import FeedbackReceivedComponent from '../../components/FeedbackReceivedComponent'
import {
  getAllFeedbackReceivedStats,
  getAllFeedbackReceived,
} from './actions'

const mapStateToProps = (state) => ({
  feedbacks: state.feedbackReceived.feedbacks,
  stats: state.feedbackReceived.stats,
  hasLoading: state.feedbackReceived.hasLoading,
  hasError: state.feedbackReceived.hasError,
})

const mapDispatchToProps = {
  getAllFeedbackReceivedStats,
  getAllFeedbackReceived,
}

const propTypes = {
  getAllFeedbackReceivedStats: PropTypes.func.isRequired,
  getAllFeedbackReceived: PropTypes.func.isRequired,
  stats: PropTypes.object.isRequired,
  feedbacks: PropTypes.array.isRequired,
  hasLoading: PropTypes.bool,
  hasError: PropTypes.bool,
}

class FeedbackReceivedContainer extends PureComponent {
  componentDidMount() {
    this.props.getAllFeedbackReceivedStats()
    this.props.getAllFeedbackReceived()
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
    return <FeedbackReceivedComponent stats={stats} feedbacks={feedbacks} />
  }
}

FeedbackReceivedContainer.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackReceivedContainer)
