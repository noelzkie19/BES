import React, { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react'
import { createDeliveryOrders, deleteDelivery, getDeliveryLineById, getDeliveryLineByNumber } from '../api'
// import { INITIAL_DEL_GRIDSETUP, INITIAL_GRIDSETUP } from '../constant/config-default'
// import { GridSetup } from '../../users/models/user-model'
import { LoadingPanel } from '../../../shared/components/kendo/GridLoading'

// import {
//   Grid,
//   GridColumn as Column,
//   GridCellProps,
//   GridFilterChangeEvent,
//   GridColumnResizeEvent,
// } from '@progress/kendo-react-grid'
//import { filterToObject } from '../../../shared/service/utils'
import { DeliveryDocketModal } from './modal/DeliveryDocket'
import { DeliveryJob, IDeliveryData, IDeliveryReport } from '../models/delivery-model'
// import { transformDeliverySort, trasformDeliveryToSave } from '../transformer/delivery-transformer'
import { trasformDeliveryToSave } from '../transformer/delivery-transformer'
import { CustomAlert, IAlert } from '../../../shared/components/CustomAlert'
//import { DeliveryActionCell } from './actioncell/DeliveryAction'
import { UndoDeliveryModal } from './modal/UndoDelivery'
import { PrintModal } from './modal/PrintModal'
import DeliveryReportPrintDetails from './print/DeliveryReportPrintDetails'
import { useReactToPrint } from 'react-to-print'
import DeliveryDocketPrint from './print/DeliveryDocketPrint'
import { PendingDeliveryList } from './PendingDeliveryList'
import { DeliveredList } from './DeliveredList'
import { ActionEnum, ActionOption } from '../../../../_metronic/partials/widgets/grid/constant/ActionOption';
import { Tab, Tabs } from 'react-bootstrap-v5'
import classes from './ui/DeliveryList.module.css'

const DeliveryList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [selectedData, setSelectedData] = useState<DeliveryJob[]>([])
  const [customAlert, setCustomAlert] = useState<IAlert | undefined>()
  const [updateData, setUpdateData] = useState<IDeliveryData | undefined>()
  const [printData, setPrintData] = useState<IDeliveryData[] | undefined>()
  const [deliveryReport, setDeliveryReport] = useState<IDeliveryReport[]>([])

  const [reloadPendingData, setReloadPendingData] = useState<boolean>(false)

  const componentRefDeliveryReport = useRef<any>()
  const componentRefDeliveryDocket = useRef<any>()

  const [selectedTag, setSelectedTag] = useState<string>('All')
  const [requestRefresh, setRequestRefresh] = useState<boolean>(false)
  const [requestClear, setrequestClear] = useState<boolean>(false)

  const [modalState, dispatchModalState] = useReducer(
    (_state: any, action: any) => {
      if (action.type === 'SHOW' && action.modal === 'docket') {
        let clientIds: Array<number> = [];
        if (selectedData) {
          clientIds = selectedData
            .map(item => item.clientId)
            .filter((clientId, index, arr) => arr.indexOf(clientId) === index);

          selectedData.forEach(item => {
            if (item.quantitySent === undefined) {
              item.quantitySent = 1
            }
          })
        }

        if (clientIds.length < 1) {
          setCustomAlert({
            header: 'Items not selected.',
            message: 'You have not selected any items to deliver.',
            type: 'danger'
          })
          return { docket: false, undo: false, print: false }
        }
        else if (clientIds.length > 1) {
          setCustomAlert({
            header: 'Multiple Customers Selected.',
            message: 'You must limit your selection to one customer with the same delivery address for all jobs.',
            type: 'danger'
          })
          return { docket: false, undo: false, print: false }
        }

        setCustomAlert(undefined)
        return { docket: true, undo: false, print: false }
      }
      if (action.type === 'SHOW' && action.modal === 'undo')
        return { docket: false, undo: true, print: false }

      if (action.type === 'SHOW' && action.modal === 'print')
        return { docket: false, undo: false, print: true }

      return { docket: false, undo: false, print: false }
    },
    { docket: false, undo: false, print: false }
  )

  const [activeKey, setActiveKey] = useState<string | null>('tab1');

  const handleTabSelect = (key: string | null) => {
    setRequestRefresh(true)
    if (key) {
      setActiveKey(key);
    }
    setCustomAlert(undefined)
  }

  const handleDeliveryDocketSend = async (delivery: DeliveryJob[]) => {
    const deliveryReq = trasformDeliveryToSave(delivery)

    const [data, error]: any = await createDeliveryOrders(deliveryReq)
    if (data) {
      setPrintData(data.data)
      setTimeout(() => {
        handleDeliveryDocketPrint()
      }, 100)

      setCustomAlert({
        message: `Delivery Docket ${data.data.deliveryNumber} has been created successful.`,
        header: `Delivery Docket.`,
        type: 'primary',
        closeToaster: closeToasterHandler,
      })
      setSelectedData([])
      setReloadPendingData(true)
    } else {
      setCustomAlert({
        message: error.response.data,
        header: `Delivery Docket.`,
        type: 'danger',
        closeToaster: closeToasterHandler,
      })
    }
    handleModalClose()
  }

  const actionHandler = async (event: any, dataItem: any) => {
    switch (event) {
      case ActionEnum.Undo:
        console.log('Undo...')
        setUpdateData(dataItem)
        dispatchModalState({ type: 'SHOW', modal: 'undo' })
        break;
      case ActionEnum.PrintDelivery:
        console.log('Print Delivery...')
        const [data, error]: any = await getDeliveryLineByNumber(dataItem.deliveryNumber)
        if (data) {
          setPrintData(data.data)
          setTimeout(() => {
            handleDeliveryDocketPrint()
          }, 100)
        }
        break;
    }
  }

  const actionPrintHandler = async (dataItem: any, isEdit: boolean) => {
    if (isEdit) {
    } else {
      console.log('data id - ' + dataItem.id)
      const [data, error]: any = await getDeliveryLineById(dataItem.id)
      if (data) {
        setPrintData(data.data)
        setTimeout(() => {
          handleDeliveryDocketPrint()
        }, 100)
      }
    }
  }

  const handleUndo = async (data: any) => {
    if (data.id === 0) {
      setCustomAlert({
        message: `No available delivery to undo.`,
        header: `Undo Delivery Docket.`,
        type: 'danger',
        closeToaster: closeToasterHandler,
      })
      handleModalClose()
    } else {
      handleModalClose()
      await deleteDelivery(data)
      setCustomAlert({
        message: `Undo Delivery Docket Successfully.`,
        header: `Undo Delivery Docket.`,
        type: 'primary',
        closeToaster: closeToasterHandler,
      })
      setRequestRefresh(true)
    }
  }
  const itemChange = (event: DeliveryJob[]) => {
    setSelectedData(event)
  }

  const closeToasterHandler = () => {
    setCustomAlert(undefined)
  }

  const handleModalClose = () => {
    dispatchModalState({})
  }

  const onPrintHandler = (report: IDeliveryReport[]) => {
    setDeliveryReport(report)
    setTimeout(() => {
      handlePrint()
    }, 100)
  }

  const handlePrint = useReactToPrint({
    pageStyle: `@media print {
      @page {
        size: landscape !important;
      }
    }
    
    @media all {
      .page-break {
        display: none;
      }
    }`,
    content: () => componentRefDeliveryReport.current,
  })

  const handleDeliveryDocketPrint = useReactToPrint({
    pageStyle: `.root {
          margin: 0;
          padding: 0
        }

        @media all {
          .page-break {
            display: none;
          }
        }

        @media print {
          html,
          body {
            height: initial !important;
            overflow: initial !important;
            -webkit-print-color-adjust: exact;
          }
        }

        @media print {
          .page-break {
            margin-top: 20px;
            display: block;
            page-break-after: always;
          }
          .page-notes {
            position: fixed;
            bottom: 10px;
            width: 100%;
            height: 50px;
            font-size: 15px;
          }
          .page-footer {
            position: fixed;
            z-index: 9;
            bottom: 0;
            width: 100%;
            height: 30px;
            font-size: 15px;
            opacity: 0.75;
            page-break-after: always;
          }
        }

        @page {
          size: landscape !important;
        }
    `,
    content: () => componentRefDeliveryDocket.current,
  })

  const onSelectedChange = (event: any) => {
    setSelectedTag(event.target.value)
    setRequestRefresh(true)
  }
  const clear = () => {
    setRequestRefresh(true)
  }

  return (
    <React.Fragment>
      {modalState.docket ? (
        <DeliveryDocketModal
          selectedData={selectedData}
          handleSend={handleDeliveryDocketSend}
          handleClose={handleModalClose}
        />
      ) : null}
      {modalState.print ? (
        <PrintModal
          title={'Delivery Print'}
          toggleDialog={handleModalClose}
          onPrint={onPrintHandler}
        />
      ) : null}
      <div style={{ display: 'none' }}>
        <DeliveryReportPrintDetails refs={componentRefDeliveryReport} printData={deliveryReport} />
        <DeliveryDocketPrint refs={componentRefDeliveryDocket} deliveryData={printData} />
      </div>

      <UndoDeliveryModal
        jobData={updateData}
        show={modalState.undo}
        handleClose={handleModalClose}
        undoCallback={handleUndo}
      />

      <div className='card card-custom'>
        <div className='card-body'>
          <button
            className='btn btn-primary col-auto p-2 mr-auto'
            style={{ marginBottom: '10px' }}
            onClick={() => dispatchModalState({ type: 'SHOW', modal: 'docket' })}
          >
            Create Delivery Docket
          </button>
          <button
            className='btn btn-primary me-auto ms-2'
            style={{ float: 'right', marginRight: '10px' }}
            onClick={clear}
          >
            Clear Filter Selections
          </button>
          <button
            className='btn btn-primary float-right'
            style={{ float: 'right' }}
            onClick={() => dispatchModalState({ type: 'SHOW', modal: 'print' })}
          >
            Print Delivery Docket
          </button>
          <div className='App'>
            {customAlert && <CustomAlert {...customAlert} />}
            {isLoading && LoadingPanel}
            <div className={classes.deliveryList}>
              <Tabs
                id="controlled-tab-example"
                activeKey={activeKey}
                onSelect={handleTabSelect}>
                <Tab eventKey="tab1" title="Pending Deliveries">
                  <div className="mt-2">
                    <PendingDeliveryList handleChangeData={itemChange}
                      requestReload={reloadPendingData}
                      handleDoneReload={(isdone) => setReloadPendingData(isdone)}
                      requestRefresh={requestRefresh}
                      doneRefresh={() => setRequestRefresh(false)}></PendingDeliveryList>
                  </div>
                </Tab>
                <Tab eventKey="tab2" title="Deliveries">
                  <div className="mt-2">
                    <div className={`d-flex flex-row form-check form-check-custom form-check-solid pt-5 pb-5 ps-5 pt-5`} >
                      <input type="radio"
                        value="All"
                        name="all"
                        className='form-check-input'
                        checked={selectedTag == 'All'}
                        onChange={onSelectedChange}
                      /><span className='ms-2'>All</span>
                      <input type="radio"
                        value="noRunTime"
                        name="noRunTime"
                        className='form-check-input ms-5'
                        checked={selectedTag == 'noRunTime'}
                        onChange={onSelectedChange}
                      /> <span className='ms-2'>No Run Time</span>
                    </div>
                    <DeliveredList actionHandler={actionHandler}
                      selectedTag={selectedTag}
                      requestRefresh={requestRefresh}
                      doneRefresh={() => setRequestRefresh(false)}
                    ></DeliveredList>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export { DeliveryList }
