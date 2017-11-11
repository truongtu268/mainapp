import { createSelector } from 'reselect'

const selectNewsFeed = (state) => state.newsfeed
const selectToken = () => localStorage.getItem('perkfecAccessCode')

const getStateSelector = createSelector(
  [selectNewsFeed, selectToken],
  (newsfeed, token) => ({ newsfeed, token })
)

export default getStateSelector
