import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { GET_USER_INFO_SAGA } from '../../constants'
import { getOtherUserSuccess } from './actions'
import { getMemberProfileResponse } from '../../api'

function* watchGetOtherUsers() {
  yield* takeLatest(GET_USER_INFO_SAGA, getOtherUsers)
}

function* getOtherUsers(action) {
  const listResponse = yield call(getMemberProfileResponse, action.data)
  if (listResponse.status !== 400) {
    yield put(getOtherUserSuccess(listResponse.data))
  } else {
    console.log(listResponse.message)
  }
}

export default [
  watchGetOtherUsers,
]
