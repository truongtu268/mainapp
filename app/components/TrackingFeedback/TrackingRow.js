import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import { Card, Rate } from 'antd'

const propTypes = {
  message: PropTypes.any,
  dateTime: PropTypes.string.isRequired,
  type: PropTypes.string,
  rate: PropTypes.number,
}

function TrackingRow({ message, dateTime, rate }) {
  return (
    <Card>
      <div>{message}</div>
      <div className={styles.dateTime}>{dateTime}</div>
      <Rate value={rate} disabled={false} />
    </Card>
  )
}

TrackingRow.propTypes = propTypes

export default TrackingRow
