import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { push } from 'react-router-redux'
import * as api from '../../api'
import * as actions from './actions'
import {
  VERIFY_TRACKING_URL_SAGA,
  SEND_TRACKING_URL_TO_EMAIL_SAGA,
  RATING_FEEDBACK_SAGA,
} from '../../constants'

// Verify link feedback
function* watchVerifyTrackingFeedbackUrl() {
  yield* takeLatest(VERIFY_TRACKING_URL_SAGA, verifyTrackingFeedbackUrl)
}

function* verifyTrackingFeedbackUrl(action) {
  yield put(actions.showLoading())
  try {
    const result = yield call(api.verifyTrackingUrl, action.data)
    yield put(actions.verifyTrackingUrlSuccess(result))
  } catch (err) {
    console.log(err.message)
    yield put(actions.verifyTrackingUrlFailure(err.message))
    yield put(push('/notfound'))
  }
}

function* watchSendTrackingFeedbackUrlToMail() {
  yield* takeLatest(SEND_TRACKING_URL_TO_EMAIL_SAGA, sendTrackingFeedbackUrlToMail)
}

function* sendTrackingFeedbackUrlToMail(action) {
  yield call(api.sendUrlToEmail, action.data)
}

function* watchRatingFeedbackItem() {
  yield* takeLatest(RATING_FEEDBACK_SAGA, ratingFeedbackItem)
}

function* ratingFeedbackItem(action) {
  yield call(api.ratingFeedback, action.data)
}

export default [
  watchVerifyTrackingFeedbackUrl,
  watchSendTrackingFeedbackUrlToMail,
  watchRatingFeedbackItem,
]
