import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { CustomAlert, IAlert } from '../../../shared/components/CustomAlert'
import { getSuppliers } from '../api'
import { SUPPLIER_FORM_DEFAULT } from '../constant/supplier-defaults'
import { SupplierContext } from '../context/SupplierContext'
import { 
  ISupplierData,
  ISupplierReport
} from '../models/supplier-model'
import { DeleteSupplierModal } from './DeleteSupplierModal'

import { useEffectOnce } from 'react-use'
import { PrintModal } from './modal/PrintModal'
import { useReactToPrint } from 'react-to-print'
import { SupplierPrintContent } from './print/SupplierPrintContent'
import { ActionEnum } from '../../../../_metronic/partials/widgets/grid/constant/ActionOption'
import { SearchWidget1 } from '../../../../_metronic/partials/widgets/search/SearchWidget1'
import { SupplierListGrid } from './SupplierListGrid'

const loadingPanel = (
  <div className="k-loading-mask">
    <span className="k-loading-text">Loading</span>
    <div className="k-loading-image"></div>
    <div className="k-loading-color"></div>
  </div>
);

const SupplierList: React.FC = () => {

  const { 
    setSelectedData, 
    contextToaster, 
    getUserApprovalAsync, 
    fetchingUserApproval,
    setIsCanEdit,
  } = useContext(SupplierContext)

  const [deleteData, setDeleteData] = useState<ISupplierData | undefined>()
  const [printSuppliers, setPrintSuppliers] = useState<ISupplierReport[]>([])
  
  const [toast, setToast] = useState<IAlert | undefined>()
  const [modalShow, setModalShow] = useState(false)
  const [modalPrint, setModalPrint] = useState(false)
  const [requestReload, setRequestReload] = useState(false)
  
  const componentRefDetails = useRef<any>()
  const printHandler = useReactToPrint({
    content: () => componentRefDetails.current,
  })
  const advanceSearch = useRef('');
  

  const history = useHistory()

  useEffectOnce(() => {
    getAllReferences()
  })

  const getAllReferences = async () => {
    await getUserApprovalAsync()
  }

  useEffect(() => {
    if (contextToaster?.message != null && contextToaster?.message !== '') {
      setToast(contextToaster)
      setTimeout(() => setToast(undefined), 1000)
    }
  }, [contextToaster])

  const closeModal = () => {
    setModalShow(false)
  }

  const deleteHandler = () => {
    setModalShow(false)
    setRequestReload(true)
  }
  
  const actionHandler = (event: any, dataItem: any, _: number) => {
    switch(event.value.value) {
      case ActionEnum.Edit: 
        setSelectedData(dataItem)
        setIsCanEdit(true)
        history.push({
          pathname: '/supplier/edit',
          search: `?id=${dataItem.id}`,
        })
        break;
      case ActionEnum.Delete: 
        setModalShow(true)
        setDeleteData(dataItem)
        break;
    case ActionEnum.View: 
        setIsCanEdit(false)
        setSelectedData(dataItem)
        history.push({
          pathname: '/supplier/edit',
          search: `?id=${dataItem.id}`,
        })
    }
  }



  const searchHandler = (result: string) => {
    advanceSearch.current = result;
    setRequestReload(true)
  }

  return (
    <React.Fragment>
      <div className='card card-custom'>
        <div className='card-body'>
            {modalPrint && (
              <React.Fragment>
                  <PrintModal
                    title={'Supplier Review Report'}
                    toggleDialog={() => setModalPrint(false)}
                    onPrint={(data) => { 
                      setPrintSuppliers(data)
                      printHandler() 
                      }}>
                  </PrintModal>
                <div style={{ display: 'none' }}>
                  <SupplierPrintContent
                    refs={componentRefDetails}
                    dataItem={printSuppliers}>
                  </SupplierPrintContent>
                </div>
              </React.Fragment>
            )}
            <DeleteSupplierModal
              show={modalShow}
              handleClose={closeModal}
              supplierData={deleteData}
              deleteCallback={deleteHandler}
            />
            <div className='row justify-content-between align-items-center'>
              <div className='actions d-flex justify-content-between'>
                <button className='btn btn-primary col-auto'
                  onClick={() => {
                    setSelectedData(SUPPLIER_FORM_DEFAULT)
                    history.push('/supplier/new')
                  }}>
                  <i className='bi bi-plus-lg'></i> New Supplier
                </button>

                <button className='btn btn-primary col-auto'
                  onClick={() => setModalPrint(true)}> Print Supplier Review
                </button>
              </div>
            </div>
          {toast && <CustomAlert {...toast} />}
          <div className='App'>
            {(fetchingUserApproval) && loadingPanel}
            <SearchWidget1 search={searchHandler} shouldClearSearch ={false}></SearchWidget1>
            <SupplierListGrid actionHandler={actionHandler}
              advanceSearch={advanceSearch.current}
              handleDoneReload={() => setRequestReload(false)}
              requestReload={requestReload}></SupplierListGrid>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export {SupplierList}
