import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {QuoteForm} from './components/QuoteForm'
import {NEW_QUOTE_FORM_DEFAULT, QUOTE_FORM_DEFAULT} from './constant/quote-default'
import {QuoteContext} from './context/QuoteContext'
import {IQuote} from './models/quote-model'
import {useEffectOnce} from 'react-use'
import {getQuoteByid} from './api'
import {NewQuoteForm} from './components/NewQuoteForm'
import {INewEditData, INewQuote} from './models/new-qoute-model'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Quote',
    path: '/quote',
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

const EditQuotePage: React.FC = () => {
  const urlParam = new URLSearchParams(useLocation().search)
  const idquery: string | null = urlParam.get('id')
  const redirect: string | null = urlParam.get('redirect')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isCanEdit, setIsCanEdit] = useState<boolean>(true)
  const [selectedData, setSelectedData] = useState<INewEditData>(NEW_QUOTE_FORM_DEFAULT)
  const history = useHistory()

  useEffectOnce(() => {
    fetchJobByid()
  })

  const fetchJobByid = async () => {
    setIsLoading(true)
    const [data]: any = await getQuoteByid(idquery)
    if (data) {
      setSelectedData(data.data)
      setIsLoading(false)
    } else {
      history.push('/quote/list')
      setIsLoading(false)
    }
    setIsCanEdit(redirect === null)
  }

  return (
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              {/* <h2 className='col'>{isCanEdit ? 'Update' : 'View'} Quote</h2> */}
              {isCanEdit ? (
                <PageTitle breadcrumbs={widgetsBreadCrumbs}>Update Quote</PageTitle>
              ) : (
                <PageTitle breadcrumbs={widgetsBreadCrumbs}>Quote</PageTitle>
              )}
              {!isLoading && <NewQuoteForm quoteData={selectedData} isCanEdit={isCanEdit} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditQuotePage
