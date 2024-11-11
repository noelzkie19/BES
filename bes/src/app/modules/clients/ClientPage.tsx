import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ClientList} from './components/ClientList'
import {ClientContextProvider} from './context/ClientContext'
import CreateClientPage from './CreateClientPage'
import EditClientPage from './EditClientPage'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Client',
    path: '/client/list',
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

const clientPage: React.FC = () => {
  return (
    <Switch>
      <Redirect exact from='/client' to='/client/list' />
      <ClientContextProvider>
        <Route exact path='/client/list'>
          <PageTitle>Clients</PageTitle>
          <ClientList />
        </Route>
        <Route exact path='/client/new'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Add Clients</PageTitle>
          <CreateClientPage />
        </Route>
        <Route exact path='/client/edit'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Edit Clients</PageTitle>
          <EditClientPage />
        </Route>
      </ClientContextProvider>
    </Switch>
  )
}

export default clientPage
