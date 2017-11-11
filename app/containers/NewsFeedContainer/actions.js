import {
  GET_LOG_PROCCESSES_SAGA,
  GET_LOG_PROCCESSES_SUCCESS,
  GET_LOG_PROCCESSES_FAILED,
} from '../../constants'

export function getLogProccesses(accessToken) {
  return {
    type: GET_LOG_PROCCESSES_SAGA,
    accessToken,
  }
}

export function getLogProccessesSucceed(data) {
  return {
    type: GET_LOG_PROCCESSES_SUCCESS,
    data,
  }
}

export function getLogProccessesFailed(message) {
  return {
    type: GET_LOG_PROCCESSES_FAILED,
    message,
  }
}
