import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  Checkbox, Avatar,
  Row, Col,
} from 'antd'

const CheckboxGroup = Checkbox.Group

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

class SelectWeekly extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      checkedSelectDayNumber: 0,
    }
    this.onChangeSelectDay = this.onChangeSelectDay.bind(this)
  }
  onChangeSelectDay(values) {
    const checkedSelectDayNumber = values.length
    const checkedSelectDayArray = values
    const { onChangeSelectWeekly } = this.props
    if (values) {
      this.setState({
        checkedSelectDayNumber,
        checkedSelectDayArray,
      })
    }
    const schedule = {
      dayOfWeek: checkedSelectDayArray,
      weekOfMonth: [],
      monthOfQuarter: [],
      isRepeat: true,
    }
    onChangeSelectWeekly(schedule)
  }
  render() {
    const {
      checkedSelectDayNumber,
      checkedSelectDayArray,
    } = this.state
    return (
      <Row gutter={15}>
        <Col span={6} className="step2__title">
          Day({checkedSelectDayNumber}/7)
        </Col>
        <Col span={18}>
          <CheckboxGroup
            onChange={this.onChangeSelectDay}
            className="step2__selectItem"
          >
            {days.map((day) => (
              <Col key={day.day} xs={8} sm={6} md={4} lg={3}>
                <Checkbox
                  value={day.number}
                  className={
                    _.includes(checkedSelectDayArray, day.number) ? 'selected' : ''
                  }
                >
                  <Avatar>{day.day}</Avatar>
                </Checkbox>
              </Col>
            ))}
          </CheckboxGroup>
        </Col>
      </Row>
    )
  }
}

SelectWeekly.propTypes = {
  onChangeSelectWeekly: PropTypes.func.isRequired,
}
export default SelectWeekly
