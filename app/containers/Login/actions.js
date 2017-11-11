import {
  CHECK_USER,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
} from '../../constants'

export function checkUser(data) {
  return {
    type: CHECK_USER,
    data,
  }
}

export function checkUserSuccess(user) {
  return {
    type: GET_CURRENT_USER_SUCCESS,
    user,
  }
}

export function checkUserFailure(message) {
  return {
    type: GET_CURRENT_USER_FAILURE,
    message,
  }
}

