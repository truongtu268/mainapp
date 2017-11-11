import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
// import { push } from 'react-router-redux'
import {
  VERIFY_REGISTER_LINK_SAGA,
  REGISTER_LINK_SAGA,
} from '../../constants'

import {
  verifyRegisterCode,
  registerByLink,
  loginByUrlParameters,
} from '../../api/index'

import {
  showModal,
} from '../../utils/appUtils'

import { verifyRegisterLinkSuccess } from './actions'

function* watchFetchVerifyRegisterLink() {
  yield* takeLatest(VERIFY_REGISTER_LINK_SAGA, fetchRegisterCode)
}

function* fetchRegisterCode(action) {
  try {
    const verify = yield call(verifyRegisterCode, action.data)
    if (verify.status && verify.status === 404) {
      showModal('error', 'something went wrong')
      // yield put(push('/notfound/'))
    } else {
      yield put(verifyRegisterLinkSuccess(verify))
    }
  } catch (e) {
    showModal('error', e)
    // yield put(push('/notfound/'))
  }
}

function* watchFetchRegisterLink() {
  yield* takeLatest(REGISTER_LINK_SAGA, fetchRegisterByLink)
}

function* fetchRegisterByLink(action) {
  try {
    const res = yield call(registerByLink, action.data)
    if (res.status === 200) {
      window.location = loginByUrlParameters(action.data.subDomain, res)
    }
  } catch (e) {
    console.log(e)
    showModal('error', 'Sorry, something went wrong: Please try again later')
  }
}

export default [
  watchFetchVerifyRegisterLink,
  watchFetchRegisterLink,
]
