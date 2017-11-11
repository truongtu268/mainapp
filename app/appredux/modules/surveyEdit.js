import update from 'immutability-helper'
import { ReduxError } from 'utils/appUtils'
import * as constants from '../../constants'

const defaultInputAnswer = {
  content: '',
  isDelete: false,
  isEdited: true,
}

const defaultAnswerList = {
  3: [{
    content: 'Unhappy',
    isDelete: false,
    isEdited: true,
  }, {
    content: 'Happy',
    isDelete: false,
    isEdited: true,
  }],
  4: [{
    content: 'Leadership',
    isDelete: false,
    isEdited: true,
  }, {
    content: 'Communication',
    isDelete: false,
    isEdited: true,
  }, {
    content: 'Creativity',
    isDelete: false,
    isEdited: true,
  }, {
    content: 'Teamwork',
    isDelete: false,
    isEdited: true,
  }],
  5: [{
    content: 'Strongly Disagree',
    isDelete: false,
    isEdited: true,
  }, {
    content: 'Disagree',
    isDelete: false,
    isEdited: true,
  }, {
    content: 'Neutral/Neither agree nor disagree',
    isDelete: false,
    isEdited: true,
  }, {
    content: 'Agree',
    isDelete: false,
    isEdited: true,
  }, {
    content: 'Strongly Agree',
    isDelete: false,
    isEdited: true,
  }],
  6: [{
    weight: 1,
    content: 'Unhappy',
  }, {
    weight: 5,
    content: 'Happy',
  }],
}

const emptyQuestion = {
  meaningKey: 7,
  type: 1,
  content: '',
  answerList: [],
  isRequireAnswer: true,
  isDelete: false,
  isEdited: true,
}

const initialState = {
  survey: {
    template: '',
    title: 'Untitled survey',
    status: '',
    language: 'en',
    questions: defaultAnswerList[1] || [],
    schedule: {
      timeStart: '',
      timeStop: '',
      dayOfWeek: [],
      weekOfMonth: [],
      monthOfQuarter: [],
      isRepeat: true,
    },
    receivers: [],
  },
  isLoading: false,
  error: new ReduxError('step1', 'step2'),
}

export default function surveyEdit(state = initialState, action) {
  switch (action.type) {
    case constants.GET_SURVEY_DETAIL_SAGA:
      return {
        ...state,
        survey: {
          ...state.survey,
          template: action.data.feedbackSample,
        },
        isLoading: true,
      }
    case constants.GET_SURVEY_DETAIL_SUCCESS:
      return {
        ...state,
        survey: {
          ...state.survey,
          title: action.title || state.survey.title,
          questions: action.list || [],
        },
        isLoading: false,
        error: state.error.clearError('step1'),
      }
    case constants.GET_SURVEY_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: state.error.setError('step1', action.message),
      }
    case constants.SAVE_SURVEY_NEXT_STEP1_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case constants.SAVE_SURVEY_NEXT_STEP1_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case constants.SAVE_SURVEY_NEXT_STEP1_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    case constants.LOCAL_UPDATE_SURVEY_TITLE: {
      const title = action.payload.value || 'Untitled survey'
      return {
        ...state,
        survey: {
          ...state.survey,
          title,
        },
      }
    }
    case constants.LOCAL_CREATE_SURVEY_QUESTION: {
      const { copyIndex } = action.payload
      let updateObj
      const questions = state.survey.questions
      if (copyIndex > -1) {
        if (copyIndex >= questions.length) {
          throw new Error('Invalid index when trying to duplicate question.')
        }
        const template = questions[copyIndex]
        template.isEdited = true
        updateObj = { $splice: [[copyIndex, 0, template]] }
      } else {
        const template = emptyQuestion
        updateObj = { $push: [template] }
      }
      return update(state, { survey: { questions: updateObj } })
    }
    case constants.LOCAL_UPDATE_SURVEY_QUESTION: {
      const { index, key, value } = action.payload
      return update(state, { survey: { questions: { [index]: {
        $apply: (question) => {
          let additionUpdate = {}
          if (key === 'type') {
            additionUpdate = {
              answerList: { $set: defaultAnswerList[value] || [] },
            }
          }
          return update(question, {
            [key]: { $set: value },
            isEdited: { $set: true },
            ...additionUpdate,
          })
        },
      } } } })
    }
    case constants.LOCAL_UPDATE_SURVEY_QUESTION_ANSWER: {
      const { questionIndex, answerIndex, key, value } = action.payload
      if (!(questionIndex > -1) || !(answerIndex > -1) || !key) throw new Error('Missing payload in LOCAL_UPDATE_SURVEY_QUESTION_ANSWER')
      return update(state, {
        survey: {
          questions: {
            [questionIndex]: {
              answerList: {
                [answerIndex]: {
                  [key]: { $set: value },
                  isEdited: { $set: true },
                },
              },
            },
          },
        },
      })
    }
    case constants.LOCAL_CREATE_SURVEY_QUESTION_ANSWER: {
      const { questionIndex, answerIndex, merge = {} } = action.payload
      if (!(questionIndex > -1)) throw new Error('Missing payload in LOCAL_CREATE_SURVEY_QUESTION_ANSWER')
      let listUpdate
      if (!(answerIndex > -1)) {
        listUpdate = {
          $push: [{
            ...defaultInputAnswer,
            ...merge,
          }],
        }
      } else {
        listUpdate = {
          $splice: [[answerIndex, 0, {
            ...defaultInputAnswer,
            ...merge,
          }]],
        }
      }
      return update(state, {
        survey: {
          questions: {
            [questionIndex]: {
              answerList: {
                $apply: (list = []) => update(list, listUpdate),
              },
            },
          },
        },
      })
    }
    case constants.LOCAL_DELETE_SURVEY_QUESTION_ANSWER: {
      const  { questionIndex, answerIndex } = action.payload
      return update(state, {
        survey: {
          questions: {
            [questionIndex]: {
              answerList: { $splice: [[answerIndex, 1]] },
            },
          },
        },
      })
    }
    case 'UPDATE_TEMPLATE': {
      return {
        ...state,
        survey: {
          ...state.survey,
          template: action.code,
          questions: action.questions,
          status: action.status,
        },
        isLoading: false,
        error: state.error.clearError('step1'),
      }
    }
    case constants.UPDATE_SCHEDULE_SUCCESS: {
      const { templateCode, schedule, questions, status } = action.payload
      return {
        ...state,
        survey: {
          ...state.survey,
          template: templateCode,
          schedule,
          questions,
          status,
        },
        isLoading: false,
        error: state.error.clearError('step2'),
      }
    }
    case constants.SUBMIT_SURVEY_SETTING:
      return {
        ...state,
        isLoading: true,
      }
    case constants.SUBMIT_SURVEY_SETTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case constants.SUBMIT_SURVEY_SETTING_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    case constants.CLEAR_SURVEY_EDIT:
    case constants.LOG_OUT: {
      return initialState
    }
    default:
      return state
  }
}
