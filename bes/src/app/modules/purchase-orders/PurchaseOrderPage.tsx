import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {PurchaseOrderList} from './components/PurchaseOrderList'
import {PurchaseOrderContextProvider} from './context/PurchaseOrderContext'
import CreatePurchaseOrderPage from './CreatePurchaseOrderPage'
import EditPurchaseOrderPage from './EditPurcaseOrderPage'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Purchase Orders',
    path: '/purchase-order/list',
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
      <Redirect exact from='/purchase-order' to='/purchase-order/list' />
      <PurchaseOrderContextProvider>
        <Route exact path='/purchase-order/list'>
          <PageTitle>Purchase Order</PageTitle>
          <PurchaseOrderList />
        </Route>
        <Route exact path='/purchase-order/new'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Add Purchase Order</PageTitle>
          <CreatePurchaseOrderPage />
        </Route>
        <Route exact path='/purchase-order/edit'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Edit Purchase Order</PageTitle>
          <EditPurchaseOrderPage />
        </Route>
      </PurchaseOrderContextProvider>
    </Switch>
  )
}

export default PurchaseOrderPage
