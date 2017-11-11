import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  Checkbox, Avatar, Radio,
  Row, Col, Form,
} from 'antd'

const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group

const days = [{
  day: 'Mon',
  number: 1,
}, {
  day: 'Tue',
  number: 2,
}, {
  day: 'Wed',
  number: 3,
}, {
  day: 'Thu',
  number: 4,
}, {
  day: 'Fri',
  number: 5,
}, {
  day: 'Sat',
  number: 6,
}, {
  day: 'Sun',
  number: 7,
}]

const weeks = [{
  week: 1,
  number: 1,
}, {
  week: 2,
  number: 2,
}, {
  week: 3,
  number: 3,
}, {
  week: 4,
  number: 4,
}]

class SelectMonthly extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      checkedSelectWeekNumber: 0,
    }
    this.onChangeSelectDay = this.onChangeSelectDay.bind(this)
    this.onChangeSelectWeek = this.onChangeSelectWeek.bind(this)
  }
  onChangeSelectDay(event) {
    const { onChangeSelectMonthly } = this.props
    const { checkedSelectWeekArray } = this.state
    const checkedSelectDay = event.target.value
    if (event.target.value) {
      this.setState({
        checkedSelectDay,
      })
    }
    const schedule = {
      dayOfWeek: [checkedSelectDay],
      weekOfMonth: checkedSelectWeekArray,
      monthOfQuarter: [],
      isRepeat: true,
    }
    onChangeSelectMonthly(schedule)
  }
  onChangeSelectWeek(values) {
    const checkedSelectWeekNumber = values.length
    const checkedSelectWeekArray = values
    const { onChangeSelectMonthly } = this.props
    const { checkedSelectDay } = this.state
    if (values) {
      this.setState({
        checkedSelectWeekNumber,
        checkedSelectWeekArray,
      })
    }
    const schedule = {
      dayOfWeek: [checkedSelectDay],
      weekOfMonth: checkedSelectWeekArray,
      monthOfQuarter: [],
      isRepeat: true,
    }
    onChangeSelectMonthly(schedule)
  }
  render() {
    const {
      checkedSelectWeekNumber,
      checkedSelectWeekArray,
      checkedSelectDay,
    } = this.state

    return (
      <Form.Item>
        <Row gutter={15}>
          <Col span={6} className="step2__title">
            Week({checkedSelectWeekNumber}/4)
          </Col>
          <Col span={18}>
            <CheckboxGroup
              onChange={this.onChangeSelectWeek}
              className="step2__selectItem"
            >
              {weeks.map((week) => (
                <Col key={week.week} xs={8} sm={6} md={4} lg={3}>
                  <Checkbox
                    value={week.number}
                    className={
                      _.includes(checkedSelectWeekArray, week.number) ? 'selected' : ''
                    }
                  >
                    <Avatar>{week.week}</Avatar>
                  </Checkbox>
                </Col>
              ))}
            </CheckboxGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={6} className="step2__title">
            Day
          </Col>
          <Col span={18}>
            <RadioGroup
              onChange={this.onChangeSelectDay}
              className="step2__selectItem"
            >
              {days.map((day) => (
                <Col key={day.day} xs={8} sm={6} md={4} lg={3}>
                  <Radio
                    value={day.number}
                    className={
                      checkedSelectDay === day.number ? 'selected' : ''
                    }
                  >
                    <Avatar>{day.day}</Avatar>
                  </Radio>
                </Col>
              ))}
            </RadioGroup>
          </Col>
        </Row>
      </Form.Item>
    )
  }
}

SelectMonthly.propTypes = {
  onChangeSelectMonthly: PropTypes.func.isRequired,
}

export default SelectMonthly
