import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {UserForm} from './components/UserForm'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'User',
    path: '/user',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'New',
    path: '/user/new',
    isSeparator: true,
    isActive: false,
  },
]

const CreateUserPage: React.FC = () => {
  return (
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>New User</PageTitle>
              <UserForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateUserPage
