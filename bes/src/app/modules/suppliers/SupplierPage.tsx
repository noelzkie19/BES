import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SupplierList} from './components/SupplierList'
import {SupplierContextProvider} from './context/SupplierContext'
import CreateSupplierPage from './CreateSupplierPage'
import EditSupplierPage from './EditSupplierPage'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Suppliers',
    path: '/supplier/list',
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

const SupplierPage: React.FC = () => {
  return (
    <Switch>
      <Redirect exact from='/supplier' to='/supplier/list' />
      <SupplierContextProvider>
        <Route exact path='/supplier/list'>
          <PageTitle>Supplier</PageTitle>
          <SupplierList />
        </Route>
        <Route exact path='/supplier/new'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Add Supplier</PageTitle>
          <CreateSupplierPage />
        </Route>
        <Route exact path='/supplier/edit'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Edit Supplier</PageTitle>
          <EditSupplierPage />
        </Route>
      </SupplierContextProvider>
    </Switch>
  )
}

export default SupplierPage
