import {
  FETCHING_FEEDBACK,
  FETCHING_FEEDBACK_FAILURE,
  GET_LIST_FEEDBACK_SUCCESS,
  GET_LINK_FEEDBACK_SUCCESS,
} from '../../constants'

const initialState = {
  hasLoading: false,
  hasError: false,
  listFeedback: [],
  feedbackFullURL: '',
  feedbackDiscussion: {},
}

export default function feedback(state = initialState, action) {
  switch (action.type) {
    case FETCHING_FEEDBACK:
      return {
        ...state,
        hasLoading: true,
      }
    case FETCHING_FEEDBACK_FAILURE:
      return {
        ...state,
        hasLoading: false,
        hasError: true,
      }
    case GET_LINK_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedbackFullURL: action.data,
        hasLoading: false,
        hasError: false,
      }
    case GET_LIST_FEEDBACK_SUCCESS:
      return {
        ...state,
        listFeedback: action.listFeedback,
        hasLoading: false,
        hasError: false,
      }
    default:
      return state
  }
}
