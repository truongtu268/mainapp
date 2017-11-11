/*
 *
 * LinkInviteJoinTeamContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import selectLinkInviteJoinTeamContainer from './selectors';
import LinkInviteJoinTeamComponent from '../../components/LinkInviteJoinTeamComponent/LinkInviteJoinTeamComponent'
import { verifyRegisterLink, registerByLink } from './actions';

export class LinkInviteJoinTeamContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    verifyRegisterLink: PropTypes.func.isRequired,
    inviteJoinTeamCode: PropTypes.string.isRequired,
  }
  componentDidMount() {
    this.props.verifyRegisterLink({ inviteJoinTeamCode: this.props.inviteJoinTeamCode })
  }
  render() {
    return (
      <div>
        <LinkInviteJoinTeamComponent {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = selectLinkInviteJoinTeamContainer();

function mapDispatchToProps(dispatch) {
  return {
    verifyRegisterLink: (data) => dispatch(verifyRegisterLink(data)),
    registerByLink: (data) => dispatch(registerByLink(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkInviteJoinTeamContainer);
