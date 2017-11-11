import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CopyToClipboard from 'react-copy-to-clipboard'
import { withRouter } from 'react-router'
import { NewsFeedEmpty } from 'styles'
import { ListMember } from 'styles/members'
import validator from 'validator'
import UserAvatar from '../UserProfileComponent/UserAvatar'

import {
  Button, Icon, Dropdown, Menu, Modal,
  Form, Input, Tag, Row, Col, Tooltip,
} from 'antd'

import {
  getLinkRegister,
} from '../../containers/Members/actions'

const mapStateToProps = (state) => ({
  inviteLink: state.members.inviteLink,
})

const mapDispatchToProps = {
  getLinkRegister,
}

const FormItem = Form.Item

class ListMembersComponent extends React.Component {
  static checkEmails(rule, value, callback) {
    const emailsArray = value.replace(/\n|\s|\t|,+\s/g, ',').split(',')
    if (emailsArray.length > 0) {
      const errorEmail = emailsArray.filter((email) => (email.trim().length > 0) && !validator.isEmail(email.trim()))
      if (errorEmail.length) {
        callback(`Invalid email: ${errorEmail}`)
      } else {
        callback()
      }
    } else {
      callback()
    }
  }

  static renderEmpty() {
    return (
      <Row type="flex" justify="center" align="middle" style={{ height: '100%' }}>
        <NewsFeedEmpty>Empty list</NewsFeedEmpty>
      </Row>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      inviteModalVisible: false,
      members: props.listMembers,
      token: localStorage.getItem('perkfecAccessCode'),
      isCopiedInviteLink: false,
    }
    this.makeOwner = this.makeOwner.bind(this)
    this.removeRoleOwner = this.removeRoleOwner.bind(this)
    this.makeAdmin = this.makeAdmin.bind(this)
    this.removeRoleAdmin = this.removeRoleAdmin.bind(this)
    this.removeAMember = this.removeAMember.bind(this)
    this.handleProfile = this.handleProfile.bind(this)
    this.showInviteModal = this.showInviteModal.bind(this)
    this.hideInviteModal = this.hideInviteModal.bind(this)
    this.handleSubmitInvite = this.handleSubmitInvite.bind(this)
    this.renderMemberItem = this.renderMemberItem.bind(this)
    this.handleResendInviteToAll = this.handleResendInviteToAll.bind(this)
    this.handleResendInvite = this.handleResendInvite.bind(this)
    this.onCopyInviteLinkSuccess = this.onCopyInviteLinkSuccess.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listMembers !== this.props.listMembers) {
      this.setState({ members: nextProps.listMembers })
    }
  }

  onCopyInviteLinkSuccess() {
    this.setState({ isCopiedInviteLink: true })
    setTimeout(() => {
      this.setState({ isCopiedInviteLink: false })
    }, 800)
  }

  makeAdmin(user) {
    this.props.upgradeAdmin(user)
  }

  removeRoleAdmin(user) {
    this.props.downgradeAdmin(user)
  }

  makeOwner(user) {
    this.props.upgradeOwner(user)
  }

  removeRoleOwner(user) {
    this.props.downgradeOwner(user)
  }

  removeAMember(user) {
    this.props.deleteMember(user)
  }

  handleProfile(index) {
    this.props.history.push(`/u/${index.code}`)
  }

  showInviteModal() {
    this.setState({ inviteModalVisible: true })
    this.props.getLinkRegister()
  }

  hideInviteModal() {
    this.setState({ inviteModalVisible: false })
  }

  handleSubmitInvite(ev) {
    ev.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.log(err)
      }
      const emailsArray = values.emails.replace(/\n|\s|\t|,+\s/g, ',').split(',') || []
      if (emailsArray.length > 0) {
        const listEmailValidated = emailsArray.filter((email) => validator.isEmail(email))
        if (listEmailValidated.length > 0) {
          this.props.handleInvite(listEmailValidated, values.message.trim())
        }
      }
      this.hideInviteModal()
    })
  }

  handleResendInviteToAll() {
    const emails = this.state.members.map((member) => member.email)
    this.props.handleInvite(emails)
  }

  handleResendInvite(email) {
    this.props.handleInvite([email])
  }

  menu(member) {
    const myUserInfo = this.props.myUserInfo
    const roleOfThisMember = member.role
    const roleOfMe = myUserInfo.teamRole.type_users
    const IamAnOwner = roleOfMe === 'owner'
    const IamAnAdmin = (roleOfMe === 'owner') || (roleOfMe === 'admin')
    return (roleOfThisMember !== 'bot')
      ? (
        <Menu>
          <Menu.Item key="0">
            <div role="button" onClick={() => this.handleProfile(member)}>Profile</div>
          </Menu.Item>
          { (roleOfThisMember !== 'admin' && roleOfThisMember !== 'owner') &&
            <Menu.Item
              key="1"
              disabled={!IamAnOwner}
            >
              <a
                role="button"
                onClick={() => this.makeAdmin(member)}
                disabled={!IamAnOwner}
              >
                Make an Admin
              </a>
            </Menu.Item>
          }
          { (roleOfThisMember === 'admin') &&
            <Menu.Item
              key="2"
              disabled={!IamAnOwner}
              onClick={() => this.removeRoleAdmin(member)}
            >
              <a role="button" onClick={() => this.removeRoleAdmin(member)} disabled={!IamAnOwner}>Remove admin role</a>
            </Menu.Item>
          }
          {/* { (roleOfThisMember !== 'owner') &&
            <Menu.Item
              key="3"
              disabled={!IamAnOwner}
            >
              <a onClick={() => this.makeOwner(member)} disabled={!IamAnOwner}>Make an Owner</a>
            </Menu.Item>
          } { (roleOfThisMember === 'owner') &&
            <Menu.Item
              key="4"
              disabled={!IamAnOwner || myUserInfo.id === member.id}
              onClick={() => this.removeRoleOwner(member)}
            >
              <a onClick={() => this.removeRoleOwner(member)} disabled={!IamAnOwner}>Remove owner role</a>
            </Menu.Item>
          } */}
          { (!member.activeDate) &&
            <Menu.Item key="3">
              <a role="button" onClick={() => this.handleResendInvite(member.email)}>
                Resend invite
              </a>
            </Menu.Item>
          }
          <Menu.Item
            key="4"
            disabled={!IamAnAdmin && !IamAnOwner}
          >
            <a
              role="button"
              onClick={() => this.removeAMember(member)}
              disabled={!IamAnAdmin && !IamAnOwner}
            >
              Remove
            </a>
          </Menu.Item>
        </Menu>
      )
      : (
        <Menu>
          <Menu.Item key="0">
            <div>Profile</div>
          </Menu.Item>
        </Menu>
      )
  }

  renderMemberItem(member, index) {
    const roleOfThisMember = member.role
    return (
      <div className="members__item" key={index}>
        <div className="members__item__triggericon">
          <Dropdown overlay={this.menu(member)} trigger={['click']}>
            <Icon type="ellipsis" />
          </Dropdown>
        </div>
        <UserAvatar
          key={index}
          user={member}
          style={{ width: 80, height: 80, lineHeight: '80px', borderRadius: '50%' }}
          shape="circle"
        />
        <div className="members__item__name">{member.fullName}</div>
        {member.id === this.props.myUserInfo.id && <Tag className="members__item__role" color="#87d068">It's you</Tag>}
        {roleOfThisMember === 'owner' && <Tag className="members__item__role" color="blue">Owner</Tag>}
        {roleOfThisMember === 'admin' && <Tag className="members__item__role" color="cyan">Admin</Tag>}
        {roleOfThisMember === 'bot' && <Tag className="members__item__role" color="green">BOT</Tag>}
      </div>
    )
  }

  render() {
    const { members, isCopiedInviteLink } = this.state

    if (members.length === 0) {
      return ListMembersComponent.renderEmpty()
    }

    const {
      type,
      form,
      inviteLink,
    } = this.props
    const subDomain = window.location.hostname.split('.')[0]
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }

    let button
    if (type === 'all') {
      button = (
        <Button
          type="primary"
          icon="plus"
          onClick={this.showInviteModal}
        >
          <Icon type="user-add" /> Invite more
        </Button>
      )
    } else
    if (members.length && type === 'inactivate') {
      button = (
        <Button
          type="primary"
          onClick={this.handleResendInviteToAll}
        >
          Resend invite to All
        </Button>
      )
    }

    return (
      <ListMember>
        {button}
        <div className="members">
          {members.map((member, index) => this.renderMemberItem(member, index))}
        </div>
        <Modal
          className="invite-modal"
          title="Invite friends to the team"
          maskClosable={false}
          visible={this.state.inviteModalVisible}
          okText={'Invite'}
          cancelText={'Cancel'}
          onOk={this.handleSubmitInvite}
          onCancel={this.hideInviteModal}
          width={600}
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label="Email(s)"
            >
              {
                getFieldDecorator('emails', {
                  rules: [
                    { validator: ListMembersComponent.checkEmails },
                  ],
                })(
                  <Input
                    type="textarea"
                    rows={4}
                    autoComplete="off"
                    placeholder="Separate multiple emails with a comma or space"
                  />
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Message"
            >
              {
                getFieldDecorator('message', {
                  initialValue: `Please join me in ${subDomain}.`,
                })(
                  <Input
                    type="textarea"
                    rows={4}
                    autoComplete="off"
                  />
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Instant invite"
            >
              <p>
                You also can share this link with others to grant access to this team
              </p>
              <Row className="members__invite-modal__btn-copy">
                <Col span={18}>
                  <Input
                    value={`https:${inviteLink}`}
                    readOnly
                    style={{ width: '100%', borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: 0 }}
                  />
                </Col>
                <Col span={6}>
                  <CopyToClipboard
                    text={`https:${inviteLink}`}
                    onCopy={this.onCopyInviteLinkSuccess}
                  >
                    <Tooltip placement="topLeft" title="copied" visible={isCopiedInviteLink}>
                      <Button
                        size="default"
                        type="primary"
                        style={{ width: '100%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeft: 0 }}
                      >COPY</Button>
                    </Tooltip>
                  </CopyToClipboard>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </Modal>
      </ListMember>
    )
  }
}

ListMembersComponent.propTypes = {
  form: PropTypes.object,
  history: PropTypes.object,
  getLinkRegister: PropTypes.func.isRequired,
  inviteLink: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  myUserInfo: PropTypes.object.isRequired,
  listMembers: PropTypes.array.isRequired,
  upgradeAdmin: PropTypes.func.isRequired,
  upgradeOwner: PropTypes.func.isRequired,
  downgradeAdmin: PropTypes.func.isRequired,
  downgradeOwner: PropTypes.func.isRequired,
  deleteMember: PropTypes.func.isRequired,
  handleInvite: PropTypes.func.isRequired,
}

const AllMemberswithFormComponent = withRouter(Form.create()(connect(mapStateToProps, mapDispatchToProps)(ListMembersComponent)))
export default AllMemberswithFormComponent
