import {
  GET_USER_INFO,
  GET_USER_INFO_FAIL,
  GET_USER_INFO_SUCCESS,
  LOG_OUT,
} from '../../constants'

const initialState = {
  info: {},
  hasLoading: false,
  hasError: false,
}

export default function otherUser(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        hasLoading: true,
      }
    case GET_USER_INFO_FAIL:
      return {
        ...state,
        hasLoading: false,
        hasError: true,
      }
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        info: action.data,
        hasError: false,
        hasLoading: false,
      }
    case LOG_OUT:
      return initialState
    default:
      return state
  }
}
