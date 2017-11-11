import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router'
import Loadable from 'react-loadable'
import styles from './styles.css'
import GoogleTagManager from './googleTagManager'
import loadableWithStore from 'hoc/Loadable'

import { createSequence } from './actions'

const mapDispatchToProps = {
  createSequence,
}

class App extends Component {
  constructor(props, ctx) {
    super(props)
    const { store } = ctx
    this.loadComponent = loadableWithStore(store)
  }

  getChildContext() {
    return {
      loadComponent: this.loadComponent,
    }
  }

  componentDidMount() {
    // create sagas sequence
    this.props.createSequence({
      location: this.props.location,
    })
  }

  render() {
    return (
      <div className={styles.App}>
        <GoogleTagManager gtmId="GTM-P6B8RZF" />
        <Switch>
          <Route path="/login" component={this.loadComponent({
            sagaNames: [
              'loginContainer'
            ],
            sagaLoader: () => [
              import('containers/Login/sagas.js'),
            ],
            component: () => import('containers/Login/LoginContainer'),
          })} />
          <Route path="/forgotpassword" component={this.loadComponent({
            sagaNames: [
              'forgotPasswordContainer'
            ],
            sagaLoader: () => [
              import('containers/ForgotPassword/sagas.js'),
            ],
            component: () => import('containers/ForgotPassword/ForgotPasswordContainer'),
          })} />
          <Route exact path="/linkinvitejointeam/:code" component={this.loadComponent({
            sagaNames: [
              'linkInviteJoinTeamContainer'
            ],
            sagaLoader: () => [
              import('containers/LinkInviteJoinTeamContainer/sagas.js'),
            ],
            component: () => import('containers/LinkInviteJoinTeamContainer'),
          })} />
          <Route path="/" component={this.loadComponent({
            sagaNames: [
              'homePageContainer',
              'botContainer',
            ],
            sagaLoader: () => [
              import('containers/Home/sagas.js'),
              import('containers/Bot/sagas'),
            ],
            component: () => import('containers/Home/HomeContainer'),
          })} />
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node,
}

App.contextTypes = {
  store: PropTypes.object,
}

App.childContextTypes = {
  loadComponent: PropTypes.func
}

export default connect(null, mapDispatchToProps)(App)
