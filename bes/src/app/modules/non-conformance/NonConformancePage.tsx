import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {NonConformanceList} from './components/NonConformanceList'
import CreateNonConformance from './CreateNonConformancePage'
import {NonConformanceContextProvider} from './context/NonConformanceContext'
import EditNonConformancePage from './EditNonConformancePage'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Non Conformance',
    path: '/non-conformance/list',
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

const PurchaseOrderPage: React.FC = () => {
  return (
    <Switch>
      <Redirect exact from='/non-conformance' to='/non-conformance/list' />
      <NonConformanceContextProvider>
        <Route exact path='/non-conformance/list'>
          <PageTitle>Non Conformance</PageTitle>
          <NonConformanceList />
        </Route>
        <Route exact path='/non-conformance/new'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Add Non-Conformance</PageTitle>
          <CreateNonConformance />
        </Route>
        <Route exact path='/non-conformance/edit'>
          <PageTitle>Edit Non-Conformance</PageTitle>
          <EditNonConformancePage />
        </Route>
      </NonConformanceContextProvider>
    </Switch>
  )
}

export default PurchaseOrderPage
