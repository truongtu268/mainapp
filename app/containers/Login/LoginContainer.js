import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Form } from 'antd'
import Loading from 'components/common/Loading'
import Login from 'components/Login/Login'
import {
  checkUser,
} from './actions'

const mapStateToProps = (state, props) => ({
  accessToken: queryString.parse(props.location.search).accessToken,
  email: queryString.parse(props.location.search).email,
  isLoading: state.currentUser.isLoading,
})

const mapDispatchToProps = {
  checkUser,
}

const propTypes = {
  accessToken: PropTypes.string,
  email: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  checkUser: PropTypes.func.isRequired,
  history: PropTypes.any.isRequired,
}

const defaultProps = {
  // [TO-DO]
  accessToken: null,
  email: null,
}

class LoginContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSubmitInput = this.handleSubmitInput.bind(this)
  }

  handleSubmitInput(data) {
    // console.log('[DEV] handleSubmitInput', data)
    this.props.checkUser(data)
  }

  render() {
    const WrapLoginForm = Form.create()(Login)
    const clientCode = localStorage.getItem('perkfecClientCode')

    if (this.props.isLoading) {
      return <Loading />
    }

    return (
      <WrapLoginForm
        clientCode={clientCode}
        handleSubmitInput={this.handleSubmitInput}
        history={this.props.history}
      />
    )
  }
}

LoginContainer.propTypes = propTypes
LoginContainer.defaultProps = defaultProps

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
