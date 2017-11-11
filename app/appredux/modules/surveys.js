// import update from 'immutability-helper'
import differenceBy from 'lodash/differenceBy'

import {
  GET_ALL_SURVEY_TEMPLATE_SAGA,
  GET_ALL_SURVEY_TEMPLATE_SUCCESS,
  GET_ALL_SURVEY_TEMPLATE_FAILURE,
  GET_MY_CREATED_SURVEYS_SAGA,
  GET_MY_CREATED_SURVEYS_SUCCESS,
  GET_MY_CREATED_SURVEYS_FAILURE,
  GET_MY_REQUESTED_SURVEYS_SAGA,
  GET_MY_REQUESTED_SURVEYS_SUCCESS,
  GET_MY_REQUESTED_SURVEYS_FAILURE,
  DELETE_SURVEY_SUCCESS,
  DELETE_SURVEY_FAILURE,
} from '../../constants'

const initialState = {
  surveyTemplates: [],
  loadingTemplates: true,
  myCreatedSurveys: [],
  loadingMyCreatedSurveys: false,
  myRequestedSurveys: [],
  loadingMyRequestedSurveys: false,
  hasError: false,
}

export default function surveys(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SURVEY_TEMPLATE_SAGA:
      return {
        ...state,
        loadingTemplates: true,
      }
    case GET_ALL_SURVEY_TEMPLATE_SUCCESS:
      return {
        ...state,
        surveyTemplates: action.surveyTemplates,
        loadingTemplates: false,
        hasError: false,
      }
    case GET_ALL_SURVEY_TEMPLATE_FAILURE:
      return {
        ...state,
        loadingTemplates: false,
        hasError: true,
      }
    case GET_MY_CREATED_SURVEYS_SAGA:
      return {
        ...state,
        loadingMyCreatedSurveys: true,
      }
    case GET_MY_CREATED_SURVEYS_SUCCESS:
      return {
        ...state,
        myCreatedSurveys: action.surveys,
        loadingMyCreatedSurveys: false,
        hasError: false,
      }
    case GET_MY_CREATED_SURVEYS_FAILURE:
      return {
        ...state,
        loadingMyCreatedSurveys: false,
        hasError: true,
      }
    case GET_MY_REQUESTED_SURVEYS_SAGA:
      return {
        ...state,
        loadingMyRequestedSurveys: true,
      }
    case GET_MY_REQUESTED_SURVEYS_SUCCESS:
      return {
        ...state,
        myRequestedSurveys: action.surveys,
        loadingMyRequestedSurveys: false,
        hasError: false,
      }
    case GET_MY_REQUESTED_SURVEYS_FAILURE:
      return {
        ...state,
        loadingMyRequestedSurveys: false,
        hasError: true,
      }
    case DELETE_SURVEY_SUCCESS:
      return {
        ...state,
        myCreatedSurveys: differenceBy(state.myCreatedSurveys, [action.payload], 'templateCode'),
      }
    case DELETE_SURVEY_FAILURE:
      return {
        ...state,
        hasError: true,
      }
    default:
      return state
  }
}
