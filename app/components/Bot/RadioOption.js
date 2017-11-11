import React from 'react'
import PropTypes from 'prop-types'
import { Radio } from 'antd'

const RadioButton = Radio.Button

const propTypes = {
  content: PropTypes.string.isRequired,
  img: PropTypes.any,
}

const defaultProps = {
  img: '',
}

function RadioOption({ content, img }) {
  return (
    <RadioButton value={content}>
      { img && <img src={img} alt="" /> }
      {content}
    </RadioButton>
  )
}

RadioOption.propTypes = propTypes
RadioOption.defaultProps = defaultProps

export default RadioOption
