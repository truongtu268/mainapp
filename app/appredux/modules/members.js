import { ReduxError } from '../../utils/appUtils'
import {
  GET_COMPANY_MEMBERS_LOADING,
  GET_COMPANY_MEMBERS_SUCCESS,
  GET_COMPANY_MEMBERS_FAILURE,
  GET_INVITE_LINK_SUCCESS,
  GET_INVITE_LINK_FAILURE,
  UPGRADE_ADMIN_SUCCESS,
  UPGRADE_ADMIN_FAILURE,
  UPGRADE_OWNER_SUCCESS,
  UPGRADE_OWNER_FAILURE,
  DOWNGRADE_USER_SUCCESS,
  DOWNGRADE_USER_FAILURE,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_FAILURE,
  INVITE_MEMBERS_SUCCESS,
  INVITE_MEMBERS_FAILURE,
  REINVITE_MEMBERS_FAILURE,
  LOG_OUT,
} from '../../constants'

const initialState = {
  listMembers: [],
  inviteLink: '',
  isLoading: false,
  error: new ReduxError(
    'listMembers',
    'inviteLink',
    'upgrade_role',
    'downgrade_role',
    'delete_user',
    'invite_user'
  ),
}

export default function members(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY_MEMBERS_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case GET_COMPANY_MEMBERS_SUCCESS:
      return {
        ...state,
        listMembers: action.listMembers,
        isLoading: false,
        error: state.error.clearError('listMembers'),
      }
    case GET_COMPANY_MEMBERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: state.error.setError('listMembers', action.message),
      }
    case GET_INVITE_LINK_SUCCESS:
      return {
        ...state,
        inviteLink: action.inviteLink,
        isLoading: false,
        error: state.error.clearError('inviteLink'),
      }
    case GET_INVITE_LINK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: state.error.setError('inviteLink', action.message),
      }
    case UPGRADE_ADMIN_SUCCESS:
      return {
        ...state,
        listMembers: [...state.listMembers.filter((mem) => mem.id !== action.data.id), action.data],
        isLoading: false,
        error: state.error.clearError('upgrade_role'),
      }
    case UPGRADE_ADMIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: state.error.setError('upgrade_role', action.message),
      }
    case UPGRADE_OWNER_SUCCESS:
      return {
        ...state,
        listMembers: [...state.listMembers.filter((mem) => mem.id !== action.data.id), action.data],
        isLoading: false,
        error: state.error.clearError('upgrade_role'),
      }
    case UPGRADE_OWNER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: state.error.setError('upgrade_role', action.message),
      }
    case DOWNGRADE_USER_SUCCESS:
      return {
        ...state,
        listMembers: [...state.listMembers.filter((mem) => mem.id !== action.data.id), action.data],
        isLoading: false,
        error: state.error.clearError('downgrade_role'),
      }
    case DOWNGRADE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: state.error.setError('downgrade_role', action.message),
      }
    case DELETE_MEMBER_SUCCESS:
      return {
        ...state,
        listMembers: state.listMembers.filter((mem) => mem.id !== action.data.id),
        isLoading: false,
        error: state.error.clearError('delete_user'),
      }
    case DELETE_MEMBER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: state.error.setError('delete_user', action.message),
      }
    case INVITE_MEMBERS_SUCCESS:
      return {
        ...state,
        listMembers: [...state.listMembers, ...action.data],
        isLoading: false,
        error: state.error.clearError('invite_user'),
      }
    case INVITE_MEMBERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: state.error.setError('invite_user', action.message),
      }
    case REINVITE_MEMBERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: state.error.setError('invite_user', action.message),
      }
    case LOG_OUT:
      return initialState
    default:
      return state
  }
}
