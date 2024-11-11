import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {StockForm} from './components/StockForm'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Stock',
    path: '/stock',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'New',
    path: '/stock/new',
    isSeparator: true,
    isActive: false,
  },
]

const CreateStockPage: React.FC = () => {
  return (
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>New Stock</PageTitle>
              <StockForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateStockPage
