import _ from 'lodash'
import {
  UPDATE_FEEDBACK_SAGA,
  UPDATE_FEEDBACK_LOADING,
  UPDATE_FEEDBACK_SUCCESS,
  UPDATE_FEEDBACK_FAILURE,
  COMMENT_FEEDBACK_SAGA,
  COMMENT_FEEDBACK_LOADING,
  COMMENT_FEEDBACK_SUCCESS,
  COMMENT_FEEDBACK_FAILURE,
  VOTE_FOR_FEEDBACK_SAGA,
  VOTE_FOR_FEEDBACK_SUCCESS,
  VOTE_FOR_FEEDBACK_FAILURE,
  GET_FEEDBACK_DISCUSSION_SAGA,
  GET_FEEDBACK_DISCUSSION_SUCCESS,
  GET_FEEDBACK_DISCUSSION_FAILURE,
  // UPDATE_STATE_PUBLIC_ISSUE_SAGA,
  // UPDATE_STATE_PUBLIC_ISSUE_SUCCESS,
  // UPDATE_STATE_PUBLIC_ISSUE_FAILURE,
} from '../../constants'

const initialState = {
  feedback: {
    competencies: [],
    latestActivities: [],
    giver: {},
    createdAt: '',
    voteCount: 0,
    listVoteLatest: [],
    commentCount: 0,
    listCommentLatest: [],
  },
  submitingComment: false,
  isUpdatingFeedback: false,
  isUpdateFeedbackSuccess: false,
  hasLoading: false,
  hasError: false,
}

export default function feedbackDiscussion(state = initialState, action) {
  switch (action.type) {
    case GET_FEEDBACK_DISCUSSION_SAGA:
      return {
        ...state,
        hasLoading: true,
      }
    case GET_FEEDBACK_DISCUSSION_SUCCESS:
      {
        const feedback = action.feedback
        let latestActivities = feedback.latestActivities
        // Filter Receive activities to one big activity
        let partition = _.partition(latestActivities, (activity) => {
          return activity.type === 'receive'
        })
        latestActivities = partition[1]
        if (partition[0].length) {
          latestActivities.unshift({
            type: 'receive',
            data: partition[0],
          })
        }
        // Filter Seen activities to one big activity
        partition = _.partition(latestActivities, (activity) => {
          return activity.type === 'seen'
        })
        latestActivities = partition[1]
        if (partition[0].length) {
          latestActivities.unshift({
            type: 'seen',
            data: partition[0],
          })
        }
        feedback.latestActivities = latestActivities
        return {
          ...state,
          feedback,
          hasLoading: false,
          hasError: false,
        }
      }
    case GET_FEEDBACK_DISCUSSION_FAILURE:
      return {
        ...state,
        hasError: true,
        hasLoading: false,
      }
    case VOTE_FOR_FEEDBACK_SAGA:
      return {
        ...state,
      }
    case VOTE_FOR_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedback: {
          ...state.feedback,
          voteCount: action.data.voteCount,
          listVoteLatest: action.data.listVoteLatest,
        },
        hasError: false,
        hasLoading: false,
      }
    case VOTE_FOR_FEEDBACK_FAILURE:
      return {
        ...state,
        hasError: true,
        hasLoading: false,
      }
    case COMMENT_FEEDBACK_SAGA:
      return {
        ...state,
      }
    case COMMENT_FEEDBACK_LOADING:
      return {
        ...state,
        submitingComment: true,
      }
    case COMMENT_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedback: {
          ...state.feedback,
          commentCount: action.data.commentCount,
          latestActivities: state.feedback.latestActivities.concat(action.data),
        },
        hasError: false,
        submitingComment: false,
      }
    case COMMENT_FEEDBACK_FAILURE:
      return {
        ...state,
        hasError: true,
        submitingComment: false,
      }
    case UPDATE_FEEDBACK_SAGA:
      return {
        ...state,
      }
    case UPDATE_FEEDBACK_LOADING:
      return {
        ...state,
        isUpdatingFeedback: true,
        isUpdateFeedbackSuccess: false,
      }
    case UPDATE_FEEDBACK_SUCCESS:
      console.log(state)
      return {
        ...state,
        hasError: false,
        isUpdatingFeedback: false,
        isUpdateFeedbackSuccess: true,
      }
    case UPDATE_FEEDBACK_FAILURE:
      return {
        ...state,
        hasError: true,
        isUpdatingFeedback: false,
        isUpdateFeedbackSuccess: false,
      }
    default:
      return state
  }
}
