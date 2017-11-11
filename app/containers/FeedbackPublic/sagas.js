import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import {
  showMessage,
} from '../../utils/appUtils'
import * as api from '../../api'
import * as actions from './actions'
import {
  GET_ALL_FEEDBACK_PUBLIC_STATS_SAGA,
  GET_ALL_FEEDBACK_PUBLIC_SAGA,
} from '../../constants'

function* watchGetAllFeedbackStats() {
  yield* takeLatest(GET_ALL_FEEDBACK_PUBLIC_STATS_SAGA, getAllFeedbackPublicStats)
}

function* getAllFeedbackPublicStats() {
  yield put(actions.showLoading())
  try {
    const data = { type: 'public' }
    const result = yield call(api.getAllFeedbackStats, data)
    if (result.status === 200) {
      yield put(actions.getAllFeedbackPublicStatsSuccess(result.data))
    } else {
      yield put(actions.getAllFeedbackPublicStatsFailure('Request Failure'))
      showMessage('error', 'Can not get stats of all feedback')
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getAllFeedbackPublicStatsFailure(err.message))
  }
}

function* watchGetAllFeedbackPublic() {
  yield* takeLatest(GET_ALL_FEEDBACK_PUBLIC_SAGA, getAllFeedbackPublic)
}

function* getAllFeedbackPublic() {
  yield put(actions.showLoading())
  try {
    const data = { type: 'public' }
    const result = yield call(api.getAllFeedback, data)
    if (result.status === 200) {
      yield put(actions.getAllFeedbackPublicSuccess(result.list))
    } else {
      yield put(actions.getAllFeedbackPublicFailure('Request Failure'))
      showMessage('error', 'Can not get all feedback')
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getAllFeedbackPublicFailure(err.message))
  }
}

// All sagas are loaded
// Return an array and variables name should have `watch` as prefix
export default [
  watchGetAllFeedbackStats,
  watchGetAllFeedbackPublic,
]
