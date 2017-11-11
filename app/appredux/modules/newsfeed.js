import {
  GET_LOG_PROCCESSES_SAGA,
  GET_LOG_PROCCESSES_SUCCESS,
  GET_LOG_PROCCESSES_FAILED,
} from '../../constants'

const initialState = {
  newsfeedList: [],
  hasLoading: false,
  hasError: false,
}

function newsfeed(state = initialState, action) {
  switch (action.type) {
    case GET_LOG_PROCCESSES_SAGA:
      return {
        ...state,
        hasLoading: true,
      }
    case GET_LOG_PROCCESSES_FAILED:
      return {
        ...state,
        hasLoading: false,
        hasError: true,
      }
    case GET_LOG_PROCCESSES_SUCCESS:
      return {
        ...state,
        newsfeedList: action.data,
        hasLoading: false,
        hasError: false,
      }
    default:
      return state
  }
}

export default newsfeed
