import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router'
import { connect } from 'react-redux'
import { getLinkFeedBack } from './actions'
import { getQuestionRequest } from '../Bot/actions'
import getStateSelector from './selectors'
import { Tabs, Badge } from 'antd'
import { FeedbackPage } from 'styles/feedback'

const TabPane = Tabs.TabPane

const mapStateToProps = (state) => getStateSelector(state)

const mapDispatchToProps = {
  getLinkFeedBack,
  getQuestionRequest,
}

class FeedbackContainer extends Component {
  constructor(props, context) {
    super(props)

    this.loadComponent = context.loadComponent
    this.state = {
      countFeedback: 0,
    }

    this.onCountChange = this.onCountChange.bind(this)
    this.onChangeTab = this.onChangeTab.bind(this)
  }

  componentWillMount() {
    this.props.getLinkFeedBack({ subDomain: this.props.subDomain })
  }

  componentWillReceiveProps(nextProps) {
    const { listFeedback } = nextProps
    const count = listFeedback.filter((feedback) => (feedback.status !== 'seen')).length
    this.setState({ countFeedback: count })
  }

  onCountChange(count) {
    this.setState({ countFeedback: count })
  }

  onChangeTab(key) {
    this.props.history.push(`/feedback/${key}`)
  }

  render() {
    const activeTab = this.props.location.pathname.includes('sent')
      ? 'sent'
      : this.props.location.pathname.includes('received') ? 'received' : 'public'
    const receiveFeedback = <Badge count={this.state.countFeedback}>To Me</Badge>

    return (
      <FeedbackPage className="feedback">
        <Tabs
          tabPosition="top"
          activeKey={activeTab}
          onChange={this.onChangeTab}
        >
          <TabPane tab="Public" key="public" />
          <TabPane tab={receiveFeedback} key="received" />
          <TabPane tab="Sent" key="sent" />
        </Tabs>
        <div className="feedback__body">
          <Switch>
            <Route path="/feedback/public" component={this.loadComponent({
              sagaNames: [ 'FeedbackPublic' ],
              sagaLoader: () => [ import('containers/FeedbackPublic/sagas') ],
              component: () => import('containers/FeedbackPublic/FeedbackPublicContainer'),
            })} />
            <Route path="/feedback/sent" component={this.loadComponent({
              sagaNames: [ 'FeedbackGive' ],
              sagaLoader: () => [ import('containers/FeedbackGive/sagas') ],
              component: () => import('containers/FeedbackGive/FeedbackGiveContainer'),
            })} />
            <Route path="/feedback/received" component={this.loadComponent({
              sagaNames: [ 'FeedbackReceived' ],
              sagaLoader: () => [ import('containers/FeedbackReceived/sagas') ],
              component: () => import('containers/FeedbackReceived/FeedbackReceivedContainer'),
            })} />
            <Route path="/feedback/received/:id" component={this.loadComponent({
              sagaNames: [ 'FeedbackReceived' ],
              sagaLoader: () => [ import('containers/FeedbackReceived/sagas') ],
              component: () => import('containers/FeedbackReceived/FeedbackReceivedContainer'),
            })} />
            <Route path="/feedback/:feedbackCode" component={this.loadComponent({
              sagaNames: [ 'FeedbackDiscussion' ],
              sagaLoader: () => [ import('containers/FeedbackDiscussion/sagas') ],
              component: () => import('containers/FeedbackDiscussion/FeedbackDiscussionContainer'),
            })} />
            <Redirect from='/feedback' to='/feedback/public'/>
          </Switch>
        </div>
      </FeedbackPage>
    )
  }
}

FeedbackContainer.propTypes = {
  accessToken: PropTypes.string.isRequired,
  listFeedback: PropTypes.array,
  feedbackFullURL: PropTypes.string.isRequired,
  subDomain: PropTypes.string.isRequired,
  getLinkFeedBack: PropTypes.func.isRequired,
}

FeedbackContainer.contextTypes = {
  loadComponent: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackContainer)
