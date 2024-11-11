import React, {useContext, useEffect, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {PurchaseOrderForm} from './components/PurchaseOrderForm'
import {PurchaseOrderContext} from './context/PurchaseOrderContext'
import { useEffectOnce } from 'react-use'
import { getPurchaseById } from './api'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Purchase Order',
    path: '/purchase-order',
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

const EditPurchaseOrderPage: React.FC = () => {
  const urlParam = new URLSearchParams(useLocation().search)
  const {selectedData, setSelectedData} = useContext(PurchaseOrderContext)
  const history = useHistory()
  const idquery: string | null = urlParam.get('id')
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffectOnce(() => {
    fetchPurchaseById();
  })

  const fetchPurchaseById = async () => {
    setIsLoading(true)
    const [data]: any = await getPurchaseById(idquery || '')
    
    if (data) {
      setSelectedData(data.data)
      setIsLoading(false)
    } else {
      history.push('/purchase-order/list')
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Edit Purchase Order</PageTitle>
              {
                !isLoading && (
                  <PurchaseOrderForm purchaseData={selectedData} />
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditPurchaseOrderPage
