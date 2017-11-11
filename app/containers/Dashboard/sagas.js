import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
// import { withRouter } from 'react-router'
import { showMessage } from '../../utils/appUtils'
import * as api from '../../api'
import * as actions from './actions'
import { FETCH_ALL_FEEDBACK_SAGA } from '../../constants'

function* watchFetchAllFeedback() {
  yield* takeLatest(FETCH_ALL_FEEDBACK_SAGA, fetchAllFeedback)
}

function* fetchAllFeedback() {
  yield put(actions.loadingAllFeedback())
  try {
    const result = yield call(api.getAllFeedback)
    if (result.status && result.status === 200) {
      yield put(actions.fetchAllFeedbackSuccess(result))
    } else {
      yield put(actions.fetchAllFeedbackFailure(result.message))
      showMessage('error', result.message)
    }
  } catch (err) {
    console.log(err)
    yield put(actions.fetchAllFeedbackFailure(err.message))
  }
}

// All sagas to be loaded
// Return an array and variables name should have `watch` as prefix
export default [
  watchFetchAllFeedback,
]
