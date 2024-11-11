import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { IUser } from '../users/models/user-model'
import { getAllUsers } from './api'
import {NonConformanceForm} from './components/NonConformanceForm'
import { NonConformanceContext } from './context/NonConformanceContext'
import { getAdminUsers } from '../users/api'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Non Conformance',
    path: '/non-conformance',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'New',
    path: '/non-conformance/new',
    isSeparator: true,
    isActive: false,
  },
]

const CreatePurchaseOrderPage: React.FC = () => {
  const search = useLocation().search
  const copy: string | null = new URLSearchParams(search).get('copy')

  const { selectedData } = useContext(NonConformanceContext)
  const [users, setUsers] = useState<IUser[]>([])
  const [adminusers, setAdminUsers] = useState<IUser[]>([])

  useEffectOnce(() => {
    getUsers();
    getAdminUserList();
  })
  
  const getUsers = async () => {
    const users: any = await getAllUsers();
    setUsers(users.data)
  }

  const getAdminUserList = async () => {
    const users: any = await getAdminUsers();
    setAdminUsers(users.data)
  }
  
  return (
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>New Non Conformance</PageTitle>
              <NonConformanceForm nonConformanceData={copy ? selectedData : null}
                isCanEdit={true} isFieldDisabled = {false} userLists = {users} adminUserLists={adminusers} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePurchaseOrderPage
