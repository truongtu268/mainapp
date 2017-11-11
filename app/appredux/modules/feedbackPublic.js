import {
  GET_ALL_FEEDBACK_PUBLIC_SAGA,
  GET_ALL_FEEDBACK_PUBLIC_STATS_SUCCESS,
  GET_ALL_FEEDBACK_PUBLIC_STATS_FAILURE,
  GET_ALL_FEEDBACK_PUBLIC_SUCCESS,
  GET_ALL_FEEDBACK_PUBLIC_FAILURE,
} from '../../constants'

const initialState = {
  feedbacks: [],
  stats: {
    open: 0,
    closed: 0,
    anonymous: 0,
  },
  hasLoading: false,
  hasError: false,
}

export default function feedbackPublic(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_FEEDBACK_PUBLIC_SAGA:
      return {
        ...state,
        hasLoading: true,
      }
    case GET_ALL_FEEDBACK_PUBLIC_STATS_SUCCESS:
      return {
        ...state,
        stats: action.stats,
        hasLoading: false,
        hasError: false,
      }
    case GET_ALL_FEEDBACK_PUBLIC_STATS_FAILURE:
      return {
        ...state,
        hasLoading: false,
        hasError: true,
      }
    case GET_ALL_FEEDBACK_PUBLIC_SUCCESS:
      return {
        ...state,
        feedbacks: action.feedbacks,
        hasLoading: false,
        hasError: false,
      }
    case GET_ALL_FEEDBACK_PUBLIC_FAILURE:
      return {
        ...state,
        hasLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}
