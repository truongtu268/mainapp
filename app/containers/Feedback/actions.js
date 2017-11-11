import {
  GET_LINK_FEEDBACK_SAGA,
  GET_LINK_FEEDBACK_SUCCESS,
} from '../../constants'

export function getLinkFeedBack(data) {
  return {
    type: GET_LINK_FEEDBACK_SAGA,
    data,
  }
}

export function getLinkFeedBackSuccess(data) {
  return {
    type: GET_LINK_FEEDBACK_SUCCESS,
    data,
  }
}
