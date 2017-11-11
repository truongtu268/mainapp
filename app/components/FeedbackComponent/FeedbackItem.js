import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Icon, Tag } from 'antd'
import { FeedbackBlock, FeedbackCate } from 'styles'
// import iconImgPositive from '../../images/positive.png'
// import iconImgNegative from '../../images/negative.png'
// import iconImgAnonymous from '../../images/anonymous.jpg'

class FeedbackItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  openFeedbackDetail(code) {
    this.props.history.push(`/feedback/${code}`)
  }

  render() {
    const {
      code,
      status,
      // type,
      title,
      createdAt,
      isAnonymous,
      commentCount,
      voteCount,
    } = this.props.data
    let competencies = this.props.data.competencies
    // const iconImg = isAnonymous ? iconImgAnonymous : (type === 'issue' ? iconImgNegative : iconImgPositive)
    const limitTag = 2
    const length = competencies.length
    if (length > limitTag) {
      competencies = competencies.slice(0, limitTag).concat(`+${length - limitTag} more`)
    }
    const renderCompetencies = competencies.map((competency, index) => {
      if (!competency.name) {
        return competency
      }
      return <FeedbackCate key={index}>{competency.name}</FeedbackCate>
    })

    return (
      <FeedbackBlock onClick={() => this.openFeedbackDetail(code)}>
        <div className="feedback__col">
          <div className="feedback__message">{title}</div>
          <div className="feedback__cate" style={{ fontSize: 11 }}>
            {(() => {
              if (!isAnonymous) {
                switch (status) {
                  case 'open': return <Tag color="#ffbf00"><Icon type="exclamation-circle" /> open</Tag>
                  case 'close': return <Tag color="#00a854"><Icon type="check-circle" /> closed</Tag>
                  default: return <Tag color="#555a6b"><Icon type="eye" /> anonymous</Tag>
                }
              } else {
                return ''
              }
            })()}
            {renderCompetencies}
          </div>
        </div>
        <div className="feedback__col">
          <div className="feedback__stats">
            <Icon type="message" />{commentCount}
          </div>
          <div className="feedback__stats">
            <Icon type="like-o" />{voteCount}
          </div>
          <div className="feedback__date">
            {moment(createdAt).format('MMMM DD, YYYY')}
          </div>
        </div>
      </FeedbackBlock>
    )
  }
}

FeedbackItem.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(FeedbackItem)
