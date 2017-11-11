import { ReduxError } from '../../utils/appUtils'
import {
  LOADING_IN_TRACKING,
  VERIFY_TRACKING_URL_SUCCESS,
  VERIFY_TRACKING_URL_FAILURE,
  LOG_OUT,
} from '../../constants'

const initialState = {
  listFeedback: [],
  isLoading: true,
  error: new ReduxError('list_feedback'),
}

function tracking(state = initialState, action) {
  switch (action.type) {
    case LOADING_IN_TRACKING:
      return {
        ...state,
        isLoading: true,
      }
    case VERIFY_TRACKING_URL_SUCCESS:
      return {
        ...state,
        listFeedback: action.data,
        isLoading: false,
        error: state.error.clearError('list_feedback'),
      }
    case VERIFY_TRACKING_URL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: state.error.setError('list_feedback'),
      }
    case LOG_OUT:
      return initialState
    default:
      return state
  }
}

export default tracking
