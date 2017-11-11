import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserProfile from '../../components/UserProfileComponent'
import { getOtherUsers } from './actions'

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  otherUser: state.otherUser.info,
})

const mapDispatchToProps = (dispatch) => ({
  getOtherUsers: (data) => dispatch(getOtherUsers(data)),
})

const defaultProps = {
  otherUser: {},
}

class UserProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.goToEditPage = this.goToEditPage.bind(this)
    this.goToPasswordPage = this.goToPasswordPage.bind(this)
  }

  componentDidMount() {
    const code = this.props.match.params.userCode
    this.props.getOtherUsers({ code })
  }

  goToEditPage() {
    this.props.history.push(`/u/${this.props.user.code}/edit`)
  }

  goToPasswordPage() {
    this.props.history.push(`/u/${this.props.user.code}/password`)
  }

  render() {
    const {
      match,
      user,
      otherUser,
    } = this.props
    const isCurrent = match.params.userCode === user.code
    return (
      <UserProfile
        user={(isCurrent) ? user : otherUser}
        isShowButton={isCurrent}
        goToEditPage={this.goToEditPage}
        goToPasswordPage={this.goToPasswordPage}
      />
    )
  }
}

UserProfileContainer.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  otherUser: PropTypes.objectOf(PropTypes.any).isRequired,
  getOtherUsers: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any),
}
UserProfileContainer.defaultProps = defaultProps

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer)
