import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ClientForm} from './components/ClientForm'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Client',
    path: '/client/list',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'New',
    path: '/client/new',
    isSeparator: true,
    isActive: false,
  },
]

const CreateClientPage: React.FC = () => {
  return (
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>New Client</PageTitle>
              <ClientForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateClientPage
