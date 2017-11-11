import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_FAILURE,
} from '../../constants'

export function forgotPassword(data) {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    data,
  }
}

export function forgotPasswordSuccess(status, message) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    status,
    message,
  }
}

export function forgotPasswordFailure(status, message) {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    status,
    message,
  }
}

export function setNewPassword(data) {
  return {
    type: SET_NEW_PASSWORD_REQUEST,
    payload: {
      data,
    },
  }
}

export function setNewPasswordSuccess(token) {
  return {
    type: SET_NEW_PASSWORD_SUCCESS,
    payload: {
      token,
    },
  }
}

export function setNewPasswordFailure(data) {
  return {
    type: SET_NEW_PASSWORD_FAILURE,
    payload: {
      data,
    },
  }
}
