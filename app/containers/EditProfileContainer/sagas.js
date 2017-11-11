import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { push } from 'react-router-redux'
import { updateProfileUserAPI, checkToken } from '../../api'
import { updateProfileSuccess } from './actions'
import { showModal } from '../../utils/appUtils'
import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  CHECK_TOKEN_SUCCESS,
} from '../../constants'

function* watchUpdateUserProfile() {
  yield* takeLatest(UPDATE_PROFILE_REQUEST, updateUserProfile)
}

function* updateUserProfile(action) {
  try {
    yield call(updateProfileUserAPI, action.data, action.token)
    yield put(updateProfileSuccess(action.id, action.token))
  } catch (e) {
    showModal('error', e)
    // yield put(push('/notfound/'))
  }
}

function* watchSuccessUpdateUserProfile() {
  yield* takeLatest(UPDATE_PROFILE_SUCCESS, successUpdateProfile)
}

function* successUpdateProfile(action) {
  const user = yield call(checkToken, action)
  yield put({ type: CHECK_TOKEN_SUCCESS, data: user })
  console.log(user)
  yield put(push(`/u/${user.code}`))
}

export default [
  watchUpdateUserProfile,
  watchSuccessUpdateUserProfile,
]
