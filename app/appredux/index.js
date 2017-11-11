import language from './modules/language'
import currentUser from './modules/currentUser'
import members from './modules/members'
import feedback from './modules/feedback'
import feedbackPublic from './modules/feedbackPublic'
import feedbackDiscussion from './modules/feedbackDiscussion'
import feedbackGive from './modules/feedbackGive'
import feedbackReceived from './modules/feedbackReceived'
import tracking from './modules/tracking'
import newsfeed from './modules/newsfeed'
import otherUser from './modules/otherUser'
import dashboard from './modules/dashboard'
import registerLink from './modules/registerLink'
import forgotPassword from './modules/forgotPassword'
import bot from './modules/bot'
import common from './modules/common'
import surveyEdit from './modules/surveyEdit'
import surveys from './modules/surveys'

const rootReducer = {
  language,
  currentUser,
  otherUser,
  members,
  feedback,
  tracking,
  feedbackPublic,
  feedbackDiscussion,
  feedbackGive,
  feedbackReceived,
  newsfeed,
  dashboard,
  registerLink,
  forgotPassword,
  bot,
  common,
  surveyEdit,
  surveys,
}

export default rootReducer
