import {
  LOADING_IN_ANONYMOUS_FEEDBACK,
  VERIFY_ANONYMOUS_URL_SAGA,
  VERIFY_ANONYMOUS_URL_SUCCESS,
  VERIFY_ANONYMOUS_URL_FAILURE,
  GET_ANONYMOUS_QUESTION_SUCCESS,
  GET_ANONYMOUS_QUESTION_FAILURE,
  SEND_ANONYMOUS_FEEDBACK_SAGA,
  SEND_ANONYMOUS_FEEDBACK_SUCCESS,
  SEND_ANONYMOUS_FEEDBACK_FAILURE,
} from '../../constants'

/**
 * all actions that sagas.js will listen
 */
export function verifyAnonymousURL(code) {
  return {
    type: VERIFY_ANONYMOUS_URL_SAGA,
    code,
  }
}

export function sendAnonymousFeedback(data) {
  return {
    type: SEND_ANONYMOUS_FEEDBACK_SAGA,
    data,
  }
}

/**
 * all actions that impact Redux
 */
export function showLoading() {
  return {
    type: LOADING_IN_ANONYMOUS_FEEDBACK,
  }
}

export function verifyAnonymousURLSuccess(code) {
  return {
    type: VERIFY_ANONYMOUS_URL_SUCCESS,
    code,
  }
}

export function verifyAnonymousURLFailure(message) {
  return {
    type: VERIFY_ANONYMOUS_URL_FAILURE,
    message,
  }
}

export function getAnonymousQuestionSuccess(id, questions) {
  return {
    type: GET_ANONYMOUS_QUESTION_SUCCESS,
    id,
    questions,
  }
}

export function getAnonymousQuestionFailure(message) {
  return {
    type: GET_ANONYMOUS_QUESTION_FAILURE,
    message,
  }
}

export function sendAnonymousFeedbackSuccess() {
  return {
    type: SEND_ANONYMOUS_FEEDBACK_SUCCESS,
  }
}

export function sendAnonymousFeedbackFailure(message) {
  return {
    type: SEND_ANONYMOUS_FEEDBACK_FAILURE,
    message,
  }
}
