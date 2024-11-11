import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ClientContent} from './components/ClientContent'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Client',
    path: '/resource',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Client',
    path: '/help/client',
    isSeparator: true,
    isActive: false,
  },
  {
    title: 'Quote',
    path: '/help/quote',
    isSeparator: true,
    isActive: false,
  },
]

const HelpClientPage: React.FC = () => {
  return (
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Client</PageTitle>
              <ClientContent />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HelpClientPage
