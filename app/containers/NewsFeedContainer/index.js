import React from 'react'
import { connect } from 'react-redux'
import getStateSelector from './selectors'
import { getLogProccesses } from './actions'
import NewsFeedComponent from '../../components/NewsFeedComponent'

const mapStateToProps = (state) => getStateSelector(state)

const mapDispatchToProps = (dispatch) => ({
  logProccesses: (accessToken) => dispatch(getLogProccesses(accessToken)),
})

function NewsFeedContainer(props) {
  return <NewsFeedComponent {...props} />
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedContainer)
