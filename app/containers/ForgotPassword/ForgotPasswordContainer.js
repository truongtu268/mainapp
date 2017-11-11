import React from 'react'
import { Route, Switch } from 'react-router'
// import { connect } from 'react-redux'
import ForgotPasswordRequest from './ForgotPasswordRequest'
import ForgotPasswordSetNew from './ForgotPasswordSetNew'
import { Layout, Modal } from 'antd'

class ForgotPasswordContainer extends React.PureComponent {
  render() {
    const { Content } = Layout
    return (
      <Layout>
        <Content>
          <Modal
            title="Forgot Password"
            visible={Boolean(true)}
            footer={null}
            closable={false}
          >
            <Switch>
              <Route
                exact
                path="/forgotpassword"
                render={(props) => (
                  <ForgotPasswordRequest
                    {...props}
                    {...this.props}
                  />
                )}
              />
              <Route
                exact
                path="/forgotpassword/setnew"
                render={(props) => (
                  <ForgotPasswordSetNew
                    {...props}
                    {...this.props}
                  />
                )}
              />
            </Switch>
          </Modal>
        </Content>
      </Layout>
    )
  }
}

export default ForgotPasswordContainer
