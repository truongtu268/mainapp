import {
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  LOADING_IN_USER,
  GET_COMPANY_MEMBERS_LOADING,
  GET_COMPANY_MEMBERS_SUCCESS,
  GET_COMPANY_MEMBERS_FAILURE,
  GET_QUESTION_TYPES_SUCCESS,
  GET_QUESTION_TYPES_FAILURE,
} from '../../constants'

export function createSequence({ location }) {
  return {
    type: 'CREATE_SEQUENCE',
    location,
  }
}

export function showLoading() {
  return {
    type: LOADING_IN_USER,
  }
}

export function checkUserSuccess(user) {
  return {
    type: GET_CURRENT_USER_SUCCESS,
    user,
  }
}

export function checkUserFailure(message) {
  return {
    type: GET_CURRENT_USER_FAILURE,
    message,
  }
}

// initial actions
// ---------------------------------

/**
 * Company members
 */

export function showLoadingInMembers() {
  return {
    type: GET_COMPANY_MEMBERS_LOADING,
  }
}

export function getCompanyMembersSuccess(listMembers) {
  return {
    type: GET_COMPANY_MEMBERS_SUCCESS,
    listMembers,
  }
}

export function getCompanyMembersFailure(message) {
  return {
    type: GET_COMPANY_MEMBERS_FAILURE,
    message,
  }
}

/**
 * Question types
 */

export function getQuestionTypesSuccess(questionTypes) {
  return {
    type: GET_QUESTION_TYPES_SUCCESS,
    questionTypes,
  }
}

export function getQuestionTypesFailure(message) {
  return {
    type: GET_QUESTION_TYPES_FAILURE,
    message,
  }
}
