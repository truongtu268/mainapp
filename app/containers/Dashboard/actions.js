import {
  LOADING_ALL_FEEDBACK,
  FETCH_ALL_FEEDBACK_SAGA,
  FETCH_ALL_FEEDBACK_SUCCESS,
  FETCH_ALL_FEEDBACK_FAILURE,
} from '../../constants'

/**
 * all actions that sagas.js will listen
 */
export function fetchAllFeedbackRequest() {
  return {
    type: FETCH_ALL_FEEDBACK_SAGA,
  }
}

/**
 * all actions that impact Redux
 */
export function loadingAllFeedback() {
  return {
    type: LOADING_ALL_FEEDBACK,
  }
}

export function fetchAllFeedbackSuccess(feedback) {
  return {
    type: FETCH_ALL_FEEDBACK_SUCCESS,
    feedback,
  }
}

export function fetchAllFeedbackFailure(message) {
  return {
    type: FETCH_ALL_FEEDBACK_FAILURE,
    message,
  }
}
