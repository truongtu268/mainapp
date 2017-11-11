import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { showModal, showMessage } from '../../utils/appUtils'
import * as api from '../../api'
import * as actions from './actions'

/**
 * Get Feedback/Issues/Survey questions
 */

function* watchGetQuestion() {
  yield* takeLatest('GET_QUESTION_REQUEST', getQuestionRequest)
}

function* getQuestionRequest(action) {
  yield put(actions.showLoading())
  try {
    let result = {}
    switch (action.api) {
      case 'normal process':
      case 'public issue': {
        const sentData = {
          feedbackSample: action.api,
          language: 'en',
        }
        result = yield call(api.getSampleByType, sentData)
        break
      }
      case 'survey': {
        const sentData = {
          templateCode: action.surveycode,
          language: 'en',
        }
        result = yield call(api.getSurveyQuestion, sentData)
        break
      }
      default:
        throw new Error('Invalid type')
    }

    if (result.status && result.status === 200) {
      const { list } = result
      if (list.length) {
        yield put(actions.getQuestionSuccess(list))
      }
    } else {
      throw new Error(result.message)
    }
  } catch (err) {
    console.log(err.message)
    yield put(actions.getQuestionFailure(err.message))
  }
}

/**
 * Submit Feedback/Issue
 */

function* watchSubmitIssue() {
  yield* takeLatest('SUBMIT_ISSUE_REQUEST', submitIssue)
}

function* submitIssue(action) {
  try {
    const sentData = action.data
    // const result = yield call(api.submitIssue, sentData)
    // Fake data
    const result = {
      status: 200,
      data: sentData,
    }
    if (result.status === 200) {
      showMessage('success', 'Submit successfully')
      yield put(actions.clearQuestions())
    } else {
      throw new Error(result.message)
    }
  } catch (err) {
    // console.log(err.message)
    showModal('error', err.message)
    yield put(actions.clearQuestions())
  }
}


/**
 * Submit Survey
 */

function* watchReplySurvey() {
  yield* takeLatest('SUBMIT_SURVEY_REQUEST', submitSurvey)
}

function* submitSurvey(action) {
  try {
    const result = yield call(api.replySurvey, action.data)
    if (result.status === 200) {
      showMessage('success', 'Submit successfully')
      yield put(actions.clearQuestions())
    } else {
      throw new Error(result.message)
    }
  } catch (err) {
    console.log(err.message)
    showModal('error', err.message)
    yield put(actions.clearQuestions())
  }
}

export default [
  watchGetQuestion,
  watchSubmitIssue,
  watchReplySurvey,
]
