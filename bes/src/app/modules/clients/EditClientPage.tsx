import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { ClientForm } from './components/ClientForm'
import { CLIENT_FORM_DEFAULT } from './constant/client-defaults'
import { ClientContext } from './context/ClientContext'
import { IClientData } from './models/client-model'
import { useEffectOnce } from 'react-use'
import { getClientById } from './api'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Client',
    path: '/client',
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

const EditClientPage: React.FC = () => {
  const urlParam = new URLSearchParams(useLocation().search)
  var idquery: string = urlParam.get('id') as string
  const redirect: string | null = urlParam.get('redirect')
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCanEdit, setIsCanEdit] = useState<boolean>(true);
  const [selectedData, setSelectedData] = useState<IClientData>(CLIENT_FORM_DEFAULT)
  const history = useHistory()

  useEffectOnce(() => {
    fetchJobByid();
  })

  const fetchJobByid = async () => {
    setIsLoading(true)
    const [data]: any = await getClientById(parseInt(idquery))
    if (data) {
      setSelectedData(data.data)
      setIsLoading(false)
    } else {
      history.push('/client/list')
      setIsLoading(false)
    }
    setIsCanEdit(redirect === null)
  }

  return (
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              {isCanEdit ? (
                <PageTitle breadcrumbs={widgetsBreadCrumbs}>Update Client</PageTitle>
              ) : (
                <PageTitle breadcrumbs={widgetsBreadCrumbs}>Client</PageTitle>
              )}
              <ClientForm clientData={selectedData} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditClientPage
