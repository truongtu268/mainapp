import {
  GET_USER_INFO_SAGA,
  GET_USER_INFO_SUCCESS,
} from '../../constants';

export function getOtherUsers(data) {
  return {
    type: GET_USER_INFO_SAGA,
    data,
  }
}

export function getOtherUserSuccess(data) {
  return {
    type: GET_USER_INFO_SUCCESS,
    data,
  }
}
