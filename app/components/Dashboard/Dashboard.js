import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tabs, Icon } from 'antd'
import BubbleChart from './BubbleChart'
import { Row, TabContent } from 'styles'
import styles from './styles.css'

import imgPositive from '../../images/positive.png'
import imgNegative from '../../images/negative.png'

const TabPane = Tabs.TabPane

const propTypes = {
  positiveCount: PropTypes.number.isRequired,
  negativeCount: PropTypes.number.isRequired,
  tabKey: PropTypes.string.isRequired,
  tabFeedback: PropTypes.array.isRequired,
  handleChangeState: PropTypes.func.isRequired,
}

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.handleSelectType = this.handleSelectType.bind(this)
    this.handleSelectCate = this.handleSelectCate.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleSelectType(value) {
    this.props.handleChangeState('type', value)
  }

  handleSelectCate(value) {
    this.props.handleChangeState('category', value)
  }

  handleTabChange(key) {
    this.props.handleChangeState('tabKey', key)
  }

  renderTagTitle(key) {
    const { positiveCount, negativeCount } = this.props
    const count = (key.toLowerCase() === 'positive') ? positiveCount : negativeCount

    return (
      <TabContent>
        <div className="tab__col">
          {
            key === 'Positive'
              ? <img className="tab__img" src={imgPositive} alt="" />
              : <img className="tab__img" src={imgNegative} alt="" />
          }
        </div>
        <div className="tab__col">
          <p className="tab__number">{count}</p>
          <p className="tab__text">{key} feedback</p>
        </div>
      </TabContent>
    )
  }

  render() {
    const { tabKey, tabFeedback } = this.props
    return (
      <div className={styles.dashboard}>
        <p><Icon type="lock" /> <b>Only team owner</b> can see this dashboard.</p>
        <Row>
          <Tabs onChange={this.handleTabChange} activeKey={tabKey} type="card">
            <TabPane tab={this.renderTagTitle('Positive')} key="positive">
              <BubbleChart name="positive" feedback={tabFeedback} />
            </TabPane>
            <TabPane tab={this.renderTagTitle('Negative')} key="negative">
              <BubbleChart name="negative" feedback={tabFeedback} />
            </TabPane>
          </Tabs>
        </Row>
      </div>
    )
  }
}

Dashboard.propTypes = propTypes

export default Dashboard
