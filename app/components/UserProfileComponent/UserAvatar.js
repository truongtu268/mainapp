import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd'

const propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object,
  user: PropTypes.object.isRequired,
  className: PropTypes.string,
  shape: PropTypes.string,
  disableLink: PropTypes.bool,
}

class UserAvatar extends PureComponent {
  render() {
    const {
      user,
      size,
      color,
      style,
      shape,
      disableLink,
    } = this.props
    const avatar = (
      <Avatar
        style={{ backgroundColor: color, ...style }}
        size={size}
        shape={shape}
        src={user.avatar}
      >
        {!user.avatar && user.firstName && user.firstName.charAt(0)}
      </Avatar>
    )
    if (!disableLink || disableLink === false) {
      return (
        <Link to={`/u/${user.code}`}>
          {avatar}
        </Link>
      )
    }
    return avatar
  }
}

UserAvatar.propTypes = propTypes

export default UserAvatar
