import {
  VERIFY_REGISTER_LINK_SUCCESS,
} from '../../constants'

const initialState = {
  hasLoading: false,
  hasError: false,
  info: {},
}

export default function registerLink(state = initialState, action) {
  switch (action.type) {
    case VERIFY_REGISTER_LINK_SUCCESS:
      return {
        ...state,
        info: action.data,

      }
    default:
      return state
  }
}
