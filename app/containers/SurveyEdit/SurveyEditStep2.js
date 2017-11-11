import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
// import moment from 'moment'
import { injectIntl } from 'react-intl'
import {
  Checkbox, Button, Icon, Select,
  Avatar, Form, Row, Col, Card,
  Affix, TimePicker,
} from 'antd'

import {
  submitSurveySetting,
  getSchedule,
} from './actions'

import SelectWeekly from './SelectWeekly'
import SelectMonthly from './SelectMonthly'
import SelectQuarterly from './SelectQuarterly'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option

const mapStateToProps = (state) => ({
  survey: state.surveyEdit.survey,
  isLoading: state.surveyEdit.isLoading,
  listMembers: state.members.listMembers,
  templateCode: state.surveyEdit.survey.template,
})

const mapDispatchToProps = {
  submitSurveySetting,
  getSchedule,
}

class SurveyEditStep2 extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      totalSelectedReceiver: 0,
      receivers: props.survey.receivers || [],
      receiverTeam: props.survey.receiverTeam,
      schedule: props.survey.schedule || {},
      checkedAll: false,
      frequency: 'quarterly',
    }

    this.handlePublish = this.handlePublish.bind(this)
    this.onChangeReceiver = this.onChangeReceiver.bind(this)
    this.toggleCheckAll = this.toggleCheckAll.bind(this)
    this.handleFrequency = this.handleFrequency.bind(this)
    this.handleTimeStart = this.handleTimeStart.bind(this)
    this.handleTimeEnd = this.handleTimeEnd.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handlePressBack = this.handlePressBack.bind(this)
  }

  componentDidMount() {
    this.props.getSchedule(this.props.survey.template)
  }

  onChangeReceiver(values) {
    if (values) {
      this.setState({
        totalSelectedReceiver: values.length,
        receivers: values,
      })
    }
  }

  handlePressBack() {
    const templateCode = this.props.survey.template
    this.props.history.push(`/survey/${templateCode}/step1`)
  }

  toggleCheckAll() {
    const listMembers = this.props.listMembers
    let { receivers, checkedAll, totalSelectedReceiver } = this.state
    if (listMembers.length === receivers.length) {
      receivers = []
      checkedAll = false
      totalSelectedReceiver = 0;
    } else {
      receivers = listMembers.map((user) => {
        return user.id
      })
      checkedAll = true
      totalSelectedReceiver = receivers.length
      // TODO set receiver team
    }
    this.setState({
      totalSelectedReceiver,
      receivers,
      checkedAll,
    })
  }

  handleFrequency(value) {
    const frequency = value
    if (frequency === 'weekly') {
      this.setState({
        frequency,
      })
    } else if (frequency === 'monthly') {
      this.setState({
        frequency,
      })
    } else {
      this.setState({
        frequency,
      })
    }
  }

  handleTimeStart(time, timeString) {
    if (timeString) {
      const timeStart = timeString
      this.setState({
        timeStart,
      })
    }
  }

  handleTimeEnd(time, timeString) {
    if (timeString) {
      const timeStop = timeString
      this.setState({
        timeStop,
      })
    }
  }

  handlePublish(e) {
    e.preventDefault();
    const { schedule, receivers, timeStart, timeStop } = this.state
    const { submitSurveySetting, templateCode } = this.props
    const data = {
      schedule: {
        ...schedule,
        timeStart,
        timeStop,
        isRepeat: true,
      },
      templateCode,
      receivers,

    }
    submitSurveySetting(data, 'publish')
  }

  handleSave(e) {
    e.preventDefault();
    const { schedule, receivers, timeStart, timeEnd } = this.state
    const { submitSurveySetting, templateCode } = this.props
    const data = {
      schedule: {
        ...schedule,
        timeStart,
        timeEnd,
        isRepeat: true,
      },
      templateCode,
      receivers,

    }
    submitSurveySetting(data, 'save')
  }

  render() {
    const {
      isLoading,
      listMembers,
    } = this.props

    const {
      receivers,
      frequency,
      totalSelectedReceiver,
    } = this.state

    const selectFrequencyDetail = (frequency === 'weekly') &&
      (
        <SelectWeekly
          onChangeSelectWeekly={(schedule) => this.setState({ schedule })}
        />
      ) || (
        (frequency === 'monthly') && (
          <SelectMonthly
            onChangeSelectMonthly={(schedule) => this.setState({ schedule })}
          />
        ) || (
          <SelectQuarterly
            onChangeSelectQuarterly={(schedule) => this.setState({ schedule })}
          />
        )
      )

    if (isLoading) {
      return (
        <Card loading />
      )
    }

    return (
      <Form className="step2">
        <FormItem
          label="RECEIVER"
          onSubmit={this.handleSubmit}
        >
          <Row>
            <Col span={6} className="step2__title">
              <Checkbox
                checked={this.state.checkedAll}
                onChange={this.toggleCheckAll}
              >
                Check all
              </Checkbox>
              {`(${totalSelectedReceiver}/${listMembers.length})`}
            </Col>
            <Col span={18}>
              <CheckboxGroup
                onChange={this.onChangeReceiver}
                value={this.state.receivers}
              >
                <Row
                  gutter={15}
                  type="flex"
                  justify="start"
                  className="step2__receiverList"
                >
                  {listMembers.map((receiver) => (
                    <Col
                      key={receiver.id}
                      xs={24}
                      sm={12}
                      md={8}
                      lg={6}
                      className="step2__selectItem"
                    >
                      <Checkbox
                        value={receiver && receiver.id}
                        className={
                          _.includes(receivers, receiver.id) ? 'selected' : ''
                        }
                      >
                        <Avatar src={receiver && receiver.avatar} className="step2__receiverAvatar" />
                        {receiver && receiver.fullName}
                      </Checkbox>
                    </Col>))}
                </Row>
              </CheckboxGroup>
            </Col>
          </Row>
        </FormItem>

        <FormItem label="SURVEY SETUP" className="step2__sendSurvey">
          <Row>
            <Col
              span={6}
              className="step2__title"
              style={{ textAlign: 'right', paddingRight: 15 }}
            >
              survey
            </Col>
            <Col span={18}>
              <Select
                defaultValue={frequency}
                onChange={this.handleFrequency}
                style={{ width: 100 }}
              >
                <Option value="weekly">Week</Option>
                <Option value="monthly">Month</Option>
                <Option value="quarterly">Quarter</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col
              span={6}
              className="step2__title"
              style={{ textAlign: 'right', paddingRight: 15 }}
            >
              start from
            </Col>
            <Col span={18}>
              <TimePicker
                style={{ width: 100, display: 'inline-block' }}
                format="HH:mm:ss"
                onChange={this.handleTimeStart}
              />
              <span style={{ width: 50, textAlign: 'center', display: 'inline-block' }}>to</span>
              <TimePicker
                style={{ width: 100, display: 'inline-block' }}
                format="HH:mm:ss"
                onChange={this.handleTimeEnd}
              />
            </Col>
          </Row>
        </FormItem>

        {selectFrequencyDetail}

        <FormItem className="footer">
          <Affix offsetBottom={0}>
            <Button
              className="footer__btn"
              type="primary"
              htmlType="submit"
              onClick={this.handlePressBack}
            >
              <Icon type="arrow-left" /> Back
            </Button>
            <Button className="footer__btn" type="primary" htmlType="submit" onClick={this.handleSave} loading={isLoading}>
              <Icon type="save" /> Save
            </Button>
            <Button className="footer__btn" type="primary" htmlType="submit" onClick={this.handlePublish} loading={isLoading}>
              Publish <Icon type="arrow-right" />
            </Button>
          </Affix>
        </FormItem>
      </Form>
    )
  }
}

SurveyEditStep2.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  submitSurveySetting: PropTypes.func.isRequired,
  getSchedule: PropTypes.func.isRequired,
  listMembers: PropTypes.arrayOf(PropTypes.object).isRequired,
  templateCode: PropTypes.string.isRequired,
  survey: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const frm = Form.create()(SurveyEditStep2)

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(frm))
