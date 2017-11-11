import {
  LOADING_IN_FEEDBACK,
  GET_ALL_FEEDBACK_GIVE_STATS_SAGA,
  GET_ALL_FEEDBACK_GIVE_STATS_SUCCESS,
  GET_ALL_FEEDBACK_GIVE_STATS_FAILURE,
  GET_ALL_FEEDBACK_GIVE_SAGA,
  GET_ALL_FEEDBACK_GIVE_SUCCESS,
  GET_ALL_FEEDBACK_GIVE_FAILURE,
} from '../../constants'

/**
 * all actions that sagas.js will listen
 */
export function showLoading() {
  return {
    type: LOADING_IN_FEEDBACK,
  }
}

export function getAllFeedbackGiveStats() {
  return {
    type: GET_ALL_FEEDBACK_GIVE_STATS_SAGA,
  }
}

export function getAllFeedbackGiveStatsSuccess(stats) {
  return {
    type: GET_ALL_FEEDBACK_GIVE_STATS_SUCCESS,
    stats,
  }
}

export function getAllFeedbackGiveStatsFailure(message) {
  return {
    type: GET_ALL_FEEDBACK_GIVE_STATS_FAILURE,
    message,
  }
}

export function getAllFeedbackGive() {
  return {
    type: GET_ALL_FEEDBACK_GIVE_SAGA,
  }
}

export function getAllFeedbackGiveSuccess(feedbacks) {
  return {
    type: GET_ALL_FEEDBACK_GIVE_SUCCESS,
    feedbacks,
  }
}

export function getAllFeedbackGiveFailure(message) {
  return {
    type: GET_ALL_FEEDBACK_GIVE_FAILURE,
    message,
  }
}
