import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { forgotPassword } from './actions'
import { Form, Input, Icon, Button, Alert } from 'antd'
const FormItem = Form.Item

const mapStateToProps = (state) => ({
  isLoading: state.forgotPassword.isLoading,
  isSuccessful: state.forgotPassword.isSuccessful,
  hasError: state.forgotPassword.hasError,
})

const mapDispatchToProps = {
  forgotPassword,
}

class ForgotPasswordRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
    }
  }
  componentDidMount() {
    this.props.form.validateFields()
    // this.updateStatus(this.props)
  }

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some((field) => fieldsError[field])
  }

  handleSend = () => {
    const subDomain = window.location.host.split('.')[0]
    const { getFieldValue } = this.props.form
    const email = getFieldValue('email')
    this.props.forgotPassword({ subDomain, email })
  }

  render() {
    const {
      form,
      isLoading,
      isSuccessful,
      hasError,
    } = this.props
    const { getFieldDecorator, getFieldError, isFieldTouched, getFieldsError } = form
    const emailError = (isFieldTouched('email') && getFieldError('email'))
    return (
      <Form>
        <FormItem
          label="Please input your email to find your account"
          validateStatus={(emailError) ? 'error' : ''}
          help={emailError || ''}
        >
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'The input is not valid E-mail!' },
            ],
          })(
            <Input
              prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
              placeholder="Email"
              autoComplete="off"
              disabled={isSuccessful}
            />
          )}
        </FormItem>
        {isSuccessful && <FormItem><Alert
          type="success"
          message="we've sent you an email with a link to reset your password"
        /></FormItem>}
        <FormItem style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.handleSend}
            disabled={this.hasErrors(getFieldsError()) || isLoading || isSuccessful}
            loading={isLoading && !hasError}
          >
            Send
          </Button>
        </FormItem>
      </Form>
    )
  }
}

ForgotPasswordRequest.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
    getFieldError: PropTypes.func,
    getFieldsError: PropTypes.func,
    isFieldTouched: PropTypes.func,
    getFieldValue: PropTypes.func,
    resetFields: PropTypes.func,
  }).isRequired,
  forgotPassword: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  isSuccessful: PropTypes.bool,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(ForgotPasswordRequest)))
