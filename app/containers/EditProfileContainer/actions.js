import {
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  GET_CURRENT_USER_INFO,
} from '../../constants'

export const fetchingUser = () => ({
  type: GET_CURRENT_USER_INFO,
})

export const updateProfile = (code, data, token) => ({
  type: UPDATE_PROFILE_REQUEST,
  code,
  data,
  token,
})

export const updateProfileSuccess = (code, token) => ({
  type: UPDATE_PROFILE_SUCCESS,
  code,
  token,
})
