import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {QuoteContextProvider} from './context/QuoteContext'
import {QuoteList} from './components/QuoteList'
import CreateQuotePage from './CreateQuotePage'
import EditQuotePage from './EditQuotePage'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Quote',
    path: '/quote/list',
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

const SchedulePage: React.FC = () => {
  return (
    <Switch>
      <Redirect exact from='/quote' to='/quote/list' />
      <QuoteContextProvider>
        <Route exact path='/quote/list'>
          <PageTitle>Quote</PageTitle>
          <QuoteList />
        </Route>
        <Route exact path='/quote/new'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Add Quote</PageTitle>
          <CreateQuotePage />
        </Route>
        <Route exact path='/quote/edit'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Edit Quote</PageTitle>
          <EditQuotePage />
        </Route>
      </QuoteContextProvider>
    </Switch>
  )
}

export default SchedulePage
