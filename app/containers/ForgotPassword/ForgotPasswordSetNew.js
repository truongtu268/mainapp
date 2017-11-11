import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { setNewPassword } from './actions'
import InputPasswordEye from '../../components/common/InputPasswordEye'
import { Form, Button, message } from 'antd'
const FormItem = Form.Item

const mapStateToProps = (state) => ({
  isLoading: state.forgotPassword.isLoading,
  isSuccessful: state.forgotPassword.isSuccessful,
  hasError: state.forgotPassword.hasError,
})

const mapDispatchToProps = {
  setNewPassword,
}

class ForgotPasswordSetNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
    }
  }
  componentDidMount() {
    this.props.form.validateFields()
  }

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some((field) => fieldsError[field])
  }

  handleSend = () => {
    const { getFieldValue } = this.props.form
    const forgotToken = queryString.parse(this.props.location.search).token
    const password = getFieldValue('password')
    this.props.setNewPassword({ forgotToken, password })
  }

  render() {
    const {
      form,
      isLoading,
      isSuccessful,
      hasError,
    } = this.props
    const { getFieldDecorator, getFieldError, isFieldTouched, getFieldsError } = form
    const passwordError = (isFieldTouched('password') && getFieldError('password'))
    const messageHelper = 'Please type your NEW password'
    return (
      <Form>
        <FormItem
          label={messageHelper}
          validateStatus={(passwordError) ? 'error' : ''}
          help={passwordError || ''}
        >
          {
            getFieldDecorator('password', {
              rules: [
                { required: true, message: messageHelper },
                { min: 8, message: 'Password must be longer than 7 characters' },
              ],
            })(
              <InputPasswordEye iconType="lock" placeholder="password" />
            )
          }
        </FormItem>
        <FormItem style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.handleSend}
            disabled={this.hasErrors(getFieldsError()) || isLoading || isSuccessful}
            loading={isLoading && !hasError}
          >
            Submit
          </Button>
        </FormItem>
      </Form>
    )
  }
}

ForgotPasswordSetNew.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
    getFieldError: PropTypes.func,
    getFieldsError: PropTypes.func,
    isFieldTouched: PropTypes.func,
    getFieldValue: PropTypes.func,
    resetFields: PropTypes.func,
  }).isRequired,
  setNewPassword: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  isSuccessful: PropTypes.bool,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(ForgotPasswordSetNew)))
