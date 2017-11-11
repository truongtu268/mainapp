import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'antd'

const propTypes = {
  code: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  img: PropTypes.any,
}

const defaultProps = {
  img: '',
}

function CheckboxOption({ content, code, img }) {
  return (
    <Checkbox value={code}>
      { img && <img src={img} alt="" /> }
      {content}
    </Checkbox>
  )
}

CheckboxOption.propTypes = propTypes
CheckboxOption.defaultProps = defaultProps

export default CheckboxOption
