import React, {useContext, useEffect, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {PageLink, PageTitle, usePageData} from '../../../_metronic/layout/core'
import {UserForm} from './components/UserForm'
import {UserContext} from './context/UserContext'
import { getUserById } from './api'
import { useEffectOnce } from 'react-use'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'User',
    path: '/user',
    isSeparator: false,
    isActive: false,
  },
]

const EditUserPage: React.FC = () => {
  const {selectedData, setSelectedData} = useContext(UserContext)
  const urlParam = new URLSearchParams(useLocation().search)
  const idquery: string | null = urlParam.get('id')
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const history = useHistory()
  const { currentUser } = usePageData();

  useEffectOnce(() => {
    fetchUserByid();
  })

  const fetchUserByid = async () => {
    setIsLoading(true)
    const data = await getUserById(+(idquery || 0))
    
    if (data) {
      setSelectedData(data.data)
      setIsLoading(false)
    } else {
      history.push('/user/list')
      setIsLoading(false)
    }
    var userRoles: any = currentUser.userRoles;
    if (!userRoles.includes("Administrator")) {
      history.push('/dashboard')
    }
  }

  return (
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              <h2 className='col'>Update User</h2>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Edit User</PageTitle>
              <UserForm userData={selectedData} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUserPage
