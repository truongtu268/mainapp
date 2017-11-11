import {
  LOADING_IN_FEEDBACK,
  GET_ALL_FEEDBACK_RECEIVED_STATS_SAGA,
  GET_ALL_FEEDBACK_RECEIVED_STATS_SUCCESS,
  GET_ALL_FEEDBACK_RECEIVED_STATS_FAILURE,
  GET_ALL_FEEDBACK_RECEIVED_SAGA,
  GET_ALL_FEEDBACK_RECEIVED_SUCCESS,
  GET_ALL_FEEDBACK_RECEIVED_FAILURE,
} from '../../constants'

/**
 * all actions that sagas.js will listen
 */
export function showLoading() {
  return {
    type: LOADING_IN_FEEDBACK,
  }
}

export function getAllFeedbackReceivedStats() {
  return {
    type: GET_ALL_FEEDBACK_RECEIVED_STATS_SAGA,
  }
}

export function getAllFeedbackReceivedStatsSuccess(stats) {
  return {
    type: GET_ALL_FEEDBACK_RECEIVED_STATS_SUCCESS,
    stats,
  }
}

export function getAllFeedbackReceivedStatsFailure(message) {
  return {
    type: GET_ALL_FEEDBACK_RECEIVED_STATS_FAILURE,
    message,
  }
}

export function getAllFeedbackReceived() {
  return {
    type: GET_ALL_FEEDBACK_RECEIVED_SAGA,
  }
}

export function getAllFeedbackReceivedSuccess(feedbacks) {
  return {
    type: GET_ALL_FEEDBACK_RECEIVED_SUCCESS,
    feedbacks,
  }
}

export function getAllFeedbackReceivedFailure(message) {
  return {
    type: GET_ALL_FEEDBACK_RECEIVED_FAILURE,
    message,
  }
}
