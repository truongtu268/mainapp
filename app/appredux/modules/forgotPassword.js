import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_FAILURE,
} from '../../constants'

const initialState = {
  message: '',
  isLoading: false,
  hasError: false,
  isSuccessful: false,
}

export default function forgotPassword(state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: case SET_NEW_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccessful: false,
      }
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.message,
        isLoading: false,
        hasError: false,
        isSuccessful: true,
      }
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        message: action.message,
        isLoading: false,
        hasError: true,
        isSuccessful: false,
      }
    case SET_NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        isSuccessful: true,
      }
    case SET_NEW_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        isSuccessful: false,
      }
    default:
      return state
  }
}
