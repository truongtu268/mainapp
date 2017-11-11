import {
  GET_CHAT_BOX,
  SEND_CHAT_BOX,
  GET_CHAT_BOX_SUCCESS,
} from '../../constants'

export function getChatBox() {
  return {
    type: GET_CHAT_BOX,
  }
}

export function sendChatBox(data) {
  return {
    type: SEND_CHAT_BOX,
    data,
  }
}

export function getChatBoxSuccess(list) {
  return {
    type: GET_CHAT_BOX_SUCCESS,
    list,
  }
}
