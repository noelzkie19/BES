import React, {useContext, useEffect, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {PageLink, PageTitle, usePageData} from '../../../_metronic/layout/core'
import {StockContext} from '../../modules/stocks/context/StockContext'
import {ResourceForm} from './components/ResourceForm'
import {ResourceContext} from './context/ResourceContext'
import { useEffectOnce } from 'react-use'
import { getResourceById } from './api'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Resource',
    path: '/resource',
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

const EditResourcePage: React.FC = () => {

  const {selectedData, setSelectedData} = useContext(ResourceContext)
  const urlParam = new URLSearchParams(useLocation().search)
  const idquery: string | null = urlParam.get('id')
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const history = useHistory()

    
  useEffectOnce(() => {
    fetchUserByid();
  })

  const fetchUserByid = async () => {
    setIsLoading(true)
    const data = await getResourceById(+(idquery || 0))
    
    if (data) {
      setSelectedData(data)
      setIsLoading(false)
    } else {
      history.push('/resource/list')
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Edit Resource</PageTitle>
              {
                !isLoading && (
                  <ResourceForm resourcesData={selectedData} />
                )
              }
            
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditResourcePage
