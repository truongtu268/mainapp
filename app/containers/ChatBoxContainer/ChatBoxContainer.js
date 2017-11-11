import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ChatBoxContainer from '../../components/ChatBox'
const io = require('sails.io.js')(require('socket.io-client'));

const mapStateToProps = (state) => ({
  allMessage: state.chatbox.allMessage,
})

// Return dipacth action immediately
const mapDispatchToProps = (dispatch) => ({
  dispatch,
})

const propTypes = {
  allMessage: PropTypes.object,
}

class ChatBoxContainerContainer extends Component {
  constructor(props) {
    super(props)
    this.onPostEvent = this.onPostEvent.bind(this)
  }
  componentDidMount() {
    io.sails.url = 'http://localhost:1337'
    io.socket.get('/users/member', (resData) => {
      console.log(resData)
    })
    io.socket.on('users', (event) => {
      console.log(event);
    });
  }
  onPostEvent() {
    io.socket.post('/chat/addConv', { user: 1, message: 'Truongtu268' }, (resData) => {
      console.log(resData,122)
    })
  }

  render() {
    const { allMessage } = this.props;
    return (
      <ChatBoxContainer chatMessage={allMessage.list} addPost={this.onPostEvent} />
    )
  }
}

ChatBoxContainerContainer.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(ChatBoxContainerContainer)
