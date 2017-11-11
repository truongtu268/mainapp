import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { push } from 'react-router-redux'
import { showModal } from '../../utils/appUtils'
import * as api from '../../api'
import * as actions from './actions'
import {
  VERIFY_ANONYMOUS_URL_SAGA,
  SEND_ANONYMOUS_FEEDBACK_SAGA,
} from '../../constants'

// Verify URL and get questions
function* watchVerifyAnonymousURL() {
  yield* takeLatest(VERIFY_ANONYMOUS_URL_SAGA, verifyAnonymousURL)
}

function* verifyAnonymousURL(action) {
  yield put(actions.showLoading())
  try {
    const sentData = { code: action.code }
    const result = yield call(api.verifyAnonymousUrl, sentData)
    if (result.status === 200) {
      yield put(actions.verifyAnonymousURLSuccess(result.data.code))
      yield call(getAnonymousQuestions, result.data.team)
    } else {
      throw new Error(result.message)
    }
  } catch (err) {
    console.log(err.message)
    showModal('error', err.message)
    yield put(actions.verifyAnonymousURLFailure(err.message))
  }
}

function* getAnonymousQuestions(team) {
  try {
    const sentData = {
      team,
      feedbackSample: 'Normal process',
    }
    const result = yield call(api.getAnonymousQuestions, sentData)
    if (result.status && result.status === 404) {
      throw new Error(result.message)
    } else {
      const { id, questions } = result
      yield put(actions.getAnonymousQuestionSuccess(id, questions))
    }
  } catch (err) {
    console.log(err.message)
    showModal('error', err.message)
    yield put(actions.getAnonymousQuestionFailure(err.message))
  }
}

// Send anonymous feedback
function* watchSendAnonymousFeedBack() {
  yield* takeLatest(SEND_ANONYMOUS_FEEDBACK_SAGA, sendAnonymousFeedback)
}

function* sendAnonymousFeedback(action) {
  try {
    const result = yield call(api.createAnonymousFeedback, action.data)
    yield put(actions.sendAnonymousFeedbackSuccess())
    yield put(push(`/tracking/${result.data[0].code}`))
  } catch (err) {
    console.log(err.message)
    showModal('error', err.message)
    yield put(actions.sendAnonymousFeedbackFailure(err.message))
  }
}

export default [
  watchVerifyAnonymousURL,
  watchSendAnonymousFeedBack,
]
