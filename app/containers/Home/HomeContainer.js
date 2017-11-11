import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
import queryString from 'query-string'
import { Spin, Layout, Dropdown, Menu, Col, Avatar, Icon, Button } from 'antd'
import UserAvatar from 'components/UserProfileComponent/UserAvatar'
import Loading from 'components/common/Loading'
import { BotPopup, CloseButton } from 'styles/bot-layout'
import BotContainer from 'containers/Bot/BotContainer'

import {
  logOut,
} from './actions'

import styles from './styles.css'

import imgBot from 'images/bot@2x.png'
import icoDiscuss from 'images/ico-discuss.png'
import iconThanks from 'images/ico-thanks.png'
import icoAnonymous from 'images/ico-anonymous.png'
import icoEvaluate from 'images/ico-evaluate.png'

const { Header, Content, Sider } = Layout

const mapStateToProps = (state, props) => ({
  user: state.currentUser.user,
  isAuthorized: state.currentUser.isAuthorized,
})

const mapDispatchToProps = {
  logOut,
}

const propTypes = {
  user: PropTypes.object.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  location: PropTypes.any.isRequired,
}

const contextTypes = {
  loadComponent: PropTypes.func
}

class Home extends Component {
  constructor(props, context) {
    super(props)
    this.loadComponent = context.loadComponent
    this.state = {
      showChatbot: false,
      sample: 'bot',
      templateCode: '',
    }

    this.renderSuccess = this.renderSuccess.bind(this)
    this.handleHomepageMenu = this.handleHomepageMenu.bind(this)
    this.toggleChatbot = this.toggleChatbot.bind(this)
  }

  getChildContext() {
    return {
      toggleChatbot: this.toggleChatbot,
    }
  }

  toggleChatbot(sample = 'bot', templateCode = '') {
    this.setState({
      showChatbot: !this.state.showChatbot,
      sample, // chose sample file - default: bot.json
      templateCode, // if have templateCode
    })
  }

  handleHomepageMenu(e) {
    const userCode = this.props.user.code
    switch (e.key) {
      case 'dashboard':
        this.props.history.push('/dashboard')
        break
      case 'profile':
        this.props.history.push(`/u/${userCode}`)
        break
      case 'logout':
        this.props.logOut()
        break
      case 'feedback':
        this.props.history.push('/feedback')
        break
      case 'discussions':
        this.props.history.push('/feedback/public')
        break
      case 'members':
        this.props.history.push('/members')
        break
      case 'newsfeed':
        this.props.history.push('/newsfeed')
        break
      case 'survey':
        this.props.history.push('/survey')
        break
      default:
        return
    }
  }

  renderSuccess() {
    const { user } = this.props
    const { sample, templateCode } = this.state
    const menuMe = (
      <Menu onClick={this.handleHomepageMenu}>
        <Menu.Item key="profile">Xem profile</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">Đăng xuất</Menu.Item>
      </Menu>
    )
    const subDomain = window.location.hostname.split('.')[0]
    const selectedKey = this.props.location.pathname.split('/')[1]

    return (
      <Layout className={styles.AppWrapper}>
        <Sider
          className={styles.Sider}
          collapsible
          trigger={null}
          breakpoint="md"
          width={250}
        >
          <div className={styles.SideHeader}>
            <Avatar
              size="large"
              src="http://icons.iconarchive.com/icons/flat-icons.com/flat/512/Ufo-icon.png"
            />
            <p>{subDomain}</p>
          </div>
          <Menu
            className={styles.Sider__menu}
            defaultSelectedKeys={[selectedKey]}
            onClick={this.handleHomepageMenu}
          >
            {
              // <Menu.Item key="dashboard">
              //   <Icon type="appstore-o" />
              //   <span>Bảng điều khiển</span>
              // </Menu.Item>
            }
            <Menu.Item key="newsfeed">
              <Icon type="bars" />
              <span>Trang chủ</span>
            </Menu.Item>
            <Menu.Item key="feedback">
              <Icon type="mail" />
              <span>Feedback</span>
            </Menu.Item>
            <Menu.Item key="discussions">
              <Icon type="fork" />
              <span>Thảo luận</span>
            </Menu.Item>
            <Menu.Item key="survey">
              <Icon type="solution" />
              <span>Khảo sát</span>
            </Menu.Item>
            <Menu.Item key="members">
              <Icon type="team" />
              <span>Thành viên</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className={styles.ContentWrapper}>
          <Header className={styles.ContentHeader}>
            <div className={styles.botIntro}>
              <img alt="avatar" className={styles.botAvatar} src={imgBot} />
              <div>
                <p className={styles.tadaaBot}>Tadaa</p>
                <p>Xin chào {user.firstName}! 👋 <a style={{ textDecoration: 'underline' }} onClick={() => this.toggleChatbot()}>Nói chuyện với mình</a> hoặc chọn các chức năng ở dưới.</p>
                <div className={styles.buttonList}>
                  <Button onClick={() => this.toggleChatbot('issue')}>
                    <img src={icoDiscuss} alt="" />Tạo thảo luận
                  </Button>
                  <Button onClick={() => this.toggleChatbot('feedback')}>
                    <img src={icoAnonymous} alt="" />Feedback ẩn danh
                  </Button>
                  {
                    // <Button>
                    //   <img src={iconThanks} alt="" />
                    //   Give thanks
                    // </Button>
                    // <Button>
                    //   <img src={icoEvaluate} alt="" />
                    //   Evaluate friends
                    // </Button>
                  }
                </div>
              </div>
            </div>
            <div className={styles.userAvatar}>
              <Dropdown
                overlay={menuMe}
                placement="bottomRight"
              >
                <a className="ant-dropdown-link">
                  <UserAvatar
                    user={user}
                    shape="circle"
                    disableLink
                    size="large"
                  />
                </a>
              </Dropdown>
            </div>
          </Header>
          <Content className={styles.Content}>
            <Switch>
              <Redirect from="/" exact to="/newsfeed" />
              <Route path="/dashboard" component={this.loadComponent({
                sagaNames: [
                  'Dashboard'
                ],
                sagaLoader: () => [
                  import('containers/Dashboard/sagas.js'),
                ],
                component: () => import('containers/Dashboard/DashboardContainer'),
              })} />
              <Route exact path="/survey" component={this.loadComponent({
                sagaNames: [
                  'Surveys'
                ],
                sagaLoader: () => [
                  import('containers/Surveys/sagas.js')
                ],
                component: () => import('containers/Surveys/SurveysContainer'),
              })} />
              <Route path="/survey/:surveyTemplateCode" component={this.loadComponent({
                sagaNames: [
                  'SurveyEdit'
                ],
                sagaLoader: () => [
                  import('containers/SurveyEdit/sagas.js')
                ],
                component: () => import('containers/SurveyEdit/SurveyEditContainer'),
              })} />
              <Route path="/newsfeed" component={this.loadComponent({
                sagaNames: [
                  'Newsfeed'
                ],
                sagaLoader: () => [
                  import('containers/NewsFeedContainer/sagas.js'),
                ],
                component: () => import('containers/NewsFeedContainer'),
              })} />
              <Route path="/feedback" component={this.loadComponent({
                sagaNames: [
                  'Feedback'
                ],
                sagaLoader: () => [
                  import('containers/Feedback/sagas.js'),
                ],
                component: () => import('containers/Feedback/FeedbackContainer'),
              })} />
              <Route path="/feedback/:feedbackCode" component={this.loadComponent({
                sagaNames: [
                  'Feedback'
                ],
                sagaLoader: () => [
                  import('containers/FeedbackDiscussion/sagas.js'),
                ],
                component: () => import('containers/FeedbackDiscussion/FeedbackDiscussionContainer'),
              })} />
              <Route path="/members" component={this.loadComponent({
                sagaNames: [
                  'Members'
                ],
                sagaLoader: () => [
                  import('containers/Members/sagas.js'),
                ],
                component: () => import('containers/Members/MembersContainer'),
              })} />
              <Route exact path="/u/:userCode" component={this.loadComponent({
                sagaNames: [
                  'UserProfile'
                ],
                sagaLoader: () => [
                  import('containers/UserProfileContainer/sagas.js'),
                ],
                component: () => import('containers/UserProfileContainer'),
              })} />
              <Route path="/u/:userCode/edit" component={this.loadComponent({
                sagaNames: [
                  'EditProfile'
                ],
                sagaLoader: () => [
                  import('containers/EditProfileContainer/sagas.js'),
                ],
                component: () => import('containers/EditProfileContainer'),
              })} />
              <Route path="/u/:userCode/password" component={this.loadComponent({
                sagaNames: [],
                sagaLoader: () => [],
                component: () => import('containers/ChangePassword/ChangePasswordContainer'),
              })} />
            </Switch>
          </Content>
        </Layout>
        { this.state.showChatbot &&
          <BotPopup>
            <CloseButton onClick={() => this.toggleChatbot()} icon="close">Close</CloseButton>
            <BotContainer
              sample={sample}
              templateCode={templateCode}
            />
          </BotPopup>
        }
      </Layout>
    )
  }

  render() {
    if (this.props.isAuthorized) {
      return this.renderSuccess()
    }

    return <Loading />
  }
}

Home.propTypes = propTypes

Home.contextTypes = contextTypes

Home.childContextTypes = {
  toggleChatbot: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
