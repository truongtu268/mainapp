import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import {
  showMessage,
} from '../../utils/appUtils'
import * as api from '../../api'
import * as actions from './actions'
import {
  GET_ALL_SURVEY_TEMPLATE_SAGA,
  GET_MY_CREATED_SURVEYS_SAGA,
  GET_MY_REQUESTED_SURVEYS_SAGA,
  DELETE_SURVEY_REQUEST,
} from '../../constants'

function* watchGetAllSurveyTemplates() {
  yield* takeLatest(GET_ALL_SURVEY_TEMPLATE_SAGA, getAllSurveyTemplates)
}

function* getAllSurveyTemplates() {
  yield put(actions.showLoading())
  try {
    const result = yield call(api.getAllSurveyTemplates)
    if (result.status === 200) {
      yield put(actions.getAllSurveyTemplatesSuccess(result.list))
      yield put(actions.clearSurveyEdit())
    } else {
      yield put(actions.getAllSurveyTemplatesFailure('Request Failure'))
      showMessage('error', 'Can not get survey detail')
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getAllSurveyTemplatesFailure(err.message))
  }
}

function* watchGetMyCreatedSurveys() {
  yield* takeLatest(GET_MY_CREATED_SURVEYS_SAGA, getMyCreatedSurveys)
}

function* getMyCreatedSurveys() {
  yield put(actions.showLoading())
  try {
    const result = yield call(api.getMyCreatedSurveys)
    if (result.status === 200) {
      yield put(actions.getMyCreatedSurveysSuccess(result.list))
    } else {
      yield put(actions.getMyCreatedSurveysFailure('Request Failure'))
      showMessage('error', 'Can not get created survey')
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getMyCreatedSurveysFailure(err.message))
  }
}

function* watchGetMyRequestedSurveys() {
  yield* takeLatest(GET_MY_REQUESTED_SURVEYS_SAGA, getMyRequestedSurveys)
}

function* getMyRequestedSurveys() {
  yield put(actions.showLoading())
  try {
    const result = yield call(api.getMyRequestedSurveys)
    if (result.status === 200) {
      yield put(actions.getMyRequestedSurveysSuccess(result.list))
    } else {
      yield put(actions.getMyRequestedSurveysFailure('Request Failure'))
      showMessage('error', 'Can not get created survey')
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getMyRequestedSurveysFailure(err.message))
  }
}

function* watchDeleteSurvey() {
  yield* takeLatest(DELETE_SURVEY_REQUEST, deleteSurvey)
}

function* deleteSurvey(action) {
  // yield put(actions.showLoading())
  try {
    const result = yield call(api.deleteSurvey, action.payload)
    if (result.status === 200) {
      yield put(actions.deleteSurveySuccess(action.payload.templateCode))
    } else {
      yield put(actions.deleteSurveyFailure('Request Failure'))
      showMessage('error', 'Can not delete this survey')
    }
  } catch (err) {
    console.log(err)
    yield put(actions.deleteSurveyFailure(err.message))
  }
}

// All sagas are loaded
// Return an array and variables name should have `watch` as prefix
export default [
  watchGetAllSurveyTemplates,
  watchGetMyCreatedSurveys,
  watchGetMyRequestedSurveys,
  watchDeleteSurvey,
]
