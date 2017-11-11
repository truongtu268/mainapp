import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Chat,
  ChatBubble,
  ChatBubbleIndicator,
  Round,
} from 'styles/bot-layout'
import botURL from '../../images/bot.png'

const propTypes = {
  message: PropTypes.string.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  previousValue: PropTypes.any,
}

const defaultProps = {
  previousValue: '',
}

class BubbleBot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }

    this.renderMessage = this.renderMessage.bind(this)
  }

  componentDidMount() {
    setTimeout(() => this.setState({
      loading: false,
    }, () => this.props.triggerNextStep()),
    1500)
  }

  renderMessage() {
    let message = this.props.message
    const { previousValue } = this.props
    message = message.replace(/{previousValue}/g, previousValue)
    return message
  }

  render() {
    return (
      <Chat>
        <div className="chat__photo"><img src={botURL} alt="" /></div>
        { this.state.loading &&
          <ChatBubbleIndicator>
            { [1, 2, 3].map((circle) => <Round key={`round${circle}`} order={circle} />) }
          </ChatBubbleIndicator>
        }
        { !this.state.loading && <ChatBubble>{this.renderMessage()}</ChatBubble> }
      </Chat>
    )
  }
}

BubbleBot.propTypes = propTypes
BubbleBot.defaultProps = defaultProps

export default BubbleBot
