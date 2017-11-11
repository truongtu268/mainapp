import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import Dashboard from '../../components/Dashboard/Dashboard'
import { fetchAllFeedbackRequest } from './actions'

const mapStateToProps = (state) => ({
  allFeedback: state.dashboard.allFeedback,
  showLoading: state.dashboard.isLoading,
})

const mapDispatchToProps = {
  fetchAllFeedbackRequest,
}

const propTypes = {
  allFeedback: PropTypes.array.isRequired,
  showLoading: PropTypes.bool.isRequired,
  fetchAllFeedbackRequest: PropTypes.func.isRequired,
}

class DashboardContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'all',
      category: 'all',
      tabKey: 'negative',
    }
    this.filterArray = this.filterArray.bind(this)
    this.handleChangeState = this.handleChangeState.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllFeedbackRequest()
  }

  filterArray(type) {
    const { allFeedback } = this.props
    // can use filter even array is empty
    return allFeedback.filter((feedback) =>
      feedback.content.find(item => item.title === 'Type of feedback').content.toLowerCase() === type
    )
  }

  handleChangeState(key, value) {
    this.setState({ [key]: value })
  }

  renderLoading() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    )
  }

  render() {
    const { allFeedback, showLoading } = this.props
    const { type, category, tabKey } = this.state

    const positiveCount = this.filterArray('positive').length
    const negativeCount = this.filterArray('negative').length

    // Handle positive/negative feedback of Bubble chart
    const tabFeedback = this.filterArray(tabKey)

    // Handle filter feedback
    // within 2 steps - Type & Category
    let filteredFeedback = allFeedback
    if (type !== 'all') {
      filteredFeedback = this.filterArray(type)
    }
    if (category !== 'all') {
      filteredFeedback = filteredFeedback.filter(f => f.content[3].content.includes(category))
    }

    if (showLoading) {
      return this.renderLoading()
    }

    return (
      <Dashboard
        positiveCount={positiveCount}
        negativeCount={negativeCount}
        tabKey={tabKey}
        tabFeedback={tabFeedback}
        listFeedback={filteredFeedback}
        handleChangeState={this.handleChangeState}
      />
    )
  }
}

DashboardContainer.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
