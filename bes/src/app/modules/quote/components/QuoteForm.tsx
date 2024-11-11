import {yupResolver} from '@hookform/resolvers/yup'
import React, {useContext, useEffect, useRef, useState} from 'react'
import {Controller, useForm, useWatch, useFieldArray} from 'react-hook-form'
import {MATERIAL_DEFAULT, QUOTE_FORM_DEFAULT} from '../constant/quote-default'
import {IEditData, IQuote, ISelectedClientData, Material} from '../models/quote-model'
import {quoteFormValidationSchema} from '../validators/quote-form'
import Select from 'react-select'
import {
  transforDataMaterial,
  transformCopyQuote,
  transformDataClient,
  transformVersionQuote,
  transforSaveMaterial,
} from '../transformer/quote-transformer'
import {useHistory} from 'react-router-dom'
import {QuoteContext} from '../context/QuoteContext'
import {useEffectOnce} from 'react-use'
import {DatePicker} from '@progress/kendo-react-dateinputs'
import {createQuote, deleteQuote, getClientById, updateQuote} from '../api'
import {useLocation} from 'react-router-dom'
import {ConfirmQuoteModal} from './modal/ConfirmQuoteModal'
import {NumericTextBox} from '@progress/kendo-react-inputs'
import {ModuleContext} from '../../../shared/ModuleContext'
import {QouteMaterial} from './partial/QouteMaterial'
import {QuoteOption} from './partial/QuoteOption'
import {AddressNotification} from '../../../shared/components/notification/AddressNotification'
import {CustomAlert, IAlert} from '../../../shared/components/CustomAlert'
import {DeleteButton} from '../../../../_metronic/partials/content/button/action/DeleteButton'
import {PrintQuoteBtn} from './partial/PrintQuoteBtn'
import {ConvertQuoteToJobBtn} from './partial/ConvertQuoteToJobBtn'
import {SendEmailBtn} from './partial/SendEmailBtn'

interface IProps {
  quoteData?: IEditData
  isCanEdit: boolean
}
const QuoteForm: React.FC<IProps> = ({quoteData, isCanEdit}) => {
  const history = useHistory()
  const [customAlert, setCustomAlert] = useState<IAlert | undefined>()
  const {jobTypes, getAllJobTypesAsync} = useContext(ModuleContext)
  const [modalConfirmShow, setConfirmModalShow] = useState(false)
  const [createCopy, setCreateCopy] = React.useState<boolean>(false)
  const [createVersion, setCreateVersion] = React.useState<boolean>(false)
  const [copyBtn, setCopyBtn] = React.useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  //refs={estLeadTime}

  //use for copy quotes. To indicate a new instance that needs value to retain from query string param
  const search = useLocation().search
  const copy: string | null = new URLSearchParams(search).get('copy')
  const quoteIdSource: string | null = new URLSearchParams(search).get('quoteIdSource')
  const version: string | null = new URLSearchParams(search).get('version')
  const parentIdSource: string | null = new URLSearchParams(search).get('parentId')

  const {setContextToaster, clients, getAllClientsAsync, setSelectedData} = useContext(QuoteContext)
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: quoteData || QUOTE_FORM_DEFAULT,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(quoteFormValidationSchema),
  })
  const [selectedClient, setSelectedClient] = useState<ISelectedClientData>()

  const onReset = () => {
    reset(QUOTE_FORM_DEFAULT)
  }

  const cliendIdValue = useWatch({
    control,
    name: 'clientId',
  })
  const {
    fields: materials,
    insert: addMaterials,
    remove: removeMaterials,
    update: updateMaterials,
    replace: replaceMaterials,
  } = useFieldArray({
    control,
    name: 'materials',
    keyName: 'keyIdx',
  })
  const costPerItemValue = useWatch({
    control,
    name: 'costPerItem',
  })
  const quantityValue = useWatch({
    control,
    name: 'quantity',
  })

  useEffectOnce(() => {
    if (copy === 'true') {
      setCreateCopy(true)
      setCreateVersion(false)
    }
    if (version === 'true') {
      setCreateCopy(false)
      setCreateVersion(true)
    } else {
      setCreateVersion(false)
      setCreateCopy(false)
    }
    getAllClientsAsync()
    getAllReferences()
  })
  const getAllReferences = async () => {
    if (jobTypes.length === 0) getAllJobTypesAsync()
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
      if (copy === 'true') {
        setCreateCopy(true)
        setCreateVersion(false)
        setCopyBtn(false)
      }
      if (version === 'true') {
        setCreateCopy(false)
        setCreateVersion(true)
        setCopyBtn(false)
      }
      quoteData.materials = transforDataMaterial(quoteData.materials)
      reset({
        ...quoteData,
      })
    } else {
      setCopyBtn(false)
      setIsCompleted(false)
      reset(QUOTE_FORM_DEFAULT)
    }
  }, [quoteData, reset, setContextToaster])

  useEffect(() => {
    setValue('totalCost', costPerItemValue * quantityValue)
  }, [costPerItemValue, quantityValue, setValue])

  const copyQuoteCard = () => {
    const copyData: any = transformCopyQuote(getValues())
    setSelectedData(copyData)
    history.push({
      pathname: '/quote/new',
      search: `?copy=true&quoteIdSource=${quoteData?.id}&version=false`,
    })
    setCreateCopy(true)
    setCreateVersion(false)
  }
  const versionQuoteCard = () => {
    const versionData: any = transformVersionQuote(getValues())
    setSelectedData(versionData)
    const url = `?copy=false&quoteIdSource=${quoteData?.id}&version=true&parentId=${
      quoteData?.parentId ? quoteData?.parentId : quoteData?.id
    }`
    history.push({
      pathname: '/quote/new',
      search: url,
    })
    setCreateVersion(true)
    setCreateCopy(false)
  }
  const selectVersion = (item: any) => {
    const selectedQuote = quoteData?.quoteVersion.find((x: any) => x.id === item.id)
    setSelectedData(selectedQuote)
    selectedQuote.quoteNumber.includes('-') ? setCopyBtn(false) : setCopyBtn(true)
    reset({
      ...selectedQuote,
    })
  }
  const onSubmit = async (values: IQuote) => {
    const payload: IQuote = values
    payload.materials = transforSaveMaterial(payload.materials)
    payload.version = createVersion
    payload.originalVersion = createCopy
    if (createVersion) {
      if (quoteIdSource != null) {
        payload.sourceId = parseInt(quoteIdSource)
      }
      if (parentIdSource != null) {
        payload.parentId = parseInt(parentIdSource)
      }
    }
    setIsSaving(true)
    if (!values.id || values.id === 0) {
      createQuote(payload)
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
      updateQuote(payload)
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

  const closeConfirmModal = () => {
    setConfirmModalShow(false)
  }
  const confirmCallback = () => {
    setConfirmModalShow(false)
    history.push('/quote/list')
  }

  const updateMaterialsHandler = (materials: Material[]) => {
    setValue('materials', materials)
  }

  const [errorEstLeadTime] = React.useState<boolean>(false)

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

  return (
    <React.Fragment>
      {!hasClient() && <AddressNotification></AddressNotification>}
      {customAlert && <CustomAlert {...customAlert} />}
      <form onSubmit={handleSubmit(onSubmit)} onReset={onReset} name='quote'>
        <div className='modal-body'>
          <div className='d-flex '>
            {/* <button className='btn btn-primary col-auto me-auto'>Delivered</button> */}
            {/* <button className='btn btn-primary col-auto me-auto'>User activity</button> */}

            {(quoteData?.id || 0) > 0 && (
              <ConfirmQuoteModal
                show={modalConfirmShow}
                handleClose={closeConfirmModal}
                quoteData={quoteData}
                confirmCallback={confirmCallback}
              />
            )}
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
                {getValues('status') === 'Completed' && (
                  <ConvertQuoteToJobBtn quoteData={getValues()} />
                )}
                <SendEmailBtn
                  quoteData={getValues()}
                  setToaster={(toaster) => {
                    setCustomAlert(toaster)
                  }}
                />
                <PrintQuoteBtn
                  quoteData={getValues()}
                  donePrint={() => {
                    window.location.reload()
                  }}
                />
                <button
                  type='button'
                  className='btn btn-primary col-auto me-5'
                  disabled={isCompleted}
                  tabIndex={13}
                  onClick={(e) => {
                    e.preventDefault()
                    setConfirmModalShow(true)
                  }}
                >
                  Confirm Quote
                </button>
              </React.Fragment>
            )}
            {copyBtn && (
              <button
                type='button'
                className='btn btn-primary col-auto me-5'
                onClick={copyQuoteCard}
                tabIndex={14}
              >
                Copy Quote
              </button>
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
                  Version
                </button>

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
              Save Draft
            </button>
          </div>
        </div>

        {(quoteData?.id || 0) > 0 && (
          <QuoteOption
            quoteVersions={quoteData?.quoteVersion}
            quoteDefault={{id: quoteData?.id, text: quoteData?.quoteNumber}}
            selectedQuote={selectVersion}
          ></QuoteOption>
        )}
        <div className='row mt-6 pe-2'>
          <div className='col-12 col-lg-3 col-md-12'>
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
                            isDisabled={isCompleted}
                            autoFocus
                            tabIndex={2}
                          ></Select>
                        )
                      }}
                    />
                  </td>
                </tr>
                {createCopy ||
                  (createVersion && (
                    <tr>
                      <td>
                        <label className='form-label' htmlFor='quoteNumberSource'>
                          Quote Number Reference
                        </label>
                      </td>
                      <td>
                        <input
                          type='text'
                          className={`form-control${errors.quoteNumber ? ' border-danger' : ''}`}
                          {...register('quoteNumberSource')}
                          tabIndex={3}
                          disabled
                        />
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td>
                    <label className='form-label' htmlFor='description'>
                      Quote Description
                    </label>
                  </td>
                  <td>
                    <input
                      type='text'
                      className={`form-control${errors.description ? ' border-danger' : ''}`}
                      {...register('description')}
                      disabled={isCompleted}
                      tabIndex={4}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label className='form-label' htmlFor='quantity'>
                      Quantity
                    </label>
                  </td>
                  <td>
                    <input
                      type='text'
                      className={`form-control${errors.quantity ? ' border-danger' : ''}`}
                      {...register('quantity')}
                      disabled={isCompleted}
                      tabIndex={5}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label className='form-label' htmlFor='totalCost'>
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
                            tabIndex={6}
                            disabled
                          />
                        )
                      }}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label className='form-label' htmlFor='drawingNumber'>
                      Drawing Number
                    </label>
                  </td>
                  <td>
                    <input
                      type='text'
                      className={`form-control${errors.drawingNumber ? ' border-danger' : ''}`}
                      {...register('drawingNumber')}
                      disabled={isCompleted}
                      tabIndex={7}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label className='form-label' htmlFor='revisionNumber'>
                      Revision Number
                    </label>
                  </td>
                  <td>
                    <input
                      type='text'
                      className={`form-control${errors.revisionNumber ? ' border-danger' : ''}`}
                      {...register('revisionNumber')}
                      disabled={isCompleted}
                      tabIndex={8}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label className='form-label' htmlFor=''>
                      Quote Card Printed
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
                <tr>
                  <td>
                    <label className='form-label' htmlFor='estLeadTime'>
                      Est Lead Time
                    </label>
                  </td>
                  <td>
                    <input
                      type='text'
                      className={`form-control${errors.estLeadTime ? ' border-danger' : ''}`}
                      {...register('estLeadTime')}
                      placeholder='2w 4d 6h 45m'
                      disabled={isCompleted}
                      tabIndex={10}
                      // ref={estLeadTime}
                      // onBlur={estLeadTimeHandler}
                    />
                    {errorEstLeadTime && (
                      <span className='spanError'>
                        Your estimate must be in the format <b>2w 4d 6h 45m</b>
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='form-label' htmlFor='paymentTerms'>
                      Payment Terms
                    </label>
                  </td>
                  <td>
                    <input
                      type='text'
                      className={`form-control${errors.paymentTerms ? ' border-danger' : ''}`}
                      {...register('paymentTerms')}
                      disabled={isCompleted}
                      tabIndex={11}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='form-label' htmlFor='completedBy'>
                      Quoted By
                    </label>
                  </td>
                  <td>
                    <input
                      type='text'
                      className={`form-control${errors.completedBy ? ' border-danger' : ''}`}
                      {...register('completedBy')}
                      disabled={isCompleted}
                      tabIndex={12}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='col-12 col-lg-9 col-md-12'>
            <h5>Materials</h5>
            <QouteMaterial
              isCanEdit={isCanEdit && !isCompleted}
              materials={materials}
              addMaterial={(newMaterials) => addMaterials(0, {...newMaterials})}
              updateMaterial={(idx, material) => {
                let newMaterials = getValues('materials')
                newMaterials[idx] = material
                updateMaterialsHandler(newMaterials)
              }}
              replaceMaterials={(newMaterials: Material[]) => replaceMaterials(newMaterials)}
              removeMaterial={removeMaterials}
              updateMaterials={updateMaterialsHandler}
            ></QouteMaterial>
          </div>
        </div>

        {/* <div className='row align-items-center mt-6 pe-2'>
          <ClientAddressComponent selectedClient={selectedClient} />
        </div> */}
      </form>
    </React.Fragment>
  )
}

export {QuoteForm}
