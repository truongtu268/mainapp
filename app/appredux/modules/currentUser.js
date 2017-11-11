import { ReduxError } from 'utils/appUtils'
import {
  LOADING_IN_USER,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  LOG_OUT,
} from '../../constants'

const initialState = {
  user: {},
  isAuthorized: false,
  isLoading: false,
  error: new ReduxError('user'),
}

export default function currentUser(state = initialState, action) {
  switch (action.type) {
    case LOADING_IN_USER: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case GET_CURRENT_USER_SUCCESS: {
      return {
        user: action.user,
        isAuthorized: true,
        isLoading: false,
        error: state.error.clearError('user'),
      }
    }
    case GET_CURRENT_USER_FAILURE: {
      return {
        user: {},
        isAuthorized: false,
        isLoading: false,
        error: state.error.setError('user', action.message),
      }
    }
    case LOG_OUT: {
      return initialState
    }
    default:
      return state
  }
}
