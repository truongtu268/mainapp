import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Chat,
  ChatBubble,
} from 'styles/bot-layout'
import botURL from '../../images/bot.png'

const propTypes = {
  message: PropTypes.string.isRequired,
}

class PreviewBot extends Component {
  render() {
    return (
      <Chat>
        <div className="chat__photo"><img src={botURL} alt="" /></div>
        <ChatBubble>{this.props.message}</ChatBubble>
      </Chat>
    )
  }
}

PreviewBot.propTypes = propTypes

export default PreviewBot
