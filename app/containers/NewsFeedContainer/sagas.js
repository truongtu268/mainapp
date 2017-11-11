import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { GET_LOG_PROCCESSES_SAGA } from '../../constants'
import { getLogProccessesSucceed } from './actions'
import { getLogProccesses } from '../../api/index'

function* watchGetLogProccesses() {
  yield* takeLatest(GET_LOG_PROCCESSES_SAGA, getLogProccessesResponse)
}

function* getLogProccessesResponse(data) {
  try {
    const logProccesses = yield call(getLogProccesses, data)
    yield put(getLogProccessesSucceed(logProccesses))
  } catch (e) {
    console.log(e.message)
  }
}

export default [
  watchGetLogProccesses,
]
