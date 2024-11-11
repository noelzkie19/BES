import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ScheduleContextProvider} from './context/ScheduleContext'
import {ScheduleList} from './components/ScheduleList'
import { ScheduleStaff } from './components/ScheduleStaff'
import ScheduleInterceptor from './ScheduleInterceptor'

const SchedulePage: React.FC = () => {
  return (
    <Switch>
      <Redirect exact from='/schedule' to='/schedule/validate' />
      <ScheduleContextProvider>
        <Route exact path='/schedule/validate'>
          <PageTitle>Schedule</PageTitle>
          <ScheduleInterceptor />
        </Route>
        <Route exact path='/schedule/list'>
          <PageTitle>Schedule</PageTitle>
          <ScheduleList />
        </Route>
        <Route exact path='/schedule/staff'>
          <PageTitle>Schedule - Staff View</PageTitle>
          <ScheduleStaff />
        </Route>
      </ScheduleContextProvider>
    </Switch>
  )
}

export default SchedulePage
