import {
  LOADING_IN_TRACKING,
  SEND_TRACKING_URL_TO_EMAIL_SAGA,
  RATING_FEEDBACK_SAGA,
  VERIFY_TRACKING_URL_SAGA,
  VERIFY_TRACKING_URL_SUCCESS,
  VERIFY_TRACKING_URL_FAILURE,
} from '../../constants'

/**
 * all actions that sagas.js will listen
 */
export function verifyTrackingUrl(data) {
  return {
    type: VERIFY_TRACKING_URL_SAGA,
    data,
  }
}

export function sendTrackingUrlToEmail(data) {
  return {
    type: SEND_TRACKING_URL_TO_EMAIL_SAGA,
    data,
  }
}

export function ratingFeedbackItem(data) {
  return {
    type: RATING_FEEDBACK_SAGA,
    data,
  }
}

/**
 * all actions that impact Redux
 */
export function showLoading() {
  return {
    type: LOADING_IN_TRACKING,
  }
}

export function verifyTrackingUrlSuccess(data) {
  return {
    type: VERIFY_TRACKING_URL_SUCCESS,
    data,
  }
}

export function verifyTrackingUrlFailure(message) {
  return {
    type: VERIFY_TRACKING_URL_FAILURE,
    message,
  }
}
