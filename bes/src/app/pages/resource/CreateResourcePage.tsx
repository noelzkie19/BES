import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ResourceForm} from './components/ResourceForm'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Resource',
    path: '/resource',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'New',
    path: '/resource/new',
    isSeparator: true,
    isActive: false,
  },
]

const CreateResourcePage: React.FC = () => {
  return (
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>New Resource</PageTitle>
              <ResourceForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateResourcePage
