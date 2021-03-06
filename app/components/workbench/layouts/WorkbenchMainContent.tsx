import * as React from 'react'
import { Prompt } from 'react-router-dom'

import { connectComponentToPropsWithRouter } from '../../../utils/connectComponentToProps'
import { QriRef, qriRefFromRoute } from '../../../models/qriRef'
import { RouteProps } from '../../../models/store'
import { ApiActionThunk } from '../../../store/api'
import { fetchWorkingDatasetDetails } from '../../../actions/api'
import { selectFsiPath, selectMutationsIsDirty } from '../../../selections'

import LinkButton from '../headerButtons/LinkButton'
import PublishButton from '../headerButtons/PublishButton'

interface WorkbenchMainContentProps extends RouteProps {
  qriRef: QriRef
  modified: boolean
  fsiPath: string
  fetchWorkingDatasetDetails: (username: string, name: string) => ApiActionThunk
}

const WorkbenchMainContentComponent: React.FunctionComponent<WorkbenchMainContentProps> = (props) => {
  const {
    qriRef,
    modified,
    fsiPath,
    children,
    fetchWorkingDatasetDetails
  } = props
  return <>
    <div className='main-content-header'>
      <Prompt when={modified} message={(location) => {
        if (location.pathname.includes('workbench')) return true
        if (fsiPath !== '') {
          fetchWorkingDatasetDetails(qriRef.username, qriRef.name)
          return true
        }
        return `You have uncommited changes! Click 'cancel' and commit these changes before you navigate away or you will lose your work.`
      }}/>
      <LinkButton />
      <PublishButton />
    </div>
    {children}
  </>
}

export default connectComponentToPropsWithRouter(
  WorkbenchMainContentComponent,
  (state: any, ownProps: WorkbenchMainContentProps) => {
    return {
      ...ownProps,
      qriRef: qriRefFromRoute(ownProps),
      fsiPath: selectFsiPath(state),
      modified: selectMutationsIsDirty(state)
    }
  },
  {
    fetchWorkingDatasetDetails
  }
)
