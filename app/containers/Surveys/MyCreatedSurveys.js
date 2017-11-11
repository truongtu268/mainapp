import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import {
  Button, Row, Col, Card, Icon,
  Badge, Popconfirm,
} from 'antd'

import { withRouter } from 'react-router'

import {
  deleteSurvey,
} from './actions'

const mapStateToProps = (state) => ({
  myCreatedSurveys: state.surveys.myCreatedSurveys,
  loadingMyCreatedSurveys: state.surveys.loadingMyCreatedSurveys,
})

const mapDispatchToProps = {
  deleteSurvey,
}

class MyCreatedSurveys extends PureComponent {
  static renderEmpty() {
    return (
      <div>
        <div className="templates__empty" />
        <p className="templates__surveyStatus">No surveys yet</p>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.renderSurveyList = this.renderSurveyList.bind(this)
    this.editSurvey = this.editSurvey.bind(this)
  }

  editSurvey(templateCode) {
    this.props.history.push(`/survey/${templateCode}/step1`)
  }

  renderSurveyList() {
    const {
      myCreatedSurveys,
      deleteSurvey,
    } = this.props

    return (
      <Row
        gutter={15}
        type="flex"
        justify="start"
        className="my_surveys__list"
      >
        {myCreatedSurveys.map((survey, index) => (
          <Col
            key={index}
            xs={12}
            sm={8}
            md={6}
            lg={4}
          >
            <Card
              bodyStyle={{ padding: 0 }}
              className="my_surveys__item"
            >
              <div
                role="button"
                className="my_surveys__item__body"
                onClick={() => this.editSurvey(survey.templateCode)}
              >
                <h4 className="my_surveys__item__title">
                  {survey.surveyTitle}
                </h4>
                {(() => {
                  switch (survey.status) {
                    case 'running':
                      return <Badge status="success" text="Running" />
                    case 'draft':
                      return <Badge status="default" text="Draft" />
                    case 'stopped':
                      return <Badge status="error" text="Stopped" />
                    default :
                      return <Badge status="default" text="Default" />
                  }
                })()}
              </div>
              <Row className="my_surveys__item__footer">
                <Button.Group
                  className="my_surveys__item__footer__actions"
                  size="large"
                >
                  <Button
                    className="my_surveys__item__footer__action"
                    onClick={() => this.editSurvey(survey.templateCode)}
                  >
                    <Icon type="edit" />
                  </Button>
                  <Button className="my_surveys__item__footer__action">
                    <Icon type="pie-chart" />
                  </Button>
                  <Popconfirm
                    title="Are you sure delete this survey?"
                    onConfirm={() => deleteSurvey(survey.templateCode)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button className="my_surveys__item__footer__action">
                      <Icon type="delete" />
                    </Button>
                  </Popconfirm>
                </Button.Group>
              </Row>
            </Card>
          </Col>))}
      </Row>
    )
  }

  render() {
    let body
    const {
      myCreatedSurveys,
      loadingMyCreatedSurveys,
    } = this.props

    if (loadingMyCreatedSurveys) {
      body = (
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card loading />
        </Col>
      )
    } else
    if (!myCreatedSurveys.length) {
      body = MyCreatedSurveys.renderEmpty()
    } else {
      body = this.renderSurveyList()
    }

    return (
      <div className="sub_section my_surveys">
        <h3 className="sub_section__title">My created survey</h3>
        {body}
      </div>
    )
  }
}

MyCreatedSurveys.propTypes = {
  myCreatedSurveys: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadingMyCreatedSurveys: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  deleteSurvey: PropTypes.func.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyCreatedSurveys))
