import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'antd'
import InputPasswordEye from '../common/InputPasswordEye'

const FormItem = Form.Item

const propTypes = {
  user: PropTypes.object.isRequired,
  showLoading: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.object,
}

class ChangePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputOldPasswordType: 'password',
      inputNewPasswordType: 'password',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => this.props.onSubmit(values))
  }

  render() {
    const { form, showLoading, onCancel } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          <h1 style={{ textAlign: 'center' }}>Change your password</h1>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Old password"
        >
          {
            getFieldDecorator('oldPassword')(
              <InputPasswordEye />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="New password"
        >
          {
            getFieldDecorator('newPassword')(
              <InputPasswordEye />
            )
          }
        </FormItem>
        <FormItem {...tailFormItemLayout} style={{ textAlign: 'right' }}>
          {
            showLoading
            ? <Button
              size="large"
              style={{ marginRight: 15 }}
              onClick={onCancel}
              disabled
            >Cancel</Button>
            : <Button
              size="large"
              style={{ marginRight: 15 }}
              onClick={onCancel}
            >Cancel</Button>
          }
          {
            showLoading
            ? <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading
            >Change</Button>
            : <Button
              type="primary"
              htmlType="submit"
              size="large"
            >Change</Button>
          }
        </FormItem>
      </Form>
    )
  }
}

ChangePassword.propTypes = propTypes

const ChangePasswordComponent = Form.create()(ChangePassword)
export default ChangePasswordComponent

