import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import {
  getFeedbackDiscussion,
  voteForFeedback,
  commentFeedback,
  updateFeedback,
  updateStatePublicIssue,
} from './actions'
import FeedbackDiscussion from '../../components/FeedbackDiscussion/FeedbackDiscussion'

const mapStateToProps = (state) => ({
  feedback: state.feedbackDiscussion.feedback,
  hasLoading: state.feedbackDiscussion.hasLoading,
  hasError: state.feedbackDiscussion.hasError,
  submitingComment: state.feedbackDiscussion.submitingComment,
})

// Return dipacth action immediately
const mapDispatchToProps = {
  getFeedbackDiscussion,
  voteForFeedback,
  commentFeedback,
  updateFeedback,
  updateStatePublicIssue,
}

const propTypes = {
  match: PropTypes.object,
  getFeedbackDiscussion: PropTypes.func.isRequired,
  voteForFeedback: PropTypes.func.isRequired,
  commentFeedback: PropTypes.func.isRequired,
  updateFeedback: PropTypes.func.isRequired,
  updateStatePublicIssue: PropTypes.func.isRequired,
  feedback: PropTypes.object.isRequired,
  hasLoading: PropTypes.bool.isRequired,
  submitingComment: PropTypes.bool.isRequired,
}

class FeedbackDiscussionContainer extends Component {
  componentDidMount() {
    const feedbackCode = this.props.match.params.feedbackCode
    this.props.getFeedbackDiscussion({ feedbackCode })
  }

  render() {
    if (this.props.hasLoading) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      )
    }
    const {
      feedback,
      submitingComment,
    } = this.props

    return (
      <FeedbackDiscussion
        feedback={feedback}
        submitingComment={submitingComment}
        voteForFeedback={this.props.voteForFeedback}
        commentFeedback={this.props.commentFeedback}
        updateFeedback={this.props.updateFeedback}
        updateStatePublicIssue={this.props.updateStatePublicIssue}
      />
    )
  }
}

FeedbackDiscussionContainer.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackDiscussionContainer)
