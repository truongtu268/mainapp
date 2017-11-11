import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Chat,
  ChatStart,
  ChatBubbleIndicator,
  Round,
} from 'styles/bot-layout'
// import { renderHTML } from '../../utils/appUtils'
import botURL from '../../images/bot.png'

const propTypes = {
  message: PropTypes.string.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  handleCmd: PropTypes.func.isRequired,
}

class BubbleBot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({
      loading: false,
    }, () => this.props.triggerNextStep()),
    1500)
  }

  render() {
    return (
      <Chat>
        <div className="chat__photo"><img src={botURL} alt="" /></div>
        { this.state.loading &&
          <ChatBubbleIndicator>
            { [1, 2, 3].map(circle => <Round key={`round${circle}`} order={circle} />) }
          </ChatBubbleIndicator>
        }
        { !this.state.loading &&
          <ChatStart>
            {this.props.message}
            <ul className="chat__options">
              <li><button onClick={() => this.props.handleCmd('Discussion')}>Discussion</button></li>
              <li><button onClick={() => this.props.handleCmd('Feedback')}>Anonymous Feedback</button></li>
            </ul>
          </ChatStart>
        }
      </Chat>
    )
  }
}

BubbleBot.propTypes = propTypes
// BubbleBot.defaultProps = defaultProps

export default BubbleBot
