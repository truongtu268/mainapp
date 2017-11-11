import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Modal, Form, Icon, Input, Button } from 'antd'
import { connect } from 'react-redux'
import InputPasswordEye from '../common/InputPasswordEye'
const FormItem = Form.Item

const mapStateToProps = (state) => { return state.currentUser }

const propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
  }).isRequired,
  handleSubmitInput: PropTypes.func.isRequired,
  clientCode: PropTypes.string.isRequired,
  history: PropTypes.any.isRequired,
}

class LoginComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleShowOrHidePassword = this.handleShowOrHidePassword.bind(this)
    this.directForgotPassword = this.directForgotPassword.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (err) {
        console.error(err)
        return
      }
      const data = {
        grant_type: 'password',
        client_id: this.props.clientCode,
        username: values.userName,
        password: values.password,
        email: values.userName,
      }
      this.props.handleSubmitInput(data)
    })
  }

  directForgotPassword() { // eslint-disable-line class-methods-use-this
    this.props.history.push('/forgotpassword')
  }

  handleShowOrHidePassword() {
    this.setState({
      inputType: this.state.inputType === 'password' ? 'text' : 'password',
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { Content } = Layout

    return (
      <Layout style={{ minHeight: '100%' }}>
        <Content>
          <Modal
            title="Signin"
            visible={Boolean(true)}
            footer={null}
            closable={false}
          >
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {
                  getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <InputPasswordEye iconType="lock" placeholder="password" />
                  )
                }
              </FormItem>
              <FormItem style={{ marginBottom: 0 }}>
                <div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    size="large"
                    style={{ width: '100%' }}
                  >
                    Log in
                  </Button>
                </div>
                <a
                  className="login-form-forgot"
                  onClick={this.directForgotPassword}
                >
                  Forgot password
                </a> Or <a href="">register now!</a>
              </FormItem>
            </Form>
          </Modal>
        </Content>
      </Layout>
    )
  }
}

LoginComponent.propTypes = propTypes

export default connect(mapStateToProps)(LoginComponent)
