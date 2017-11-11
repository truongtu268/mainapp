import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

const propTypes = {
  surveyTemplates: PropTypes.array.isRequired,
}

class SurveyTemplates extends PureComponent {
  render() {
    const { surveyTemplates } = this.props

    return (
      <div className="templates__wrapper">
        <div className="templates__content">
          <h3 className="templates__title">Start a new survey</h3>
          <ul className="templates__list">
            <li className="templates__item">
              <div className="templates__photo">
                <Icon type="plus" style={{ fontSize: 30 }} />
              </div>
              <p className="templates__name">Blank</p>
            </li>
            {
              surveyTemplates.map((template, index) =>
                (<li
                  key={index}
                  className="templates__item"
                >
                  <Link to={`/survey/${template.code}/step1`}>
                    <div className="templates__photo">
                      <span className="templates__icons templates__icons01" />
                    </div>
                    <p className="templates__name">
                      {template.title}
                    </p>
                  </Link>
                </li>)
              )
            }
          </ul>
        </div>
      </div>
    )
  }
}

SurveyTemplates.propTypes = propTypes

export default SurveyTemplates
