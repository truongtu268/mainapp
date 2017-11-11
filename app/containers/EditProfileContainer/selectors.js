import { createSelector } from 'reselect';

const getUser = (state) => state.currentUser.user

const getHasLoading = (state) => state.currentUser.hasLoading

const selectToken = () => localStorage.getItem('perkfecAccessCode')

const getStateSelector = createSelector(
  [getUser, selectToken, getHasLoading],
  (user, token, hasLoading) => ({ user, token, hasLoading })
)

export default getStateSelector
