import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import {
  showMessage,
} from '../../utils/appUtils'
import * as api from '../../api'
import * as actions from './actions'
import {
  GET_ALL_FEEDBACK_RECEIVED_STATS_SAGA,
  GET_ALL_FEEDBACK_RECEIVED_SAGA,
} from '../../constants'

function* watchGetAllFeedbackReceivedStats() {
  yield* takeLatest(GET_ALL_FEEDBACK_RECEIVED_STATS_SAGA, getAllFeedbackReceivedStats)
}

function* getAllFeedbackReceivedStats() {
  yield put(actions.showLoading())
  try {
    const data = { type: 'received' }
    const result = yield call(api.getAllFeedbackStats, data)
    if (result.status === 200) {
      yield put(actions.getAllFeedbackReceivedStatsSuccess(result.data))
    } else {
      yield put(actions.getAllFeedbackReceivedStatsFailure('Request Failure'))
      showMessage('error', 'Can not get stats of all feedback')
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getAllFeedbackReceivedStatsFailure(err.message))
  }
}

function* watchGetAllFeedbackReceived() {
  yield* takeLatest(GET_ALL_FEEDBACK_RECEIVED_SAGA, getAllFeedbackReceived)
}

function* getAllFeedbackReceived() {
  yield put(actions.showLoading())
  try {
    const data = { type: 'received' }
    const result = yield call(api.getAllFeedback, data)
    if (result.status === 200) {
      yield put(actions.getAllFeedbackReceivedSuccess(result.list))
    } else {
      yield put(actions.getAllFeedbackReceivedFailure('Request Failure'))
      showMessage('error', 'Can not get all feedback')
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getAllFeedbackReceivedFailure(err.message))
  }
}

// All sagas are loaded
// Return an array and variables name should have `watch` as prefix
export default [
  watchGetAllFeedbackReceivedStats,
  watchGetAllFeedbackReceived,
]
