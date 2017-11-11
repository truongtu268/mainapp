import { put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { push } from 'react-router-redux'
import {
  LOG_OUT,
} from '../../constants'

/**
 * -----------------------------
 * Log Out
 * -----------------------------
 */

function* watchLogOut() {
  yield* takeLatest(LOG_OUT, logOut)
}

function* logOut() {
  localStorage.removeItem('perkfecAccessCode')
  // localStorage.removeItem('perkfecClientCode')
  yield put(push('/login'))
}

export default [
  watchLogOut,
]
