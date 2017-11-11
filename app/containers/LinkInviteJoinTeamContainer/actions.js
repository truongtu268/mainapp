import {
  VERIFY_REGISTER_LINK_SAGA,
  VERIFY_REGISTER_LINK_SUCCESS,
  REGISTER_LINK_SAGA,
} from '../../constants';

export function verifyRegisterLink(data) {
  return {
    type: VERIFY_REGISTER_LINK_SAGA,
    data,
  }
}

export function verifyRegisterLinkSuccess(data) {
  return {
    type: VERIFY_REGISTER_LINK_SUCCESS,
    data,
  }
}

export function registerByLink(data) {
  return {
    type: REGISTER_LINK_SAGA,
    data,
  }
}
