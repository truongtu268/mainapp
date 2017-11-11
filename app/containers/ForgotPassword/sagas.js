import { call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { takeLatest } from 'redux-saga'
import {
  FORGOT_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_REQUEST,
} from '../../constants'
import {
  forgotPassword,
  setNewPassword,
} from '../../api'
import * as actions from './actions'
import {
  showMessage,
} from '../../utils/appUtils'

function* watchForgotPassword() {
  yield* takeLatest(FORGOT_PASSWORD_REQUEST, fetchForgotPassword)
}

function* fetchForgotPassword(action) {
  try {
    const result = yield call(forgotPassword, action.data)
    if (result.status === 200) {
      yield put(actions.forgotPasswordSuccess())
      showMessage('success', 'Send request successful')
    } else {
      yield put(actions.forgotPasswordFailure())
      showMessage('error', 'Something went wrong!')
    }
  } catch (err) {
    console.log(err)
    yield put(actions.forgotPasswordFailure(err.message))
  }
}

function* watchSetNewPassword() {
  yield* takeLatest(SET_NEW_PASSWORD_REQUEST, fetchSetNewPassword)
}

function* fetchSetNewPassword(action) {
  try {
    const result = yield call(setNewPassword, action.payload.data)
    if (result.status === 200) {
      yield put(actions.setNewPasswordSuccess(result.token))
      showMessage('success', 'Change password successful')
      // auto login
      localStorage.setItem('perkfecAccessCode', result.token)
      showMessage('loading', 'Auto login progress...')
      window.location.href = '/'
    } else {
      yield put(actions.setNewPasswordFailure())
      showMessage('error', 'Something went wrong!')
    }
  } catch (err) {
    console.log(err)
    yield put(actions.setNewPasswordFailure(err.message))
  }
}

export default [
  watchForgotPassword,
  watchSetNewPassword,
]
