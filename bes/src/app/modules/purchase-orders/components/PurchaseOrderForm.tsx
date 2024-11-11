import React, {useContext, useEffect, useReducer, useRef, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {IJob, IPurchaseData, IPurchaseReceiptData} from '../models/purchase-model'
import {HistoryForm} from './modal/HistoryForm'
import {useEffectOnce} from 'react-use'
import {PurchaseOrderContext} from '../context/PurchaseOrderContext'
import {ISupplierData} from '../../suppliers/models/supplier-model'
import {Controller, useFieldArray, useForm, useWatch} from 'react-hook-form'
import Select from 'react-select'
import {
  transforOption,
  trasformPurchaseLineToGrid,
  trasformPurchaseReceiptToSave,
  trasformPurchaseToSave,
} from '../transformer/purchase-transformer'
import {PURCHASE_FORM_DEFAULT} from '../constant/purchase-defaults'
import {
  createPurchaseOrders,
  deletePurchaseOrder,
  getLastPoNumber,
  sendPurchasePrint,
  updatePrintDate,
  updatePurchaseOrders,
} from '../api'
import {yupResolver} from '@hookform/resolvers/yup'
import {purchaseFormValidationSchema} from '../validators/purchase-form'
import {DatePicker} from '@progress/kendo-react-dateinputs'
import {jsPDF} from 'jspdf'
import {PurchaseContent} from './print/PurchaseContent'
import {useReactToPrint} from 'react-to-print'
import {usePageData} from '../../../../_metronic/layout/core'
import {CustomAlert, IAlert} from '../../../shared/components/CustomAlert'
import {PurchaseLineComponent} from './partial/PurchaseLineComponent'
import {SendPOModal} from '../../../../_metronic/partials/modals/send-email/purchase-order/send-po'
import {IFile} from '../models/file'
import {LoadingPanel} from '../../../shared/components/kendo/GridLoading'
import {ANDREW_SIGNATURE_MESSAGE, extractImages64Id} from '../../../shared/service/utils'
import {registerEmailAuth, validateExistsEmailAuth} from '../../../shared/api/email'
import {RegisterSmtp} from './modal/RegisterSmtp'
import {DeleteButton} from '../../../../_metronic/partials/content/button/action/DeleteButton'

interface IProps {
  purchaseData?: IPurchaseData
}
let generatePrintQue: any
const PurchaseOrderForm: React.FC<IProps> = ({purchaseData}) => {
  const history = useHistory()
  const search = useLocation().search

  const jobidSource: string | null = new URLSearchParams(search).get('sourceJobId')
  const {currentUser} = usePageData()
  const {suppliers, getSupplierAsync, jobs, getJobsAsync, fetchingJobs} =
    useContext(PurchaseOrderContext)

  const [selectedSupplier, setSelectedSupplier] = useState<ISupplierData>()
  const [isPrint, setIsPrint] = useState<boolean>(false)
  const [customAlert, setPurchaseToaster] = useState<IAlert | undefined>()
  const [isSending, setIsSending] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isPrintShow, setIsPrintShow] = useState<boolean>(false)
  const [file, setFile] = useState<IFile>()
  const [sendingErrorPreview, setSendingErrorPreview] = useState<string>('')
  const componentRefDetails = useRef<any>()
  const [editorText, setEditorText] = useState<string>(ANDREW_SIGNATURE_MESSAGE)
  const [emails, setEmails] = useState<string[]>([])
  const [bccs, setBccs] = useState<string[]>([])
  const [ccs, setCCs] = useState<string[]>([])
  const [subject, setSubject] = useState<string>('')
  const [attachments, setAttachments] = useState<IFile[]>([])
  const [existSmtp, setExistSmtp] = useState<boolean>(false)
  // const [isShowSmtpModal, setIsShowSmtpModal] = useState<boolean>(false)
  const [isCreatingPreview, setIsCreatingPreview] = useState<boolean>(false)


  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
    reset,
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: purchaseData || {
      ...PURCHASE_FORM_DEFAULT,
      createdBy: currentUser.firstName + ' ' + currentUser.lastName,
    },
    reValidateMode: 'onSubmit',
    resolver: yupResolver(purchaseFormValidationSchema),
  })

  const {
    fields: purchaseLines,
    insert: addPurchaseLines,
    remove: removePurchaseLines,
    update: updatePurchaseLines,
    replace: replacePurchaseLines,
  } = useFieldArray({
    control,
    name: 'purchaseLines',
  })

  const supplierIdValue = useWatch({
    control,
    name: 'supplierId',
  })

  useEffectOnce(() => {
    if (suppliers.length == 0) {
      getSupplierAsync()
    }
    validateUserAuth()
  })

  const validateUserAuth = async () => {
    const [data]: any = await validateExistsEmailAuth(currentUser.email)
    if (data) {
      setExistSmtp(data.data)
    } else setExistSmtp(false)
  }

  useEffect(() => {
    getLastPoNumber()
      .then((response) => {
        if (!purchaseData) {
          setValue('purchaseNumber', response.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [purchaseData, setValue])

  useEffect(() => {
    if (supplierIdValue) {
      let supplier = suppliers.find((sup) => sup.id === supplierIdValue)
      if (!supplier) return

      setValue('supplierId', supplier.id ? supplier.id : 0)
      setSelectedSupplier(supplier)

      let isApproved =
        supplier.supplierApproval &&
        (supplier.supplierApproval.initialApproved || supplier.supplierApproval.lastApproved)
          ? true
          : false
      setValue('isApproved', isApproved)

      let newMessage = ANDREW_SIGNATURE_MESSAGE
      newMessage = newMessage.replace('{supplier_name}', supplier.name)
      setEditorText(newMessage)
      setSubject(`Purchase Order: ${getValues('purchaseNumber')}`)
    }
  }, [supplierIdValue, suppliers, setValue])

  useEffect(() => {
    if (purchaseData) {
      getJobsAsync({keyword: purchaseData.id})
      purchaseData.purchaseLines = trasformPurchaseLineToGrid(purchaseData.purchaseLines)
      reset({
        ...purchaseData,
      })
    } else {
      getJobsAsync()
      reset(PURCHASE_FORM_DEFAULT)
    }
  }, [purchaseData, reset, getJobsAsync])

  const onSubmit = async (values: IPurchaseData) => {
    setIsSaving(true)
    values = trasformPurchaseToSave(values)

    const hasData = values.purchaseLines.filter((x) => !x.isDeleted).length > 0
    if (!hasData) {
      setPurchaseToaster({
        message: `Create at least one Purchase Order.`,
        header: `Purchase Order`,
        type: 'danger',
      })
      setIsSaving(false)
      return
    }

    if (!purchaseData) {
      createPurchaseOrders(values)
        .then((response: any) => {
          if (jobidSource) {
            history.push({
              pathname: '/job/edit',
              search: `?id=${jobidSource}`,
            })
          } else {
            setIsSaving(false)
            history.push({
              pathname: '/purchase-order/edit',
              search: `?id=${response.purchaseNumber}`,
            })
          }
        })
        .catch((err) => {
          setPurchaseToaster({
            message: err.response.data ? err.response.data : 'Error saving',
            header: `Error saving Purchase Order`,
            type: 'danger',
          })
          setIsSaving(false)
        })
    } else {
      updatePurchaseOrders(values).then(() => {
        if (jobidSource) {
          history.push({
            pathname: '/job/edit',
            search: `?id=${jobidSource}`,
          })
        } else {
          setPurchaseToaster({
            message: `Purchase Order edited successfully.`,
            header: `Purchase Order`,
            type: 'primary',
          })
          setIsSaving(false)
          window.location.reload()
        }
      })
    }
  }

  const submitReceiptHandler = (receipt: any) => {
    const dataReceipt = trasformPurchaseReceiptToSave(receipt)
    const data = getValues('purchaseLines')
    data[receipt.dataIndex].purchaseReceipts.push(dataReceipt)
    setValue('purchaseLines', data)
  }

  const savePrintDateHandler = () => {
    if (purchaseData)
      updatePrintDate(purchaseData.id, new Date()).then(() => {
        setValue('printedDate', new Date())
      })
  }

  const printHandler = useReactToPrint({
    content: () => componentRefDetails.current,
    documentTitle: `Purchase Number ${purchaseData?.id}.pdf`,
    pageStyle: `.root {
      margin: 0;
      padding: 0
    }
    @media print {
        html,
        body {
          height: initial !important;
          overflow: initial !important;
          -webkit-print-color-adjust: exact;
        }
        @page :footer {
          display: none
        }
      
        @page :header {
            display: none
        }

        @page {
            size: landscape !important;
        }
      }
    `,
    onAfterPrint: () => {
      savePrintDateHandler();
    },
  })

  const sendPrintHandler = () => {
    setIsSending(true)
    setPurchaseToaster({
      message: `Please wait while sending email.`,
      header: `Sending the Purchase Order.`,
      type: 'info',
      closeToaster: closeToasterHandler,
    })

    if (!getValues('id') || getValues('id') == 0) {
      let values = trasformPurchaseToSave(getValues())
      createPurchaseOrders(values).then((response: any) => {
        setValue('id', response.id)
      })
    }
    const extracted = extractImages64Id(editorText)

    sendPurchasePrint(
      file?.file,
      emails,
      currentUser.email,
      purchaseData?.purchaseNumber,
      purchaseData?.id || 0,
      selectedSupplier?.name,
      editorText,
      subject,
      ccs,
      bccs,
      extracted,
      attachments,
      currentUser.email
    )
      .then(() => {
        savePrintDateHandler()
        setPurchaseToaster({
          message: `Purchase Order Sent Successfully`,
          header: `Purchase Order Sent.`,
          type: 'primary',
          closeToaster: closeToasterHandler,
        })
      })
      .catch((err) => {
        let msg = err.response.data
        if (msg && msg.includes('Authentication unsuccessful')) {
          msg =
            'Invalid sender credentials. Please ensure that the provided sender information is valid.'
        } else msg = `Server Error. Please try again later.`

        setPurchaseToaster({
          message: msg,
          header: `Purchase Order Not Sent.`,
          type: 'danger',
          closeToaster: closeToasterHandler,
        })
      })
      .finally(() => setIsSending(false))
  }

  const showPreview = (isOpenTab: boolean) => {
    const pdfDocument = componentRefDetails.current
    if (!pdfDocument) return
    const doc = new jsPDF('l', 'pt', 'a4')
    doc.setFont('Helvetica')
    setIsCreatingPreview(true)
    const options = {
      callback: function () {
        const blobUri = doc.output('blob')
        const title = `Purchase Number ${purchaseData?.id}.pdf`
        const file = new File([blobUri], title)
        setFile({
          title,
          file,
        })
        setAttachments([
          {
            title,
            file,
          },
        ])
        if (isOpenTab) window.open(URL.createObjectURL(blobUri))

        setIsCreatingPreview(false)
      },
      width: 1140,
      windowWidth: 1140,
      html2canvas: {scale: 0.74},
    }

    doc.html(pdfDocument, options)
  }

  useEffect(() => {
    if (componentRefDetails.current) {
      if (generatePrintQue) {
        clearTimeout(generatePrintQue)
      }
      generatePrintQue = setTimeout(function () {
        showPreview(false)
      }, 100)
    }
  }, [componentRefDetails.current])

  const closeToasterHandler = () => {
    setPurchaseToaster(undefined)
  }

  const printRequest = (isPrint: boolean) => {
    setTimeout(() => {
      if (isPrint) printHandler()
      else {
        setIsPrintShow(true)
        // if (existSmtp)

        //  else {
        //   setIsShowSmtpModal(true)
        //  }
      }
    }, 100)
  }

  let address = ''
  if (selectedSupplier) {
    if (selectedSupplier.street) {
      address += selectedSupplier.street + ' '
    }
    if (selectedSupplier.suburb) {
      address += selectedSupplier.suburb + ' '
    }
    if (selectedSupplier.state) {
      address += selectedSupplier.state.toUpperCase() + ' '
    }
    if (selectedSupplier.postCode) {
      address += selectedSupplier.postCode
    }
  }

  const formatPhoneNumber = (phoneNumber: string): string => {
    let digitsOnly = phoneNumber.replace(/[^\d]/g, '')

    if (phoneNumber.startsWith('+')) {
      if (digitsOnly.length === 12) {
        let countryCode = digitsOnly.substring(1, 3)
        let areaCode = digitsOnly.substring(4, 6)
        let firstPart = digitsOnly.substring(6, 10)
        let secondPart = digitsOnly.substring(10)

        return `(${areaCode}) ${firstPart} ${secondPart}`
      }
    } else if (phoneNumber.startsWith('0')) {
      if (digitsOnly.length === 10) {
        let last10Digits = digitsOnly.slice(-10)
        let areaCode = last10Digits.substring(0, 2)
        let firstPart = last10Digits.substring(2, 6)
        let secondPart = last10Digits.substring(6)

        return `(${areaCode}) ${firstPart} ${secondPart}`
      }
    } else if (phoneNumber.length === 12 && phoneNumber.includes(' ')) {
      return phoneNumber
    } else if (digitsOnly.length >= 8) {
      if (digitsOnly.length === 10) {
        let last10Digits = digitsOnly.slice(-10)
        let areaCode = last10Digits.substring(0, 2)
        let firstPart = last10Digits.substring(2, 6)
        let secondPart = last10Digits.substring(6)

        return `(${areaCode}) ${firstPart} ${secondPart}`
      } else if (digitsOnly.length === 8) {
        let firstPart = digitsOnly.substring(0, 4)
        let secondPart = digitsOnly.substring(4)

        return `${firstPart} ${secondPart}`
      } else {
        let areaCode = digitsOnly.substring(0, 2)
        let firstPart = digitsOnly.substring(2, 6)
        let thirdPart = digitsOnly.substring(6)

        return `(${areaCode}) ${firstPart} ${thirdPart}`
      }
    }

    return digitsOnly
  }

  return (
    <React.Fragment>
      <div style={{display: 'none'}}>
        <PurchaseContent
          refs={componentRefDetails}
          purchaseData={getValues()}
          isPrint={isPrint}
        ></PurchaseContent>
      </div>
      {isPrintShow && (
        <SendPOModal
          supplierEmail={selectedSupplier?.email || ''}
          onClose={() => {
            setIsPrintShow(false)
          }}
          errorMsg={sendingErrorPreview}
          onSend={(content: string) => {
            setEditorText(content)
            if (!file) {
              setSendingErrorPreview('Please Review/Click Attachment before we proceed ')
              return
            }
            setIsPrintShow(false)
            sendPrintHandler()
          }}
          showPreview={() => showPreview(true)}
          purchaseNumber={getValues('purchaseNumber')}
          fileName={`Purchase Number ${getValues('purchaseNumber')}.pdf`}
          content={editorText}
          addRemoveEmail={(newEmails) => {
            setEmails([...newEmails])
          }}
          subject={subject}
          changeSubject={(newSubject) => setSubject(newSubject)}
          changeContent={(newContent) => setEditorText(newContent)}
          addRemoveCC={(newCCs) => {
            setCCs([...newCCs])
          }}
          addRemoveBcc={(newBccs) => {
            setBccs([...newBccs])
          }}
          files={attachments}
          setFiles={(newAtt) => {
            setAttachments([...newAtt])
          }}
        />
      )}
      {/* {
        isShowSmtpModal && (
          <RegisterSmtp smtpRegister={{
            email: currentUser.email,
            password: ''
          }} toggleDialog={() => {
            setIsShowSmtpModal(false)
          }} savePasswordHandler={(smtpRegister) => {
            registerEmailAuth(smtpRegister.email, smtpRegister.password)
            .then(() => {
              setExistSmtp(true)
              setIsPrintShow(true)
              setIsShowSmtpModal(false)
            })
          }}></RegisterSmtp>
        )
      } */}

      {customAlert && <CustomAlert {...customAlert} />}
      <form name='purchase-order' onSubmit={handleSubmit(onSubmit)}>
        <div className='modal-body' style={{padding: '0px'}}>
          <div className='d-flex'>
            <button type='reset' className='btn btn-primary col-auto me-auto' disabled={isSending}>
              Clear
            </button>
            <button
              type='button'
              className='btn btn-primary  col-auto me-4'
              disabled={isSending || isCreatingPreview}
              onClick={() => {
                setIsPrint(false)
                printRequest(false)
              }}
            >
              Send
            </button>
            <button
              type='button'
              className='btn btn-primary  col-auto me-4'
              disabled={isSending}
              onClick={() => {
                setIsPrint(true)
                printRequest(true)
              }}
            >
              Print
            </button>
            <button
              className='btn btn-outline-primary col-auto me-4'
              onClick={() => {
                if (jobidSource) {
                  history.push({
                    pathname: '/job/edit',
                    search: `?id=${jobidSource}`,
                  })
                } else {
                  history.push('/purchase-order/list')
                }
              }}
            >
              Back
            </button>
            {(purchaseData?.id || 0) > 0 && (
              <DeleteButton
                title={`Delete Purchase Order ${purchaseData?.purchaseNumber}`}
                modalMessage={'You are deleting a Purchase Order, Continue?'}
                className={'me-5'}
                disabled={false}
                deleteHandler={() => {
                  if (purchaseData) {
                    deletePurchaseOrder(purchaseData).then(() => {
                      history.push('/purchase-order/list')
                    })
                  }
                }}
              ></DeleteButton>
            )}
            <button
              type='submit'
              className='btn btn-primary col-auto'
              disabled={isSending || isSaving}
            >
              Save
            </button>
          </div>
        </div>

        <div className='row job-information-container mt-5'>
          <h4>Purchase Order</h4>
          <div className='col-12 col-lg-4 col-md-4'>
            <table style={{width: '100%'}}>
              <tbody>
                <tr>
                  <th style={{width: '20%'}}></th>
                  <th></th>
                </tr>
                <tr>
                  <td>
                    <label className='form-label' htmlFor='suppierId'>
                      Supplier
                    </label>
                  </td>
                  <td>
                    <Controller
                      control={control}
                      name='supplierId'
                      render={({field: {value, name, onChange}}) => {
                        return (
                          <Select
                            options={transforOption(suppliers)}
                            onChange={(event: any) => onChange(event.value)}
                            className={`controllerSelect${
                              errors.supplierId ? ' border-danger' : ''
                            }`}
                            name={name}
                            value={transforOption(suppliers).find(
                              (spp: any) => spp.value === value
                            )}
                            tabIndex={1}
                            autoFocus
                          ></Select>
                        )
                      }}
                    ></Controller>
                  </td>
                </tr>
                <tr>
                  <td className='text-center'>
                    <div className='form-check'>
                      <label className='form-check-label fw-bold'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          {...register('isApproved')}
                          disabled
                        />
                        Approved
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex flex-column mt-3'>
                      <div>
                        <label className='fw-bold me-1'>Address:</label>
                        {address ? <span>{address}</span> : null}
                      </div>
                      <div>
                        <label className='fw-bold me-1'>Phone:</label>
                        {selectedSupplier ? (
                          <span>{formatPhoneNumber(selectedSupplier.phone)}</span>
                        ) : null}
                      </div>
                      <div>
                        <label className='fw-bold me-1'>Email:</label>
                        {selectedSupplier ? <span>{selectedSupplier.email}</span> : null}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='col-12 col-lg-4 col-md-4'>
            <table style={{width: '100%'}}>
              <tbody>
                <tr>
                  <th style={{width: '25%'}}></th>
                  <th></th>
                </tr>
                <tr>
                  <td>
                    <label className='form-label' htmlFor=''>
                      Purchase Order Number
                    </label>
                  </td>
                  <td>
                    <input
                      type='text'
                      className={`form-control`}
                      {...register('purchaseNumber')}
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='form-label'>Purchase Date</label>
                  </td>
                  <td>
                    <Controller
                      control={control}
                      name='date'
                      render={({field: {value, name, onChange}}) => {
                        return (
                          <DatePicker
                            format='dd/MM/yyyy'
                            name={name}
                            onChange={onChange}
                            value={value ? new Date(value || '') : null}
                            tabIndex={2}
                          />
                        )
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='form-label' htmlFor=''>
                      Created By
                    </label>
                  </td>
                  <td>
                    <input
                      type='text'
                      className={`form-control`}
                      {...register('createdBy')}
                      disabled
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='col-12 col-lg-4 col-md-4'>
            <table style={{width: '100%'}}>
              <tbody>
                <tr>
                  <th style={{width: '25%'}}></th>
                  <th></th>
                </tr>
                <tr>
                  <td>
                    <label className='form-label' htmlFor=''>
                      Sent Date
                    </label>
                  </td>
                  <td>
                    <Controller
                      control={control}
                      name='printedDate'
                      render={({field: {value, name, onChange}}) => {
                        return (
                          <DatePicker
                            format='dd/MM/yyyy'
                            name={name}
                            onChange={onChange}
                            disabled
                            value={value ? new Date(value || '') : null}
                            tabIndex={3}
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
        {fetchingJobs && LoadingPanel}
        <PurchaseLineComponent
          purchaseLines={purchaseLines}
          purchaseData={purchaseData}
          updatePurchaseLines={(index: any, value: any) => updatePurchaseLines(index, value)}
          addPurchaseLines={(value: any) => addPurchaseLines(0, value)}
          removePurchaseLines={(index: any) => removePurchaseLines(index)}
          replacePurchaseLines={(values: any) => replacePurchaseLines(values)}
          jobs={jobs}
          selectedSupplier={selectedSupplier}
          submitReceiptHandler={submitReceiptHandler}
          sourceJobId={jobidSource}
        />
        <div className='row mt-5'>
          <div className='col'>
            <table className='w-100'>
              <tbody>
                <tr>
                  <td style={{width: '20%'}}>
                    <label className='form-label'>Purchase Order Notes</label>
                  </td>
                  <td>
                    <textarea
                      className={`form-control`}
                      {...register('poNotes')}
                      tabIndex={4}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='form-label'>Internal Notes</label>
                  </td>
                  <td>
                    <textarea
                      className={`form-control`}
                      {...register('internalNotes')}
                      tabIndex={5}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='col'>
            <h6>Shipping</h6>
            <table className='w-100'>
              <tbody>
                <tr>
                  <td colSpan={2}>
                    <div className='form-check'>
                      <label className='form-check-label fw-bold'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          {...register('isCourPlsReceivePays')}
                          tabIndex={6}
                        />
                        Courier Please - Receiver Pays
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className='form-check'>
                      <label className='form-check-label fw-bold'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          {...register('isBesArrCollection')}
                          tabIndex={7}
                        />
                        BES to arrange collection
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className='form-check'>
                      <label className='form-check-label fw-bold'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          {...register('isCallReady')}
                          tabIndex={8}
                        />
                        Please call when ready
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className='form-check'>
                      <label className='form-check-label fw-bold'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          {...register('isCallReadyQuoting')}
                          tabIndex={8}
                        />
                        Please call when ready quoting PO number, weight, and dimensions
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{width: '20%'}}>
                    <div className='form-check'>
                      <label className='form-check-label fw-bold'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          {...register('isOthers')}
                          tabIndex={9}
                        />
                        Other:
                      </label>
                    </div>
                  </td>
                  <td>
                    <input
                      type='text'
                      placeholder='Other'
                      className={`form-control`}
                      {...register('otherNotes')}
                      disabled={!watch('isOthers')}
                      tabIndex={10}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </React.Fragment>
  )
}

export {PurchaseOrderForm}
