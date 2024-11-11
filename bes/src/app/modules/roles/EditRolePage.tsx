import React, {useContext, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { RoleForm } from './components/RoleForm'
import { RoleContext } from './context/RoleContext'
import { useEffectOnce } from 'react-use'
import { getRoleById } from './api'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Role',
    path: '/role',
    isSeparator: false,
    isActive: false,
  },
]

const EditRolePage: React.FC = () => {
  const {selectedData, setSelectedData} = useContext(RoleContext)
  const urlParam = new URLSearchParams(useLocation().search)
  const idquery: string | null = urlParam.get('id')
  const history = useHistory()

  
  useEffectOnce(() => {
    fetchRoleByid();
  })

  const fetchRoleByid = async () => {
    const data = await getRoleById(idquery)
    
    if (data) {
      setSelectedData(data.data)
    } else {
      history.push('/role/list')
    }
  }

  return (
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              <h2 className='col'>Update Role</h2>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Edit Role</PageTitle>
              <RoleForm roleData={selectedData} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditRolePage
