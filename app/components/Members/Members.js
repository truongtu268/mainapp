import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import ListMembers from './ListMembers'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane
import styles from './styles.css'

class Members extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'all',
    }
    this.handleType = this.handleType.bind(this)
  }

  handleType(key) {
    this.setState({ type: key })
  }

  render() {
    const {
      listMembers,
      myUserInfo,
      upgradeOwner,
      upgradeAdmin,
      downgradeAdmin,
      downgradeOwner,
      deleteMember,
      handleInvite,
    } = this.props

    const inactivatedMembers = _.compact(_.map(listMembers, (user) => {
      return user.activeDate == null ? user : null
    }))

    const listMembersProps = {
      type: this.state.type,
      myUserInfo,
      upgradeAdmin,
      upgradeOwner,
      downgradeAdmin,
      downgradeOwner,
      deleteMember,
      handleInvite,
    }

    return (
      <div className={styles.membersComponent}>
        <Tabs
          defaultActiveKey="all"
          onChange={this.handleType}
        >
          <TabPane tab="All" key="all">
            <ListMembers
              listMembers={listMembers}
              {...listMembersProps}
            />
          </TabPane>
          <TabPane tab="Inactivated" key="inactivate">
            <ListMembers
              listMembers={inactivatedMembers}
              {...listMembersProps}
            />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

Members.propTypes = {
  error: PropTypes.object.isRequired,
  listMembers: PropTypes.array.isRequired,
  myUserInfo: PropTypes.object.isRequired,
  upgradeAdmin: PropTypes.func.isRequired,
  upgradeOwner: PropTypes.func.isRequired,
  downgradeAdmin: PropTypes.func.isRequired,
  downgradeOwner: PropTypes.func.isRequired,
  deleteMember: PropTypes.func.isRequired,
  handleInvite: PropTypes.func.isRequired,
}

export default Members
