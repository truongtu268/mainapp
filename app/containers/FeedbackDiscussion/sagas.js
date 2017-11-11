import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import {
  showModal,
} from '../../utils/appUtils'
import {
  UPDATE_FEEDBACK_SAGA,
  COMMENT_FEEDBACK_SAGA,
  VOTE_FOR_FEEDBACK_SAGA,
  GET_FEEDBACK_DISCUSSION_SAGA,
  UPDATE_STATE_PUBLIC_ISSUE_SAGA,
} from '../../constants'
import * as actions from './actions'
import * as api from '../../api'

// Invite another user to join company
function* watchGetFeedbackDiscussion() {
  yield* takeLatest(GET_FEEDBACK_DISCUSSION_SAGA, getFeedbackDiscussion)
}

function* getFeedbackDiscussion(action) {
  yield put(actions.showLoading())
  try {
    const res = yield call(api.getFeedbackDiscussionByCode, action.data)
    if (res.status === 200) {
      yield put(actions.getFeedbackDiscussionSuccess(res.data))
    }
  } catch (err) {
    console.log(err)
    showModal('error', 'Something went wrong when get the feedback detail!')
    yield put(actions.getFeedbackDiscussionFailure(err.message))
  }
}

function* watchVoteForFeedback() {
  yield* takeLatest(VOTE_FOR_FEEDBACK_SAGA, voteForFeedback)
}

function* voteForFeedback(action) {
  yield put(actions.showLoading())
  try {
    const res = yield call(api.voteForFeedbackByCode, action.data)
    if (res.status === 200) {
      yield put(actions.voteForFeedbackSuccess(res.data))
    }
  } catch (err) {
    console.log(err.message)
    showModal('error', 'Can not vote for feedback, please try later')
    yield put(actions.voteForFeedbackFailure(err.message))
  }
}

function* watchCommentFeedback() {
  yield* takeLatest(COMMENT_FEEDBACK_SAGA, commentFeedback)
}

function* commentFeedback(action) {
  yield put(actions.commentFeedbackLoading())
  try {
    const res = yield call(api.commentFeedbackByCode, action.data)
    if (res.status === 200) {
      yield put(actions.commentFeedbackSuccess(res.data))
    }
  } catch (err) {
    console.log(err.message)
    showModal('error', 'Can not comment for feedback, please try later')
    yield put(actions.commentFeedbackFailure(err.message))
  }
}

function* watchUpdateFeedback() {
  yield* takeLatest(UPDATE_FEEDBACK_SAGA, updateFeedback)
}

function* updateFeedback(action) {
  yield put(actions.updateFeedbackLoading())
  try {
    const res = yield call(api.updateFeedbackByCode, action.data)
    if (res.status === 200) {
      yield put(actions.updateFeedbackSuccess(res.data))
    }
  } catch (err) {
    console.log(err.message)
    showModal('error', 'Can not update for feedback, please try later')
    yield put(actions.updateFeedbackFailure(err.message))
  }
}

function* watchUpdateStatePublicIssue() {
  yield* takeLatest(UPDATE_STATE_PUBLIC_ISSUE_SAGA, updateStatePublicIssue)
}

function* updateStatePublicIssue(action) {
  try {
    const res = yield call(api.updateStatePublicIssue, action.data)
    yield put(actions.updateStatePublicIssueSuccess(res.data))
    const { feedbackCode } = action.data
    const res2 = yield call(api.getFeedbackDiscussionByCode, { feedbackCode })
    yield put(actions.getFeedbackDiscussionSuccess(res2.data))
  } catch (err) {
    console.log(err.message)
    showModal('error', 'Can not close issue, please try later')
    yield put(actions.updateStatePublicIssueFailure(err.message))
  }
}
// All sagas are loaded
// Return an array and variables name should have `watch` as prefix
export default [
  watchGetFeedbackDiscussion,
  watchVoteForFeedback,
  watchCommentFeedback,
  watchUpdateFeedback,
  watchUpdateStatePublicIssue,
]
