import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import {
  anonymousfeedbackUrl,
} from '../../utils/appUtils'
import {
  GET_LINK_FEEDBACK_SAGA,
} from '../../constants'
import * as actions from './actions'
import * as api from '../../api'

function* watchFetchCreateFeedBackAnonymousUrl() {
  yield* takeLatest(GET_LINK_FEEDBACK_SAGA, fetchCreateFeedBackAnonymousUrl)
}

function* fetchCreateFeedBackAnonymousUrl(action) {
  try {
    const result = yield call(api.createNewFeedBackAnonymousUrl, action.data)
    const feedbackFullURL = anonymousfeedbackUrl(action.data.subDomain, result)
    yield put(actions.getLinkFeedBackSuccess(feedbackFullURL))
  } catch (e) {
    console.log(e)
  }
}

export default [
  watchFetchCreateFeedBackAnonymousUrl,
]
