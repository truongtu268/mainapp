import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Chat, ChatBubble } from 'styles/bot-layout'

const propTypes = {
  type: PropTypes.number.isRequired,
  message: PropTypes.any,
  icon: PropTypes.any,
  triggerNextStep: PropTypes.func.isRequired,
}

const defaultProps = {
  message: '',
  icon: '',
}

class BubbleUser extends Component {
  constructor(props) {
    super(props)
    this.renderMessage = this.renderMessage.bind(this)
  }

  componentDidMount() {
    // Prevent Bot bubble and User bubble show at the same time
    setTimeout(() => this.props.triggerNextStep(), 500)
  }

  renderMessage() {
    const { type, message, icon } = this.props

    switch (type) {
      case 2:
      case 3: {
        return (<div>{message.join(', ')}</div>)
      }
      case 1:
      case 5:
      default: {
        return icon
          ? (<div><img src={icon} alt="" />{message}</div>)
          : (<div>{message}</div>)
      }
    }
  }

  render() {
    return (
      <Chat isUser>
        <ChatBubble isUser>{this.renderMessage()}</ChatBubble>
      </Chat>
    )
  }
}

BubbleUser.propTypes = propTypes
BubbleUser.defaultProps = defaultProps

export default BubbleUser
