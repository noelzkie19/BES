//import React, {useContext, useEffect} from 'react'
//import {useHistory} from 'react-router-dom'
//import {PageLink, PageTitle} from '../../../_metronic/layout/core'
//import {SupplierForm} from './components/SupplierForm'
//import {SupplierContext} from './context/SupplierContext'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { SupplierForm } from './components/SupplierForm'
import { SUPPLIER_FORM_DEFAULT } from './constant/supplier-defaults'
import { SupplierContext } from './context/SupplierContext'
import { ISupplierData } from './models/supplier-model'
import { useEffectOnce } from 'react-use'
import { getSupplierById } from './api'


const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Supplier',
    path: '/supplier',
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

const EditSupplierPage: React.FC = () => {
  //const {selectedData} = useContext(SupplierContext)
  //const history = useHistory()

  //useEffect(() => {
  //  if (!selectedData.id || (selectedData.id && selectedData.id < 0)) {
  //    history.push('/supplier/list')
  //  }
  //}, [selectedData, history])

  const urlParam = new URLSearchParams(useLocation().search)
  var idquery: string = urlParam.get('id') as string
  const redirect: string | null = urlParam.get('redirect')
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCanEdit, setIsCanEdit] = useState<boolean>(true);
  const [selectedData, setSelectedData] = useState<ISupplierData>(SUPPLIER_FORM_DEFAULT)
  const history = useHistory()

  useEffectOnce(() => {
    fetchSupplierByid();
  })

  const fetchSupplierByid = async () => {
    setIsLoading(true)
    const [data]: any = await getSupplierById(parseInt(idquery))
    if (data) {
      setSelectedData(data.data)
      setIsLoading(false)
    } else {
      history.push('/supplier/list')
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
              <PageTitle breadcrumbs={widgetsBreadCrumbs}> Edit Supplier </PageTitle>
              <SupplierForm supplierData={selectedData} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditSupplierPage
