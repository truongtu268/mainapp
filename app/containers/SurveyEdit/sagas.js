import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { push } from 'react-router-redux'
import { showMessage } from '../../utils/appUtils'
import * as api from '../../api'
import * as actions from './actions'
import {
  GET_SURVEY_DETAIL_SAGA,
  SUBMIT_SURVEY_SETTING,
  PUBLISH_SURVEY,
  UPDATE_SCHEDULE_REQUEST,
} from '../../constants'

function* watchGetSurveyDetail() {
  yield* takeLatest(GET_SURVEY_DETAIL_SAGA, getSurveyDetailByTemplateCode)
}

function* getSurveyDetailByTemplateCode(action) {
  try {
    const result = yield call(api.getSurveyDetailByTemplateCode, action.data)
    if (result.status === 200) {
      yield put(actions.getSurveyDetailByTemplateCodeSuccess(result.title, result.list))
    } else {
      throw new Error(result.message)
    }
  } catch (err) {
    showMessage('error', err.message)
    yield put(actions.getSurveyDetailByTemplateCodeFailure(err.message))
  }
}

function* watchSaveSurveyStep1() {
  yield* takeLatest('SAVE_SURVEY_STEP1_REQUEST', saveSurveyStep1)
}

function* saveSurveyStep1(action) {
  try {
    const result = yield call(api.createSurveyStep1, action.data)
    if (result.status === 200) {
      console.log('created', result)
      const {
        templateCode,
        questions,
        status,
      } = result.data
      yield put(actions.updateTemplate(templateCode, questions, status))
      yield put(push(`/survey/${templateCode}/step1`))
    } else {
      showMessage('error', 'Cannot save survey')
    }
  } catch (err) {
    // console.log(err)
    showMessage('error', err)
  }
}

function* watchSaveSurveyAndGoToStep2() {
  yield* takeLatest('SAVE_SURVEY_NEXT_STEP1_REQUEST', saveSurveyAndGoToStep2)
}

function* saveSurveyAndGoToStep2(action) {
  try {
    const result = yield call(api.createSurveyStep1, action.data)
    if (result.status === 200) {
      const {
        templateCode,
        questions,
        status,
      } = result.data
      yield put(actions.updateTemplate(templateCode, questions, status))
      yield put(push(`/survey/${templateCode}/step2`))
    } else {
      showMessage('error', 'Can not save survey')
    }
  } catch (err) {
    // console.log(err)
    showMessage('error', err)
  }
}

function* watchSubmitSurveySetting() {
  yield* takeLatest(SUBMIT_SURVEY_SETTING, submitSurveySetting)
}

function* submitSurveySetting(action) {
  try {
    const result = yield call(api.submitSurveySetting, action.data)
    console.log(result.status)
    if (result.status === 200) {
      yield put(actions.submitSurveySettingSuccess(result.data))
      if (action.button === 'publish') {
        yield put(actions.publishSurvey(action.data.templateCode))
      } else {
        yield put(push('/survey'))
      }
    } else {
      throw new Error(result.message)
    }
  } catch (err) {
    showMessage('error', 'Can not save survey')
    yield put(actions.submitSurveySettingFailure(err.message))
  }
}

function* watchPublishSurvey() {
  yield* takeLatest(PUBLISH_SURVEY, publishSurvey)
}

function* publishSurvey(action) {
  try {
    const templateCode = action.data
    const result = yield call(api.publishSurvey, { templateCode })
    if (result.status !== 200) {
      throw new Error(result.message)
    }
    yield put(push('/survey'))
  } catch (err) {
    showMessage('error', 'Can not save survey')
    yield put(actions.pushSurveyFailure(err.message))
  }
}

function* watchGetSchedule() {
  yield* takeLatest(UPDATE_SCHEDULE_REQUEST, getSchedule)
}

function* getSchedule(action) {
  try {
    const result = yield call(api.getSurveyByTemplateCode, action.payload)
    if (result.status === 200) {
      const { templateCode, schedule, questions, status } = result.data
      yield put(actions.getScheduleSuccess(templateCode, schedule, questions, status))
    }
  } catch (err) {
    console.log(err.message)
    yield put(actions.getScheduleFailure(err.message))
  }
}

export default [
  watchGetSurveyDetail,
  watchSaveSurveyStep1,
  watchSaveSurveyAndGoToStep2,
  watchSubmitSurveySetting,
  watchPublishSurvey,
  watchGetSchedule,
]
