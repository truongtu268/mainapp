import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import TrackingFeedback from '../../components/TrackingFeedback/TrackingFeedback'
import { verifyTrackingUrl, sendTrackingUrlToEmail, ratingFeedbackItem } from './actions'

const mapStateToProps = (state, props) => ({
  showLoading: state.tracking.isLoading,
  listFeedback: state.tracking.listFeedback,
  trackingUrl: props.params.url,
  fullUrl: window.location.href,
})

const mapDispatchToProps = {
  verifyTrackingUrl,
  sendTrackingUrlToEmail,
  ratingFeedbackItem,
}

const propTypes = {
  showLoading: PropTypes.bool.isRequired,
  listFeedback: PropTypes.array.isRequired,
  trackingUrl: PropTypes.string.isRequired,
  fullUrl: PropTypes.string.isRequired,
  sendTrackingUrlToEmail: PropTypes.func.isRequired,
  verifyTrackingUrl: PropTypes.func.isRequired,
  ratingFeedbackItem: PropTypes.func.isRequired,
}

class TrackingFeedbackContainer extends Component {
  componentDidMount() {
    this.props.verifyTrackingUrl({ url: this.props.trackingUrl })
  }

  render() {
    const {
      showLoading,
      listFeedback,
      fullUrl,
      trackingUrl,
    } = this.props

    if (showLoading) {
      return <Spin size="large" />
    }

    // return <div>Tracking hello</div>
    return (
      <TrackingFeedback
        listFeedback={listFeedback}
        trackingUrl={trackingUrl}
        fullUrl={fullUrl}
        ratingFeedbackItem={this.props.ratingFeedbackItem}
        sendTrackingUrlToEmail={this.props.sendTrackingUrlToEmail}
      />
    )
  }
}

TrackingFeedbackContainer.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(TrackingFeedbackContainer)
