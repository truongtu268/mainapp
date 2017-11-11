import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { push } from 'react-router-redux'
import { showModal } from 'utils/appUtils'
import { CHECK_USER } from '../../constants'
import * as actions from './actions'
import * as api from '../../api'

/**
 * -----------------
 * Check User
 * -----------------
 */

function* watchCheckUser() {
  yield* takeLatest(CHECK_USER, checkUser)
}

function* checkUser(action) {
  try {
    const result = yield call(api.userLogin, action.data)
    if (result.access_token) {
      const token = result.access_token
      const user = yield call(api.checkToken, token)
      yield put(actions.checkUserSuccess(user))
      localStorage.setItem('perkfecAccessCode', token)
      yield put(push('/'))
    } else {
      throw new Error('Failure')
    }
  } catch (err) {
    const message = 'Login failed. Please check the user and password and try again'
    showModal('error', message)
    yield put(actions.checkUserFailure(message))
  }
}

export default [
  watchCheckUser,
]
