import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Input } from 'antd'

class InputPasswordEye extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputType: 'password',
    }
    this.handleInputPasswordEye = this.handleInputPasswordEye.bind(this)
    this.handleInputType = this.handleInputType.bind(this)
  }
  handleInputType() {
    this.setState({
      inputType: this.state.inputType === 'password' ? 'text' : 'password',
    })
  }
  handleInputPasswordEye(inputType) {
    return inputType === 'password'
      ? <Icon type="eye-o" onClick={this.handleInputType} />
      : <Icon type="eye" onClick={this.handleInputType} />
  }
  render() {
    const { inputType } = this.state
    const { iconType, onChange, placeholder } = this.props
    return (
      <Input
        onChange={onChange}
        prefix={<Icon type={iconType} style={{ fontSize: 13 }} />}
        suffix={this.handleInputPasswordEye(inputType)}
        placeholder={placeholder}
        type={inputType}
      />)
  }
}

InputPasswordEye.propTypes = {
  iconType: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
}

export default InputPasswordEye
