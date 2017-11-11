import {
  GET_COMPANY_MEMBERS_LOADING,
  GET_INVITE_LINK_SAGA,
  GET_INVITE_LINK_SUCCESS,
  GET_INVITE_LINK_FAILURE,
  UPGRADE_ADMIN_SAGA,
  UPGRADE_ADMIN_SUCCESS,
  UPGRADE_ADMIN_FAILURE,
  UPGRADE_OWNER_SAGA,
  UPGRADE_OWNER_SUCCESS,
  UPGRADE_OWNER_FAILURE,
  DOWNGRADE_USER_SAGA,
  DOWNGRADE_USER_SUCCESS,
  DOWNGRADE_USER_FAILURE,
  DELETE_MEMBER_SAGA,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_FAILURE,
  INVITE_MEMBERS_SAGA,
  INVITE_MEMBERS_SUCCESS,
  INVITE_MEMBERS_FAILURE,
  REINVITE_MEMBERS_SUCCESS,
  REINVITE_MEMBERS_FAILURE,
} from '../../constants'

/**
 * all actions that sagas.js will listen
 */

export function getLinkRegister() {
  return {
    type: GET_INVITE_LINK_SAGA,
  }
}

export function upgradeAdmin(data) {
  return {
    type: UPGRADE_ADMIN_SAGA,
    data,
  }
}

export function upgradeOwner(data) {
  return {
    type: UPGRADE_OWNER_SAGA,
    data,
  }
}

export function downgradeUser(data) {
  return {
    type: DOWNGRADE_USER_SAGA,
    data,
  }
}

export function deleteMember(data) {
  return {
    type: DELETE_MEMBER_SAGA,
    data,
  }
}

export function inviteMembers(data) {
  return {
    type: INVITE_MEMBERS_SAGA,
    data,
  }
}

/**
 * all actions that impact Redux
 */
export function showLoading() {
  return {
    type: GET_COMPANY_MEMBERS_LOADING,
  }
}

export function getInviteLinkSuccess(inviteLink) {
  return {
    type: GET_INVITE_LINK_SUCCESS,
    inviteLink,
  }
}

export function getInviteLinkFailure(message) {
  return {
    type: GET_INVITE_LINK_FAILURE,
    message,
  }
}

export function upgradeAdminSuccess(data) {
  return {
    type: UPGRADE_ADMIN_SUCCESS,
    data,
  }
}

export function upgradeAdminFailure(message) {
  return {
    type: UPGRADE_ADMIN_FAILURE,
    message,
  }
}

export function upGradeOwnerSuccess(data) {
  return {
    type: UPGRADE_OWNER_SUCCESS,
    data,
  }
}

export function upGradeOwnerFailure(message) {
  return {
    type: UPGRADE_OWNER_FAILURE,
    message,
  }
}

export function downgradeUserSuccess(data) {
  return {
    type: DOWNGRADE_USER_SUCCESS,
    data,
  }
}

export function downgradeUserFailure(message) {
  return {
    type: DOWNGRADE_USER_FAILURE,
    message,
  }
}

export function deleteMembersSuccess(data) {
  return {
    type: DELETE_MEMBER_SUCCESS,
    data,
  }
}

export function deleteMembersFailure(message) {
  return {
    type: DELETE_MEMBER_FAILURE,
    message,
  }
}

export function inviteMembersSuccess(data) {
  return {
    type: INVITE_MEMBERS_SUCCESS,
    data,
  }
}

export function inviteMembersFailure(message) {
  return {
    type: INVITE_MEMBERS_FAILURE,
    message,
  }
}

export function reinviteMembersSuccess() {
  return {
    type: REINVITE_MEMBERS_SUCCESS,
  }
}

export function reinviteMembersFailure(message) {
  return {
    type: REINVITE_MEMBERS_FAILURE,
    message,
  }
}

