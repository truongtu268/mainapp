import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import {
  formatInviteLink,
  showMessage,
  showModal,
} from '../../utils/appUtils'
import * as api from '../../api'
import * as actions from './actions'
import {
  GET_INVITE_LINK_SAGA,
  UPGRADE_ADMIN_SAGA,
  UPGRADE_OWNER_SAGA,
  DOWNGRADE_USER_SAGA,
  DELETE_MEMBER_SAGA,
  INVITE_MEMBERS_SAGA,
} from '../../constants'

// Get invite URL
function* watchGenerateInviteLink() {
  yield* takeLatest(GET_INVITE_LINK_SAGA, getInviteLink)
}

function* getInviteLink() {
  try {
    const subDomain = window.location.host.split('.')[0]
    const result = yield call(api.createRegisterLink, subDomain)
    if (result.status <= 300 && result.status >= 200) {
      const inviteLink = formatInviteLink(subDomain, result.code)
      yield put(actions.getInviteLinkSuccess(inviteLink))
    } else {
      yield put(actions.getInviteLinkFailure(result.message))
      showMessage('error', result.message)
    }
  } catch (err) {
    console.log(err.message)
    yield put(actions.getInviteLinkFailure(err.message))
  }
}

// Set Admin for a normal user
function* watchUpgradeAdmin() {
  yield* takeLatest(UPGRADE_ADMIN_SAGA, upgradeAdmin)
}

function* upgradeAdmin(action) {
  try {
    const result = yield call(api.upgradeUserToAdmin, action.data)
    if (result.status === 200) {
      yield put(actions.upgradeAdminSuccess(result.data))
      showMessage('success', 'Done')
    } else {
      yield put(actions.upgradeAdminFailure(result.message))
      showMessage('error', result.message)
    }
  } catch (err) {
    console.log(err.message)
    yield put(actions.upgradeAdminFailure(err.message))
  }
}

// Set Owner for Admin
function* watchUpgradeOwner() {
  yield* takeLatest(UPGRADE_OWNER_SAGA, upgradeOwner)
}

function* upgradeOwner(action) {
  try {
    const result = yield call(api.upgradeUserToOwner, action.data)
    if (result.status === 200) {
      yield put(actions.upGradeOwnerSuccess(result.data))
    } else {
      yield put(actions.upGradeOwnerFailure(result.message))
    }
  } catch (err) {
    console.log(err.message)
    yield put(actions.upGradeOwnerFailure(err.message))
  }
}

// Downgrade an Admin/Owner to normal user
function* watchDowngradeUser() {
  yield* takeLatest(DOWNGRADE_USER_SAGA, downgradeUser)
}

function* downgradeUser(action) {
  try {
    const result = yield call(api.downGradeUserRole, action.data)
    if (result.status === 200) {
      yield put(actions.downgradeUserSuccess(result.data))
      showMessage('success', 'Done')
    } else {
      yield put(actions.downgradeUserFailure(result.message))
      showMessage('error', result.message)
    }
  } catch (err) {
    console.log(err.message)
    yield put(actions.downgradeUserFailure(err.message))
  }
}

// Delete users
function* watchDeleteMember() {
  yield* takeLatest(DELETE_MEMBER_SAGA, deleteUser)
}

function* deleteUser(action) {
  try {
    const result = yield call(api.deleteUser, action.data)
    if (result.status === 200) {
      yield put(actions.deleteMembersSuccess(result.data[0]))
      showMessage('success', 'Delete success')
    } else {
      yield put(actions.deleteMembersFailure(result.message))
      showMessage('error', result.message)
    }
  } catch (err) {
    console.log(err.message)
    yield put(actions.deleteMembersFailure(err.message))
  }
}

// Invite another user to join company
function* watchInviteMember() {
  yield* takeLatest(INVITE_MEMBERS_SAGA, inviteCompanyMembers)
}

function* inviteCompanyMembers(action) {
  try {
    const listUser = yield call(api.inviteByEmail, action.data)
    if (listUser.status === 200) {
      if (listUser.data) {
        yield put(actions.inviteMembersSuccess(listUser.data))
        showModal('success', 'Invite success')
      } else {
        yield put(actions.reinviteMembersSuccess())
        showModal('success', 'Invite success')
      }
    } else {
      yield put(actions.inviteMembersFailure('Invite failure'))
      showModal('error', 'Invite failure')
    }
  } catch (err) {
    console.log(err.message)
    yield put(actions.inviteMembersFailure(err.message))
  }
}

export default [
  watchGenerateInviteLink,
  watchUpgradeAdmin,
  watchUpgradeOwner,
  watchDowngradeUser,
  watchDeleteMember,
  watchInviteMember,
]
