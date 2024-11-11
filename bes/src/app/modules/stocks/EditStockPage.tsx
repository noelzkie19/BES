import React, {useContext, useEffect, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {StockForm} from './components/StockForm'
import {StockContext} from './context/StockContext'
import { getStockById } from './api'
import { useEffectOnce } from 'react-use'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Stock',
    path: '/stock',
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

const EditStockPage: React.FC = () => {
  const {selectedData, setSelectedData} = useContext(StockContext)
  const history = useHistory()

  const urlParam = new URLSearchParams(useLocation().search)
  const idquery: string | null = urlParam.get('id')
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   getStockById(idquery)
  //   if (!selectedData.id || (selectedData.id && selectedData.id < 0)) {
  //     history.push('/stock/list')
  //   }
  // }, [selectedData, history])
  useEffectOnce(() => {
    fetchStockById()
  })

  const fetchStockById = async () => {
    setIsLoading(true)

    const [data]: any = await getStockById(idquery)
    if (data) {
      setSelectedData(data.data)
      setIsLoading(false)
    } else {
      history.push('/stock/list')
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Edit Stock</PageTitle>
               {
                !isLoading && (
                  <StockForm stocksData={selectedData} />
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditStockPage
