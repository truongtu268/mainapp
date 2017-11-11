import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  Row, Col, Form, Button, Icon, Input,
  Alert, Select, Card, Affix, Popconfirm,
  Radio, Checkbox, Slider,
} from 'antd'
import CheckboxAnswer from 'components/SurveyEdit/CheckboxAnswer'
import MultipleChoiceAnswer from 'components/SurveyEdit/MultipleChoiceAnswer'
import ScaleAnswer from 'components/SurveyEdit/ScaleAnswer'

import {
  AnswerContent,
  Footer,
  AntInput,
  Options,
} from 'styles/bot-layout'
import PreviewBot from 'components/SurveyEdit/PreviewBot'
import RadioOption from 'components/Bot/RadioOption'
import CheckboxOption from 'components/Bot/CheckboxOption'

import {
  localCreateSurveyQuestion,
  localUpdateSurveyQuestion,
  localDeleteSurveyQuestion,
  localUpdateSurveyQuestionAnswer,
  localCreateSurveyQuestionAnswer,
  localDeleteSurveyQuestionAnswer,
  saveSurvey,
  nextStep,
} from './actions'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group

const mapStateToProps = (state) => ({
  survey: state.surveyEdit.survey,
  error: state.surveyEdit.error,
  isLoading: state.surveyEdit.isLoading,
  questionTypes: state.common.questionTypes,
})

const mapDispatchToProps = {
  localCreateSurveyQuestion,
  localUpdateSurveyQuestion,
  localDeleteSurveyQuestion,
  localUpdateSurveyQuestionAnswer,
  localCreateSurveyQuestionAnswer,
  localDeleteSurveyQuestionAnswer,
  saveSurvey,
  nextStep,
}

class SurveyEditStep1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentActiveQuestionIndex: 0,
      // currentActiveQuestionRef: null,
    }
    this.questionNumberOffset = 0

    this.handleFocusQuestion = this.handleFocusQuestion.bind(this)
    this.handlePressSave = this.handlePressSave.bind(this)
    this.handlePressNext = this.handlePressNext.bind(this)
    this.renderQuestion = this.renderQuestion.bind(this)
    this.renderAnswers = this.renderAnswers.bind(this)
    this.renderPreview = this.renderPreview.bind(this)
  }

  componentDidMount() {
    this.props.getSurveyDetailByTemplateCode({
      feedbackSample: this.props.surveyTemplateCode,
      language: 'en',
    })
  }

  handleFocusQuestion(index) {
    this.setState({
      currentActiveQuestionIndex: index,
      // currentActiveQuestionRef: event,
    })
  }

  handlePressSave() {
    const { survey } = this.props
    this.props.saveSurvey({
      templateCode: survey.template,
      title: survey.title,
      language: 'en',
      questions: survey.questions,
    })
  }

  handlePressNext() {
    const { survey } = this.props
    this.props.nextStep({
      templateCode: survey.template,
      title: survey.title,
      language: 'en',
      questions: survey.questions,
    })
  }

  renderAnswers(question, index) {
    const {
      questionTypes,
      localUpdateSurveyQuestionAnswer,
      localCreateSurveyQuestionAnswer,
      localDeleteSurveyQuestionAnswer,
    } = this.props

    const questionType = _.find(questionTypes, {
      id: question.type,
    })

    if (!questionType) {
      return null
    }

    let answers
    switch (questionType.codename) {
      case 'text':
      case 'textWithAttachment':
      case 'mention':
        return <Alert message="User will response with their own answer" type="info" />
      case 'linearScale':
        answers = (
          <ScaleAnswer
            key={index}
            answers={question.answerList}
            questionIndex={index}
            onChange={localUpdateSurveyQuestionAnswer}
            onCreate={localCreateSurveyQuestionAnswer}
          />
        )
        break
      case 'checkbox':
        answers = (
          <CheckboxAnswer
            key={index}
            answers={question.answerList}
            questionIndex={index}
            onChange={localUpdateSurveyQuestionAnswer}
            onCreate={localCreateSurveyQuestionAnswer}
            onDelete={localDeleteSurveyQuestionAnswer}
          />
        )
        break
      case 'multipleChoice':
        answers = (
          <MultipleChoiceAnswer
            key={index}
            answers={question.answerList}
            questionIndex={index}
            onChange={localUpdateSurveyQuestionAnswer}
            onCreate={localCreateSurveyQuestionAnswer}
            onDelete={localDeleteSurveyQuestionAnswer}
          />
        )
        break
      default: answers = <Input />
    }

    return (
      <FormItem label="ANWSERS" className="step1__questions__answers">
        {answers}
      </FormItem>
    )
  }

  renderPreview() {
    const current = this.props.survey.questions[this.state.currentActiveQuestionIndex]
    // console.log(current)

    if (!current) {
      return null
    }

    let input = null
    switch (current.type) {
      case 2: {
        input = null
        break
      }
      case 3: {
        input = (
          <Options key={current.code}>
            <CheckboxGroup>
              { current.answerList.map((item, index) => <CheckboxOption key={item.code || index} code={item.code || index} content={item.content} img={item.icon} />) }
            </CheckboxGroup>
          </Options>
        )
        break
      }
      case 5: {
        input = (
          <RadioGroup key={current.code} className="perkfec-radio" ize="medium">
            { current.answerList.map((item, index) => <RadioOption key={item.code || index} content={item.content} img={item.icon} />) }
          </RadioGroup>
        )
        break
      }
      case 6: {
        const [min, max] = current.answerList
        input = (
          <div className="icon-wrapper">
            <div className="perkfec-slider">
              <div>{min.content}</div>
              {min.weight}
            </div>
            <Slider
              step={1}
              min={min.weight}
              max={max.weight}
              className="perkfec-slider"
            />
            <div className="perkfec-slider">
              <div>{max.content}</div>
              {max.weight}
            </div>
          </div>
        )
        break
      }
      case 1:
      default: {
        input = (
          <AntInput
            className="bot-input"
            type="textarea"
            autosize
            placeholder="Type a message ..."
          />
        )
        break
      }
    }

    return (
      <div className="survey__preview">
        <PreviewBot message={current.content} />
        <Footer className="bot-footer">
          <AnswerContent>{input}</AnswerContent>
        </Footer>
      </div>
    )
  }

  renderQuestion(question, index) {
    const {
      questionTypes,
      localCreateSurveyQuestion,
      localUpdateSurveyQuestion,
      localDeleteSurveyQuestion,
    } = this.props

    if (index === 0) this.questionNumberOffset = 0

    if (question.isDelete) {
      if (index > 0) this.questionNumberOffset += 1
      return null
    }

    return (
      <div
        key={`${question.type}-${index}`}
        className={`step1__questions__item ${index === this.state.currentActiveQuestionIndex ? 'active' : ''}`}
        onFocus={() => this.handleFocusQuestion(index)}
        tabIndex={index}
      >
        <FormItem label={`QUESTION ${index + 1 - this.questionNumberOffset}`}>
          <TextArea
            className="step1__questions__item__content"
            value={question.content}
            type="text"
            onChange={(e) => localUpdateSurveyQuestion(index, 'content', e.target.value)}
          />
        </FormItem>
        <FormItem label="TYPE">
          <Select
            defaultValue={`${question.type}`}
            onChange={(type) => localUpdateSurveyQuestion(index, 'type', Number.parseInt(type, 10))}
          >
            {
              (questionTypes || []).map((questionType, i) =>
                <Option value={`${questionType.id}`} key={i}>{questionType.name}</Option>
              )
            }
          </Select>
        </FormItem>
        {this.renderAnswers(question, index)}
        <FormItem className="step1__questions__item__actions">
          <Button
            className="step1__questions__item__actions__item"
            size="small"
            onClick={() => localCreateSurveyQuestion(index)}
          >
            <Icon type="copy" />Duplicate
          </Button>
          <Popconfirm
            title="Are you sure delete this question?"
            onConfirm={() => localDeleteSurveyQuestion(index)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              className="step1__questions__item__actions__item"
              size="small"
            >
              <Icon type="delete" />Delete
            </Button>
          </Popconfirm>
        </FormItem>
      </div>
    )
  }

  render() {
    const {
      survey,
      localCreateSurveyQuestion,
      error,
      isLoading,
    } = this.props
    if (error.has_error && error.step1 && error.step1.message.length) {
      return (
        <Alert
          message="Error"
          description={error.step1.message}
          type="error"
          showIcon
        />
      )
    }
    if (isLoading) {
      return (
        <Row gutter={20}>
          <Col span={12}>
            <Card loading />
          </Col>
          <Col span={12}>
            <Card loading />
          </Col>
        </Row>
      )
    }
    return (
      <Form layout="horizontal">
        <Row gutter={20}>
          <Col span={12} className="step1__questions">
            {
              survey.questions.map(this.renderQuestion)
            }
            <FormItem className="step1__questions__add">
              <Alert message={'2 minutes to finish this survey'} type="warning" showIcon />
              <Button
                onClick={() => localCreateSurveyQuestion()}
                className="step1__questions__add__btn"
              >
                <Icon type="plus" /> Add question
              </Button>
            </FormItem>
          </Col>
          <Col span={12} className="step1__preview">
            <Affix>
              <Card
                title={
                  <div className="step1__preview__title">
                    PREVIEW
                    <p className="step1__preview__title__helper">
                      This is what user will see when take the survey
                    </p>
                  </div>
                }
              >
                {this.renderPreview()}
              </Card>
            </Affix>
          </Col>
        </Row>
        <FormItem className="footer">
          <Affix offsetBottom={0}>
            <Button
              className="footer__btn"
              type="dashed"
              onClick={() => this.props.history.push('/survey')}
            >
              Cancel
            </Button>
            <Button
              className="footer__btn"
              type="primary"
              htmlType="submit"
              onClick={this.handlePressSave}
            >
              <Icon type="save" /> Save
            </Button>
            <Button
              className="footer__btn"
              type="primary"
              htmlType="submit"
              onClick={this.handlePressNext}
            >
              Save and Next <Icon type="arrow-right" />
            </Button>
          </Affix>
        </FormItem>
      </Form>
    )
  }
}

SurveyEditStep1.propTypes = {
  survey: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  questionTypes: PropTypes.array.isRequired,
  localCreateSurveyQuestion: PropTypes.func.isRequired,
  localUpdateSurveyQuestion: PropTypes.func.isRequired,
  localDeleteSurveyQuestion: PropTypes.func.isRequired,
  localUpdateSurveyQuestionAnswer: PropTypes.func.isRequired,
  localCreateSurveyQuestionAnswer: PropTypes.func.isRequired,
  localDeleteSurveyQuestionAnswer: PropTypes.func.isRequired,
  getSurveyDetailByTemplateCode: PropTypes.func.isRequired,
  saveSurvey: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  surveyTemplateCode: PropTypes.string.isRequired,
  history: PropTypes.any.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyEditStep1)
