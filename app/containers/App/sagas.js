import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { push } from 'react-router-redux'
import { showMessage } from 'utils/appUtils'
import { Modal } from 'antd'
import * as actions from './actions'
import * as api from '../../api'

// Initial Requests

function* getInitialData() {
  try {
    // [TO-DO]
    // const token = localStorage.getItem('perkfecAccessCode')
    // const competencies = yield call(api.fetchAllCompetenciesFromServer, token)
    // yield put(getAllCompetencies(competencies))
    yield call(getCompanyMembers)
    yield call(getQuestionTypes)
  } catch (err) {
    console.log(err)
  }
}

function* getCompanyMembers() {
  yield put(actions.showLoadingInMembers())
  try {
    const result = yield call(api.getCompanyMembers)
    if (result.status === 200) {
      yield put(actions.getCompanyMembersSuccess(result.list))
    } else {
      throw new Error('Get members Failure')
    }
  } catch (err) {
    showMessage('error', err.message)
    yield put(actions.getCompanyMembersFailure(err.message))
  }
}

function* getQuestionTypes() {
  try {
    const result = yield call(api.getQuestionTypes)
    if (result.status === 200) {
      yield put(actions.getQuestionTypesSuccess(result.list))
    } else {
      throw new Error('Get question types Failure')
    }
  } catch (err) {
    showMessage('error', err.message)
    yield put(actions.getQuestionTypesFailure(err.message))
  }
}

// ----------------------------------------

// Verify subdomain
function* verifySubDomain() {
  try {
    const result = yield call(api.verifySubDomain)
    if (result.status === 200) {
      localStorage.setItem('perkfecClientCode', result.client_id)
    } else {
      throw new Error(result.message)
    }
  } catch (err) {
    Modal.error({
      title: 'Something went wrong',
      content: err.message,
      okText: 'Back to homepage',
      onOk: () => { window.location.href = '//www.perkfec.com' },
    })
  }
}

// verify token
function* verifyToken(token, pathname) {
  try {
    const user = yield call(api.checkToken, token)
    if (user) {
      // Check token Success
      const isLoginPath = pathname.includes('login')
      yield put(actions.checkUserSuccess(user))
      yield call(getInitialData)

      // Redirect mechanism
      if (isLoginPath) {
        yield put(push('/'))
      }
    } else {
      // Check token Failure
      localStorage.removeItem('perkfecAccessCode')
      throw new Error()
    }
  } catch (err) {
    console.log(err.message)
    localStorage.removeItem('perkfecAccessCode')
    yield put(push('/login'))
  }
}

function* watchSequencing() {
  yield* takeLatest('CREATE_SEQUENCE', sequencingSagas)
}

function* sequencingSagas(action) {
  try {
    const { pathname } = action.location
    yield* verifySubDomain()
    const token = localStorage.getItem('perkfecAccessCode')
    if (token) {
      yield call(verifyToken, token, pathname)
    } else if (!pathname.includes('forgotpassword')) {
      yield put(push('/login'))
    }
  } catch (err) {
    console.log(err)
  }
}

export default [
  watchSequencing,
]
