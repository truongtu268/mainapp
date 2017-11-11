import * as constants from '../../constants'

/**
 * all actions that sagas.js will listen
 */
export function showLoading() {
  return {
    type: constants.LOADING_IN_SURVEY,
  }
}

export function getSurveyDetailByTemplateCode(data) {
  return {
    type: constants.GET_SURVEY_DETAIL_SAGA,
    data,
  }
}

export function getSurveyDetailByTemplateCodeSuccess(title, list) {
  return {
    type: constants.GET_SURVEY_DETAIL_SUCCESS,
    title,
    list,
  }
}

export function getSurveyDetailByTemplateCodeFailure(message) {
  return {
    type: constants.GET_SURVEY_DETAIL_FAILURE,
    message,
  }
}

export function localUpdateSurveyTitle(value) {
  return {
    type: constants.LOCAL_UPDATE_SURVEY_TITLE,
    payload: {
      value,
    },
  }
}

export function localCreateSurveyQuestion(copyIndex) {
  return {
    type: constants.LOCAL_CREATE_SURVEY_QUESTION,
    payload: {
      copyIndex,
    },
  }
}

export function localUpdateSurveyQuestion(index, key, value) {
  return {
    type: constants.LOCAL_UPDATE_SURVEY_QUESTION,
    payload: {
      index,
      key,
      value,
    },
  }
}

export function localCreateSurveyQuestionAnswer(questionIndex, merge, answerIndex) {
  return {
    type: constants.LOCAL_CREATE_SURVEY_QUESTION_ANSWER,
    payload: {
      questionIndex,
      answerIndex,
      merge,
    },
  }
}

export function localUpdateSurveyQuestionAnswer(questionIndex, answerIndex, key, value) {
  return {
    type: constants.LOCAL_UPDATE_SURVEY_QUESTION_ANSWER,
    payload: {
      questionIndex,
      answerIndex,
      key,
      value,
    },
  }
}

export function localDeleteSurveyQuestion(index, undelete) {
  return {
    type: constants.LOCAL_UPDATE_SURVEY_QUESTION,
    payload: {
      index,
      key: 'isDelete',
      value: !undelete,
    },
  }
}

export function localDeleteSurveyQuestionAnswer(questionIndex, answerIndex) {
  return {
    type: constants.LOCAL_DELETE_SURVEY_QUESTION_ANSWER,
    payload: {
      questionIndex,
      answerIndex,
    },
  }
}

export function saveSurvey(data) {
  return {
    type: 'SAVE_SURVEY_STEP1_REQUEST',
    data,
  }
}

export function nextStep(data) {
  return {
    type: constants.SAVE_SURVEY_NEXT_STEP1_REQUEST,
    data,
  }
}

export function nextStepSuccess(data) {
  return {
    type: constants.SAVE_SURVEY_NEXT_STEP1_SUCCESS,
    data,
  }
}

export function nextStepFailure(data) {
  return {
    type: constants.SAVE_SURVEY_NEXT_STEP1_FAILURE,
    data,
  }
}

export function updateTemplate(code, questions, status) {
  return {
    type: 'UPDATE_TEMPLATE',
    code,
    questions,
    status,
  }
}

export function submitSurveySetting(data, button) {
  return {
    type: constants.SUBMIT_SURVEY_SETTING,
    data,
    button,
  }
}

export function submitSurveySettingSuccess(data) {
  return {
    type: constants.SUBMIT_SURVEY_SETTING_SUCCESS,
    data,
  }
}

export function submitSurveySettingFailure(message) {
  return {
    type: constants.SUBMIT_SURVEY_SETTING_FAILURE,
    message,
  }
}

export function publishSurvey(data) {
  return {
    type: constants.PUBLISH_SURVEY,
    data,
  }
}

export function publishSurveySuccess(data) {
  return {
    type: constants.PUBLISH_SURVEY_SUCCESS,
    data,
  }
}

export function pushSurveyFailure(message) {
  return {
    type: constants.PUBLISH_SURVEY_FAILURE,
    message,
  }
}

export function getSchedule(templateCode) {
  return {
    type: constants.UPDATE_SCHEDULE_REQUEST,
    payload: {
      templateCode,
      language: 'en',
    },
  }
}

export function getScheduleSuccess(templateCode, schedule, questions, status) {
  return {
    type: constants.UPDATE_SCHEDULE_SUCCESS,
    payload: {
      templateCode,
      schedule,
      questions,
      status,
    },
  }
}

export function getScheduleFailure(message) {
  return {
    type: constants.UPDATE_SCHEDULE_FAILURE,
    message,
  }
}

