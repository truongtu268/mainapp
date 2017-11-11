import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import AnonymousFeedback from '../../components/AnonymousFeedback/AnonymousFeedback'
import {
  verifyAnonymousURL,
  sendAnonymousFeedback,
} from './actions'

const mapStateToProps = (state) => ({
  id: state.anonymousFeedback.id,
  questions: state.anonymousFeedback.questions,
  feedbackCode: state.anonymousFeedback.code,
  showLoading: state.anonymousFeedback.isLoading,
})

const mapDispatchToProps = {
  verifyAnonymousURL,
  sendAnonymousFeedback,
}

const propTypes = {
  params: PropTypes.any.isRequired,
  id: PropTypes.number.isRequired,
  showLoading: PropTypes.bool.isRequired,
  questions: PropTypes.array.isRequired,
  feedbackCode: PropTypes.string.isRequired,
  verifyAnonymousURL: PropTypes.func.isRequired,
  sendAnonymousFeedback: PropTypes.func.isRequired,
}

class AnonymousFeedbackContainer extends Component {
  componentDidMount() {
    // verify URL and get questions list
    const url = this.props.match.params.code
    this.props.verifyAnonymousURL(url)
  }

  shouldComponentUpdate(nextProps) {
    const { questions } = this.props
    return nextProps.questions.length !== questions.length
  }

  render() {
    const { showLoading, id, questions, feedbackCode } = this.props

    if (showLoading || questions.length === 0) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      )
    }

    let questionsArray = questions
    // sort Array by `orderInQuestion`
    questionsArray = questionsArray.sort((a, b) => a.orderInQuestion > b.orderInQuestion)
    // Cleaning object
    questionsArray = questionsArray.map((question) => Object.assign({}, {
      title: question.title,
      meaningKey: question.meaningKey,
      type: question.type,
      text: question.text,
      content: question.content,
      isRequireAnswer: question.isRequireAnswer,
    }))

    return (
      <AnonymousFeedback
        feedbackId={id}
        questions={questionsArray}
        feedbackCode={feedbackCode}
        sendListFeedback={this.props.sendAnonymousFeedback}
      />
    )
  }
}

AnonymousFeedbackContainer.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(AnonymousFeedbackContainer)
