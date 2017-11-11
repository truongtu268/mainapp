import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Checkbox,
  Radio,
  Slider,
} from 'antd'
import {
  BotFrame,
  ChatBoxWrapper,
  ChatBox,
  Footer,
  AnswerContent,
  AntInput,
  SendButton,
  Options,
} from 'styles/bot-layout'
import RadioOption from 'components/Bot/RadioOption'
import CheckboxOption from 'components/Bot/CheckboxOption'
import BubbleBot from './BubbleBot'
import BubbleBotStart from './BubbleBotStart'
import BubbleUser from './BubbleUser'

const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group

const propTypes = {
  steps: PropTypes.object.isRequired,
  firstQuestion: PropTypes.string.isRequired,
  userCommand: PropTypes.func.isRequired,
  submitIssue: PropTypes.func.isRequired,
}

const validDiscussCommands = ['discuss', 'create discussion', 'create discuss', 'discussion', 'discussions']
const validFeedbackCommands = ['feedback', 'anonymous feedback', 'create anonymous feedback', 'create feedback']
const validSurveyCommands = ['survey', 'do survey', 'take survey']

class Bot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      previousStep: {},
      currentStep: {},
      renderedSteps: [],
      steps: {},
    }

    this.onKeyboardInput = this.onKeyboardInput.bind(this)
    this.onUserInput = this.onUserInput.bind(this)
    this.onMentionChange = this.onMentionChange.bind(this)
    this.onCheckboxChange = this.onCheckboxChange.bind(this)
    this.onRadioChange = this.onRadioChange.bind(this)
    this.onSlideChange = this.onSlideChange.bind(this)
    this.onPressDone = this.onPressDone.bind(this)

    this.handleCmd = this.handleCmd.bind(this)
    this.triggerNextStep = this.triggerNextStep.bind(this)
    this.pushConversation = this.pushConversation.bind(this)

    this.renderStep = this.renderStep.bind(this)
    this.renderInput = this.renderInput.bind(this)
    this.renderSendButton = this.renderSendButton.bind(this)
  }

  componentWillMount() {
    const keys = Object.keys(this.props.steps)
    const currentStep = this.props.steps[keys[0]]
    const renderedSteps = [this.props.steps[currentStep.id]]

    this.setState({
      currentStep,
      renderedSteps,
      steps: this.props.steps,
    })
  }

  componentDidMount() {
    const chatbotContent = document.querySelector('.bot-conversation')

    if (chatbotContent) {
      chatbotContent.addEventListener('DOMNodeInserted', this.onNodeInserted)
    }
  }

  componentWillReceiveProps(nextProps) {
    const code = nextProps.firstQuestion
    if (code && code !== this.props.firstQuestion) {
      this.setState({
        steps: nextProps.steps,
      }, () => this.pushConversation(this.state.steps[code]))
    }
  }

  componentWillUnmount() {
    const chatbotContent = document.querySelector('.bot-conversation')

    if (chatbotContent) {
      chatbotContent.removeEventListener('DOMNodeInserted', this.onNodeInserted)
    }
  }

  onNodeInserted(event) { // eslint-disable-line class-methods-use-this
    event.currentTarget.scrollTop = event.currentTarget.scrollHeight
  }

  // Handle type: 2 --- `text`
  onKeyboardInput(event) {
    event.preventDefault()

    const inputValue = document.querySelector('.bot-input').value.trim()
    document.querySelector('.bot-input').value = ''
    this.AntInput.refs.input.resizeTextarea()
    // Note: check this issue => https://github.com/facebook/react/issues/4936#issuecomment-179909980
    this.onUserInput(inputValue)
  }

  onUserInput(inputValue) {
    const { renderedSteps } = this.state
    let { currentStep } = this.state

    if (inputValue) {
      // If user type `cancel` while doing something
      // go to `cancel` object
      if (inputValue.toLowerCase() === 'cancel') {
        currentStep = Object.assign({}, currentStep, {
          message: inputValue,
          trigger: 'cancel',
        })
      } else {
        currentStep = Object.assign({}, currentStep, {
          message: inputValue,
          value: [inputValue],
        })
      }

      renderedSteps.push(currentStep)

      this.setState({
        currentStep,
        renderedSteps,
      })
    }
  }

  // Handle type: 2 --- `mention`
  onMentionChange(codeArr) {
    let { currentStep } = this.state
    const { answerList } = currentStep

    currentStep = Object.assign({}, currentStep, {
      message: codeArr.map((code) => answerList.find((ans) => ans.code === code).fullName),
      icon: (codeArr.map((code) => answerList.find((ans) => ans.code === code))).map((i) => i.icon),
      value: codeArr,
    })
    this.setState({ currentStep })
  }

  // Handle type: 3 --- `checkbox`
  onCheckboxChange(codeArr) {
    let { currentStep } = this.state
    const { answerList } = currentStep

    currentStep = Object.assign({}, currentStep, {
      message: codeArr.map((code) => answerList.find((ans) => ans.code === code).content),
      icon: (codeArr.map((code) => answerList.find((ans) => ans.code === code))).map((i) => i.icon),
      value: codeArr,
    })
    this.setState({ currentStep })
  }

  // Handle type: 5 --- `radio`
  onRadioChange(event) {
    let { currentStep } = this.state
    const { answerList } = currentStep

    currentStep = Object.assign({}, currentStep, {
      message: event.target.value,
      icon: (answerList.filter((ans) => ans.content === event.target.value))[0].icon,
      value: (answerList.filter((ans) => ans.content === event.target.value)).map((i) => i.code),
    })
    this.setState({ currentStep })
  }

  // Handle type 6 --- `scale`
  onSlideChange(value) {
    let { currentStep } = this.state
    currentStep = Object.assign({}, currentStep, {
      message: value,
      value: [value],
    })
    this.setState({ currentStep })
  }

  onPressDone() {
    const { currentStep, renderedSteps } = this.state
    renderedSteps.push(currentStep)
    this.setState({
      renderedSteps,
    })
  }

  triggerNextStep() {
    const { renderedSteps, steps } = this.state
    let { currentStep, previousStep } = this.state

    if (currentStep.id === 'call_api') {
      const value = currentStep.message.toLowerCase()

      if (validFeedbackCommands.includes(value)) {
        this.props.userCommand('normal process')  // get feedback questions
      } else
      if (validDiscussCommands.includes(value)) {
        this.props.userCommand('public issue')  // get discussion questions
      } else
      if (validSurveyCommands.includes(value)) {
        this.props.userCommand('survey')  // get survey questions
      } else {
        this.pushConversation(this.state.steps.error)
      }
    } else
    if (currentStep.trigger) {
      // if finished and next trigger is `done`
      // then send a submit issue request
      if (currentStep.trigger === 'submit') {
        this.props.submitIssue(this.state.renderedSteps)
      }

      // and keep everything move on!
      const nextStep = Object.assign({}, steps[currentStep.trigger])
      previousStep = currentStep
      currentStep = nextStep

      this.setState({ previousStep, currentStep }, () => {
        if (nextStep.isUser) {
          if (this.AntInput) {
            this.AntInput.focus()
          }
        } else {
          renderedSteps.push(nextStep)
          this.setState({ renderedSteps })
        }
      })
    }
  }

  pushConversation(step) {
    const { renderedSteps } = this.state
    let { previousStep, currentStep } = this.state

    const nextStep = Object.assign({}, step)
    previousStep = currentStep
    currentStep = nextStep

    renderedSteps.push(nextStep)

    this.setState({
      previousStep,
      currentStep,
      renderedSteps,
    })
  }

  // Handle command buttons clicked
  handleCmd(code) {
    this.onUserInput(code)
  }

  renderStep(step, index) {
    // Render special bubble for Bot
    if (step.id === 'init' || step.id === 'init2') {
      return (
        <BubbleBotStart
          key={index}
          message={step.message}
          handleCmd={this.handleCmd}
          triggerNextStep={this.triggerNextStep}
        />
      )
    }

    if (step.isUser) {
      return (
        <BubbleUser
          key={index}
          type={step.type}
          message={step.message}
          icon={step.icon || ''}
          triggerNextStep={this.triggerNextStep}
        />
      )
    }

    return (
      <BubbleBot
        key={index}
        message={step.message}
        triggerNextStep={this.triggerNextStep}
      />
    )
  }

  renderInput() {
    const { currentStep } = this.state

    switch (currentStep.type) {
      case 2: {
        const options = currentStep.answerList.map((o) => <CheckboxOption key={o.code} code={o.code} content={o.fullName} img={o.avatar} />)
        return (
          <Options key={currentStep.id}>
            <CheckboxGroup onChange={this.onMentionChange}>
              { options }
            </CheckboxGroup>
          </Options>
        )
      }
      case 3: {
        const options = currentStep.answerList.map((o) => <CheckboxOption key={o.code} code={o.code} content={o.content} img={o.icon} />)
        return (
          <Options key={currentStep.id}>
            <CheckboxGroup onChange={this.onCheckboxChange}>
              { options }
            </CheckboxGroup>
          </Options>
        )
      }
      case 5: {
        const options = currentStep.answerList.map((o) => <RadioOption key={o.code} content={o.content} img={o.icon} />)
        return (
          <RadioGroup key={currentStep.id} className="perkfec-radio" onChange={this.onRadioChange} size="medium">
            { options }
          </RadioGroup>
        )
      }
      case 6: {
        const [min, max] = currentStep.answerList
        return (
          <div className="icon-wrapper">
            <div className="perkfec-slider">
              <img src={min.icon} alt="" />
              {min.weight}
            </div>
            <Slider
              step={1}
              min={min.weight}
              max={max.weight}
              onChange={this.onSlideChange}
              className="perkfec-slider"
            />
            <div className="perkfec-slider">
              <img src={max.icon} alt="" />
              {max.weight}
            </div>
          </div>
        )
      }
      case 1:
      default: {
        return (
          <AntInput
            className="bot-input"
            innerRef={(ref) => { this.AntInput = ref }}
            type="textarea"
            autosize
            placeholder="Type a message ..."
            onPressEnter={this.onKeyboardInput}
          />
        )
      }
    }
  }

  renderSendButton() {
    const { currentStep } = this.state

    switch (currentStep.type) {
      case 2:
      case 3:
      case 5:
      case 6: {
        return <SendButton onClick={this.onPressDone}>Done</SendButton>
      }
      case 1:
      default: {
        return (
          <SendButton onClick={this.onKeyboardInput}>
            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
          </SendButton>
        )
      }
    }
  }

  render() {
    const { renderedSteps, currentStep } = this.state

    return (
      <BotFrame className="bot-container">
        <ChatBoxWrapper className="bot-content">
          <ChatBox className="bot-conversation">
            { renderedSteps.map(this.renderStep) }
          </ChatBox>
        </ChatBoxWrapper>
        <Footer className="bot-footer">
          <AnswerContent type={currentStep.type}>{ this.renderInput() }</AnswerContent>
          { this.renderSendButton() }
        </Footer>
      </BotFrame>
    )
  }
}

Bot.propTypes = propTypes

export default Bot
