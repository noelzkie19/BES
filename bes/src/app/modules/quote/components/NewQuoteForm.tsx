import React, {useContext, useEffect, useState} from 'react'
import {IQuote, ISelectedClientData, Material} from '../models/quote-model'
import {AddressNotification} from '../../../shared/components/notification/AddressNotification'
import {
  createCopyQuote,
  createNewQuote,
  createQuote,
  createQuoteVersion,
  deleteQuote,
  getClientById,
  updateNewQuote,
  updateQuote,
} from '../api'
import {Controller, useFieldArray, useForm, useWatch} from 'react-hook-form'
import {NEW_QUOTE_FORM_DEFAULT, QUOTE_FORM_DEFAULT} from '../constant/quote-default'
import {yupResolver} from '@hookform/resolvers/yup'
import {quoteFormValidationSchema} from '../validators/quote-form'
import {QuoteContext} from '../context/QuoteContext'
import {useEffectOnce, useLocation} from 'react-use'
import {ModuleContext} from '../../../shared/ModuleContext'
import {
  transforSaveMaterial,
  transformDataClient,
  transformVersionQuote,
} from '../transformer/quote-transformer'
import {useHistory} from 'react-router-dom'
import {CustomAlert, IAlert} from '../../../shared/components/CustomAlert'
import {ConfirmQuoteModal} from './modal/ConfirmQuoteModal'
import Select from 'react-select'
import {DatePicker} from '@progress/kendo-react-dateinputs'
import {DeleteButton} from '../../../../_metronic/partials/content/button/action/DeleteButton'
import {SendEmailBtn} from './partial/SendEmailBtn'
import {PrintQuoteBtn} from './partial/PrintQuoteBtn'
import {ConvertQuoteToJobBtn} from './partial/ConvertQuoteToJobBtn'
import {QuoteDetails} from './partial/QuoteDetails'
import {QuoteDetail} from '../models/quote-detail'
import {INewEditData} from '../models/new-qoute-model'
import {transformNewCopyQuote, transformNewVersionQuote} from '../transformer/new-quote-transformer'
import {PrintQuoteOptionModal} from './modal/PrintQuoteOptionModal'
import {NewPrintQuoteBtn} from './partial/NewPrintQuoteBtn'

interface IProps {
  quoteData?: INewEditData
  isCanEdit: boolean
}

const NewQuoteForm: React.FC<IProps> = ({quoteData, isCanEdit}) => {
  const history = useHistory()
  const {setContextToaster, clients, getAllClientsAsync, setSelectedData} = useContext(QuoteContext)
  const {jobTypes, getAllJobTypesAsync} = useContext(ModuleContext)
  const [customAlert, setCustomAlert] = useState<IAlert | undefined>()
  // **
  // Query Params
  // **
  const search = useLocation().search
  // **
  // Form Setup
  // **
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: quoteData || NEW_QUOTE_FORM_DEFAULT,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(quoteFormValidationSchema),
  })

  const {
    fields: details,
    insert: addDetails,
    remove: removeDetails,
    update: updateDetails,
    replace: replaceDetails,
  } = useFieldArray({
    control,
    name: 'details',
    keyName: 'keyIdx',
  })

  // **
  // Form Value
  // **
  const cliendIdValue = useWatch({
    control,
    name: 'clientId',
  })

  // **
  // Initial Load
  // **
  useEffectOnce(() => {
    getAllClientsAsync()
    getAllReferences()
  })
  const getAllReferences = async () => {
    if (jobTypes.length === 0) getAllJobTypesAsync()
  }

  const [copyBtn, setCopyBtn] = React.useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  useEffect(() => {
    if (quoteData) {
      if (quoteData.id == 0 || quoteData.status !== 'For Client Confirmation') {
        setCopyBtn(false)
      }
      if (quoteData.status == 'Completed') {
        setIsCompleted(true)
      }
      if (quoteData.id != 0) {
        quoteData.quoteNumber.includes('-') ? setCopyBtn(false) : setCopyBtn(true)
      }
      reset({
        ...quoteData,
      })
    } else {
      setCopyBtn(false)
      setIsCompleted(false)
      reset(NEW_QUOTE_FORM_DEFAULT)
    }
  }, [quoteData, reset, setContextToaster])

  // **
  // Selected Client
  // **
  const [selectedClient, setSelectedClient] = useState<ISelectedClientData>()
  const setClientDetails = async (clientId: number) => {
    const [data]: any = await getClientById(clientId)
    if (!data) return
    setSelectedClient(data.data)
  }
  useEffect(() => {
    if (cliendIdValue) {
      setClientDetails(cliendIdValue)
    }
  }, [cliendIdValue, clients, setValue])

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

  // **
  // Action Handler
  // **
  const onReset = () => {
    reset(NEW_QUOTE_FORM_DEFAULT)
  }
  const copyQuoteCard = () => {
    createCopyQuote(quoteData?.id || 0).then((response) => {
      history.push({
        pathname: '/quote/edit',
        search: `?id=${response.data}`,
      })
      window.location.reload()
    })
  }
  const versionQuoteCard = () => {
    createQuoteVersion(quoteData?.id || 0).then((response) => {
      history.push({
        pathname: '/quote/edit',
        search: `?id=${response.data}`,
      })
      window.location.reload()
    })
  }

  const onSubmit = async (values: INewEditData) => {
    const payload: INewEditData = values
    setIsSaving(true)
    if (!values.id || values.id === 0) {
      createNewQuote(payload)
        .then((response: any) => {
          setIsSaving(false)
          history.push({
            pathname: '/quote/edit',
            search: `?id=${response}`,
          })
        })
        .catch((err) => {
          setCustomAlert({
            message: err.response.data ? err.response.data : 'Error saving',
            header: `Error saving Quote`,
            type: 'danger',
          })
          setIsSaving(false)
        })
    } else {
      updateNewQuote(payload)
        .then(() => {
          setCustomAlert({
            message: `Quote edited successfully.`,
            header: `Quote`,
            type: 'primary',
          })
          setIsSaving(false)
        })
        .catch((err) => {
          setCustomAlert({
            message: err.response.data ? err.response.data : 'Error saving',
            header: `Error saving Quote`,
            type: 'danger',
          })
          setIsSaving(false)
        })
    }
  }

  const [modalConfirmShow, setConfirmModalShow] = useState(false)
  const closeConfirmModal = () => {
    setConfirmModalShow(false)
  }
  const confirmCallback = () => {
    setConfirmModalShow(false)
    history.push('/quote/list')
  }

  const updateMaterialsHandler = (details: QuoteDetail[]) => {
    setValue('details', details)
  }

  return (
    <React.Fragment>
      {!hasClient() && <AddressNotification></AddressNotification>}
      {customAlert && <CustomAlert {...customAlert} />}
      <form onSubmit={handleSubmit(onSubmit)} onReset={onReset} name='quote'>
        {/* Action Buttons */}
        <div className='d-flex'>
          <button
            type='button'
            className='btn btn-outline-primary col-auto me-auto'
            onClick={() => {
              history.push('/quote/list')
            }}
          >
            Back
          </button>

          {(quoteData?.id || 0) > 0 && (
            <React.Fragment>
              <NewPrintQuoteBtn
                versions={quoteData?.quoteVersions}
                currentQuote={quoteData?.quoteNumber || ''}
                donePrint={() => {
                  window.location.reload()
                }}
              />
              <SendEmailBtn
                quoteData={getValues()}
                setToaster={(toaster) => {
                  setCustomAlert(toaster)
                }}
              />
              {/* {getValues('status') === 'Completed' && (
                <ConvertQuoteToJobBtn quoteData={getValues()} />
              )} */}
            </React.Fragment>
          )}
          {(quoteData?.id || 0) > 0 && (
            <React.Fragment>
              <button
                type='button'
                className='btn btn-primary col-auto me-5'
                onClick={versionQuoteCard}
                disabled={isCompleted}
                tabIndex={15}
              >
                Create Version
              </button>
              {/* {copyBtn && ( */}
              <button
                type='button'
                className='btn btn-primary col-auto me-5'
                onClick={copyQuoteCard}
                tabIndex={14}
              >
                Copy Quote
              </button>
              {/* )} */}

              <DeleteButton
                title={`Delete Quote ${quoteData?.number}`}
                modalMessage={'You are deleting a Quote, Continue?'}
                className={'me-5'}
                disabled={isCompleted}
                deleteHandler={() => {
                  if (quoteData) {
                    deleteQuote(quoteData).then(() => {
                      history.push('/quote/list')
                    })
                  }
                }}
              ></DeleteButton>
            </React.Fragment>
          )}

          <button
            type='submit'
            className='btn btn-primary col-auto'
            disabled={isSaving || isCompleted}
            tabIndex={16}
          >
            Save
          </button>
        </div>
        {/* Form Fields */}
        <h5 className='mb-2 mt-5'>Quote Information</h5>
        <div className='row mt-6 pe-2'>
          <div className='col-12 col-lg-3 col-md-3'>
            <table className='form-table' style={{width: '100%'}}>
              <tbody>
                <tr>
                  <th style={{width: '100px'}}></th>
                  <th></th>
                </tr>
                <tr>
                  <td>
                    <label className='form-label' htmlFor='quoteNumber'>
                      Quote Number
                    </label>
                  </td>
                  <td>
                    <input
                      type='text'
                      className={`form-control${errors.quoteNumber ? ' border-danger' : ''}`}
                      {...register(`quoteNumber`)}
                      disabled
                      tabIndex={1}
                    />
                  </td>
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
                            className={`controllerSelect${errors.clientId ? ' border-danger' : ''}`}
                            name={name}
                            value={transformDataClient(clients).find(
                              (cl: any) => cl.value === value
                            )}
                            autoFocus
                            tabIndex={2}
                            isDisabled={isCompleted}
                          ></Select>
                        )
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='col-12 col-lg-3 col-md-3'>
            <table className='form-table' style={{width: '100%'}}>
              <tbody>
                <tr>
                  <th style={{width: '100px'}}></th>
                  <th></th>
                </tr>
                <tr>
                  <td>
                    <label className='form-label' htmlFor='quoteNumber'>
                      No. of Versions
                    </label>
                  </td>
                  <td>
                    <div>{quoteData?.totalVersion}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='form-label' htmlFor='client'>
                      Contact Name
                    </label>
                  </td>
                  <td>
                    <input
                      type='text'
                      className={`form-control${errors.quoteNumber ? ' border-danger' : ''}`}
                      {...register(`contactName`)}
                      tabIndex={1}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='col-12 col-lg-3 col-md-3'>
            <table className='form-table' style={{width: '100%'}}>
              <tbody>
                <tr>
                  <th style={{width: '100px'}}></th>
                  <th></th>
                </tr>
                <tr>
                  <td>
                    <label className='form-label' htmlFor='quoteNumber'>
                      Quote Date
                    </label>
                  </td>
                  <td>
                    <Controller
                      control={control}
                      name='created'
                      render={({field: {value, name, onChange}}) => {
                        return (
                          <DatePicker
                            format='dd/MM/yyyy'
                            name={name}
                            onChange={onChange}
                            value={value ? new Date(value || '') : null}
                            tabIndex={9}
                            disabled
                          />
                        )
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='form-label' htmlFor='client'>
                      Print/Email Date
                    </label>
                  </td>
                  <td>
                    <Controller
                      control={control}
                      name='datePrinted'
                      render={({field: {value, name, onChange}}) => {
                        return (
                          <DatePicker
                            format='dd/MM/yyyy'
                            name={name}
                            onChange={onChange}
                            value={value ? new Date(value || '') : null}
                            tabIndex={9}
                            disabled
                          />
                        )
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='col-12 col-lg-3 col-md-3'>
            <table className='form-table' style={{width: '100%'}}>
              <tbody>
                <tr>
                  <th style={{width: '100px'}}></th>
                  <th></th>
                </tr>
                <tr>
                  <td>
                    <label className='form-label' htmlFor='quoteNumber'>
                      Quote By
                    </label>
                  </td>
                  <td>
                    <input
                      type='text'
                      className={`form-control${errors.quoteNumber ? ' border-danger' : ''}`}
                      {...register(`createdBy`)}
                      disabled
                      tabIndex={1}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <table className='form-table' style={{width: '100%'}}>
              <tbody>
                <tr>
                  <th style={{width: '100px'}}></th>
                  <th></th>
                </tr>
                <tr>
                  <td>
                    <label className='form-label' htmlFor='quoteNumber'>
                      Description
                    </label>
                  </td>
                  <td>
                    <textarea
                      className={`form-control${errors.quoteNumber ? ' border-danger' : ''}`}
                      {...register(`description`)}
                      disabled={isCompleted}
                      tabIndex={1}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Quote Details */}
        <div className='row mt-3'>
          <div className='col'>
            <h5>Quote Details</h5>
            <QuoteDetails
              isCanEdit={isCanEdit && !isCompleted}
              details={details}
              addDetail={(newDetails) => addDetails(0, {...newDetails})}
              updateDetail={(idx, material) => {
                let newDetails = getValues('details')
                newDetails[idx] = material
                updateMaterialsHandler(newDetails)
              }}
              replaceDetails={(newMaterials: QuoteDetail[]) => replaceDetails(newMaterials)}
              removeDetail={removeDetails}
              updateDetails={updateMaterialsHandler}
            ></QuoteDetails>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col'>
            <h5>Notes</h5>
            <textarea
              className={`form-control${errors.notes ? ' border-danger' : ''}`}
              {...register(`notes`)}
              tabIndex={1}
            />
          </div>
          <div className='col'>
            <h5>Payment Term</h5>
            <div className='row'>
              <div className='col d-flex justify-content-between'>
                <span className='ms-4'>
                  <label className='form-label' htmlFor='setupText'>
                    30 Days From Invoice
                  </label>
                </span>
                <input
                  type='checkbox'
                  className='me-4'
                  tabIndex={16}
                  {...register(`is30DaysFromInv`)}
                />
              </div>
              <div className='col d-flex justify-content-between'>
                <span className='ms-4'>
                  <label className='form-label' htmlFor='isCod'>
                    50% deposit received with final payment due COD
                  </label>
                </span>
                <input type='checkbox' className='me-4' tabIndex={16} {...register(`isDepositReceivedCOD`)} />
              </div>
            </div>
            <div className='row'>
              <div className='col d-flex justify-content-between'>
                <span className='ms-4'>
                  <label className='form-label' htmlFor='setupText'>
                    COD
                  </label>
                </span>
                <input
                  type='checkbox'
                  className='me-4'
                  tabIndex={16}
                  {...register(`isCod`)}
                />
              </div>
              <div className='col d-flex justify-content-between'>
                <span className='ms-4'>
                  <label className='form-label' htmlFor='setupText'>
                    Progress Payment Required
                  </label>
                </span>
                <input
                  type='checkbox'
                  className='me-4'
                  tabIndex={16}
                  {...register(`progressPaymentRequired`)}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  )
}

export {NewQuoteForm}
