import { createSelector } from 'reselect';

/**
 * Direct selector to the linkInviteJoinTeamContainer state domain
 */
const selectLinkInviteJoinTeamContainerDomain = () => state => state.registerLink;

/**
 * Other specific selectors
 */


/**
 * Default selector used by LinkInviteJoinTeamContainer
 */

const selectRouteFeedbackUrl = (state, props) => props.params.code
const selectSubDomain = () => window.location.host.split('.')[0]

const selectLinkInviteJoinTeamContainer = () => createSelector(
  [selectLinkInviteJoinTeamContainerDomain(), selectRouteFeedbackUrl, selectSubDomain],
  (registerLink, inviteJoinTeamCode, subDomain) => ({ ...registerLink, inviteJoinTeamCode, subDomain })
);

export default selectLinkInviteJoinTeamContainer;
export {
  selectLinkInviteJoinTeamContainerDomain,
};
