import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {AboutContent} from './components/AboutContent'
import {AboutContextProvider} from './context/AboutContext'

const AboutPage: React.FC = () => {
  return (
    <Switch>
      <AboutContextProvider>
        <Route exact path='/about'>
          <PageTitle>About</PageTitle>
          <AboutContent />
        </Route>
      </AboutContextProvider>
    </Switch>
  )
}

export default AboutPage
