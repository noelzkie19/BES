import React, {useReducer, useState, useEffect, useContext, useRef} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {PurchaseOrderContext} from '../context/PurchaseOrderContext'
import {CustomAlert, IAlert} from '../../../shared/components/CustomAlert'

import {DeletePurchaseModal} from './modal/DeletePurchaseModal'
import {ActionEnum} from '../../../../_metronic/partials/widgets/grid/constant/ActionOption'
import {SearchWidget1} from '../../../../_metronic/partials/widgets/search/SearchWidget1'
import {PurchaseOrderGrid} from './partial/PurchaseOrderGrid'
import {ORDER_STATUS} from '../constant/config-default'
import {useEffectOnce} from 'react-use'
import ThreeStateCheckbox, {
  TREE_STATE_STATUS,
} from '../../../../_metronic/partials/content/checkbox/ThreeStateCheckbox'

const PurchaseOrderList: React.FC = () => {
  const savedFilter = localStorage.getItem('filter')
  const savedPrintState = localStorage.getItem('printState')
  const {setSelectedData, contextToaster, selectedData, getSupplierAsync, suppliers} =
    useContext(PurchaseOrderContext)
  const history = useHistory()
  const [requestRefresh, setRequestRefresh] = useState<boolean>(false)
  const [toast, setToast] = useState<IAlert | undefined>()
  const advanceSearch = useRef('')
  const [requestClear, setrequestClear] = useState<boolean>(false)
  const [modalState, dispatchModalState] = useReducer(
    (state: any, action: any) => {
      if (action.type === 'SHOW' && action.modal === 'history')
        return {history: true, reciept: false, delete: false}

      if (action.type === 'SHOW' && action.modal === 'receipt')
        return {history: false, reciept: true, delete: false}

      if (action.type === 'SHOW' && action.modal === 'delete')
        return {history: false, reciept: false, delete: true}

      return {history: false, reciept: false, delete: false}
    },
    {history: false, reciept: false, delete: false}
  )
  const [orderStatus, setOrderStatus] = useState<ORDER_STATUS>(ORDER_STATUS.ALL)
  const [internal, setInternal] = useState<string>(TREE_STATE_STATUS.ALL)

  useEffectOnce(() => {
    if (suppliers.length <= 0) {
      getSupplierAsync()
    }
  })

  const handleStatusChange = (newStatus: ORDER_STATUS) => {
    setOrderStatus(newStatus)
    setRequestRefresh(true)
  }

  useEffect(() => {
    if (contextToaster?.message != null && contextToaster?.message !== '') {
      setToast(contextToaster)
      setTimeout(() => setToast(undefined), 1000)
    }
  }, [contextToaster])

  const handleClose = () => {
    dispatchModalState({})
  }

  const deleteHandler = () => {
    handleClose()
    setRequestRefresh(true)
  }

  const actionHandler = (event: any, dataItem: any, dataIndex: number) => {
    switch (event.value.value) {
      case ActionEnum.Edit:
        history.push({
          pathname: '/purchase-order/edit',
          search: `?id=${dataItem.purchaseNumber}`,
        })
        break
      case ActionEnum.Delete:
        dispatchModalState({type: 'SHOW', modal: 'delete'})
        setSelectedData(dataItem)
        break
    }
  }

  const searchHandler = (result: string) => {
    advanceSearch.current = result
    setRequestRefresh(true)
  }

  const clear = () => {
    advanceSearch.current = ''
    localStorage.removeItem('filter')
    localStorage.removeItem('printState')
    setrequestClear(true)
  }

  const onChange = (event: any) => {
    setInternal(event)
    setRequestRefresh(true)
  }

  return (
    <React.Fragment>
      <DeletePurchaseModal
        purchaseData={selectedData}
        show={modalState.delete}
        handleClose={handleClose}
        deleteCallback={deleteHandler}
      />
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='row justify-content-between align-items-center'>
            <div className='actions d-flex justify-content-between'>
              <button
                className='btn btn-primary col-auto'
                onClick={() => history.push('/purchase-order/new')}
              >
                <i className='bi bi-plus-lg'></i> New Purchase Order
              </button>
              <button className='btn btn-primary' onClick={clear}>
                Clear Filter Selections
              </button>
            </div>
          </div>
          {toast && <CustomAlert {...toast} />}
          <div className='App'>
            <SearchWidget1 search={searchHandler} shouldClearSearch={false}></SearchWidget1>
            <div className='d-flex flex-row mb-4'>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='statusOptions'
                  id='radioAll'
                  value={ORDER_STATUS.ALL}
                  checked={orderStatus === ORDER_STATUS.ALL}
                  onChange={() => handleStatusChange(ORDER_STATUS.ALL)}
                />
                <label className='form-check-label' htmlFor='radioAll'>
                  {ORDER_STATUS.ALL}
                </label>
              </div>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='statusOptions'
                  id='radioOutstanding'
                  value={ORDER_STATUS.OUTSTANDING}
                  checked={orderStatus === ORDER_STATUS.OUTSTANDING}
                  onChange={() => handleStatusChange(ORDER_STATUS.OUTSTANDING)}
                />
                <label className='form-check-label' htmlFor='radioOutstanding'>
                  {ORDER_STATUS.OUTSTANDING}
                </label>
              </div>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='statusOptions'
                  id='radioCompleted'
                  value={ORDER_STATUS.COMPLETED}
                  checked={orderStatus === ORDER_STATUS.COMPLETED}
                  onChange={() => handleStatusChange(ORDER_STATUS.COMPLETED)}
                />
                <label className='form-check-label' htmlFor='radioCompleted'>
                  {ORDER_STATUS.COMPLETED}
                </label>
              </div>
              <div className='form-check form-check-inline'>
                <ThreeStateCheckbox
                  initialState={TREE_STATE_STATUS.ALL}
                  changeHandler={onChange}
                  checkText={'Internal'}
                />
              </div>
            </div>
            <PurchaseOrderGrid
              actionHandler={actionHandler}
              advanceSearch={advanceSearch.current}
              orderStatus={orderStatus}
              internal={internal}
              requestRefresh={requestRefresh}
              doneRequestHandler={() => {
                setRequestRefresh(false)
              }}
              savedFilter={savedFilter ? JSON.parse(savedFilter) : null}
              savedPrintState={savedPrintState ? JSON.parse(savedPrintState) : null}
              requestClear={requestClear}
              doneRequestClearHandler={() => {
                setrequestClear(false)
              }}
            ></PurchaseOrderGrid>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export {PurchaseOrderList}
