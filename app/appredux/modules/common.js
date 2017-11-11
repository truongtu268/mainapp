import {
  GET_ALL_COMPETENCIES,
  GET_QUESTION_TYPES_LOADING,
  GET_QUESTION_TYPES_SUCCESS,
  GET_QUESTION_TYPES_FAILURE,
} from '../../constants'

const initialState = {
  competencies: {
    list: [
      /* {
        id: 5,
        name: 'competency 01',
      }, {
        id: 6,
        name: 'competency 02',
      }, {
        id: 7,
        name: 'competency 03',
      }, {
        id: 8,
        name: 'competency 04',
      }, {
        id: 9,
        name: 'competency 05',
      },*/
    ],
  },
  questionTypes: [
    {
      code: 'Q5OAYDHvsTOWWOv',
      name: 'Text',
      codename: 'text',
      id: 1,
    }, {
      code: 'ogFWoQx2FdD4Mwr',
      name: 'Mention',
      codename: 'mention',
      id: 2,
    }, {
      code: 'DSPeJgw5UlyGifj',
      name: 'Check box',
      codename: 'checkbox',
      id: 3,
    }, {
      code: 'tmlCoRSmUgzWyTC',
      name: 'Text with attachment',
      codename: 'textWithAttachment',
      id: 4,
    }, {
      code: 's7PfkwYFmHRRLMB',
      name: 'Multiple choice',
      codename: 'multipleChoice',
      id: 5,
    }, {
      code: 'wLr4xKM413PYl5s',
      name: 'linear scale',
      codename: 'linearScale',
      id: 6,
    },
  ],
  isLoading: false,
}

function common(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMPETENCIES:
      return {
        ...state,
        competencies: {
          list: action.data.list,
        },
      }
    case GET_QUESTION_TYPES_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case GET_QUESTION_TYPES_SUCCESS:
      return {
        ...state,
        questionTypes: action.questionTypes,
        isLoading: false,
      }
    case GET_QUESTION_TYPES_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

export default common
