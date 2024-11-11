import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ClientContent} from './components/ClientContent'
import {HelpContent} from './components/HelpContent'
import { QuoteContent } from './components/QuoteContent'
import {HelpContextProvider} from './context/HelpContext'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Help',
    path: '/help',
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

const HelpPage: React.FC = () => {
  return (
    <Switch>
      <HelpContextProvider>
        <Route exact path='/help'>
          <PageTitle>BES Help Center</PageTitle>
          <HelpContent />
        </Route>
        <Route exact path='/help/client'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Client</PageTitle>
          <ClientContent />
        </Route>
        <Route exact path='/help/quote'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Quote</PageTitle>
          <QuoteContent />
        </Route>
      </HelpContextProvider>
    </Switch>
  )
}

export default HelpPage
