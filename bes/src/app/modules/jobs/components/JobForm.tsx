import React, {useContext, useEffect, useState, useRef} from 'react'
import '@progress/kendo-theme-material/dist/all.css'
import {DatePicker} from '@progress/kendo-react-dateinputs'
import {NumericTextBox} from '@progress/kendo-react-inputs'
import {useHistory} from 'react-router-dom'
import './ui/JobForm.scss'
import {useLocation} from 'react-router-dom'

import {
  IEditData,
  IJobDelivery,
  IJobPurchaseData,
  ISelectedClientData,
  Operation,
} from '../models/job-model'
import {yupResolver} from '@hookform/resolvers/yup'
import {jobFormValidationSchema} from '../validators/job-form'
import {Controller, useFieldArray, useForm, useWatch} from 'react-hook-form'
import {JOB_FORM_DEFAULT} from '../constant/job-default'
import {JobContext} from '../context/JobContext'
import Select from 'react-select'
import {
  transformCopyJob,
  transformDataClient,
  transformDataJobType,
  transformDataNotes,
  transformDataOperations,
  transformDelivery,
  transformJobToDelivery,
  transformLoadPurchases,
  transformNCROption,
  transformSaveJobPurchase,
  transformSaveNotes,
  transformSaveOperations,
  transformSavePurchases,
} from '../transformers/job-transformer'
import {
  createJob,
  createJobSubAssembly,
  deleteJob,
  getAllClients,
  getAllResources,
  getAllUsers,
  getClientById,
  getJobOperationByJobid,
  getJobPurchaseOrder,
  getLastJobNumber,
  getNcrs,
  getStockByDrawingRev,
  updateJob,
} from '../api'
import {CustomAlert, IAlert} from '../../../shared/components/CustomAlert'
import {useAsyncFn, useEffectOnce} from 'react-use'
import {LoadingPanel} from '../../../shared/components/kendo/GridLoading'
import PrintJobDetails from './toPrint/PrintJobDetails'
import {DeliveryJob, IDeliveryData} from '../../deliveries/models/delivery-model'
import {DeliveryDocketModal} from '../../deliveries/components/modal/DeliveryDocket'
import {trasformDeliveryToSave} from '../../deliveries/transformer/delivery-transformer'
import {createDeliveryOrders} from '../../deliveries/api'
import DeliveryDocketPrint from '../../deliveries/components/print/DeliveryDocketPrint'
import {OperationComponent} from './partial/OperationComponent'
import {ModuleContext} from '../../../shared/ModuleContext'
import {JobPrintButton} from './partial/JobPrintButton'
import {PurchaseOrderComponent} from './partial/PurchaseOrderComponent'
import {JobConfirmButton} from './partial/JobConfirmButton'
import {NcrNumberDropdown} from './partial/NcrNumberDropdown'
import {AddressNotification} from '../../../shared/components/notification/AddressNotification'
import {JobDeliveryDocketPrint} from './partial/JobDeliveryDocketPrint'
import {usePageData} from '../../../../_metronic/layout/core/PageData'
import {Modal1} from '../../../../_metronic/partials/modals/Modal1'
import {stringToDateFormat} from '../../../shared/service/utils'
import {getSuppliers} from '../../purchase-orders/api'
import {CopyJobModal} from './modal/CopyJobModal'
import {NewOperationComponent} from './partial/NewOperationComponent'
import {DeleteButton} from '../../../../_metronic/partials/content/button/action/DeleteButton'

interface IProps {
  jobData?: IEditData | null
  isCanEdit: boolean
}

const JobForm: React.FC<IProps> = ({jobData, isCanEdit}) => {
  const history = useHistory()
  const {currentUser} = usePageData()
  const {setSelectedData, contextResources, contextUsers} = useContext(JobContext)
  const {jobTypes, getAllJobTypesAsync} = useContext(ModuleContext)

  const [selectedClient, setSelectedClient] = useState<ISelectedClientData>()
  const [createCopy, setCreateCopy] = React.useState<boolean>(false)
  const [customAlert, setCustomAlert] = useState<IAlert | undefined>()
  const [showDeliveryModal, setShowDeliveryModal] = React.useState<boolean>(false)
  const [showDeliveryPrintModal, setShowDeliveryPrintModal] = React.useState<boolean>(false)

  const [purchaseOrder, setPurchaseOrder] = useState<IJobPurchaseData[]>([])
  const [printData, setPrintData] = useState<IDeliveryData[] | undefined>()
  const [clients, setClients] = useState<[]>([])
  const [resources, setResources] = useState<[]>([])
  const [ncrNumbers, setNcrNumbers] = useState<[]>([])
  const [users, setUsers] = useState<[]>([])
  const [deliveryData, setDeliveryData] = useState<DeliveryJob[]>([])
  const [jobDeliveries, setJobDeliveries] = useState<IJobDelivery[]>([])
  const [origJobData, setOrigJobData] = useState<IEditData>(JOB_FORM_DEFAULT)
  const [origJobOperation, setOrigJobOperation] = useState<Operation[]>([])
  const [isResetModal, setIsResetModal] = useState<boolean>(false)
  const [isShowCopyModal, setIsShowCopyModal] = useState<boolean>(false)
  const [isJobComplete, setIsJobComplete] = useState<boolean>(false)
  const [isNewPo, setIsNewPo] = useState<boolean>(false)
  const [suppliers, setSuppliers] = useState<[]>([])

  const [isSaving, setIsSaving] = useState<boolean>(false)
  const componentRefDeliveryDocket = useRef<any>()
  const componentRefJobDetails = useRef<any>()

  const [deliveryNumber, setDeliveryNumber] = useState<string>('')

  //gamit to para sa copy job. Para 1Q2 1gawing indicator na new instance naglagay ako query string param
  const search = useLocation().search
  const copy: string | null = new URLSearchParams(search).get('copy')
  const jobidsource: string | null = new URLSearchParams(search).get('jobidsource')
  const [isAuthorizeCopyJob, setIsAuthorizeCopyJob] = useState<boolean>(false)

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: jobData || JOB_FORM_DEFAULT,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(jobFormValidationSchema),
  })

  const {
    fields: operations,
    insert: addOperation,
    remove: removeOperation,
    update: updateOperation,
    replace: replaceOperations,
  } = useFieldArray({
    control,
    name: 'operations',
    keyName: 'keyIdx',
  })

  // const {
  //   fields: jobNotes,
  //   insert: addJobNotes,
  //   remove: removeJobNotes,
  //   update: updateJobNotes,
  // } = useFieldArray({
  //   control,
  //   name: 'jobNotes',
  //   keyName: 'keyIdx',
  // })
  const cliendIdValue = useWatch({
    control,
    name: 'clientId',
  })

  const salePerUnitValue = useWatch({
    control,
    name: 'salePerUnit',
  })
  const deliveryChargeValue = useWatch({
    control,
    name: 'deliveryCharge',
  })
  const salePriceValue = useWatch({
    control,
    name: 'salesPrice',
  })

  const materialCostValue = useWatch({
    control,
    name: 'materialCost',
  })
  const materialCostVarValue = useWatch({
    control,
    name: 'materialCostVariable',
  })

  const labourCostValue = useWatch({
    control,
    name: 'labourCost',
  })
  const otherCostValue = useWatch({
    control,
    name: 'otherCost',
  })
  const totalPriceValue = useWatch({
    control,
    name: 'totalPrice',
  })

  const quantityValue = useWatch({
    control,
    name: 'quantity',
  })
  const toBeInvoiced = useWatch({
    control,
    name: 'toBeInvoiced',
  })

  const totalCostValue = useWatch({
    control,
    name: 'totalCost',
  })

  const laborCostRateValue = useWatch({
    control,
    name: 'labourCostRate',
  })

  const deliveredValue = useWatch({
    control,
    name: 'delivered',
  })

  const [jobDetails, setJobDetails] = useState(jobData)

  const handleJobDetailsChange = (newJobDetails: any) => {
    setJobDetails(newJobDetails)
  }

  // Computed Fields
  // **
  // MATERIAL COST
  // **
  useEffect(() => {
    const total = purchaseOrder.reduce(
      (sum: any, current: any) => sum + current.quantity * current.costEach,
      0
    )
    const materialPercent = (materialCostVarValue / 100) * total
    const totalMaterial = materialPercent + total
    setValue('materialCost', totalMaterial)
  }, [purchaseOrder, materialCostVarValue, setValue])
  // **
  // SALE PRICE
  // **
  useEffect(() => {
    setValue('salesPrice', (isNaN(salePerUnitValue) ? 0 : salePerUnitValue) * quantityValue)
  }, [quantityValue, salePerUnitValue, setValue])
  // **
  // TOTAL PRICE
  // **
  useEffect(() => {
    setValue('totalPrice', salePriceValue + deliveryChargeValue)
  }, [salePriceValue, setValue, deliveryChargeValue])
  // **
  // SALES UNIT PRICE
  // **
  useEffect(() => {
    const pricePerunit = quantityValue > 0 ? salePriceValue / quantityValue : 0
    setValue('salePerUnit', pricePerunit)
  }, [salePriceValue, setValue])

  // **
  // SALES PRICE
  // **
  useEffect(() => {
    const salePrices = totalPriceValue - deliveryChargeValue
    setValue('salesPrice', salePrices)
  }, [totalPriceValue, setValue])
  // **
  // LABOR COST
  // **
  useEffect(() => {
    const labourCost = operations.reduce(
      (sum: any, current: any) =>
        sum + (current.expectedProcessTime || 0) * (current.resourceId ? current.hourlyRate : 0),
      0
    )
    setValue('labourCost', labourCost, {shouldDirty: true})
  }, [operations, setValue])
  // **
  // TOTAL COST
  // **
  useEffect(() => {
    setValue(
      'totalCost',
      materialCostValue + labourCostValue * (laborCostRateValue || 0) + otherCostValue
    )
  }, [
    labourCostValue,
    otherCostValue,
    totalPriceValue,
    materialCostValue,
    laborCostRateValue,
    setValue,
  ])

  // **
  // OTHER COST
  // **
  useEffect(() => {
    const otherCost =
      totalCostValue - (labourCostValue * (laborCostRateValue || 0) + materialCostValue)
    setValue('otherCost', otherCost)
  }, [totalCostValue, setValue])

  // End Computed Fields

  useEffectOnce(() => {
    if (copy === 'true') {
      setCreateCopy(true)
    } else {
      setCreateCopy(false)
    }
    getAllReferences()
  })

  useEffect(() => {
    setIsJobComplete(deliveredValue)
  }, [deliveredValue])

  useEffect(() => {
    getLastJobNumber()
      .then((response) => {
        if (!jobData) {
          setValue('jobNumber', response.data)
          setValue('jobId', response.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [jobData, setValue])

  useEffect(() => {
    if (createCopy) {
      getLastJobNumber()
        .then((response) => {
          if (jobData && jobData?.id <= 0) {
            setValue('jobNumber', response.data)
            setValue('jobId', response.data)
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }
  }, [createCopy])

  const [stockQty, setStockQty] = useState<number>(0)
  const onBlurRevDrawingHandler = () => {
    const {drawingNumber, revisionNumber, id} = getValues()
    if (revisionNumber != '' && drawingNumber != '') {
      getStockByDrawingRev(drawingNumber, revisionNumber, id).then((res) => {
        if (Object.keys(res.data).length > 0) {
          setStockQty(res.data.quantity)
        } else {
          setStockQty(0)
        }
      })
    }
  }

  const getAllReferences = async () => {
    if (jobTypes.length === 0) getAllJobTypesAsync()
    if (contextResources && contextResources.length > 0) {
      setResources(contextResources)
    } else {
      const resources: any = await getAllResources()
      setResources(resources.data)
    }
    if (contextUsers && contextUsers.length > 0) {
      setUsers(contextUsers)
    } else {
      const users: any = await getAllUsers()
      setUsers(users.data)
    }

    if (copy == 'true') {
      const suppliers: any = await getSuppliers()
      setSuppliers(suppliers.data)
    }
    const clients: any = await getAllClients()
    const ncrs: any = await getNcrs()
    setClients(clients.data)
    setNcrNumbers(ncrs.data)
  }

  const onSubmit = async (values: IEditData) => {
    let payload: IEditData = values

    if (createCopy && !isAuthorizeCopyJob) {
      setIsShowCopyModal(true)
      return
    }

    payload.operations = transformSaveOperations(values.operations)
    payload.jobNotes = transformSaveNotes(values.jobNotes)
    payload = {
      ...payload,
      dueDateDateSave: values.dueDate?.toLocaleString(),
      purchaseOrder: transformSaveJobPurchase(purchaseOrder),
    }
    if (createCopy) {
      payload.copyPurchasesId = transformSavePurchases(purchaseOrder.filter((x) => x.isSelected))
    }

    // let invalidResources = [];
    // if(payload.operations && payload.operations.length > 0){
    //   for (let i = 0; i < payload.operations.length; i++){
    //     if (payload.operations[i].resource < 1) {
    //       invalidResources.push(payload.operations[i].resource);
    //     }
    //   }
    // }

    // if(invalidResources.length > 0){
    //   setCustomAlert({
    //     message: 'Resource not found.',
    //     header: `Error saving Job`,
    //     type: 'danger',
    //   })
    //   return
    // }

    setIsSaving(true)
    if (values.id === 0) {
      createJob({...payload, copy: createCopy, jobidsource})
        .then((response: any) => {
          setIsSaving(false)
          if (isNewPo) {
            history.push({
              pathname: '/purchase-order/new',
              search: `?sourceJobId=${response}`,
            })
          } else {
            history.push({
              pathname: '/job/edit',
              search: `?id=${response}`,
            })
          }
        })
        .catch((err) => {
          setCustomAlert({
            message: err.response.data ? err.response.data.title : 'Error saving',
            header: `Error saving Job`,
            type: 'danger',
          })
          setIsSaving(false)
        })
    } else {
      updateJob(payload)
        .then(() => {
          setCustomAlert({
            message: `Job edited successfully.`,
            header: `Job Edit`,
            type: 'primary',
          })
          setIsSaving(false)
          // TODO: Refresh the Job Card
          if (isNewPo) {
            history.push({
              pathname: '/purchase-order/new',
              search: `?sourceJobId=${jobData?.id}`,
            })
          } else {
            handleJobDetailsChange(payload)
          }
        })
        .catch((err) => {
          setCustomAlert({
            message: err.response.data ? err.response.data.title : 'Error saving',
            header: `Error Edit Job`,
            type: 'danger',
          })
          setIsSaving(false)
        })
    }
  }
  const onReset = () => {
    reset({...origJobData})
    setValue('operations', origJobOperation)
    setIsResetModal(false)
  }

  useEffect(() => {
    if (cliendIdValue) {
      setClientDetails(cliendIdValue)
    }
  }, [cliendIdValue, clients, setValue])

  const setClientDetails = async (clientId: number) => {
    const [data]: any = await getClientById(clientId)
    if (!data) return
    setSelectedClient(data.data)
  }

  const [{loading: fetchingOrder}, getPurchaseData] = useAsyncFn(async () => {
    const [data]: any = await getJobPurchaseOrder(
      jobData?.id,
      jobData?.parentJobNumber,
      jobidsource
    )
    if (!data) return
    setPurchaseOrder(transformLoadPurchases(data.data, copy == 'true'))
  })

  const [{loading: fetchingOperation}, getJobOperation] = useAsyncFn(async () => {
    if (jobData) {
      const [data]: any = await getJobOperationByJobid(jobData.id, jobidsource)
      if (!data) return
      jobData.operations = transformDataOperations(data.data)
      setOrigJobOperation(jobData.operations)
      setValue('operations', jobData.operations)
    }
  })

  useEffect(() => {
    if (jobData) {
      getPurchaseData()
      getJobOperation()
      jobData.jobNotes = transformDataNotes(jobData.jobNotes)
      setJobDeliveries(jobData.jobDeliveries)
      if (jobData.id > 0) {
        setOrigJobData({...jobData})
      }
      reset({
        ...jobData,
      })
      setStockQty(jobData.stockQty || 0)
    } else {
      reset(JOB_FORM_DEFAULT)
      setStockQty(0)
    }
    setCustomAlert(undefined)
  }, [jobData, reset, setCustomAlert, getPurchaseData, getJobOperation])

  const afterJobPrintHandler = () => {
    setValue('jobDatePrinted', new Date())
  }

  const copyJobCard = () => {
    const copyData = transformCopyJob(getValues())
    setSelectedData(copyData)
    history.push({
      pathname: '/job/new',
      search: `?copy=true&jobidsource=${jobData?.id}`,
    })
    setCreateCopy(true)
  }

  const jobSubAssemblyHandler = async () => {
    if (jobData && jobData.id > 0) {
      var [data]: any = await createJobSubAssembly(jobData.id)
      // console.log(data)
      history.push({
        pathname: '/job/edit',
        search: `?id=${data.data}`,
      })
      window.location.reload()
    }
  }

  // -------- Delivery Details ---------//
  const deliveryHandler = async () => {
    const delivery = transformJobToDelivery(getValues()) as any
    setDeliveryData(delivery)
    setShowDeliveryModal(true)
  }

  const handleDeliveryDocketSend = async (delivery: DeliveryJob[]) => {
    const deliveryReq = trasformDeliveryToSave(delivery)
    const [data, error]: any = await createDeliveryOrders(deliveryReq)
    if (data) {
      const currentUserName = `${currentUser.firstName} ${currentUser.lastName}`
      const newDeliver = transformDelivery(data.data.jobDeliveryLines[0], currentUserName)
      const prevQty = getValues('quantityDelivered')
      const qty = getValues('quantity')
      const qtyDelivered = prevQty + data.data.jobDeliveryLines[0].quantitySent
      if (qty === qtyDelivered) {
        setValue('delivered', true)
      }
      setValue('quantityDelivered', qtyDelivered)

      //setValue('deliveryDate', new Date())
      setPrintData(data.data)
      setShowDeliveryPrintModal(true)
      setCustomAlert({
        message: `Delivery Docket ${data.data.deliveryNumber} has been created successful.`,
        header: `Delivery Docket.`,
        type: 'primary',
      })
      const datad = [...jobDeliveries, ...[newDeliver]]
      setJobDeliveries(datad)
    } else {
      setCustomAlert({
        message: error.response.data,
        header: `Delivery Docket.`,
        type: 'danger',
      })
    }
    setShowDeliveryModal(false)
  }

  const operationChangeHandler = (operation: any) => {
    setValue('operations', operation)
  }

  const setPurchaseOrderHandler = (purchaseOrders: IJobPurchaseData[]) => {
    setPurchaseOrder([...purchaseOrders])
  }

  const hasClient = () => {
    if (selectedClient) {
      if (
        selectedClient.postCode === null &&
        selectedClient.street === null &&
        selectedClient.state === null &&
        selectedClient.street === null
      ) {
        return false
      } else return true
    } else if (selectedClient === undefined) return true
    // must not display if undefined
    else return false
  }

  const authorizeCopyJob = (purchaseOrders: IJobPurchaseData[]) => {
    setIsShowCopyModal(false)
    setIsAuthorizeCopyJob(true)
    setPurchaseOrder([...purchaseOrders])
  }

  useEffect(() => {
    if (isAuthorizeCopyJob) {
      onSubmit(getValues())
    }
  }, [isAuthorizeCopyJob])

  useEffect(() => {
    if (jobDeliveries && jobDeliveries.length > 0) {
      jobDeliveries.sort((a, b) => b.id - a.id)
      let x = jobDeliveries[0].deliveryNumber.toString()
      setDeliveryNumber(x)
    }
  }, [jobDeliveries])

  const addPurchaseOrder = () => {
    setIsNewPo(true)
  }
  useEffect(() => {
    if (isNewPo) {
      onSubmit(getValues())
    }
  }, [isNewPo])

  const goToPurchaseOrder = (purchaseOrderId: number) => {
    history.push({
      pathname: '/purchase-order/edit',
      search: `?id=${purchaseOrderId}&sourceJobId=${jobData?.id}`,
    })
  }
  const goToParentJob = () => {
    history.push({
      pathname: '/job/edit',
      search: `?id=${jobData?.parentJobNumber}`,
    })
    window.location.reload()
  }
  return (
    <React.Fragment>
      {isShowCopyModal && (
        <CopyJobModal
          proceedConfirm={authorizeCopyJob}
          suppliers={suppliers}
          jobData={jobData}
          handleClose={() => setIsShowCopyModal(false)}
          purchaseOrder={purchaseOrder}
        ></CopyJobModal>
      )}

      <Modal1
        show={isResetModal}
        title={`Refresh Job Form`}
        message={'This will delete unsaved changes, Continue?'}
        handleClose={() => setIsResetModal(false)}
        proceed={onReset}
      />
      {showDeliveryModal ? (
        <DeliveryDocketModal
          selectedData={deliveryData}
          handleSend={handleDeliveryDocketSend}
          handleClose={() => setShowDeliveryModal(false)}
        />
      ) : null}
      {showDeliveryPrintModal && (
        <JobDeliveryDocketPrint
          printData={printData}
          isSendDocket={showDeliveryModal}
          setShowDeliveryPrintModal={setShowDeliveryPrintModal}
        ></JobDeliveryDocketPrint>
      )}
      <div style={{display: 'none'}}>
        <DeliveryDocketPrint refs={componentRefDeliveryDocket} deliveryData={printData} />
      </div>

      {customAlert && <CustomAlert {...customAlert} />}
      <div style={{display: 'none'}}>
        <PrintJobDetails
          refs={componentRefJobDetails}
          purchaseOrder={purchaseOrder}
          operations={operations}
          jobDetails={jobData}
          users={users}
          resources={resources}
        />
      </div>
      {!hasClient() && <AddressNotification></AddressNotification>}
      <div className='job-container h-100'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          name='job'
          className='h-100 d-flex flex-column justify-content-evenly'
        >
          <div className='job-detail-section'>
            <div className='row job-information-container'>
              <h4>
                Job Information
                {jobData?.parentJobNumber && (
                  <a className='sub-assembly-parent' onClick={goToParentJob}>
                    View Parent Job
                  </a>
                )}
              </h4>

              <div className='col-12 col-lg-2 col-md-12 order-3'>
                <div className='row action-container'>
                  {isCanEdit && (
                    <React.Fragment>
                      {(jobData?.id || 0) > 0 && (
                        <React.Fragment>
                          <div className='col-lg-6 col-12'>
                            <JobPrintButton
                              refs={componentRefJobDetails}
                              purchaseOrder={purchaseOrder}
                              operations={operations}
                              jobDetails={jobDetails}
                              users={users}
                              resources={resources}
                              afterJobPrintHandler={afterJobPrintHandler}
                            ></JobPrintButton>
                          </div>
                          <div className='col-lg-6 col-12'>
                            <button
                              type='button'
                              className='btn btn-primary col-auto me-5 btn-action'
                              onClick={copyJobCard}
                              tabIndex={24}
                              disabled={!isCanEdit || isJobComplete}
                            >
                              Copy Job
                            </button>
                          </div>
                          <div className='col-lg-6 col-12'>
                            <button
                              type='button'
                              className='btn btn-primary col-auto me-5 btn-action'
                              disabled={
                                !isCanEdit ||
                                isJobComplete ||
                                createCopy ||
                                jobData?.parentJobNumber !== null
                              }
                              onClick={(e) => {
                                e.preventDefault()
                                jobSubAssemblyHandler()
                              }}
                              tabIndex={21}
                            >
                              Sub Assembly
                            </button>
                          </div>
                          <div className='col-lg-6 col-12'>
                            {(jobData?.id || 0) > 0 && (
                              <button
                                className='btn btn-primary col-auto me-auto btn-action'
                                type='button'
                                disabled={!isCanEdit || isJobComplete}
                                onClick={() => deliveryHandler()}
                                tabIndex={25}
                              >
                                Deliver Job
                              </button>
                            )}
                          </div>
                          <div className='col-lg-6 col-12'>
                            <JobConfirmButton
                              jobData={getValues()}
                              purchaseOrder={purchaseOrder}
                              isCanEdit={isCanEdit && !isJobComplete}
                              selectedClient={selectedClient as any}
                              setToaster={setCustomAlert}
                            />
                          </div>
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}
                  <div className='col-lg-6 col-12'>
                    <button
                      type='button'
                      className='btn btn-outline-primary col-auto me-5  btn-action'
                      tabIndex={26}
                      onClick={() => {
                        history.push('/job/list')
                      }}
                    >
                      Back
                    </button>
                  </div>
                  {isCanEdit && (
                    <div className='col-lg-6 col-12'>
                      <button
                        type='submit'
                        className='btn btn-primary col-auto  btn-action save-refresh-delete'
                        disabled={isSaving}
                      >
                        Save
                      </button>
                    </div>
                  )}
                  {(jobData?.id || 0) > 0 && (
                    <React.Fragment>
                      <div className='col-lg-6 col-12'>
                        <DeleteButton
                          title={`Delete Job ${jobData?.jobId}`}
                          modalMessage={
                            'Deleting the Job will remove it from the system. Continue?'
                          }
                          disabled={isJobComplete}
                          className='save-refresh-delete'
                          deleteHandler={() => {
                            if (jobData) {
                              deleteJob(jobData).then(() => {
                                history.push('/job/list')
                              })
                            }
                          }}
                        ></DeleteButton>
                      </div>
                      <div className='col-lg-6 col-12'>
                        <button
                          type='button'
                          className='btn btn-primary col-auto  btn-action save-refresh-delete'
                          onClick={() => setIsResetModal(true)}
                          disabled={isSaving}
                          tabIndex={23}
                        >
                          Refresh
                        </button>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
              <div className='col-12 col-lg-5 col-md-12 order-1'>
                <table className='form-table' style={{width: '100%'}}>
                  <tbody>
                    <tr>
                      <th className='form-table-label'></th>
                      <th></th>
                      <th className='form-table-label'></th>
                      <th></th>
                    </tr>
                    <tr>
                      <td>
                        <label className='form-label' htmlFor='id'>
                          Job No.
                        </label>
                      </td>
                      <td>
                        <input
                          type='text'
                          className={`form-control${errors.jobId ? ' border-danger' : ''}`}
                          {...register('jobId')}
                          tabIndex={1}
                          disabled
                        />
                      </td>
                      <td colSpan={2} className='text-center'>
                        <span
                          className={`job-status ${isJobComplete ? 'text-success' : 'text-danger'}`}
                        >
                          {isJobComplete ? 'Completed' : 'Incomplete'}
                        </span>
                      </td>
                      {/* <td colSpan={2} className='text-center'>
                        <label className='checkbox mt-3'>
                          <input type='checkbox' className='me-4' tabIndex={8}/>
                          <span>Create Sub Cards</span>
                        </label>
                      </td>  */}
                    </tr>
                    <tr>
                      <td>
                        <label className='form-label' htmlFor='client'>
                          Client Name
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='clientId'
                          render={({field: {value, name, onChange}}) => {
                            return (
                              <Select
                                options={transformDataClient(clients)}
                                onChange={(event: any) => onChange(event.value)}
                                className={`controllerSelect${
                                  errors.clientId ? ' border-danger' : ''
                                }`}
                                name={name}
                                value={transformDataClient(clients).find(
                                  (cl: any) => cl.value === value
                                )}
                                isDisabled={!isCanEdit || createCopy || isJobComplete}
                                tabIndex={2}
                                autoFocus
                              ></Select>
                            )
                          }}
                        />
                      </td>
                      <td>
                        <label className='form-label ms-4' htmlFor='quoteId'>
                          Quote Id
                        </label>
                      </td>
                      <td>
                        <input
                          type='text'
                          className={`form-control${errors.jobId ? ' border-danger' : ''}`}
                          {...register('quoteNumberSource')}
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className='form-label' htmlFor='description'>
                          Job Description
                        </label>
                      </td>
                      <td colSpan={3}>
                        <input
                          type='text'
                          className={`form-control${errors.description ? ' border-danger' : ''}`}
                          disabled={!isCanEdit || isJobComplete}
                          {...register('description')}
                          tabIndex={3}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className='form-label' htmlFor='drawingNumber'>
                          Drawing
                        </label>
                      </td>
                      <td>
                        <input
                          type='text'
                          className={`form-control${errors.drawingNumber ? ' border-danger' : ''}`}
                          disabled={!isCanEdit || isJobComplete}
                          {...register('drawingNumber', {
                            onBlur: onBlurRevDrawingHandler,
                          })}
                          tabIndex={4}
                        />
                      </td>
                      <td>
                        <label className='form-label ms-4' htmlFor='revisionNumber'>
                          Revision
                        </label>
                      </td>
                      <td>
                        <input
                          type='text'
                          className={`form-control${errors.revisionNumber ? ' border-danger' : ''}`}
                          disabled={!isCanEdit || isJobComplete}
                          tabIndex={6}
                          {...register('revisionNumber', {
                            onBlur: onBlurRevDrawingHandler,
                          })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className='form-label' htmlFor='quantityDelivered'>
                          Sent Qty
                        </label>
                      </td>
                      <td>
                        <input
                          type='text'
                          className={`form-control${errors.quantity ? ' border-danger' : ''}`}
                          disabled
                          {...register('quantityDelivered')}
                          tabIndex={6}
                        />
                        {/* <ErrorMessage errors={errors} name='quantityDelivered' as={<span className='spanError' />} /> */}
                      </td>

                      <td>
                        <label className='form-label ms-4' htmlFor='quantity'>
                          Qty ({stockQty || 0} in stock)
                        </label>
                      </td>
                      <td>
                        <input
                          type='text'
                          className={`form-control${errors.quantity ? ' border-danger' : ''}`}
                          disabled={!isCanEdit || isJobComplete}
                          {...register('quantity')}
                          tabIndex={7}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className='form-label' htmlFor='orderNumber'>
                          {/* Order No. */}
                          Client Order No.
                        </label>
                      </td>
                      <td>
                        <input
                          type='text'
                          className={`form-control${errors.orderNumber ? ' border-danger' : ''}`}
                          disabled={!isCanEdit || createCopy || isJobComplete}
                          tabIndex={5}
                          {...register('orderNumber')}
                        />
                      </td>
                      <td>
                        <span className='ms-4'>
                          <label className='form-label' htmlFor='setupText'>
                            30 Days
                          </label>
                        </span>
                      </td>
                      <td>
                        <input
                          type='checkbox'
                          className='me-4'
                          {...register('is30Days')}
                          tabIndex={16}
                          disabled={isJobComplete}
                        />
                      </td>
                      {/* <td>
                        <label className='form-label ms-4' htmlFor='completedBy'>
                          Job Status
                        </label>
                      </td>
                      <td>
                        <input
                          type='text'
                          className={`form-control${errors.completedBy ? ' border-danger' : ''}`}
                          disabled
                          {...register('completedBy')}
                          value={completedBy}
                          tabIndex={10}
                        />
                      </td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='col-12 col-lg-5 col-md-12 order-2 '>
                <table className='form-table' style={{width: '100%'}}>
                  <tbody>
                    <tr>
                      <th className='form-table-label'></th>
                      <th></th>
                      <th className='form-table-label'></th>
                      <th></th>
                    </tr>
                    <tr>
                      <td>
                        <label className='form-label' htmlFor='startDate'>
                          Start Date
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='startDate'
                          render={({field: {value, name, onChange}}) => {
                            return (
                              <DatePicker
                                format='dd/MM/yyyy'
                                name={name}
                                onChange={onChange}
                                value={value ? new Date(value || '') : null}
                                disabled={!isCanEdit || isJobComplete}
                                tabIndex={11}
                              />
                            )
                          }}
                        />
                      </td>
                      <td>
                        <label className='checkbox mt-3 ms-4'>
                          <label className='form-label' htmlFor='dueDate'>
                            Due Date
                          </label>
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='dueDate'
                          render={({field: {value, name, onChange}}) => {
                            return (
                              <DatePicker
                                format='dd/MM/yyyy'
                                name={name}
                                onChange={(e: any) => {
                                  let dateResult = null

                                  if (e.target.value) {
                                    var date = new Intl.DateTimeFormat('en-AU').format(
                                      e.target.value
                                    )
                                    var newDate = stringToDateFormat(date)
                                    onChange(newDate)
                                  } else {
                                    onChange(null)
                                  }
                                }}
                                value={value ? new Date(value || '') : null}
                                disabled={!isCanEdit || isJobComplete}
                                tabIndex={18}
                              />
                            )
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className='form-label' htmlFor='enter'>
                          Entered by
                        </label>
                      </td>
                      <td>
                        <input
                          type='text'
                          disabled={true}
                          className={`form-control`}
                          readOnly
                          {...register('createdByName')}
                          tabIndex={12}
                        />
                      </td>
                      <td>
                        <label className='form-label ms-4' htmlFor='deliveryDate'>
                          Delivered on
                        </label>
                      </td>
                      <td>
                        <input
                          type='text'
                          className='form-control'
                          disabled
                          value={deliveryNumber}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className='form-label' htmlFor=''>
                          Card Printed
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='jobDatePrinted'
                          render={({field: {value, name, onChange}}) => {
                            let date = value ? new Date(value || '') : null
                            if (date && date.getFullYear() < 1900) {
                              date = null
                            }
                            return (
                              <DatePicker
                                format='dd/MM/yyyy'
                                name={name}
                                onChange={onChange}
                                value={date}
                                disabled
                                tabIndex={13}
                              />
                            )
                          }}
                        />
                      </td>
                      <td>
                        <label className='form-label ms-4' htmlFor='setupText'>
                          <span>NCR No.</span>
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='ncrNumber'
                          render={({field: {value, onChange}}) => {
                            return (
                              <NcrNumberDropdown
                                value={value}
                                onChangeHandler={(data) => {
                                  onChange(data.target.value.text)
                                }}
                                isDisabled={!isCanEdit || isJobComplete}
                                optionData={transformNCROption(ncrNumbers)}
                                tabIndex={18}
                              ></NcrNumberDropdown>
                            )
                          }}
                        />
                        {/* <ErrorMessage errors={errors} name='ncrNumber' as={<span className='spanError' />} /> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className='form-label' htmlFor='setupText'>
                          Setup Text
                        </label>
                      </td>
                      <td>
                        <input
                          type='text'
                          className={`form-control${errors.setupText ? ' border-danger' : ''}`}
                          disabled={!isCanEdit || isJobComplete}
                          {...register('setupText')}
                          tabIndex={14}
                        />
                      </td>
                      <td>
                        <label className='form-label ms-4' htmlFor='jobTypeId'>
                          Job Type
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='jobTypeId'
                          render={({field: {value, name, onChange}}) => {
                            return (
                              <Select
                                options={transformDataJobType(jobTypes)}
                                onChange={(event: any) => onChange(event.value)}
                                className={`controllerSelect${
                                  errors.jobTypeId ? ' border-danger' : ''
                                }`}
                                name={name}
                                value={transformDataJobType(jobTypes).find(
                                  (cl: any) => cl.value === value
                                )}
                                isDisabled={!isCanEdit || isJobComplete}
                                tabIndex={19}
                              ></Select>
                            )
                          }}
                        />
                      </td>
                    </tr>
                    <tr style={{height: '15px'}}></tr>
                    <tr>
                      <td>
                        <span>
                          <label className='form-label' htmlFor='setupText'>
                            COD
                          </label>
                        </span>
                      </td>
                      <td>
                        <input
                          type='checkbox'
                          className='me-4'
                          {...register('isCod')}
                          tabIndex={15}
                          disabled={isJobComplete}
                        />
                      </td>

                      <td>
                        <span className='ms-4'>
                          <label className='form-label' htmlFor='setupText'>
                            Over runs
                          </label>
                        </span>
                      </td>
                      <td>
                        <div className='d-flex'>
                          <div className='p-2 w-30'>
                            <input
                              type='checkbox'
                              className='me-4'
                              {...register('isOverruns')}
                              tabIndex={16}
                              disabled={isJobComplete}
                            />
                          </div>
                          <div className='p-2 w-100'>
                            <span>
                              <label className='form-label' htmlFor='setupText'>
                                Qty Authorised Overruns
                              </label>
                            </span>
                          </div>
                          <div className='p-2 flex-shrink-1'>
                            <Controller
                              control={control}
                              name='qtyAuthorisedOverruns'
                              render={({field: {value, name, onChange}}) => {
                                return (
                                  <NumericTextBox
                                    disabled={!watch('isOverruns') || isJobComplete}
                                    name={name}
                                    onChange={onChange}
                                    value={value}
                                    defaultValue={0}
                                    format='0'
                                    min={0}
                                    spinners={false}
                                  />
                                )
                              }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className='row'>
                <div className='col-12'>
                <table className='form-table' style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <th className='form-table-label'></th>
                      <th></th>
                      <th className='form-table-label'></th>
                      <th></th>
                    </tr>
                    <tr>
                      <td>
                        <label className='form-label' htmlFor='startDate'>
                          Start Date
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='startDate'
                          render={({ field: { value, name, onChange } }) => {
                            return (
                              <DatePicker
                                format='dd/MM/yyyy'
                                name={name}
                                onChange={onChange}
                                value={value ? new Date(value || '') : null}
                                disabled={!isCanEdit || isJobComplete}
                                tabIndex={11}
                              />
                            )
                          }}
                        />
                      </td>
                      <td>
                        <label className='checkbox mt-3 ms-4'>
                          <label className='form-label' htmlFor='dueDate'>
                            Due Date
                          </label>
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='dueDate'
                          render={({ field: { value, name, onChange } }) => {
                            return (
                              <DatePicker
                                format='dd/MM/yyyy'
                                name={name}

                                onChange={(e: any) => {
                                  let dateResult = null;

                                  if (e.target.value) {
                                    var date = new Intl.DateTimeFormat('en-AU').format(e.target.value);
                                    var newDate = stringToDateFormat(date)
                                    onChange(newDate)
                                  } else {
                                    onChange(null)
                                  }
                                }}
                                value={value ? new Date(value || '') : null}
                                disabled={!isCanEdit || isJobComplete}
                                tabIndex={18}
                              />
                            )
                          }}
                        />
                      </td>
                    </tr>
                    </tbody>
                    </table>
                </div>
            </div> */}
          </div>
          <div className='job-operation-section'>
            <div className='row job-Operation-container'>
              <div className='col-12'>
                <h4>Job Operations</h4>
                <NewOperationComponent
                  isCanEdit={isCanEdit && !isJobComplete}
                  operations={getValues('operations')}
                  addOperation={(newOperation: any) => addOperation(0, newOperation)}
                  updateOperation={(index: any, value: any) => updateOperation(index, value)}
                  removeOperation={(index: any) => removeOperation(index)}
                  operationChange={operationChangeHandler}
                  resources={resources}
                  users={users}
                  replaceOperations={(operations: Operation[]) => replaceOperations(operations)}
                ></NewOperationComponent>
              </div>
              {/* <div className='col-lg-4 col-12'>
                <h4>Job Notes</h4>
                <JobNoteComponent
                  isCanEdit={isCanEdit}
                  updateJobNotes={(index: any, value: any) => updateJobNotes(index, value)}
                  addJobNotes={(newJobNote: any) => addJobNotes(0, newJobNote)}
                  removeJobNotes={(index: any) => removeJobNotes(index)}
                  jobNotes={getValues('jobNotes')}
                ></JobNoteComponent>
              </div> */}
            </div>
          </div>
          <div className='job-po-section'>
            <div className='row mt-5'>
              <div className='col-12'>
                <h4>Notes</h4>
                <textarea className='form-control' {...register('notes')}></textarea>
              </div>
            </div>
          </div>
          <div className='job-po-section'>
            <div className='row mt-5'>
              <div className='col-lg-7 col-12'>
                <h4>Purchase Orders</h4>
                {fetchingOrder && LoadingPanel}
                <PurchaseOrderComponent
                  purchaseOrder={purchaseOrder}
                  createCopy={createCopy}
                  setPurchaseOrder={setPurchaseOrderHandler}
                  updatePurchaseOrder={(newPurchaseOrder: any, index: number) => {
                    purchaseOrder[index] = newPurchaseOrder
                    setPurchaseOrder(purchaseOrder)
                  }}
                  addPurchaseOrder={addPurchaseOrder}
                  goToPurchaseOrder={goToPurchaseOrder}
                  isCanEdit={isCanEdit && !isJobComplete}
                  jobData={jobData}
                  clientName={selectedClient?.name}
                  poAction={true}
                ></PurchaseOrderComponent>
              </div>
              <div className='col-lg-5 col-12'>
                <h4>Sales Information</h4>
                <table className='form-table' style={{width: '100%'}}>
                  <tbody>
                    <tr>
                      <th className='form-table-label'></th>
                      <th></th>
                      <th className='form-table-label'></th>
                      <th></th>
                    </tr>
                    <tr>
                      <td>
                        <label className='form-label' htmlFor=''>
                          Sale per unit
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='salePerUnit'
                          render={({field: {value, name, onChange}}) => {
                            return (
                              <NumericTextBox
                                name={name}
                                width='100%'
                                onChange={onChange}
                                value={value}
                                defaultValue={0}
                                format='c2'
                                min={0}
                                disabled={!isCanEdit || isJobComplete}
                                tabIndex={27}
                              />
                            )
                          }}
                        />
                      </td>
                      <td>
                        <label className='form-label ms-4' htmlFor=''>
                          Material Cost
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='materialCost'
                          render={({field: {value, name, onBlur}}) => {
                            return (
                              <NumericTextBox
                                name={name}
                                width='100%'
                                onChange={onBlur}
                                value={value}
                                defaultValue={0}
                                format='c2'
                                min={0}
                                tabIndex={32}
                                disabled
                              />
                            )
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className='form-label' htmlFor=''>
                          Sale Price
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='salesPrice'
                          render={({field: {value, name, onChange}}) => {
                            return (
                              <NumericTextBox
                                name={name}
                                width='100%'
                                onChange={onChange}
                                value={value}
                                defaultValue={0}
                                format='c2'
                                min={0}
                                disabled={!isCanEdit || isJobComplete}
                                tabIndex={28}
                                // disabled={true}
                              />
                            )
                          }}
                        />
                      </td>
                      <td>
                        {/* <li
                          className='fas fa-fw fa-question-circle'
                          data-toggle='tooltip'
                          title='Material Cost Variable (%)'
                        /> */}
                        <label className='form-label ms-4' htmlFor=''>
                          Material Cost Variable (%)
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='materialCostVariable'
                          render={({field: {value, name, onChange}}) => {
                            return (
                              <input
                                type='number'
                                name={name}
                                className='form-control'
                                onChange={onChange}
                                value={value}
                                min={0}
                                max={100}
                                disabled={!isCanEdit || isJobComplete}
                                tabIndex={34}
                              />
                            )
                          }}
                        />
                        {/* <ErrorMessage
                          errors={errors}
                          name='materialCostVariable' /> */}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <label className='form-label' htmlFor=''>
                          Delivery Charge
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='deliveryCharge'
                          render={({field: {value, name, onChange}}) => {
                            return (
                              <NumericTextBox
                                name={name}
                                width='100%'
                                onChange={onChange}
                                value={value}
                                defaultValue={0}
                                format='c2'
                                min={0}
                                disabled={!isCanEdit || isJobComplete}
                                tabIndex={28}
                              />
                            )
                          }}
                        />
                      </td>
                      <td>
                        <label className='form-label ms-4' htmlFor=''>
                          Labor Cost
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='labourCost'
                          render={({field: {value, name, onChange}}) => {
                            return (
                              <NumericTextBox
                                name={name}
                                width='100%'
                                onChange={onChange}
                                value={value}
                                defaultValue={0}
                                format='c2'
                                min={0}
                                disabled
                                tabIndex={35}
                                // disabled={true}
                              />
                            )
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className='form-label' htmlFor=''>
                          Total Price
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='totalPrice'
                          render={({field: {value, name, onChange}}) => {
                            return (
                              <NumericTextBox
                                name={name}
                                width='100%'
                                onChange={onChange}
                                value={value}
                                defaultValue={0}
                                format='c2'
                                min={0}
                                disabled={!isCanEdit || isJobComplete}
                                tabIndex={29}
                              />
                            )
                          }}
                        />
                      </td>
                      <td>
                        <label className='form-label ms-4' htmlFor=''>
                          Labor Cost Rate
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='labourCostRate'
                          render={({field: {value, name, onChange}}) => {
                            return (
                              <NumericTextBox
                                name={name}
                                width='100%'
                                onChange={onChange}
                                value={value}
                                defaultValue={0}
                                min={0}
                                disabled={!isCanEdit || isJobComplete}
                                tabIndex={36}
                              />
                            )
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className='checkbox'>
                          <input
                            type='checkbox'
                            className='me-4'
                            {...register('toBeInvoiced')}
                            tabIndex={30}
                            disabled={isJobComplete}
                          />
                          <span>
                            <label className='form-label' htmlFor='setupText'>
                              To be invoice
                            </label>
                          </span>
                        </label>
                      </td>
                      <td className='pt-1'>
                        <input
                          type='text'
                          className={`form-control`}
                          {...register('invoiceNumber')}
                          tabIndex={31}
                          disabled={!watch('toBeInvoiced') || isJobComplete}
                        />
                      </td>
                      <td>
                        <label className='form-label ms-4' htmlFor=''>
                          Other Cost
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='otherCost'
                          render={({field: {value, name, onChange}}) => {
                            return (
                              <NumericTextBox
                                name={name}
                                width='100%'
                                onChange={onChange}
                                value={value}
                                defaultValue={0}
                                format='c2'
                                min={0}
                                disabled={!isCanEdit || isJobComplete}
                                tabIndex={37}
                              />
                            )
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        {/* <label className='form-label' htmlFor=''>
                          Invoice Number
                        </label> */}
                      </td>

                      <td>
                        <label className='form-label ms-4' htmlFor=''>
                          Total Cost
                        </label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name='totalCost'
                          render={({field: {value, name, onChange}}) => {
                            return (
                              <NumericTextBox
                                name={name}
                                width='100%'
                                onChange={onChange}
                                value={value}
                                defaultValue={0}
                                format='c2'
                                min={0}
                                disabled={isJobComplete}
                                tabIndex={37}
                              />
                            )
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* <div id='preview' ref={previewRefJobDetails} /> */}
    </React.Fragment>
  )
}

export {JobForm}
