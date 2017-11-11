import {
  LOADING_IN_FEEDBACK_DISCUSSION,
  UPDATE_FEEDBACK_SAGA,
  UPDATE_FEEDBACK_LOADING,
  UPDATE_FEEDBACK_SUCCESS,
  UPDATE_FEEDBACK_FAILURE,
  COMMENT_FEEDBACK_SAGA,
  COMMENT_FEEDBACK_LOADING,
  COMMENT_FEEDBACK_SUCCESS,
  COMMENT_FEEDBACK_FAILURE,
  VOTE_FOR_FEEDBACK_SAGA,
  VOTE_FOR_FEEDBACK_SUCCESS,
  VOTE_FOR_FEEDBACK_FAILURE,
  GET_FEEDBACK_DISCUSSION_SAGA,
  GET_FEEDBACK_DISCUSSION_SUCCESS,
  GET_FEEDBACK_DISCUSSION_FAILURE,
  UPDATE_STATE_PUBLIC_ISSUE_SAGA,
  UPDATE_STATE_PUBLIC_ISSUE_SUCCESS,
  UPDATE_STATE_PUBLIC_ISSUE_FAILURE,
} from '../../constants'

/**
 * all actions that sagas.js will listen
 */
export function showLoading() {
  return {
    type: LOADING_IN_FEEDBACK_DISCUSSION,
  }
}

export function getFeedbackDiscussion(data) {
  return {
    type: GET_FEEDBACK_DISCUSSION_SAGA,
    data,
  }
}

export function getFeedbackDiscussionSuccess(feedback) {
  return {
    type: GET_FEEDBACK_DISCUSSION_SUCCESS,
    feedback,
  }
}

export function getFeedbackDiscussionFailure(message) {
  return {
    type: GET_FEEDBACK_DISCUSSION_FAILURE,
    message,
  }
}

export function voteForFeedback(data) {
  return {
    type: VOTE_FOR_FEEDBACK_SAGA,
    data,
  }
}

export function voteForFeedbackSuccess(data) {
  return {
    type: VOTE_FOR_FEEDBACK_SUCCESS,
    data,
  }
}

export function voteForFeedbackFailure(message) {
  return {
    type: VOTE_FOR_FEEDBACK_FAILURE,
    message,
  }
}

export function commentFeedback(data) {
  return {
    type: COMMENT_FEEDBACK_SAGA,
    data,
  }
}

export function commentFeedbackLoading() {
  return {
    type: COMMENT_FEEDBACK_LOADING,
  }
}

export function commentFeedbackSuccess(data) {
  return {
    type: COMMENT_FEEDBACK_SUCCESS,
    data,
  }
}

export function commentFeedbackFailure(message) {
  return {
    type: COMMENT_FEEDBACK_FAILURE,
    message,
  }
}

export function updateFeedback(data) {
  return {
    type: UPDATE_FEEDBACK_SAGA,
    data,
  }
}

export function updateFeedbackLoading() {
  return {
    type: UPDATE_FEEDBACK_LOADING,
  }
}

export function updateFeedbackSuccess(data) {
  return {
    type: UPDATE_FEEDBACK_SUCCESS,
    data,
  }
}

export function updateFeedbackFailure(message) {
  return {
    type: UPDATE_FEEDBACK_FAILURE,
    message,
  }
}

export function updateStatePublicIssue(data) {
  return {
    type: UPDATE_STATE_PUBLIC_ISSUE_SAGA,
    data,
  }
}

export function updateStatePublicIssueSuccess(data) {
  return {
    type: UPDATE_STATE_PUBLIC_ISSUE_SUCCESS,
    data,
  }
}

export function updateStatePublicIssueFailure(message) {
  return {
    type: UPDATE_STATE_PUBLIC_ISSUE_FAILURE,
    message,
  }
}
