import React, {forwardRef, useCallback, useContext, useEffect, useReducer, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import '@progress/kendo-theme-material/dist/all.css'
import {IEditData, IJobData, IJobReport, ISelectedClientData} from '../models/job-model'
import {CustomAlert, IAlert} from '../../../shared/components/CustomAlert'
import {createJobSubAssembly, getAllResources, getAllUsers, getClientById, getJobOperationByJobid, getJobPurchaseOrder, getJobassembliesByjob, getJobs, updateDuplicateprint} from '../api'
import {JobContext} from '../context/JobContext'
import {JOB_FORM_DEFAULT} from '../constant/job-default'
import {DeleteJobModal} from './modal/DeleteJobModal'
import {useReactToPrint} from 'react-to-print'
import JobReportModal from './modal/JobReportModal'
import JobReportPrintDetails from './toPrint/JobReportPrintDetails'
import { transformDataOperations, transformJobToDelivery } from '../transformers/job-transformer'
import { useAsyncFn, useEffectOnce } from 'react-use'
import { ModuleContext } from '../../../shared/ModuleContext'
import { ActionEnum } from '../../../../_metronic/partials/widgets/grid/constant/ActionOption'
import { DeliveryJob } from '../../deliveries/models/delivery-model'
import { DeliveryDocketModal } from '../../deliveries/components/modal/DeliveryDocket'
import { createDeliveryOrders } from '../../deliveries/api'
import { trasformDeliveryToSave } from '../../deliveries/transformer/delivery-transformer'
import { JobConfirmButton } from './partial/JobConfirmButton'
import { JobSearchComponent } from './partial/JobSearchComponent'
import { JobPrintButton } from './partial/JobPrintButton'
import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from '../../../shared/service/grid-setup-utils'
import { JobListGrid } from './partial/JobListGrid'

const loadingPanel = (
  <div className='k-loading-mask'>
    <span className='k-loading-text'>Loading</span>
    <div className='k-loading-image'></div>
    <div className='k-loading-color'></div>
  </div>
)

const JobList: React.FC = () => {

  const {
    contextToaster,
    setSelectedData,
    setContextResources,
    contextResources,
    setContextUsers, 
    contextUsers
  } = useContext(JobContext)

  const history = useHistory()
  const [deleteData, setDeleteData] = useState<IJobData | undefined>()
  const [toast, setToast] = useState<IAlert | undefined>()
  const [printJobReports, setPrintJobReports] = useState<IJobReport[]>([])
  const {jobTypes, getAllJobTypesAsync } = useContext(ModuleContext)
  const [deliveryData, setDeliveryData] = useState<DeliveryJob[]>([])
  const [selectedJob, setSelectedJob] = useState<IEditData>(JOB_FORM_DEFAULT)
  const [selectedClient, setSelectedClient] = useState<ISelectedClientData>()
  const [selectedTag, setSelectedTag] = useState<string>('All')
  const advanceSearch = useRef('');
  const btnRef = useRef<HTMLInputElement>()
  const btnConfirmJobRef = useRef<HTMLInputElement>()
  const [requestRefresh, setRequestRefresh] = useState<boolean>(false)
  const [requestClear, setRequestClear] = useState<boolean>(false)
  
  const [modalState, dispatchModalState] = useReducer(
    (state: any, action: any) => {
      if (action.type === 'SHOW' && action.modal === 'delete')
        return {delete: true, jobReport: false, delivery: false, confirmJob: false}

      if (action.type === 'SHOW' && action.modal === 'jobReport')
        return {delete: false, jobReport: true, delivery: false, confirmJob: false}

      if (action.type === 'SHOW' && action.modal === 'delivery')
        return {delete: false, jobReport: false, delivery: true, confirmJob: false}

      if (action.type === 'SHOW' && action.modal === 'confirmJob')
        return {delete: false, jobReport: false, delivery: false, confirmJob: true}

      return {delete: false, jobReport: false, delivery: false, confirmJob: false}
    },
    {delete: false, jobReport: false, delivery: false, confirmJob: false}
  )



  const componentRefJobReport = useRef<any>()

  const jobReportPrintHandler = useReactToPrint({
    pageStyle: `@media print {
      @page {
        size: landscape !important;
      }
    }`,
    content: () => componentRefJobReport.current,
  })

  const toggleJobReportHandler = () => {
    dispatchModalState({type: 'SHOW', modal: 'jobReport'})
  }

  useEffectOnce(() => {
    if (jobTypes.length === 0)
      getAllJobTypesAsync()
  })

  useEffectOnce(() => {
    getAllReferences()
  })

  const getAllReferences = async () => {
    if (jobTypes.length === 0) getAllJobTypesAsync()
    if (contextResources.length === 0) {
      const resources: any = await getAllResources()
      setContextResources(resources.data)
    }
    if (contextUsers.length === 0) {
      const users: any = await getAllUsers()
      setContextUsers(users.data)
    }
  }

  useEffect(() => {
    if (contextToaster?.message != null && contextToaster?.message !== '') {
      setToast(contextToaster)
      setTimeout(() => setToast(undefined), 1000)
    }
  }, [contextToaster])

  // const closeModal = () => {
  //   dispatchModalState({})
  // }

  // const deleteHandler = () => {
  //   dispatchModalState({})
  //   setRequestRefresh(true)
  // }

  const jobSubAssemblyHandler = async (jobData: IJobData) => {
    if (jobData && jobData.id > 0) {
      var [data] = await createJobSubAssembly(jobData.id)
      if (data) {
        setToast({
          message: `Job Sub Assembly created successfully.`,
          header: `Job Sub Assembly`,
          type: 'primary',
        })
        setRequestRefresh(true)
        // fetchData()
      } else {
        setToast({
          message: `Something went wrong while Creating Sub Assembly.`,
          header: `Job Sub Assembly`,
          type: 'danger',
        })
      }
    }
  }

  const deliveryHandler = async (job: any) => {
    const delivery = transformJobToDelivery(job) as any
    console.log(delivery)
    setDeliveryData(delivery)
    dispatchModalState({type: 'SHOW', modal: 'delivery'})
  }

  const handleDeliveryDocketSend = async (delivery: DeliveryJob[]) => {
    const deliveryReq = trasformDeliveryToSave(delivery)
    const [data, error]: any = await createDeliveryOrders(deliveryReq)
    if (data) {
      // fetchData()
      setRequestRefresh(true)
      setToast({
        message: `Delivery Docket ${data.data.deliveryNumber} has been created successful.`,
        header: `Delivery Docket.`,
        type: 'primary'
      })
    } else {
      setToast({
        message: error.response.data,
        header: `Delivery Docket.`,
        type: 'danger'
      })
    }
    dispatchModalState({})
  }

  
  const [{loading: fetchingOperation}, getJobDetailsPrintData] = useAsyncFn(async (jobData) => {
    if (jobData && jobData.id > 0) {
      console.log(jobData)
      // Operations
      const [data]: any = await getJobOperationByJobid(jobData.id, null)
      if (!data) return
      const operations = transformDataOperations(data.data)
      // Purchase Order
      const [podata]: any = await getJobPurchaseOrder(
        jobData?.id,
        jobData?.parentJobNumber,
        null
      )
      if (!podata) return
      
      
      // Seed data
      setSelectedJob({...jobData,
        operations: operations,
        purchaseOrder: podata.data
      })
      console.log(jobData)
      setTimeout(() => {
        btnRef.current?.click()
      }, 100)
     
    }
  })

  const afterJobPrintHandler = () => {
    setRequestRefresh(true)
  }


  const actionHandler = (event: any, dataItem: any, dataIndex: number) => {
    
    setSelectedJob(dataItem)
    switch(event.value.value) {
      case ActionEnum.Edit: 
        history.push({
          pathname: '/job/edit',
          search: `?id=${dataItem.id}`,
        })
        break;
      case ActionEnum.Delete: 
        dispatchModalState({type: 'SHOW', modal: 'delete'})
        setDeleteData(dataItem)
        break;
      case ActionEnum.JobCard: 
        getJobDetailsPrintData(dataItem)
        break;
      case ActionEnum.CopyJob: 
        history.push({
          pathname: '/job/new',
          search: `copy=true&jobidsource=${dataItem.id}&action=${ActionEnum.CopyJob}`,
        })
        break;
      case ActionEnum.SubAssembly: 
        jobSubAssemblyHandler(dataItem)
        break;
      case ActionEnum.ConfirmJob:
        history.push({
          pathname: '/job/edit',
          search: `?id=${dataItem.id}&confirm=true`,
        })
        break;
      case ActionEnum.Delivery: 
        deliveryHandler(dataItem)
        break;
      case ActionEnum.View: 
        history.push({
          pathname: '/job/edit',
          search: `?id=${dataItem.id}&view=true`,
        })
        break;
    }
  }

  const onSelectedChange = (event: any) => {
    setSelectedTag(event.target.value)
    setRequestRefresh(true)
  }

  const searchHandler = (result: string) => {
    advanceSearch.current = result;
    // fetchData()
    setRequestRefresh(true)
  }

  const clear = () => {
    advanceSearch.current = '';
    setRequestClear(true)
  }

  return (
    <React.Fragment>
      {modalState.delivery && (
        <DeliveryDocketModal
          selectedData={deliveryData}
          handleSend={handleDeliveryDocketSend}
          handleClose={() => dispatchModalState({})}
        />
      )}
      <div style={{display: 'none'}}>
        <JobPrintButton
          btnRef={btnRef}
          purchaseOrder={selectedJob.purchaseOrder}
          operations={selectedJob.operations}
          jobDetails={selectedJob}
          users={contextUsers}
          resources={contextResources}
          afterJobPrintHandler={afterJobPrintHandler}
        ></JobPrintButton>
      </div>
      <div style={{display: 'none'}}>
        <JobConfirmButton
              jobData={selectedJob}
              purchaseOrder={selectedJob.purchaseOrder}
              isCanEdit={false}
              selectedClient={selectedClient as any}
              setToaster={(toaster) => {
                dispatchModalState({})
                setToast(toaster)
              }}
              btnRef={btnConfirmJobRef}
          > </JobConfirmButton>
      </div>

     
      {modalState.jobReport && (
        <React.Fragment>
          <JobReportModal
            title='Job Report'
            toggleDialog={() => dispatchModalState({})}
            // onPrint={jobReportPrintHandler}
            onPrint={(data) => { 
              setPrintJobReports(data)
              jobReportPrintHandler() 
            }}
          />
          <div style={{display: 'none'}}>
            <JobReportPrintDetails 
              refs={componentRefJobReport} 
              dataItem={printJobReports} 
              jobTypesData={jobTypes} />
          </div>
        </React.Fragment>
      )}
      {/* <DeleteJobModal
        show={modalState.delete}
        handleClose={closeModal}
        jobData={deleteData}
        deleteCallback={deleteHandler}
      /> */}

      <div className='card card-custom'>
        <div className='card-body'>
          <div className='row'>
            <div className='d-flex actions'>
              <button
                className='btn btn-primary col-auto me-auto'
                onClick={() => {
                  setSelectedData(JOB_FORM_DEFAULT)
                  history.push('/job/new')
                }}
              >
                <i className='bi bi-plus-lg'></i> New Job
              </button>

              <button
                type='submit'
                onClick={toggleJobReportHandler}
                className='btn btn-primary col-auto'
                style={{marginRight: '10px'}}
              >
                Print Job Report
              </button>
              <button
                  className='btn btn-primary'
                  onClick={clear}
                >
                  Clear Filter Selections
              </button>
              
            </div>
          </div>

          {toast && <CustomAlert {...toast} />}
          <div className='App'>
          <JobSearchComponent search={searchHandler} shouldClearSearch ={requestClear}></JobSearchComponent>
          <div className={`d-flex flex-row form-check form-check-custom form-check-solid pt-5 pb-5 ps-5 pt-5`} >
              <input type="radio" 
                  value="All" 
                  name="all" 
                  className='form-check-input'
                  checked={selectedTag == 'All'}
                  onChange={onSelectedChange}
                /> <span className='ms-2'>All</span>

              <input type="radio" 
                  value="Pending" 
                  name="pending" 
                  className='form-check-input ms-5'
                  checked={selectedTag == 'Pending'}
                  onChange={onSelectedChange}
                /> <span className='ms-2'>Pending</span>

              <input 
                type="radio" 
                value="Completed" 
                name="completed" 
                className='form-check-input ms-5'
                checked={selectedTag == 'Completed'}
                onChange={onSelectedChange}/> <span className='ms-2'>Completed</span>
          </div>
          <JobListGrid 
            actionHandler={actionHandler} 
            advanceSearch={advanceSearch.current} 
            selectedTag={selectedTag} 
            requestRefresh={requestRefresh}
            doneRefresh={() => setRequestRefresh(false)}
            requestClear={requestClear}
            handleDoneClear={(isdone) => setRequestClear(isdone)}></JobListGrid>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export {JobList}
