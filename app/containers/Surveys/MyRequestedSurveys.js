import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Button, Row, Col, Card, Icon,
  Badge,
} from 'antd'

const mapStateToProps = (state) => ({
  myRequestedSurveys: state.surveys.myRequestedSurveys,
  loadingMyRequestedSurveys: state.surveys.loadingMyRequestedSurveys,
})

class MyRequestedSurveys extends PureComponent {
  static renderEmpty() { // eslint-disable-line
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
  }

  renderSurveyList() {
    const { myRequestedSurveys } = this.props

    return (
      <Row
        gutter={15}
        type="flex"
        justify="start"
        className="my_surveys__list"
      >
        {
          myRequestedSurveys.map((survey, index) => (
            <Col key={index} xs={12} sm={8} md={6} lg={4}>
              <Card
                bodyStyle={{ padding: 0 }}
                className="my_surveys__item"
                role="button"
                onClick={() => this.context.toggleChatbot('survey', survey.templateCode)}
              >
                <div className="my_surveys__item__body">
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
                    <Button className="my_surveys__item__footer__action single">
                      <Icon type="message" /> Take survey
                    </Button>
                  </Button.Group>
                </Row>
              </Card>
            </Col>
          ))
        }
      </Row>
    )
  }

  render() {
    let body
    const {
      myRequestedSurveys,
      loadingMyRequestedSurveys,
    } = this.props
    if (loadingMyRequestedSurveys) {
      body = (
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card loading />
        </Col>
      )
    } else if (!myRequestedSurveys.length) {
      body = MyRequestedSurveys.renderEmpty()
    } else {
      body = this.renderSurveyList()
    }
    return (
      <div className="sub_section my_surveys">
        <h3 className="sub_section__title">
          My requested survey
        </h3>
        {body}
      </div>
    )
  }
}

MyRequestedSurveys.contextTypes = {
  toggleChatbot: PropTypes.func,
}

MyRequestedSurveys.propTypes = {
  myRequestedSurveys: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadingMyRequestedSurveys: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(MyRequestedSurveys)
