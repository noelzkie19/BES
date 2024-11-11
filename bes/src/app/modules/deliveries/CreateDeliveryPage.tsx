import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {DeliveryForm} from './components/DeliveryForm'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Deliveries',
    path: '/delivery',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'New',
    path: '/delivery/new',
    isSeparator: true,
    isActive: false,
  },
]

const CreateDeliveryPage: React.FC = () => {
  return (
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>New Delivery</PageTitle>
              <DeliveryForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateDeliveryPage
