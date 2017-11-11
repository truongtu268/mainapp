import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import {
  showMessage,
} from '../../utils/appUtils'
import * as api from '../../api'
import * as actions from './actions'
import {
  GET_ALL_FEEDBACK_GIVE_STATS_SAGA,
  GET_ALL_FEEDBACK_GIVE_SAGA,
} from '../../constants'

function* watchGetAllFeedbackGiveStats() {
  yield* takeLatest(GET_ALL_FEEDBACK_GIVE_STATS_SAGA, getAllFeedbackGiveStats)
}

function* getAllFeedbackGiveStats() {
  yield put(actions.showLoading())
  try {
    const data = { type: 'give' }
    const result = yield call(api.getAllFeedbackStats, data)
    if (result.status === 200) {
      yield put(actions.getAllFeedbackGiveStatsSuccess(result.data))
    } else {
      yield put(actions.getAllFeedbackGiveStatsFailure('Request Failure'))
      showMessage('error', 'Can not get stats of all feedback')
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getAllFeedbackGiveStatsFailure(err.message))
  }
}

function* watchGetAllFeedbackGive() {
  yield* takeLatest(GET_ALL_FEEDBACK_GIVE_SAGA, getAllFeedbackGive)
}

function* getAllFeedbackGive() {
  yield put(actions.showLoading())
  try {
    const data = { type: 'give' }
    const result = yield call(api.getAllFeedback, data)
    if (result.status === 200) {
      yield put(actions.getAllFeedbackGiveSuccess(result.list))
    } else {
      yield put(actions.getAllFeedbackGiveFailure('Request Failure'))
      showMessage('error', 'Can not get all feedback')
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getAllFeedbackGiveFailure(err.message))
  }
}

// All sagas are loaded
// Return an array and variables name should have `watch` as prefix
export default [
  watchGetAllFeedbackGiveStats,
  watchGetAllFeedbackGive,
]
