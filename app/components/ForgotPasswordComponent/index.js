import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Modal, Form, Input, Icon, Button, message } from 'antd'
import { withRouter } from 'react-router'
const FormItem = Form.Item

class ForgotPasswordComponent extends Component {
  static propTypes = {
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
    data: PropTypes.object,
    status: PropTypes.string,
    forgotPassword: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      loginButtonVisible: false,
    }
  }
  componentDidMount() {
    this.props.form.validateFields()
    // this.updateStatus(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forgotPassword !== this.props.forgotPassword) {
      const { status } = nextProps.forgotPassword
      const forgotPasswordMessage = nextProps.forgotPassword.message
      if (status === 200) {
        message.success(forgotPasswordMessage)
        this.setState({ loginButtonVisible: true })
        this.props.form.resetFields()
      } else {
        message.error(forgotPasswordMessage)
        this.setState({ loginButtonVisible: false })
      }
    }
  }
  handleBackToLogin = () => {
    this.props.push('/login')
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
    message.success('hello')
    const { getFieldDecorator, getFieldError, isFieldTouched, getFieldsError } = this.props.form
    const { loginButtonVisible } = this.state
    const { Content } = Layout
    const backLoginButton = (loginButtonVisible === true) && (
      <Button
        type="primary"
        htmlType="submit"
        onClick={this.handleBackToLogin}
        disabled={this.hasErrors(getFieldsError())}
      >
        Back to Login
      </Button>)
    const emailError = (isFieldTouched('email') && getFieldError('email'))
    return (
      <Layout>
        <Content>
          <Modal
            title="Forgot Password"
            visible={Boolean(true)}
            footer={null}
            closable={false}
          >
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
                  <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" autoComplete="off" />
                )}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.handleSend}
                  disabled={this.hasErrors(getFieldsError())}
                >
                  Send
                </Button>
                {backLoginButton}
              </FormItem>
            </Form>
          </Modal>
        </Content>
      </Layout>
    )
  }
}

export default withRouter(Form.create()(ForgotPasswordComponent))
