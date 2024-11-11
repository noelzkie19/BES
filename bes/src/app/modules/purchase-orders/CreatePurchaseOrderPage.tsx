import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {PurchaseOrderForm} from './components/PurchaseOrderForm'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Purchase Order',
    path: '/purchase-order',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'New',
    path: '/purchase-order/new',
    isSeparator: true,
    isActive: false,
  },
]

const CreatePurchaseOrderPage: React.FC = () => {
  return (
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>New Purchase Order</PageTitle>
              <PurchaseOrderForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePurchaseOrderPage
