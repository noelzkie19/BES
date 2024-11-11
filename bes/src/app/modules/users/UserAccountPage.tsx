import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {UserList} from './components/UserList'
import {UserContextProvider} from './context/UserContext'
import CreateUserPage from './CreateUserPage'
import EditUserPage from './EditUserPage'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'User',
    path: '/user/list',
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

const UserAccountPage: React.FC = () => {
  return (
    <Switch>
      <Redirect exact from='/user' to='/user/list' />
      <UserContextProvider>
        <Route exact path='/user/list'>
          <PageTitle>Users</PageTitle>
          <UserList />
        </Route>
        <Route exact path='/user/new'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Add User</PageTitle>
          <CreateUserPage />
        </Route>
        <Route exact path='/user/edit'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Edit User</PageTitle>
          <EditUserPage />
        </Route>
      </UserContextProvider>
    </Switch>
  )
}

export default UserAccountPage
