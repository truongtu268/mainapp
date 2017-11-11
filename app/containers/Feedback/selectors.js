import { createSelector } from 'reselect'

const selectFeedback = (state) => state.feedback
const selectSubDomain = () => window.location.host.split('.')[0]
const selectToken = () => localStorage.getItem('perkfecAccessCode')

const getStateSelector = createSelector(
  [selectFeedback, selectToken, selectSubDomain],
  (feedback, accessToken, subDomain) => ({ ...feedback, accessToken, subDomain })
)

export default getStateSelector
