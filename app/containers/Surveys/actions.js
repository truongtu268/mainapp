import * as constants from '../../constants'

/**
 * all actions that sagas.js will listen
 */
export function showLoading() {
  return {
    type: constants.LOADING_IN_SURVEY,
  }
}

export function getAllSurveyTemplates() {
  return {
    type: constants.GET_ALL_SURVEY_TEMPLATE_SAGA,
  }
}

export function getAllSurveyTemplatesSuccess(surveyTemplates) {
  return {
    type: constants.GET_ALL_SURVEY_TEMPLATE_SUCCESS,
    surveyTemplates,
  }
}

export function getAllSurveyTemplatesFailure(message) {
  return {
    type: constants.GET_ALL_SURVEY_TEMPLATE_FAILURE,
    message,
  }
}

export function getMyCreatedSurveys() {
  return {
    type: constants.GET_MY_CREATED_SURVEYS_SAGA,
  }
}

export function getMyCreatedSurveysSuccess(surveys) {
  return {
    type: constants.GET_MY_CREATED_SURVEYS_SUCCESS,
    surveys,
  }
}

export function getMyCreatedSurveysFailure(message) {
  return {
    type: constants.GET_MY_CREATED_SURVEYS_FAILURE,
    message,
  }
}

export function getMyRequestedSurveys() {
  return {
    type: constants.GET_MY_REQUESTED_SURVEYS_SAGA,
  }
}

export function getMyRequestedSurveysSuccess(surveys) {
  return {
    type: constants.GET_MY_REQUESTED_SURVEYS_SUCCESS,
    surveys,
  }
}

export function getMyRequestedSurveysFailure(message) {
  return {
    type: constants.GET_MY_REQUESTED_SURVEYS_FAILURE,
    message,
  }
}

export function deleteSurvey(templateCode) {
  return {
    type: constants.DELETE_SURVEY_REQUEST,
    payload: {
      templateCode,
    },
  }
}

export function deleteSurveySuccess(templateCode) {
  return {
    type: constants.DELETE_SURVEY_SUCCESS,
    payload: {
      templateCode,
    },
  }
}

export function deleteSurveyFailure(message) {
  return {
    type: constants.DELETE_SURVEY_FAILURE,
    message,
  }
}

export function clearSurveyEdit() {
  return {
    type: constants.CLEAR_SURVEY_EDIT,
  }
}
