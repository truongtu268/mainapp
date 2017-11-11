import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { message } from 'antd'
import ChangePassword from '../../components/ChangePassword/ChangePassword'
import { changePasswordAPI } from '../../api'

const mapStatetoProps = (state) => ({
  user: state.currentUser.user,
})

class ChangePasswordContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.onCancel = this.onCancel.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onCancel() {
    this.props.history.push(`/u/${this.props.user.code}`)
  }

  onSubmit(data) {
    const { oldPassword, newPassword } = data
    const sendRequest = {
      accessToken: localStorage.getItem('perkfecAccessCode'),
      values: {
        oldPassword,
        newPassword,
      },
    }
    this.setState({ loading: true })
    changePasswordAPI(sendRequest)
      .then((response) => {
        if (response.status === 200) {
          message.success(response.message)
          this.props.history.push(`/u/${this.props.user.code}`)
        } else {
          message.error(response.message)
        }
        this.setState({ loading: false })
      })
  }

  render() {
    return (
      <ChangePassword
        user={this.props.user}
        showLoading={this.state.loading}
        onCancel={this.onCancel}
        onSubmit={this.onSubmit}
      />
    )
  }
}

ChangePasswordContainer.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(connect(mapStatetoProps)(ChangePasswordContainer))
