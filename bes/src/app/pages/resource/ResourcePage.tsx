import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ResourceList} from './components/ResourceList'
import {ResourceContextProvider} from './context/ResourceContext'
import CreateResourcePage from './CreateResourcePage'
import EditResourcePage from './EditResourcePage'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Resource',
    path: '/resource/list',
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

const ResourcePage: React.FC = () => {
  return (
    <Switch>
      <Redirect exact from='/resource' to='/resource/list' />
      <ResourceContextProvider>
        <Route exact path='/resource/list'>
          <PageTitle>Resource</PageTitle>
          <ResourceList />
        </Route>
        <Route exact path='/resource/new'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Add Resource</PageTitle>
          <CreateResourcePage />
        </Route>
        <Route exact path='/resource/edit'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Edit Resource</PageTitle>
          <EditResourcePage />
        </Route>
      </ResourceContextProvider>
    </Switch>
  )
}

export default ResourcePage
