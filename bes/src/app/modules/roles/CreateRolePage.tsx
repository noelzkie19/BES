import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {PageLink, PageTitle, usePageData} from '../../../_metronic/layout/core'
import { RoleForm } from './components/RoleForm'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Role',
    path: '/role',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'New',
    path: '/role/new',
    isSeparator: true,
    isActive: false,
  },
]

const CreateUserPage: React.FC = () => {
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
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>New Role</PageTitle>
              <RoleForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateUserPage
