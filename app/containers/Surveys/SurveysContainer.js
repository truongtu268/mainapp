import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { PageTitle } from 'styles/common'
import { SurveysSection } from 'styles/surveys'
import SurveyTemplates from './SurveyTemplates'
import MyCreatedSurveys from './MyCreatedSurveys'
import MyRequestedSurveys from './MyRequestedSurveys'

import {
  getAllSurveyTemplates,
  getMyCreatedSurveys,
  getMyRequestedSurveys,
} from './actions'

const mapStateToProps = (state) => ({
  surveyTemplates: state.surveys.surveyTemplates,
})

const mapDispatchToProps = {
  getAllSurveyTemplates,
  getMyCreatedSurveys,
  getMyRequestedSurveys,
}

class SurveysContainer extends PureComponent {
  componentDidMount() {
    this.props.getAllSurveyTemplates()
    this.props.getMyCreatedSurveys()
    this.props.getMyRequestedSurveys()
  }

  render() {
    const {
      surveyTemplates,
    } = this.props

    return (
      <SurveysSection className="surveys">
        <PageTitle className="page_title">
          Surveys
        </PageTitle>
        <SurveyTemplates
          surveyTemplates={surveyTemplates}
        />
        <MyCreatedSurveys />
        <MyRequestedSurveys />
      </SurveysSection>
    )
  }
}

SurveysContainer.propTypes = {
  getAllSurveyTemplates: PropTypes.func.isRequired,
  getMyCreatedSurveys: PropTypes.func.isRequired,
  getMyRequestedSurveys: PropTypes.func.isRequired,
  surveyTemplates: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveysContainer)
