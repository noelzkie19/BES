import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SupplierForm} from './components/SupplierForm'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Supplier',
    path: '/supplier',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'New',
    path: '/supplier/new',
    isSeparator: true,
    isActive: false,
  },
]

const CreateSupplierPage: React.FC = () => {
  return (
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>New Supplier</PageTitle>
              <SupplierForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateSupplierPage
