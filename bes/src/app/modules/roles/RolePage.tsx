import React, { useEffect, useState } from 'react'
import {Redirect, Route, Switch, useHistory} from 'react-router-dom'
import {PageLink, PageTitle, usePageData} from '../../../_metronic/layout/core'
import { RoleList } from './components/RoleList'
import { RoleContextProvider } from './context/RoleContext'
import CreateRolePage from './CreateRolePage'
import EditRolePage from './EditRolePage'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Role',
    path: '/Role/list',
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

const RolePage: React.FC = () => {
  const { currentUser } = usePageData();
  const [user, setUser] = useState<boolean>(false)
  const history = useHistory()
  // setUser(true);
  var userRoles: any = currentUser.userRoles;
  useEffect(() => {
    if (!userRoles.includes("Administrator")) {
      history.push('/dashboard')
    }
}, [currentUser])
  return (
    <Switch>
      <Redirect exact from='/role' to='/role/list' />
      <RoleContextProvider>
        <Route exact path='/role/list'>
          <PageTitle>Roles</PageTitle>
          <RoleList/>
        </Route>
        <Route exact path='/role/new'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Add Role</PageTitle>
          <CreateRolePage />
        </Route>
        <Route exact path='/role/edit'>
          <PageTitle breadcrumbs={widgetsBreadCrumbs}>Edit Role</PageTitle>
          <EditRolePage />
        </Route>
      </RoleContextProvider>
    </Switch>
  )
}

export default RolePage
