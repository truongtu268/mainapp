import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Input, Icon } from 'antd'

const propTypes = {
  answers: PropTypes.array.isRequired,
  questionIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

class CheckboxAnswer extends PureComponent {
  render() {
    const {
      questionIndex,
      onChange,
      onCreate,
      onDelete,
    } = this.props
    const answers = this.props.answers.concat({ content: undefined })

    return answers.map((answer, index) => {
      const tempInput = (index === answers.length - 1)
      const suffix = <Icon type="close" onClick={() => onDelete(questionIndex, index)} />

      return (
        <Input
          key={index}
          suffix={tempInput ? null : suffix}
          addonBefore={index + 1}
          value={answer.content}
          onChange={(e) => {
            if (tempInput) {
              return onCreate(questionIndex, { content: e.target.value })
            }
            return onChange(questionIndex, index, 'content', e.target.value)
          }}
        />
      )
    })
  }
}

CheckboxAnswer.propTypes = propTypes

export default CheckboxAnswer;
