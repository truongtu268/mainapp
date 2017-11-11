import React, { PureComponent } from 'react';
import {
  Input,
  Select,
} from 'antd'

import PropTypes from 'prop-types';

const InputGroup = Input.Group
const Option = Select.Option

class ScaleAnswer extends PureComponent {
  render() {
    const { questionIndex, onChange } = this.props
    let { answers } = this.props
    if (!answers || !answers.length) {
      answers = [{
        code: '',
        icon: '',
        weight: 1,
        orderInQuestion: 1,
        content: 'Unhappy',
        isDelete: false,
        isEdited: false,
      }, {
        code: '',
        icon: '',
        weight: 5,
        orderInQuestion: 2,
        content: 'Happy',
        isDelete: false,
        isEdited: false,
      }]
    }

    const start = answers[0]
    const end = answers[1]
    return (
      <div className="step1__questions__item__scale">
        <InputGroup compact className="step1__questions__item__scale__top">
          <Input
            className="step1__questions__item__scale__label"
            value="On scale"
            disabled
          />
          <Select
            className="step1__questions__item__scale__inputone"
            value={`${start && start.weight || 0}`}
            placeholder="Minimum"
            onChange={(e) => onChange(questionIndex, 0, 'weight', Number.parseInt(e, 10))}
          >
            <Option value="1">1</Option>
            <Option value="0">0</Option>
          </Select>
          <Input
            className="step1__questions__item__scale__spacer"
            placeholder="to"
            disabled
          />
          <Select
            className="step1__questions__item__scale__inputtwo"
            value={`${end && end.weight > -1 && end.weight || 5}`}
            placeholder="Maximum"
            onChange={(e) => onChange(questionIndex, 1, 'weight', Number.parseInt(e, 10))}
          >
            {
              [2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) =>
                <Option value={value} key={index}>{value}</Option>
              )
            }
          </Select>
        </InputGroup>
        <InputGroup compact className="step1__questions__item__scale__bottom">
          <Input
            className="step1__questions__item__scale__label"
            value="Label"
            disabled
          />
          <Input
            className="step1__questions__item__scale__inputone"
            value={start.content}
            onChange={(e) => onChange(questionIndex, 0, 'content', e.target.value)}
          />
          <Input
            className="step1__questions__item__scale__spacer"
            placeholder="to"
            disabled
          />
          <Input
            className="step1__questions__item__scale__inputtwo"
            value={end.content}
            onChange={(e) => onChange(questionIndex, 1, 'content', e.target.value)}
          />
        </InputGroup>
      </div>
    );
  }
}

ScaleAnswer.propTypes = {
  answers: PropTypes.array,
}

export default ScaleAnswer;
