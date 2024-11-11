import {yupResolver} from '@hookform/resolvers/yup'
import React, {useCallback, useContext, useEffect, useReducer, useState} from 'react'
import {clientFormValidationSchema} from '../validators/client-form'
import {Controller, useFieldArray, useForm, useWatch} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import {CustomAlert, IAlert} from '../../../shared/components/CustomAlert'
import {createClient, getClientEmailHistory, updateClient} from '../api'
import {
  CLIENT_CONTACT_DEFAULT,
  CLIENT_FORM_DEFAULT,
  Initial_GridSetup_ClientEmail,
} from '../constant/client-defaults'
import {ClientContext} from '../context/ClientContext'
import {IClientAddress, IClientContact, IEditData} from '../models/client-model'
import {
  transforDataClientAddress,
  transformClientEmailHistorySort,
  transformDataClientContact,
  transformSaveClientContact,
  transforSaveClientAddress,
  transformStatesOption,
} from '../transformers/client-transformer'
import {DeleteClientModal} from './DeleteClientModal'
import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridFilterChangeEvent,
  GridColumnResizeEvent,
} from '@progress/kendo-react-grid'
import {dataProvider} from '../../../shared/data/data-provider'
import {GridSetupClientEmailHistory, IClientEmailHistory} from '../models/client-emailhistory'
import {capitapizeText, filterToObject} from '../../../shared/service/utils'
import 'react-phone-input-2/lib/style.css'
import {ErrorMessage} from '@hookform/error-message'
import {ContactComponent} from './partial/ContactComponent'
import {FIELD_HISTORY_KEY, FIELD_HISTORY_LIST} from '../constant/config-defaults'
import {useEffectOnce} from 'react-use'
import {
  GRID_WIDTH,
  getResizeColumnByName,
  saveResizeColumn,
} from '../../../shared/service/grid-setup-utils'
import PhoneInput1 from '../../../../_metronic/partials/content/inputs/PhoneInput1'
import Select from 'react-select'

export const FILE_URL = `${process.env.REACT_APP_FILE_URL}`

interface IProps {
  clientData?: IEditData
}
const filterOperators = {
  text: [
    {
      text: 'grid.filterContainsOperator',
      operator: 'contains',
    },
  ],
  boolean: [
    {
      text: 'grid.filterEqOperator',
      operator: 'eq',
    },
  ],
}
const ClientForm: React.FC<IProps> = ({clientData}) => {
  const history = useHistory()

  const {optionStates, optionAddressType, isCanEdit} = useContext(ClientContext)
  const [customAlert, setCustomAlert] = useState<IAlert | undefined>()
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [tableData, setTableData] = useState<IClientEmailHistory[]>([])
  const [totalRows, setTotalRows] = useState<number>(0)
  const [gridSetup, setGridSetup] = useState<GridSetupClientEmailHistory>(
    Initial_GridSetup_ClientEmail
  )
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_HISTORY_KEY)
  const [isSameAsStreet, setIsSameAsStreet] = useState(false)

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
    defaultValues: clientData,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(clientFormValidationSchema),
  })

  const {
    fields: clientContacts,
    insert: addClientContact,
    remove: removeClientContact,
    update: updateClientContact,
    replace: replaceContacts,
  } = useFieldArray({
    control,
    name: 'clientContacts',
    keyName: 'keyIdx',
  })

  const {append: deletedClientContacts} = useFieldArray({
    control,
    name: 'deletedclientContacts',
  })

  useEffectOnce(() => {
    setColumnLocal()
    return () => {
      setAutoColumns([])
    }
  })

  const setColumnLocal = () => {
    const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_CLIENT_HISTORY)
    if (columnLocal) {
      setAutoColumns(columnLocal)
    }
  }

  useEffect(() => {
    if (clientData) {
      clientData.clientAddresses = transforDataClientAddress(clientData.clientAddresses)
      clientData.clientContacts = transformDataClientContact(clientData.clientContacts)
      reset({
        ...clientData,
      })
      fetchClientEmailHistory()

      if (
        clientData.street == clientData.postalAddress &&
        clientData.suburb == clientData.postalSuburb &&
        clientData.state == clientData.postalState &&
        clientData.postCode == clientData.postalPostCode
      ) {
        setIsSameAsStreet(true)
      } else {
        setIsSameAsStreet(false)
      }
    } else {
      reset(CLIENT_FORM_DEFAULT)
    }
    setCustomAlert(undefined)
  }, [clientData, reset, setCustomAlert])
  const fetchClientEmailHistory = useCallback(() => {
    const {sort, skip, take, filter} = gridSetup
    const sortField = transformClientEmailHistorySort(sort)
    const search = filterToObject(filter)

    getClientEmailHistory(skip, take, sortField, clientData?.id, search)
      .then((response: any) => {
        response.items.forEach((element: any) => {
          if (element.filePath) {
            var fileName = element.filePath.split('\\')
            element.file = fileName[fileName.length - 1]
            element.filePath = FILE_URL + '/' + fileName[fileName.length - 1]
          }
        })
        setTableData(response.items)
        setTotalRows(response.totalCount)
      })
      .catch(() => {
        // setIsLoading(false)
      })
  }, [gridSetup])

  const onSubmit = async (values: IEditData) => {
    const payload: IEditData = values

    payload.clientAddresses = transforSaveClientAddress(values.clientAddresses)
    payload.clientContacts = transformSaveClientContact(values.clientContacts)

    if (values.deletedclientContacts)
      payload.deletedclientContacts = transformSaveClientContact(values.deletedclientContacts)

    setIsSaving(true)
    if (!clientData) {
      createClient(payload)
        .then((response: any) => {
          setIsSaving(false)
          history.push({
            pathname: '/client/edit',
            search: `?id=${response}`,
          })
        })
        .catch((err) => {
          setCustomAlert({
            message: err.response.data ? err.response.data.title : 'Error saving',
            header: `Error Saving Client`,
            type: 'danger',
          })
          setIsSaving(false)
        })
    } else {
      updateClient(payload)
        .then(() => {
          setCustomAlert({
            message: `Client edited successfully.`,
            header: `Client Edit`,
            type: 'primary',
          })
          setIsSaving(false)
        })
        .catch((err) => {
          setCustomAlert({
            message: err.response.data ? err.response.data.title : 'Error saving',
            header: `Error Edit Client`,
            type: 'danger',
          })
          setIsSaving(false)
        })
    }
  }

  const onReset = () => {
    reset(CLIENT_FORM_DEFAULT)
  }

  const resetAddress = (clientAddresses: IClientAddress[]) => {
    setValue('clientAddresses', clientAddresses)
  }
  const resetContacts = (clientContacts: IClientContact[]) => {
    setValue('clientContacts', clientContacts)
  }

  const handlePageChange = (pageProps: any) => {
    setGridSetup({
      ...gridSetup,
      skip: pageProps.page.skip,
      take: pageProps.page.take,
    })
  }
  const handleSortChange = (pageProps: any) => {
    setGridSetup({
      ...gridSetup,
      sort: pageProps.sort,
    })
  }
  const handleFilter = (filter: GridFilterChangeEvent) => {
    setGridSetup({
      ...Initial_GridSetup_ClientEmail,
      filter: filter.filter,
    })
  }

  useEffect(() => {
    fetchClientEmailHistory()
  }, [gridSetup, fetchClientEmailHistory])

  const updateClientContactHandler = (index: number, data: IClientContact) => {
    updateClientContact(index, data)
    if (data.isDeleted) {
      deletedClientContacts(data)
    }
  }

  const handleResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, autoColumns, GRID_WIDTH.GRID_CLIENT_HISTORY)
  }

  const handleSameAsStreetChange = () => {
    setIsSameAsStreet(!isSameAsStreet)
    if (isSameAsStreet) {
      setValue('postalAddress', '')
      setValue('postalSuburb', '')
      setValue('postalState', '')
      setValue('postalPostCode', '')
    } else {
      setValue('postalAddress', watch('street'))
      setValue('postalSuburb', watch('suburb'))
      setValue('postalState', watch('state'))
      setValue('postalPostCode', watch('postCode'))
    }
  }

  return (
    <React.Fragment>
      <DeleteClientModal
        show={deleteModal}
        handleClose={() => setDeleteModal(false)}
        clientData={clientData}
        deleteCallback={() => {
          setDeleteModal(true)
          history.push('/client/list')
        }}
      />
      {customAlert && <CustomAlert {...customAlert} />}
      <form onSubmit={handleSubmit(onSubmit)} onReset={onReset} name='client'>
        <div className='modal-body p-0'>
          <div className='d-flex justify-content-end'>
            {clientData && isCanEdit && (
              <button
                type='button'
                className='btn btn-primary col-auto me-4 mt-2 text-nowrap'
                onClick={() => setDeleteModal(true)}
              >
                Delete
              </button>
            )}

            <button
              type='submit'
              className='btn btn-outline-primary col-auto me-4 mt-2 text-nowrap'
              onClick={() => {
                history.push('/client/list')
              }}
            >
              Back
            </button>
            <button
              type='submit'
              className='btn btn-primary col-auto mt-2 text-nowrap'
              disabled={isSaving}
            >
              Save
            </button>
          </div>
        </div>
        <div className='modal-body p-0'>
          <h4>Client Information</h4>
          <div className='row'>
            <div className='col-12'>
              <table className='w-100'>
                <tbody>
                  <tr>
                    <td style={{width: 'calc(100% / 12)'}}>
                      <label className='form-label'>Client Name</label>
                    </td>
                    <td colSpan={5} rowSpan={1}>
                      <input
                        type='text'
                        className={`form-control${errors.name ? ' border-danger' : ''}`}
                        placeholder='Enter Supplier Name'
                        disabled={!isCanEdit}
                        {...register('name')}
                        tabIndex={1}
                        autoFocus
                      />
                    </td>
                    <td style={{width: '33.33%'}}>&nbsp;</td>
                  </tr>
                  <tr>
                    <td rowSpan={1}>
                      <label className='form-label'>Short Name</label>
                    </td>
                    <td rowSpan={1}>
                      <Controller
                        name='shortName'
                        control={control}
                        defaultValue=''
                        render={({field}) => (
                          <input
                            {...field}
                            className={`form-control${errors.shortName ? ' border-danger' : ''}`}
                            type='text'
                            id='shortName'
                            name='shortName'
                            maxLength={5}
                            disabled={!isCanEdit}
                            // Capitalize the value using .toUpperCase() on every change
                            onChange={(e) => {
                              const capitalizedValue = capitapizeText(e.target.value)
                              field.onChange(capitalizedValue)
                            }}
                          />
                        )}
                      />
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <label className='form-label' htmlFor=''>
                        Client Type
                      </label>
                    </td>
                    <td>
                      <select
                        {...register(`clientType`)}
                        className={`form-control${errors.clientType ? ' border-danger' : ''}`}
                        disabled={!isCanEdit}
                        tabIndex={2}
                      >
                        <option value=''>{'Select Type'}</option>
                        {dataProvider.clientType.map((address) => (
                          <option key={address.code} value={address.code}>
                            {address.value}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td colSpan={3}>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label'>Street Address</label>
                    </td>
                    <td colSpan={5} rowSpan={1}>
                      <input
                        type='text'
                        className={`form-control${errors.street ? ' border-danger' : ''}`}
                        placeholder=''
                        disabled={!isCanEdit}
                        {...register('street')}
                        tabIndex={3}
                      />
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label'>Suburb</label>
                    </td>
                    <td>
                      <input
                        type='text'
                        className={`form-control${errors.suburb ? ' border-danger' : ''}`}
                        placeholder=''
                        disabled={!isCanEdit}
                        tabIndex={4}
                        {...register('suburb')}
                      />
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <label className='form-label'>State</label>
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name='state'
                        render={({field: {value, name, onChange}}) => {
                          return (
                            <Select
                              options={transformStatesOption(optionStates)}
                              onChange={(event: any) => onChange(event.value)}
                              className={`controllerSelect${errors.state ? ' border-danger' : ''}`}
                              name={name}
                              value={transformStatesOption(optionStates).find(
                                (cl: any) => cl.value === value
                              )}
                              isDisabled={!isCanEdit}
                              tabIndex={5}
                            ></Select>
                          )
                        }}
                      />
                      <ErrorMessage errors={errors} name='state' />
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <label className='form-label'>Postcode</label>
                    </td>
                    <td>
                      <input
                        type='text'
                        className={`form-control${errors.postCode ? ' border-danger' : ''}`}
                        placeholder=''
                        disabled={!isCanEdit}
                        tabIndex={6}
                        {...register('postCode')}
                      />
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label'>Postal Address</label>
                    </td>
                    <td colSpan={5} rowSpan={1}>
                      <input
                        type='text'
                        className={`form-control${errors.postalAddress ? ' border-danger' : ''}`}
                        placeholder=''
                        disabled={isSameAsStreet || !isCanEdit}
                        {...register('postalAddress')}
                        tabIndex={7}
                      />
                    </td>
                    <td>
                      <div className='form-check mt-2'>
                        <label className='form-label'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            disabled={!isCanEdit}
                            checked={isSameAsStreet}
                            onChange={handleSameAsStreetChange}
                            tabIndex={8}
                          />
                          Same as Street Address
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label'>Suburb</label>
                    </td>
                    <td>
                      <input
                        type='text'
                        className={`form-control${errors.postalSuburb ? ' border-danger' : ''}`}
                        placeholder=''
                        disabled={isSameAsStreet || !isCanEdit}
                        tabIndex={9}
                        {...register('postalSuburb')}
                      />
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <label className='form-label'>State</label>
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name='postalState'
                        render={({field: {value, name, onChange}}) => {
                          return (
                            <Select
                              options={transformStatesOption(optionStates)}
                              onChange={(event: any) => onChange(event.value)}
                              className={`controllerSelect${
                                errors.postalState ? ' border-danger' : ''
                              }`}
                              name={name}
                              value={transformStatesOption(optionStates).find(
                                (cl: any) => cl.value === value
                              )}
                              isDisabled={isSameAsStreet || !isCanEdit}
                              tabIndex={10}
                            ></Select>
                          )
                        }}
                      />
                      <ErrorMessage errors={errors} name='postalState' />
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <label className='form-label'>Postcode</label>
                    </td>
                    <td>
                      <input
                        type='text'
                        className={`form-control${errors.postalPostCode ? ' border-danger' : ''}`}
                        placeholder=''
                        disabled={isSameAsStreet || !isCanEdit}
                        tabIndex={11}
                        {...register('postalPostCode')}
                      />
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td colSpan={7}>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label' htmlFor=''>
                        Main Phone
                      </label>
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name='phone'
                        render={({field: {value, onChange}}) => {
                          return (
                            <PhoneInput1
                              phoneNumber={value}
                              onChangeHandler={onChange}
                              tabIndex={2}
                            ></PhoneInput1>
                          )
                        }}
                      />
                      <ErrorMessage
                        errors={errors}
                        name='phone'
                        as={<span className='spanError' />}
                      />
                    </td>
                    <td colSpan={4} rowSpan={1}>
                      &nbsp;
                    </td>
                    <td colSpan={1}>
                      <label className='form-label'>Operating Hours</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label'>Main Email</label>
                    </td>
                    <td colSpan={5} rowSpan={1}>
                      <input
                        type='email'
                        className={`form-control${errors.email ? ' border-danger' : ''}`}
                        placeholder='Email'
                        disabled={!isCanEdit}
                        tabIndex={13}
                        {...register('email')}
                      />
                    </td>
                    <td colSpan={1} rowSpan={2}>
                      <textarea
                        className={`form-control${errors.operatingHrs ? ' border-danger' : ''}`}
                        placeholder='Enter Operating Hours'
                        disabled={!isCanEdit}
                        tabIndex={14}
                        {...register('operatingHrs')}
                        rows={3}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label'>Contact Person</label>
                    </td>
                    <td colSpan={5} rowSpan={1}>
                      <input
                        type='text'
                        className={`form-control${errors.contactPerson ? ' border-danger' : ''}`}
                        placeholder='Enter Contact Person'
                        tabIndex={15}
                        disabled={!isCanEdit}
                        {...register('contactPerson')}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='col-12 col-lg-12'>
          <h4 className='mb-5 mt-5'>Contacts</h4>
          <ContactComponent
            isCanEdit={isCanEdit}
            addClientContact={(newData: any) => addClientContact(0, newData)}
            clientContacts={clientContacts}
            optionStates={optionStates}
            optionAddressType={optionAddressType}
            updateClientContact={(index: any, value: any) =>
              updateClientContactHandler(index, value)
            }
            removeClientContact={(index: any, data: any) => removeClientContact(index)}
            resetContacts={(clientContacts: IClientContact[]) => resetContacts(clientContacts)}
            replaceContacts={(clientContacts: IClientContact[]) => replaceContacts(clientContacts)}
          />
        </div>
      </form>
    </React.Fragment>
  )
}

export {ClientForm}
