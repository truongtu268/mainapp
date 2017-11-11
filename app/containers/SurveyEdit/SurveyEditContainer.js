import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import { Spin, Steps, Form, Input } from 'antd'
import { PageTitle } from 'styles/common'
import { SurveyEditPage } from 'styles/surveys'
import SurveyEditStep1 from './SurveyEditStep1'
import SurveyEditStep2 from './SurveyEditStep2'
import {
  getSurveyDetailByTemplateCode,
  localUpdateSurveyTitle,
} from './actions'

const Step = Steps.Step

const mapStateToProps = (state) => ({
  survey: state.surveyEdit.survey,
  isLoading: state.surveyEdit.isLoading,
})

const mapDispatchToProps = {
  localUpdateSurveyTitle,
  getSurveyDetailByTemplateCode,
}

class SurveyEditContainer extends PureComponent {
  renderLoading() { // eslint-disable-line class-methods-use-this
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    )
  }

  render() {
    const {
      survey,
      isLoading,
      localUpdateSurveyTitle,
      location,
      match,
      history,
      getSurveyDetailByTemplateCode,
    } = this.props
    const surveyTemplateCode = match.params.surveyTemplateCode

    if (isLoading) {
      this.renderLoading()
    }

    let currentStep
    if (location.pathname.includes('step1') || location.pathname.includes('Step1')) {
      currentStep = 0
    } else if (location.pathname.includes('step2') || location.pathname.includes('Step2')) {
      currentStep = 1
    } else {
      history.push(`/survey/${surveyTemplateCode}/step1`)
    }

    const surveyTitleEl = isLoading ? (
      <div
        className="ant-card-loading-block page_title"
        style={{ width: '100%', height: 30, margin: 0 }}
      />
    ) : (
      <Input
        className="page_title"
        value={survey.title}
        type="text"
        onChange={(e) => localUpdateSurveyTitle(e.target.value)}
      />
    )

    return (
      <SurveyEditPage>
        <Steps current={currentStep} className="steps">
          <Step title="Edit" description="Edit questions." />
          <Step title="Setting" description="Setting survey." />
        </Steps>
        <PageTitle >
          <Form.Item label="SURVEY TITLE">
            {surveyTitleEl}
          </Form.Item>
        </PageTitle>
        <br />
        <Switch>
          <Route
            path="/survey/:surveyTemplateCode/step1"
            render={(props) => (
              <SurveyEditStep1
                {...props}
                surveyTemplateCode={surveyTemplateCode}
                getSurveyDetailByTemplateCode={getSurveyDetailByTemplateCode}
              />
            )}
          />
          <Route
            path="/survey/:surveyTemplateCode/step2"
            render={(props) => (
              <SurveyEditStep2 {...props} />
            )}
          />
        </Switch>
      </SurveyEditPage>
    )
  }
}

SurveyEditContainer.propTypes = {
  survey: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getSurveyDetailByTemplateCode: PropTypes.func.isRequired,
  localUpdateSurveyTitle: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyEditContainer)
