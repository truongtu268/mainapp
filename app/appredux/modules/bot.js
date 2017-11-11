import { ReduxError } from '../../utils/appUtils'
import {
  LOADING_IN_BOT,
  GET_QUESTION_SUCCESS,
  GET_QUESTION_FAILURE,
  CLEAR_QUESTIONS,
  LOG_OUT,
} from '../../constants'

const initialState = {
  questions: [],
  isLoading: false,
  error: new ReduxError('bot'),
}

export default function bot(state = initialState, action) {
  switch (action.type) {
    case LOADING_IN_BOT:
      return {
        ...state,
        isLoading: true,
      }
    case GET_QUESTION_SUCCESS:
      return {
        ...state,
        questions: action.questions,
        isLoading: false,
        error: state.error.clearError('bot'),
      }
    case GET_QUESTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: state.error.setError('bot', action.message),
      }
    case CLEAR_QUESTIONS:
    case LOG_OUT:
      return initialState
    default:
      return state
  }
}
