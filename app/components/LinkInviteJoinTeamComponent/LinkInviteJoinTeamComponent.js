import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Modal, Form, Input, Button, Icon } from 'antd'

const FormItem = Form.Item

class LinkInviteJoinTeamComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes={
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func,
      validateFields: PropTypes.func,
      getFieldsError: PropTypes.func,
      getFieldError: PropTypes.func,
      isFieldTouched: PropTypes.func,
      getFieldsValue: PropTypes.func,
    }),
    registerByLink: PropTypes.func,
    inviteJoinTeamCode: PropTypes.string.isRequired,
    subDomain: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      passwordType: 'password',
    }
  }

  componentDidMount() {
    this.props.form.validateFields()
  }
  handleSubmit = () => {
    const { email, password } = this.props.form.getFieldsValue()
    this.props.registerByLink({
      email,
      password,
      inviteJoinTeamCode: this.props.inviteJoinTeamCode,
      subDomain: this.props.subDomain,
    })
  }

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }

  showHide = () => {
    this.setState({
      passwordType: this.state.passwordType === 'password' ? 'text' : 'password',
    })
  }
  showPasswordButton = () => {
    return this.state.passwordType === 'password'
      ? <Icon type="eye-o" onClick={this.showHide} />
      : <Icon type="eye" onClick={this.showHide} />
  }

  render() {
    const {
      getFieldDecorator,
      getFieldError,
      isFieldTouched,
      getFieldsError,
    } = this.props.form
    const { Content } = Layout
    const emailError = isFieldTouched('email') && getFieldError('email')
    const passwordError = isFieldTouched('password') && getFieldError('password')
    return (
      <Layout>
        <Content>
          <Modal
            title="Invite to Join Team"
            visible={Boolean(true)}
            footer={null}
            closable={false}
          >
            <Form>
              <FormItem
                label="E-mail"
                validateStatus={emailError ? 'error' : ''}
                help={emailError || ''}
              >
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'The input is not valid E-mail' },
                  ],
                })(
                  <Input placeholder="Email" />
                )}
              </FormItem>
              <FormItem
                label="Password"
                validateStatus={passwordError ? 'error' : ''}
                help={passwordError || ''}
              >
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Please input your password!' },
                    { min: 8, message: 'Password must be longer than 7 characters' },
                  ],
                })(
                  <Input suffix={this.showPasswordButton()} placeholder="Password" type={this.state.passwordType} />
                )}
              </FormItem>
              <FormItem style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={this.hasErrors(getFieldsError())}
                  onClick={this.handleSubmit}
                >
                  Join
                </Button>
              </FormItem>
            </Form>
          </Modal>
        </Content>
      </Layout>
    )
  }
}

export default Form.create()(LinkInviteJoinTeamComponent)
