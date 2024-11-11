import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {StockList} from './components/StockList'
import {StockContextProvider} from './context/StockContext'
import CreateStockPage from './CreateStockPage'
import EditStockPage from './EditStockPage'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Stocks',
    path: '/stock/list',
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

const StockPage: React.FC = () => {
  return (
    <Switch>
      <Redirect exact from='/stock' to='/stock/list' />
      <StockContextProvider>
        <Route exact path='/stock/list'>
          <PageTitle>Stocks</PageTitle>
          <StockList />
        </Route>
        <Route exact path='/stock/new'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Add Stock</PageTitle>
          <CreateStockPage />
        </Route>

        <Route exact path='/stock/edit'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Edit Stock</PageTitle>
          <EditStockPage />
        </Route>

      </StockContextProvider>
    </Switch>
  )
}

export default StockPage
