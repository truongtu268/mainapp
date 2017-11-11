import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EditProfileComponent from '../../components/EditProfileComponent'
import getStateSelector from './selectors'
import { updateProfile, fetchingUser } from './actions'
import { uploadAvatarAPI } from '../../api'

const mapStateToProps = (state) => getStateSelector(state)

const mapDispatchToProps = {
  updateProfile,
  fetchingUser,
}

class EditProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(data, imgFile = null) {
    const {
      token,
      user,
      updateProfile,
    } = this.props
    const userCode = user.code
    let sentData = Object.assign(user, {
      firstName: data.firstname,
      lastName: data.lastname,
      personalInfo: {
        ...user.personalInfo,
        mobile: data.mobile,
        day_Of_Birth: data.birthday,
        gender: data.gender,
      },
      jobTitle: data.jobTitle,
      joinCompanyDate: data.joindate,
    })
    // fetchingUser()
    // if have avatar
    // upload avatar to get URL first -> update profile
    if (imgFile) {
      const imgBody = new FormData()
      imgBody.append('avatar', imgFile)
      uploadAvatarAPI(imgBody)
        .then((resp) => {
          const avatar = resp.files[0].extra.Location
          sentData = Object.assign(sentData, { avatar })
          // update profile
          updateProfile(userCode, sentData, token)
        })
    } else {
      updateProfile(userCode, sentData, token)
    }
  }

  render() {
    return (
      <EditProfileComponent
        hasLoading={this.props.hasLoading}
        user={this.props.user}
        onSubmit={this.onSubmit}
      />
    )
  }
}

EditProfileContainer.propTypes = {
  hasLoading: PropTypes.bool,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.string.isRequired,
  updateProfile: PropTypes.func.isRequired,
  // fetchingUser: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer)
