import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {
  Icon, Tag, Input, Card, Timeline, Button,
  Anchor, Select,
} from 'antd'
import ActivityTimelineItem from '../FeedbackComponent/ActivityTimelineItem'
import UserAvatar from '../UserProfileComponent/UserAvatar'
import activityStyles from '../FeedbackComponent/ActivityStyles.css'
import styles from './styles.css'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  competencies: state.common.competencies.list,
  currentUser: state.currentUser.user,
})

class FeedbackDiscussion extends PureComponent {
  constructor(props) {
    super(props)
    const { competencies } = props
    this.state = {
      isEditingContent: false,
      titleValue: props.feedback.title,
      competenciesValue: props.feedback.competencies,
      contentValue: props.feedback.content,
      commentValue: '',
      isVoted: props.feedback.isVoted,
      competencies,
      feedbackCode: props.feedback.code,
    }
    this.renderFeedbackContent = this.renderFeedbackContent.bind(this)
    this.renderCommentBlock = this.renderCommentBlock.bind(this)
    this.submitComment = this.submitComment.bind(this)
    this.handleChangeComment = this.handleChangeComment.bind(this)
    this.editFeedbackContent = this.editFeedbackContent.bind(this)
    this.cancelFeedbackContent = this.cancelFeedbackContent.bind(this)
    this.submitFeedbackContent = this.submitFeedbackContent.bind(this)
    this.voteForFeedback = this.voteForFeedback.bind(this)
    this.handleChangeFeedbackTitle = this.handleChangeFeedbackTitle.bind(this)
    this.handleChangeFeedbackCompetencies = this.handleChangeFeedbackCompetencies.bind(this)
    this.handleChangeFeedbackContent = this.handleChangeFeedbackContent.bind(this)
    this.handleCloseAndOpenIssue = this.handleCloseAndOpenIssue.bind(this)
  }

  handleCloseAndOpenIssue() {
    const { feedbackCode } = this.state
    const state = this.props.feedback.state === 'close' && 'open' || 'close'
    this.props.updateStatePublicIssue({ feedbackCode, state })
  }

  editFeedbackContent() {
    this.setState({
      isEditingContent: true,
      titleValue: this.props.feedback.title,
      competenciesValue: this.props.feedback.competencies,
      contentValue: this.props.feedback.content,
    })
  }

  cancelFeedbackContent() {
    this.setState({
      isEditingContent: false,
    })
  }

  submitFeedbackContent() {
    this.setState({
      isEditingContent: false,
    })
    const {
      titleValue,
      contentValue,
      competenciesValue,
    } = this.state
    this.props.updateFeedback({
      feedbackCode: this.props.feedback.code,
      content: {
        title: titleValue,
        content: contentValue,
        compentencies: competenciesValue,
      },
    })
  }

  voteForFeedback() {
    const data = { feedbackCode: this.props.feedback.code }
    this.props.voteForFeedback(data)
    this.setState({
      isVoted: !this.state.isVoted,
    })
  }

  handleChangeFeedbackTitle(e) {
    this.setState({ titleValue: e.target.value })
  }

  handleChangeFeedbackCompetencies(arr) {
    const { competencies } = this.state
    const competenciesArray = (competencies.filter((competency) => arr.includes(competency.name))).map((competency) => competency.id)
    this.setState({ competenciesValue: competenciesArray })
  }

  handleChangeFeedbackContent(e) {
    this.setState({ contentValue: e.target.value })
  }

  handleChangeComment(e) {
    this.setState({ commentValue: e.target.value })
  }

  submitComment() {
    this.props.commentFeedback({
      feedbackCode: this.props.feedback.code,
      content: {
        text: this.state.commentValue,
      },
    })
  }

  renderFeedbackContent() {
    const { feedback, currentUser } = this.props
    const {
      isVoted,
      isEditingContent,
      contentValue,
      competencies,
    } = this.state
    const { state } = this.props.feedback
    const isCloseIssue = state === 'close' && true || false
    let actionEl
    let contentEl
    const actionList = (
      <div className={styles.actionList}>
        <span
          className={`${styles.interactAction} ${isVoted ? 'voted' : ''}`}
          onClick={() => this.voteForFeedback()}
        >
          <Icon type="like" /> <a>Vote</a>
        </span>
        <span className={styles.interactAction}>
          <Icon type="tag" /> <a>Add tag</a>
        </span>
        <div className={styles.interactAction}>
          <Anchor affix={false}>
            <Anchor.Link href="#comment" title={<span><Icon type="message" /> Comment</span>} />
          </Anchor>
        </div>
        { currentUser.code === feedback.giver.code &&
          <span
            className={styles.interactAction}
            onClick={this.editFeedbackContent}
          >
            <Icon type="edit" /> <a>Edit</a>
          </span>
        }
        { currentUser.code === feedback.giver.code &&
          <span
            className={styles.interactAction}
            onClick={this.handleCloseAndOpenIssue}
          >
            <Icon type="close-circle-o " /> {isCloseIssue && <a>Open issue</a> || <a>Close issue</a>}
          </span>
        }
      </div>
    )

    if (isEditingContent) {
      const currentCompetencies = feedback.competencies.map((competency) => {
        return competency.name
      })
      contentEl = (
        <div>
          <Input
            type="textarea"
            rows={4}
            value={contentValue}
            onChange={this.handleChangeFeedbackContent}
          />
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={currentCompetencies}
            onChange={this.handleChangeFeedbackCompetencies}
          >
            {competencies.map((competency, index) => {
              return <Select.Option key={index} value={`${competency.name}`}>{competency.name}</Select.Option>
            })}
          </Select>
        </div>
      )
      actionEl = (
        <div style={{ textAlign: 'right' }}>
          <Button
            style={{ marginRight: 15 }}
            onClick={this.cancelFeedbackContent}
          >Cancel</Button>
          <Button
            type="primary"
            onClick={this.submitFeedbackContent}
          >Done</Button>
        </div>
      )
    } else {
      contentEl = (
        <div>
          <p>
            {contentValue}
          </p>
          <br />
          <div>
            {feedback.competencies.map((competency, index) => {
              return <Tag key={index}>{competency.name}</Tag>
            })}
          </div>
        </div>
      )
      actionEl = actionList
    }

    return (
      <Card bodyStyle={{ padding: 0 }} className={activityStyles.commentBody}>
        <div className={activityStyles.commentContent}>
          {contentEl}
        </div>
        <div className={activityStyles.commentFooter}>
          {actionEl}
        </div>
      </Card>
    )
  }

  renderCommentBlock() {
    const { state } = this.props.feedback
    const isCloseIssue = state === 'close' && true || false
    return (
      isCloseIssue
      && <div>The issue is closed</div>
      || <Card id="comment" bodyStyle={{ padding: 0 }} className={activityStyles.commentBody}>
        <div className={activityStyles.commentContent}>
          <Input
            type="textarea"
            rows={4}
            value={this.state.commentValue}
            onChange={this.handleChangeComment}
            disabled={this.props.submitingComment}
          />
        </div>
        <div className={activityStyles.commentFooter} style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            size="large"
            onClick={this.submitComment}
            loading={this.props.submitingComment}
          >
            Comment
          </Button>
        </div>
      </Card>
    )
  }

  render() {
    const {
      isAnonymous,
      status,
      createdAt,
      commentCount,
      voteCount,
      listVoteLatest,
      latestActivities,
      giver,
    } = this.props.feedback

    const {
      isEditingContent,
      titleValue,
    } = this.state

    const listVoteLatestEl = voteCount > 0 ? (
      <div className={styles.listVoteLatest}>
        {listVoteLatest.map((user, index) => {
          return <UserAvatar key={index} user={user} />
        })}
        <div className={styles.listVoteLatestCount}>
          +{voteCount} voted
        </div>
      </div>
    ) : ''

    const authorEl = isAnonymous ? (
      <span className={activityStyles.giver}>Anonymous user</span>
    ) : (
      <Link to={`/u/${giver.code}`} className={activityStyles.giver}>
        {`${giver.firstName} ${giver.lastName}`}
      </Link>
    )

    const feedbackContentEl = this.renderFeedbackContent()
    const commentEl = this.renderCommentBlock()
    const titleEl = isEditingContent ? (
      <Input
        value={titleValue}
        className={styles.title}
        onChange={this.handleChangeFeedbackTitle}
      />
    ) : (
      <h2 className={styles.title}>{titleValue}</h2>
    )
    return (
      <div>
        <div className={styles.header}>
          {titleEl}
          <div className={styles.status}>
            {(() => {
              if (!isAnonymous) {
                switch (status) {
                  case 'open': return <Tag color="#ffbf00"><Icon type="exclamation-circle" /> open</Tag>
                  case 'closed': return <Tag color="#00a854"><Icon type="check-circle" /> closed</Tag>
                  default: return <Tag color="#ffbf00"><Icon type="exclamation-circle" /> open</Tag>
                }
              } else {
                return <Tag color="#555a6b"><Icon type="eye" /> anonymous</Tag>
              }
            })()}
            {authorEl} opened this issue at {moment(createdAt).format('MMMM DD, YYYY')}
            <div className={styles.stats}>
              <Icon type="message" />{commentCount}
            </div>
            <div className={styles.stats}>
              <Icon type="like-o" />{voteCount}
            </div>
          </div>
        </div>
        <Timeline
          className={activityStyles.conversation}
          pending={commentEl}
        >
          <Timeline.Item
            dot={
              <UserAvatar
                user={giver}
                size="large"
                style={{ color: '#F56A00', backgroundColor: '#FDE3CF' }}
              />
            }
            color="red"
          >
            {feedbackContentEl}
            {listVoteLatestEl}
          </Timeline.Item>
          {latestActivities.map((activity, index) => {
            return <ActivityTimelineItem key={index} isAnonymous={isAnonymous} activityData={activity} />
          })}
        </Timeline>
      </div>
    )
  }
}

FeedbackDiscussion.propTypes = {
  submitingComment: PropTypes.bool.isRequired,
  updateStatePublicIssue: PropTypes.func.isRequired,
  updateFeedback: PropTypes.func.isRequired,
  voteForFeedback: PropTypes.func.isRequired,
  commentFeedback: PropTypes.func.isRequired,
  competencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  feedback: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(FeedbackDiscussion)
