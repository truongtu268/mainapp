import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spin, Modal } from 'antd'
import Members from '../../components/Members/Members'
import {
  upgradeAdmin,
  upgradeOwner,
  downgradeUser,
  deleteMember,
  inviteMembers,
} from './actions'
import {
  getCompanyMembers,
} from '../Home/actions'

const mapStateToProps = (state) => ({
  members: state.members,
  myUserInfo: state.currentUser.user,
})

const mapDispatchToProps = {
  getCompanyMembers,
  upgradeAdmin,
  upgradeOwner,
  downgradeUser,
  deleteMember,
  inviteMembers,
}

class MembersContainer extends Component {
  constructor(props) {
    super(props)
    this.handleUpgradeAdmin = this.handleUpgradeAdmin.bind(this)
    this.handleUpgradeOwner = this.handleUpgradeOwner.bind(this)
    this.handleDowngradeAdmin = this.handleDowngradeAdmin.bind(this)
    this.handleDowngradeOwner = this.handleDowngradeOwner.bind(this)
    this.handleDeleteMember = this.handleDeleteMember.bind(this)
    this.handleInvite = this.handleInvite.bind(this)
  }

  componentDidMount() {
    // this.props.getCompanyMembers()
  }

  handleInvite(emailsArray, greeting = null) {
    const sendRequest = {
      listEmail: emailsArray,
      message: greeting,
    }
    this.props.inviteMembers(sendRequest)
  }

  handleUpgradeAdmin(user) {
    Modal.confirm({
      title: `Do you Want to ADD ${user.fullName} as an Admin?`,
      content: 'Role of admin: Remove members, ....',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        const sentData = { id: user.id }
        this.props.upgradeAdmin(sentData)
      },
      onCancel: null,
    })
  }

  handleUpgradeOwner(user) {
    Modal.confirm({
      title: `Do you Want to ADD ${user.fullName} as an Owner?`,
      content: 'Role of owner: Remove members, ....',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        const sentData = { id: user.id }
        this.props.upgradeOwner(sentData)
      },
      onCancel: null,
    })
  }

  handleDowngradeAdmin(user) {
    Modal.confirm({
      title: `Do you Want to REMOVE role Admin of ${user.fullName}?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        const sentData = { id: user.id }
        this.props.downgradeUser(sentData)
      },
      onCancel: null,
    })
  }

  handleDowngradeOwner(user) {
    Modal.confirm({
      title: `Do you Want to REMOVE role owner of ${user.fullName}?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        const sentData = { id: user.id }
        this.props.downgradeUser(sentData)
      },
      onCancel: null,
    })
  }

  handleDeleteMember(user) {
    Modal.confirm({
      title: `Do you Want to REMOVE ${user.fullName}?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        const sentData = { id: user.id }
        this.props.deleteMember(sentData)
      },
      onCancel: null,
    })
  }

  render() {
    const {
      myUserInfo,
      members,
    } = this.props

    if (members.isLoading) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      )
    }

    return (
      <Members
        error={members.error}
        listMembers={members.listMembers}
        myUserInfo={myUserInfo}
        upgradeAdmin={this.handleUpgradeAdmin}
        upgradeOwner={this.handleUpgradeOwner}
        downgradeAdmin={this.handleDowngradeAdmin}
        downgradeOwner={this.handleDowngradeOwner}
        deleteMember={this.handleDeleteMember}
        handleInvite={this.handleInvite}
      />
    )
  }
}

MembersContainer.propTypes = {
  myUserInfo: PropTypes.object.isRequired,
  members: PropTypes.object.isRequired,
  // getCompanyMembers: PropTypes.func.isRequired,
  upgradeAdmin: PropTypes.func.isRequired,
  upgradeOwner: PropTypes.func.isRequired,
  downgradeUser: PropTypes.func.isRequired,
  deleteMember: PropTypes.func.isRequired,
  inviteMembers: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(MembersContainer)
