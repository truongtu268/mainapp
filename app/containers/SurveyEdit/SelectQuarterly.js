import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  Checkbox, Avatar, Radio, Form,
  Row, Col,
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

const months = [{
  month: 1,
  number: 1,
}, {
  month: 2,
  number: 2,
}, {
  month: 3,
  number: 3,
}]

class SelectQuarterly extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      checkedSelectMonthNumber: 0,
    }
    this.onChangeSelectDay = this.onChangeSelectDay.bind(this)
    this.onChangeSelectWeek = this.onChangeSelectWeek.bind(this)
    this.onChangeSelectMonth = this.onChangeSelectMonth.bind(this)
  }
  onChangeSelectDay(event) {
    const { checkedSelectWeek, checkedSelectMonthArray } = this.state
    const { onChangeSelectQuarterly } = this.props
    const checkedSelectDay = event.target.value
    if (event.target.value) {
      this.setState({
        checkedSelectDay,
      })
    }
    const schedule = {
      dayOfWeek: [checkedSelectDay],
      weekOfMonth: [checkedSelectWeek],
      monthOfQuarter: checkedSelectMonthArray,
      isRepeat: true,
    }
    onChangeSelectQuarterly(schedule)
  }
  onChangeSelectWeek(event) {
    const { checkedSelectDay, checkedSelectMonthArray } = this.state
    const { onChangeSelectQuarterly } = this.props
    const checkedSelectWeek = event.target.value
    if (event.target.value) {
      this.setState({
        checkedSelectWeek,
      })
    }
    const schedule = {
      dayOfWeek: [checkedSelectDay],
      weekOfMonth: [checkedSelectWeek],
      monthOfQuarter: checkedSelectMonthArray,
      isRepeat: true,
    }
    onChangeSelectQuarterly(schedule)
  }
  onChangeSelectMonth(values) {
    const { checkedSelectDay, checkedSelectWeek } = this.state
    const { onChangeSelectQuarterly } = this.props
    const checkedSelectMonthNumber = values.length
    const checkedSelectMonthArray = values
    if (values) {
      this.setState({
        checkedSelectMonthNumber,
        checkedSelectMonthArray,
      })
    }
    const schedule = {
      dayOfWeek: [checkedSelectDay],
      weekOfMonth: [checkedSelectWeek],
      monthOfQuarter: checkedSelectMonthArray,
      isRepeat: true,
    }
    onChangeSelectQuarterly(schedule)
  }
  render() {
    const {
      checkedSelectMonthNumber,
      checkedSelectMonthArray,
      checkedSelectWeek,
      checkedSelectDay,
    } = this.state
    return (
      <Form.Item>
        <Row gutter={15}>
          <Col span={6} className="step2__title">
            Month({checkedSelectMonthNumber}/3)
          </Col>
          <Col span={18}>
            <CheckboxGroup
              onChange={this.onChangeSelectMonth}
              className="step2__selectItem"
            >
              {months.map((month) => (
                <Col key={month.number} xs={8} sm={6} md={4} lg={3}>
                  <Checkbox
                    value={month.number}
                    className={
                      _.includes(checkedSelectMonthArray, month.number) ? 'selected' : ''
                    }
                  >
                    <Avatar>{month.month}</Avatar>
                  </Checkbox>
                </Col>
              ))}
            </CheckboxGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={6} className="step2__title">Week</Col>
          <Col span={18}>
            <RadioGroup
              onChange={this.onChangeSelectWeek}
              className="step2__selectItem"
            >
              {weeks.map((week) => (
                <Col key={week.number} xs={8} sm={6} md={4} lg={3}>
                  <Radio
                    value={week.number}
                    className={
                      checkedSelectWeek === week.number ? 'selected' : ''
                    }
                  >
                    <Avatar>{week.week}</Avatar>
                  </Radio>
                </Col>
              ))}
            </RadioGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={6} className="step2__title">Day</Col>
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

SelectQuarterly.propTypes = {
  onChangeSelectQuarterly: PropTypes.func.isRequired,
}

export default SelectQuarterly
