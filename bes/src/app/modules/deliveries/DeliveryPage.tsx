import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {DeliveryList} from './components/DeliveryList'
import CreateDeliveryPage from './CreateDeliveryPage'
import {DeliveryContextProvider} from './context/DeliveryContext'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Deliveries',
    path: '/delivery/list',
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
      <Redirect exact from='/delivery' to='/delivery/list' />
      <DeliveryContextProvider>
        <Route exact path='/delivery/list'>
          <PageTitle>Deliveries</PageTitle>
          <DeliveryList />
        </Route>
        <Route exact path='/delivery/new'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Add Delivery</PageTitle>
          <CreateDeliveryPage />
        </Route>
      </DeliveryContextProvider>
    </Switch>
  )
}

export default JobPage
