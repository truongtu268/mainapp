import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import _ from 'lodash'
import Bot from 'components/Bot/Bot'
import {
  getQuestionRequest,
  submitSurveyRequest,
} from './actions'

const mapStateToProps = (state) => ({
  questions: state.bot.questions,
})

const mapDispatchToProps = {
  getQuestionRequest,
  submitSurveyRequest,
}

const propTypes = {
  sample: PropTypes.string.isRequired,
  templateCode: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  getQuestionRequest: PropTypes.func.isRequired,
  submitSurveyRequest: PropTypes.func.isRequired,
}

class BotContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      steps: require(`./presets/${props.sample}.json`), // eslint-disable-line global-require
      firstQuestion: '', // name of question code that should be trigger after getting all questions from API
      type: '',
      dataSurvey: {
        templateCode: '',
        answers: [],
      },
      dataIssue: {
        content: {
          title: '',
          suggestion: '',
          content: '',
          compentencies: [],
        },
        receiver: [],
        isAnonymous: false,
        feedbackType: 'issue',
      },
    }

    this.userCommand = this.userCommand.bind(this)
    this.submitIssue = this.submitIssue.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const steps = {}
    const { questions } = nextProps

    if (questions.length) {
      questions.forEach((q, i) => {
        const isLastQuestion = (i === questions.length - 1)
        const template = {
          id: q.code,
          meaningKey: q.meaningKey,
          type: 1,
          message: q.content,
          isUser: false,
          trigger: null,
        }

        if (q.meaningKey === 1) {
          // Bot bubble
          if (q.code === 'survey_finished') {
            // finish conversation if code === 'survey_finished'
            steps[`${q.code}_question`] = Object.assign({}, template, {
              trigger: 'init2',
            })
          } else {
            // meaningKey: 1 (MEANINGLESS) -> auto skip to next Bot's bubble
            steps[`${q.code}_question`] = Object.assign({}, template, {
              trigger: !isLastQuestion ? `${questions[i + 1].code}_question` : 'submit',
            })
          }
        } else {
          // Bot bubble
          // require User's input
          steps[`${q.code}_question`] = Object.assign({}, template, {
            trigger: `${q.code}_answer`,
          })

          // User bubble
          steps[`${q.code}_answer`] = Object.assign({}, template, {
            id: q.code,
            type: q.type,
            message: null,
            answerList: q.answerList,
            isUser: true,
            trigger: !isLastQuestion ? `${questions[i + 1].code}_question` : 'submit',
          })
        }
      })

      this.setState({
        steps: {
          ...this.state.steps,
          ...steps,
        },
        firstQuestion: `${questions[0].code}_question`,
      })
    }
  }

  userCommand(type) {
    const { templateCode } = this.props
    this.setState({ type })
    this.props.getQuestionRequest(type, templateCode)
  }

  submitIssue(data) {
    const { templateCode } = this.props

    if (this.state.type === 'survey') {
      let answers = data.filter((d) => d.value && d.id !== 'call_api')
      answers = answers.map((answer) => ({
        questionCode: answer.id,
        answerList: {
          content: answer.value,
        },
      }))

      this.setState({
        dataSurvey: {
          templateCode,
          answers,
        },
      })

      console.log(this.state.dataSurvey)
      // this.props.submitSurveyRequest(this.state.dataSurvey)
    }

    // Reset state
    this.setState({
      steps: require('./presets/bot.json'), // eslint-disable-line global-require
      firstQuestion: '',
      type: '',
      dataSurvey: [],
      dataIssue: {
        content: {
          title: '',
          suggestion: '',
          content: '',
          compentencies: [],
        },
        receiver: [],
        isAnonymous: false,
        feedbackType: 'issue',
      },
    })

    // const receiverMap = _.map(receiver, (re) => {
    //   return re.mail
    // })

    // // send discussion
    // if (!data.isAnonymous) {
    //   const sentData = {
    //     content: {
    //       title,
    //       content,
    //       compentencies: ['Adaptability', 'Adaptability'],
    //     },
    //     feedbackType: 'issue',
    //     isAnonymous: String(isAnonymous),
    //   }
    //   this.props.submitIssueRequest(sentData)
    // } else {
    //   // send anonymous feedback
    //   const sentData = {
    //     content: {
    //       content,
    //       suggestion,
    //       compentencies: ['Adaptability', 'Adaptability'],
    //     },
    //     receiver: receiverMap,
    //     feedbackType: 'issue',
    //     isAnonymous: String(isAnonymous),
    //   }
    //   // this.props.submitIssueRequest(sentData)
    // }
  }

  render() {
    const { steps, firstQuestion } = this.state

    return (
      <Bot
        steps={steps}
        firstQuestion={firstQuestion}
        userCommand={this.userCommand}
        submitIssue={this.submitIssue}
      />
    )
  }
}

BotContainer.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(BotContainer)

