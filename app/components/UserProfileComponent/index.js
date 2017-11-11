import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Tabs, Button } from 'antd'
import { UserProfile } from 'styles/user-profile'
const TabPane = Tabs.TabPane

const dateFormat = 'DD-MM-YYYY'

const propTypes = {
  user: PropTypes.object.isRequired,
  goToEditPage: PropTypes.func.isRequired,
  goToPasswordPage: PropTypes.func.isRequired,
  isShowButton: PropTypes.bool.isRequired,
}

function UserProfileComponent({ user, goToEditPage, goToPasswordPage, isShowButton }) {
  return Object.keys(user).length === 0
    ? null
    : <UserProfile>
      <Tabs tabPosition="top">
        <TabPane tab="About" key="about" />
        <TabPane tab="Achievements" key="achievements" disabled />
      </Tabs>
      <div className="profile__info">
        <div>
          <div className="profile__infoHeader">
            <div className="profile__icon">
              <img
                className={user.activeDate ? '.profile__avatar' : '.profile__avatar__inactive'}
                src={user.avatar}
                alt="avatar"
              />
            </div>
            {
              user.firstName && user.lastName
                ? <h1>{`${user.lastName} ${user.firstName}`}</h1>
                : <h1>{user.email}</h1>
            }
            {
              user.jobTitle
                ? <h2>{user.jobTitle}</h2>
                : <h2>No job title</h2>
            }
          </div>
          <div className="profile__infoRow">
            <div className="profile__infoRowLabel">Email:</div>
            <div className="profile__infoRowValue">{user.email}</div>
          </div>
          <div className="profile__infoRow">
            <div className="profile__infoRowLabel">Mobile:</div>
            <div className="profile__infoRowValue">
              {
                user.personalInfo.mobile
                  ? (user.personalInfo.mobile[0] !== '0' ? `+84${user.personalInfo.mobile}` : user.personalInfo.mobile)
                  : 'No phone number'
              }
            </div>
          </div>
          <div className="profile__infoRow">
            <div className="profile__infoRowLabel">Date of Birth:</div>
            <div className="profile__infoRowValue">
              {
                user.personalInfo.day_Of_Birth
                  ? moment(user.personalInfo.day_Of_Birth, dateFormat).format('DD/MM/YYYY')
                  : 'No date of birth'
              }
            </div>
          </div>
          <div className="profile__infoRow">
            <div className="profile__infoRowLabel">Join date:</div>
            <div className="profile__infoRowValue">
              {
                user.joinCompanyDate
                  ? moment(user.joinCompanyDate).format('DD/MM/YYYY')
                  : 'No join date'
              }
            </div>
          </div>
          <div className="profile__infoRow">
            <div className="profile__infoRowLabel">Gender:</div>
            <div className="profile__infoRowValue">
              {
                user.personalInfo.gender
                  ? user.personalInfo.gender
                  : 'No gender'
              }
            </div>
          </div>
        </div>
      </div>
      {
        (isShowButton) &&
          <div className="profile__buttonCenter">
            <Button
              ghost
              type="primary"
              onClick={goToEditPage}
            >
              Edit Profile
            </Button>
            <Button
              ghost
              type="primary"
              onClick={goToPasswordPage}
            >
              Change password
            </Button>
          </div>
      }
    </UserProfile>
}

UserProfileComponent.propTypes = propTypes

export default UserProfileComponent
