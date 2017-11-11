import {
  LOADING_IN_FEEDBACK,
  GET_ALL_FEEDBACK_PUBLIC_STATS_SAGA,
  GET_ALL_FEEDBACK_PUBLIC_STATS_SUCCESS,
  GET_ALL_FEEDBACK_PUBLIC_STATS_FAILURE,
  GET_ALL_FEEDBACK_PUBLIC_SAGA,
  GET_ALL_FEEDBACK_PUBLIC_SUCCESS,
  GET_ALL_FEEDBACK_PUBLIC_FAILURE,
} from '../../constants'

/**
 * all actions that sagas.js will listen
 */
export function showLoading() {
  return {
    type: LOADING_IN_FEEDBACK,
  }
}

export function getAllFeedbackPublicStats() {
  return {
    type: GET_ALL_FEEDBACK_PUBLIC_STATS_SAGA,
  }
}

export function getAllFeedbackPublicStatsSuccess(stats) {
  return {
    type: GET_ALL_FEEDBACK_PUBLIC_STATS_SUCCESS,
    stats,
  }
}

export function getAllFeedbackPublicStatsFailure(message) {
  return {
    type: GET_ALL_FEEDBACK_PUBLIC_STATS_FAILURE,
    message,
  }
}

export function getAllFeedbackPublic() {
  return {
    type: GET_ALL_FEEDBACK_PUBLIC_SAGA,
  }
}

export function getAllFeedbackPublicSuccess(feedbacks) {
  return {
    type: GET_ALL_FEEDBACK_PUBLIC_SUCCESS,
    feedbacks,
  }
}

export function getAllFeedbackPublicFailure(message) {
  return {
    type: GET_ALL_FEEDBACK_PUBLIC_FAILURE,
    message,
  }
}
