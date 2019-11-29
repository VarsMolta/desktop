import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Commit, { CommitProps } from '../components/Commit'
import Store from '../models/store'
import { saveWorkingDatasetAndFetch } from '../actions/api'
import { setCommitTitle, setCommitMessage } from '../actions/mutations'
import { setSelectedListItem } from '../actions/selections'

const mapStateToProps = (state: Store) => {
  const { workingDataset, mutations } = state
  const { status, peername, name } = workingDataset
  const { save } = mutations
  const { title, message } = save.value

  // get data for the currently selected component
  return {
    isLoading: false,
    datasetRef: `${peername}/${name}`,
    title,
    message,
    status
  }
}

const mergeProps = (props: any, actions: any): CommitProps => { //eslint-disable-line
  return { ...props, ...actions }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({
    setCommitTitle,
    setCommitMessage,
    saveWorkingDatasetAndFetch,
    setSelectedListItem
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Commit)