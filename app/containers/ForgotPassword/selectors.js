import { createSelector } from 'reselect'

const selectCurrentData = (state) => state.forgotPassword

const getStateSelect = createSelector(
  [selectCurrentData],
  (currentData) => ({ ...currentData })
)

export default getStateSelect
