import {
  LOADING_IN_BOT,
  GET_QUESTION_SUCCESS,
  GET_QUESTION_FAILURE,
  CLEAR_QUESTIONS,
} from '../../constants'

export function getQuestionRequest(api, surveycode = '') {
  return {
    type: 'GET_QUESTION_REQUEST',
    api,
    surveycode,
  }
}

export function submitIssueRequest(data) {
  return {
    type: 'SUBMIT_ISSUE_REQUEST',
    data,
  }
}

export function submitSurveyRequest(data) {
  return {
    type: 'SUBMIT_SURVEY_REQUEST',
    data,
  }
}

export function showLoading() {
  return {
    type: LOADING_IN_BOT,
  }
}

export function getQuestionSuccess(questions) {
  return {
    type: GET_QUESTION_SUCCESS,
    questions,
  }
}

export function getQuestionFailure(message) {
  return {
    type: GET_QUESTION_FAILURE,
    message,
  }
}

export function clearQuestions() {
  return {
    type: CLEAR_QUESTIONS,
  }
}

