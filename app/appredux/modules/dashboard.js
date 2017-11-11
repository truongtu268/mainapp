import { ReduxError } from '../../utils/appUtils'
import {
  LOADING_ALL_FEEDBACK,
  FETCH_ALL_FEEDBACK_SUCCESS,
  FETCH_ALL_FEEDBACK_FAILURE,
} from '../../constants'

const initialState = {
  allFeedback: [],
  isLoading: false,
  error: new ReduxError('allFeedback'),
}

export default function dashboard(state = initialState, action) {
  switch (action.type) {
    case LOADING_ALL_FEEDBACK:
      return {
        ...state,
        isLoading: true,
      }
    case FETCH_ALL_FEEDBACK_SUCCESS:
      return {
        ...state,
        allFeedback: action.feedback.listData,
        isLoading: false,
        error: state.error.clearError('allFeedback'),
      }
    case FETCH_ALL_FEEDBACK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: state.error.setError('allFeedback', action.message),
      }
    default:
      return state
  }
}
