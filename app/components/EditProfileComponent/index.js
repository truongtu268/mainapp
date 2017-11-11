import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Form, Input, Button, Select, DatePicker, message } from 'antd'
import moment from 'moment'
import styles from './styles.css'
const FormItem = Form.Item

class EditProfileComponentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      imagePreviewUrl: props.user.avatar,
    }
    this.handlePhotoChange = this.handlePhotoChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onCancelEditProfile = this.onCancelEditProfile.bind(this)
  }

  onCancelEditProfile() {
    const {
      user,
      history,
    } = this.props
    history.push(`/u/${user.code}`)
  }

  handlePhotoChange(e) {
    e.preventDefault()
    const reader = new FileReader()
    const file = e.target.files[0]

    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      reader.addEventListener('load', () => {
        this.setState({
          file,
          imagePreviewUrl: reader.result,
        })
      })
      reader.readAsDataURL(file)
    } else {
      // e.stopPropagation()
      message.error('Photo content type is invalid')
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.log(err)
        return
      }
      const sentData = Object.assign({}, values, {
        birthday: values.birthday && values.birthday !== 'Invalid date' ? moment(values.birthday).format('DD/MM/YYYY') : null,
        joindate: values.joindate && values.joindate !== 'Invalid date' ? new Date(moment(values.joindate).format()) : null,
      })
      delete sentData.prefix
      this.props.onSubmit(sentData, this.state.file)
    })
  }

  render() {
    const { user, form, hasLoading } = this.props
    const { getFieldDecorator } = form
    const dateFormat = 'DD/MM/YYYY'
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
        <h1 className={styles.title}>Update Profile</h1>
        <FormItem
          {...formItemLayout}
          label="Photo"
        >
          <div className={styles.photo}>
            <img src={this.state.imagePreviewUrl} alt="user avatar" />
          </div>
          <input
            className={styles.fileUpload}
            type="file"
            name="user[avatar]"
            id="user_avatar"
            onChange={(e) => this.handlePhotoChange(e)}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="First Name"
        >
          {
            getFieldDecorator('firstname', {
              initialValue: user.firstName,
              rules: [{ required: true, message: 'Please input your name' }],
            })(
              <Input autoComplete="off" />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Last Name"
        >
          {
            getFieldDecorator('lastname', {
              initialValue: user.lastName,
              rules: [{ required: true, message: 'Please input your name' }],
            })(
              <Input autoComplete="off" />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Job title"
        >
          {
            getFieldDecorator('jobTitle', {
              initialValue: user.jobTitle,
              rules: [{ required: true, message: 'Please input your job title' }],
            })(
              <Input autoComplete="off" />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Mobile"
        >
          {
            getFieldDecorator('mobile', {
              initialValue: user.personalInfo.mobile,
            })(
              <Input />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Date of Birth"
        >
          {getFieldDecorator('birthday', {
            initialValue: user.personalInfo.day_Of_Birth ? moment(user.personalInfo.day_Of_Birth, dateFormat) : null,
          })(
            <DatePicker format={dateFormat} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Join date"
        >
          {getFieldDecorator('joindate', {
            initialValue: user.joinCompanyDate ? moment(user.joinCompanyDate) : null,
          })(
            <DatePicker format={dateFormat} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Gender"
        >
          {getFieldDecorator('gender', {
            initialValue: user.personalInfo.gender ? user.personalInfo.gender : null,
          })(
            <Select>
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout} style={{ textAlign: 'right' }}>
          <Button
            size="large"
            style={{ marginRight: 15 }}
            loading={hasLoading}
            onClick={this.onCancelEditProfile}
          >Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={hasLoading}
          >Update</Button>
        </FormItem>
      </Form>
    )
  }
}

EditProfileComponentForm.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  hasLoading: PropTypes.bool,
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
}
const EditProfileComponent = withRouter(Form.create()(EditProfileComponentForm))

export default EditProfileComponent

