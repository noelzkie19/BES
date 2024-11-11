import React, {useContext} from 'react'
import {PageTitle, PageLink} from '../../../_metronic/layout/core'
import {QuoteForm} from './components/QuoteForm'
import {QuoteContext} from './context/QuoteContext'
import {useLocation} from 'react-router-dom'
import {NewQuoteForm} from './components/NewQuoteForm'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Quote',
    path: '/quote',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'New',
    path: '/quote/new',
    isSeparator: true,
    isActive: false,
  },
]

const CreateQuotePage: React.FC = () => {
  const search = useLocation().search
  const copy: string | null = new URLSearchParams(search).get('copy')
  const {selectedData} = useContext(QuoteContext)

  return (
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>New Quote</PageTitle>
              <NewQuoteForm isCanEdit={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateQuotePage
