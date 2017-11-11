import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon, Steps } from 'antd'
import styles from './styles.css'
const Step = Steps.Step

const propTypes = {
  stats: PropTypes.object.isRequired,
  tabType: PropTypes.string,
}

class FeedbackStatsBar extends PureComponent {
  render() {
    const { stats } = this.props
    return (
      <Steps size="small" className={styles.listFilterHeader}>
        <Step
          status="finish"
          title={`${stats.open} open`}
          icon={<Icon style={{ color: '#ffbf00' }} type="exclamation-circle" />}
        />
        <Step
          status="finish"
          title={`${stats.close} closed`}
          icon={<Icon style={{ color: '#00a854' }} type="check-circle" />}
        />
        <Step
          status="finish"
          title={`${stats.anonymous} anonymous`}
          icon={<Icon style={{ color: '#555a6b' }} type="eye" />}
        />
      </Steps>
    )
  }
}

FeedbackStatsBar.propTypes = propTypes

export default FeedbackStatsBar
