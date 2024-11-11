import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {JobList} from './components/JobList'
import {JobContextProvider} from './context/JobContext'
import CreateJobPage from './CreateJobPage'
import EditJobPage from './EditJobPage'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Jobs',
    path: '/job/list',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const JobPage: React.FC = () => {
  return (
    <Switch>
      <Redirect exact from='/job' to='/job/list' />
      <JobContextProvider>
        <Route exact path='/job/list'>
          <PageTitle>Job</PageTitle>
          <JobList />
        </Route>
        <Route exact path='/job/new'>
          <PageTitle>Add Job</PageTitle>
          <CreateJobPage />
        </Route>
        <Route exact path='/job/edit'>
          <PageTitle>Edit Job</PageTitle>
          <EditJobPage />
        </Route>
      </JobContextProvider>
    </Switch>
  )
}

export default JobPage
