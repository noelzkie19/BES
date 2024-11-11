import { yupResolver } from '@hookform/resolvers/yup'
import { DatePicker } from '@progress/kendo-react-dateinputs'

import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridFilterChangeEvent,
  GridColumnResizeEvent,
} from '@progress/kendo-react-grid'
import { NumericTextBox } from '@progress/kendo-react-inputs'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { CustomAlert, IAlert } from '../../../shared/components/CustomAlert'
import { DateFormatCell } from '../../../shared/components/kendo/format/DateFormatCell'
import { filterToObject } from '../../../shared/service/utils'
import { createSupplier, getSupplierEmailHistories, updateSupplier } from '../api'
import { FIELD_HISTORY_KEY, FIELD_HISTORY_LIST, Initial_GridSetup_SupplierEmail } from '../constant/config-defaults'
import { SUPPLIER_CONTACT_DEFAULT, SUPPLIER_FORM_DEFAULT } from '../constant/supplier-defaults'
import { SupplierContext } from '../context/SupplierContext'
import {
  GridSetupSupplierEmailHistory,
  IEditData,
  ISupplierAddress,
  ISupplierContact,
  ISupplierEmailHistory,
} from '../models/supplier-model'
import {
  transforDataSupplierAddress,
  transformDataSupplierContact,
  transformEmailHistorySort,
  transformSaveSupplierApproval,
  transformSaveSupplierContact,
  transforSaveSupplierAddress,
  transformStatesOption
} from '../transformer/supplier-transformer'
import { supplierFormValidationSchema } from '../validators/supplier-form'
import { DeleteSupplierModal } from './DeleteSupplierModal'
import { AddressComponent } from './partial/AddressComponent'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { ErrorMessage } from '@hookform/error-message'
import { ContactComponent } from './partial/ContactComponent'
import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from '../../../shared/service/grid-setup-utils'
import { useEffectOnce } from 'react-use'
import PhoneInput1 from '../../../../_metronic/partials/content/inputs/PhoneInput1'
import Select from 'react-select'
export const FILE_URL = `${process.env.REACT_APP_FILE_URL}`

interface IProps {
  supplierData?: IEditData
}

const SupplierForm: React.FC<IProps> = ({ supplierData }) => {
  const history = useHistory()

  const { optionStates, optionAddressType, userApproval, isCanEdit } =
    useContext(SupplierContext)
  const [customAlert, setCustomAlert] = useState<IAlert | undefined>()
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [gridSetup, setGridSetup] = useState<GridSetupSupplierEmailHistory>(
    Initial_GridSetup_SupplierEmail
  )
  const [tableData, setTableData] = useState<ISupplierEmailHistory[]>([])
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_HISTORY_KEY)
  let [isSameAsStreet, setIsSameAsStreet] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm({
    defaultValues: supplierData,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(supplierFormValidationSchema),
  })

  const {
    fields: supplierAddresses,
    insert: addAddress,
    remove: removeAddAddress,
    update: updateAddress,
    replace: replaceAddress
  } = useFieldArray({
    control,
    name: 'supplierAddresses',
    keyName: 'keyIdx',
  })

  const {
    fields: supplierContacts,
    insert: addSupplierContact,
    remove: removeSupplierContact,
    update: updateSupplierContact,
    replace: replaceSupplierContact
  } = useFieldArray({
    control,
    name: 'supplierContacts',
    keyName: 'keyIdx',
  })

  const { append: deletedSupplierContacts } = useFieldArray({
    control,
    name: 'deletedSupplierContacts',
  })

  useEffectOnce(() => {
    setColumnLocal();
    return () => {
      setAutoColumns([]);
    };
  })

  const setColumnLocal = () => {
    const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_SUPPLIER_HISTORY)
    if (columnLocal) {
      setAutoColumns(columnLocal)
    }
  }

  useEffect(() => {
    if (supplierData) {
      supplierData.supplierAddresses = transforDataSupplierAddress(supplierData.supplierAddresses)
      supplierData.supplierContacts = transformDataSupplierContact(supplierData.supplierContacts)
      fetchEmailHistory()
      reset({
        ...supplierData,
      })

      if (supplierData.street == supplierData.postalAddress &&
        supplierData.suburb == supplierData.postalSuburb &&
        supplierData.state == supplierData.postalState &&
        supplierData.postCode == supplierData.postalPostCode) {
        setIsSameAsStreet(true);
      }
      else {
        setIsSameAsStreet(false);
      }

    } else {
      reset(SUPPLIER_FORM_DEFAULT)
    }
    setCustomAlert(undefined)

  }, [supplierData, reset, setCustomAlert])

  const onSubmit = async (values: IEditData) => {
    const payload: IEditData = values

    payload.supplierAddresses = transforSaveSupplierAddress(values.supplierAddresses)
    payload.supplierContacts = transformSaveSupplierContact(values.supplierContacts)
    payload.supplierApproval = transformSaveSupplierApproval(values.supplierApproval)
    if (values.deletedSupplierAddresses)
      payload.deletedSupplierAddresses = transforSaveSupplierAddress(
        values.deletedSupplierAddresses
      )
    if (values.deletedSupplierContacts)
      payload.deletedSupplierContacts = transformSaveSupplierContact(values.deletedSupplierContacts)
    setIsSaving(true)
    if (!supplierData) {
      createSupplier(payload)
        .then((response: any) => {
          setIsSaving(false)
          history.push({
            pathname: '/supplier/edit',
            search: `?id=${response}`
          });
        })
        .catch((err) => {
          setCustomAlert({
            message: err.response.data ? err.response.data.title : 'Error saving',
            header: `Error Saving Supplier`,
            type: 'danger',
          })
          setIsSaving(false)
        })
    } else {
      updateSupplier(payload)
        .then(() => {
          setCustomAlert({
            message: `Supplier edited successfully.`,
            header: `Supplier Edit`,
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
    reset(SUPPLIER_FORM_DEFAULT)
  }

  const resetAddress = (supplierAddresses: ISupplierAddress[]) => {
    setValue('supplierAddresses', supplierAddresses)
  }

  const resetContacts = (supplierContacts: ISupplierContact[]) => {
    setValue('supplierContacts', supplierContacts)
  }

  const handleSortChange = (pageProps: any) => {
    setGridSetup({
      ...gridSetup,
      sort: pageProps.sort,
    })
  }
  const handleFilter = (filter: GridFilterChangeEvent) => {
    setGridSetup({
      ...Initial_GridSetup_SupplierEmail,
      filter: filter.filter,
    })
  }

  const fetchEmailHistory = useCallback(() => {
    const { sort, skip, take, filter } = gridSetup
    const sortField = transformEmailHistorySort(sort)
    const search = filterToObject(filter)

    getSupplierEmailHistories(skip, take, sortField, supplierData?.id, search)
      .then((response: any) => {
        response.forEach((element: any) => {
          if (element.filePath) {
            var fileName = element.filePath.split('\\')
            element.file = fileName[fileName.length - 1]
            element.filePath = FILE_URL + '/' + fileName[fileName.length - 1]
          }
        })
        setTableData(response)
      })
      .catch(() => {
      })
  }, [gridSetup])

  useEffect(() => {
    fetchEmailHistory()
  }, [gridSetup, fetchEmailHistory])

  const updateSupplierContactHandler = (index: number, data: ISupplierContact) => {
    updateSupplierContact(index, data)
    if (data.isDeleted) {
      deletedSupplierContacts(data)
    }
  }


  const handleResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, autoColumns, GRID_WIDTH.GRID_SUPPLIER_HISTORY);
  }

  const handleDateBlur = (date: any, onChange: any) => {
    let newDate = new Date();
    if (date) {
      newDate = new Date(date);
    }

    let fullYear = newDate.getFullYear();
    if (fullYear < 100) {
      fullYear += 2000;
    }
    if (fullYear < 1000) {
      fullYear += 1000;
    }

    newDate.setFullYear(fullYear);
    onChange(newDate);
  };

  const handleSameAsStreetChange = () => {
    setIsSameAsStreet(!isSameAsStreet);
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
      <DeleteSupplierModal
        show={deleteModal}
        handleClose={() => setDeleteModal(false)}
        supplierData={supplierData}
        deleteCallback={() => {
          setDeleteModal(true)
          history.push('/supplier/list')
        }}
      />
      {customAlert && <CustomAlert {...customAlert} />}
      <form onSubmit={handleSubmit(onSubmit)} onReset={onReset} name='supplier'>
        <div className='modal-body p-0'>
          <div className='d-flex justify-content-end'>
            {supplierData && (
              <button
                type='button'
                className='btn btn-primary col-auto me-4 mt-2 text-nowrap'
                onClick={() => setDeleteModal(true)}
                style={{ width: '80px' }}
                disabled={!isCanEdit}
                tabIndex={8}>
                Delete
              </button>
            )}
            <button
              type='submit'
              className='btn btn-outline-primary col-auto me-4 mt-2 text-nowrap'
              style={{ width: '80px' }}
              tabIndex={9}
              onClick={() => {
                history.push('/supplier/list')
              }}>
              Back
            </button>
            <button
              type='submit'
              className='btn btn-primary col-auto mt-2 text-nowrap'
              disabled={!isCanEdit || isSaving}
              style={{ width: '80px' }}
              tabIndex={10}>
              Save
            </button>
          </div>
        </div>
        <div className='modal-body p-0'>
          <h4>Supplier Information</h4>
          <div className='row'>
            <div className='col-12'>
              <table className='w-100'>
                <tbody>
                  <tr>
                    <td style={{ width: 'calc(100% / 12)' }}>
                      <label className='form-label'>Supplier Name</label>
                    </td>
                    <td colSpan={5} rowSpan={1}>
                      <input
                        type='text'
                        className={`form-control${errors.name ? ' border-danger' : ''}`}
                        placeholder='Enter Supplier Name'
                        disabled={!isCanEdit}
                        {...register('name')}
                        tabIndex={1}
                        autoFocus />
                    </td>
                    <td style={{ width: '33.33%' }}>&nbsp;</td>
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
                        tabIndex={7}
                      />
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label'>
                        Suburb
                      </label>
                    </td>
                    <td>
                      <input
                        type='text'
                        className={`form-control${errors.suburb ? ' border-danger' : ''}`}
                        placeholder=''
                        disabled={!isCanEdit}
                        tabIndex={8}
                        {...register('suburb')}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <label className='form-label'>
                        State
                      </label>
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name='state'
                        render={({ field: { value, name, onChange } }) => {
                          return (
                            <Select
                              options={transformStatesOption(optionStates)}
                              onChange={(event: any) => onChange(event.value)}
                              className={`controllerSelect${errors.state ? ' border-danger' : ''
                                }`}
                              name={name}
                              value={transformStatesOption(optionStates).find(
                                (cl: any) => cl.value === value
                              )}
                              isDisabled={!isCanEdit}
                              tabIndex={9}
                            ></Select>
                          )
                        }}
                      />
                      <ErrorMessage errors={errors} name='state' />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <label className='form-label'>
                        Postcode
                      </label>
                    </td>
                    <td>
                      <input
                        type='text'
                        className={`form-control${errors.postCode ? ' border-danger' : ''}`}
                        placeholder=''
                        disabled={!isCanEdit}
                        tabIndex={10}
                        {...register('postCode')}
                      />
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label'>
                        Postal Address
                      </label>
                    </td>
                    <td colSpan={5} rowSpan={1}>
                      <input
                        type='text'
                        className={`form-control${errors.postalAddress ? ' border-danger' : ''}`}
                        placeholder=''
                        disabled={isSameAsStreet || !isCanEdit}
                        {...register('postalAddress')}
                        tabIndex={11}
                      />
                    </td>
                    <td>
                      <div className="form-check mt-2">
                        <label className="form-label" >
                          <input className="form-check-input" type="checkbox"
                            disabled={!isCanEdit}
                            checked={isSameAsStreet}
                            onChange={handleSameAsStreetChange}
                            tabIndex={12} />
                          Same as Street Address
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label'>
                        Suburb
                      </label>
                    </td>
                    <td>
                      <input
                        type='text'
                        className={`form-control${errors.postalSuburb ? ' border-danger' : ''}`}
                        placeholder=''
                        disabled={isSameAsStreet || !isCanEdit}
                        tabIndex={13}
                        {...register('postalSuburb')}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <label className='form-label'>
                        State
                      </label>
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name='postalState'
                        render={({ field: { value, name, onChange } }) => {
                          return (
                            <Select
                              options={transformStatesOption(optionStates)}
                              onChange={(event: any) => onChange(event.value)}
                              className={`controllerSelect${errors.postalState ? ' border-danger' : ''
                                }`}
                              name={name}
                              value={transformStatesOption(optionStates).find(
                                (cl: any) => cl.value === value
                              )}
                              isDisabled={isSameAsStreet || !isCanEdit}
                              tabIndex={14}
                            ></Select>
                          )
                        }}
                      />
                      <ErrorMessage errors={errors} name='postalState' />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <label className='form-label'>
                        Postcode
                      </label>
                    </td>
                    <td>
                      <input
                        type='text'
                        className={`form-control${errors.postalPostCode ? ' border-danger' : ''}`}
                        placeholder=''
                        disabled={isSameAsStreet || !isCanEdit}
                        tabIndex={15}
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
                        render={({ field: { value, onChange } }) => {
                          return (
                            <PhoneInput1 phoneNumber={value} onChangeHandler={onChange} tabIndex={2}></PhoneInput1>
                          )
                        }}
                      />
                      <ErrorMessage
                        errors={errors}
                        name='phone'
                        as={<span className='spanError' />}
                      />
                    </td>
                    <td colSpan={4} rowSpan={1}>&nbsp;</td>
                    <td colSpan={1}>
                      <label className='form-label'>
                        Operating Hours
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label'>
                        Main Email
                      </label>
                    </td>
                    <td colSpan={5} rowSpan={1}>
                      <input
                        type='email'
                        className={`form-control${errors.email ? ' border-danger' : ''}`}
                        placeholder='Email'
                        disabled={!isCanEdit}
                        tabIndex={4}
                        {...register('email')}
                      />
                    </td>
                    <td colSpan={1} rowSpan={2}>
                      <textarea
                        className={`form-control${errors.operatingHrs ? ' border-danger' : ''}`}
                        placeholder='Enter Operating Hours'
                        disabled={!isCanEdit}
                        tabIndex={6}
                        {...register('operatingHrs')}
                        rows={3}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label'>
                        Contact Person
                      </label>
                    </td>
                    <td colSpan={5} rowSpan={1}>
                      <input
                        type='text'
                        className={`form-control${errors.contactPerson ? ' border-danger' : ''}`}
                        placeholder='Enter Contact Person'
                        tabIndex={5}
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
        <div className='modal-body p-0 mt-5'>
          <h4>Contacts</h4>
          <div className='row'>
            <div className='col-12'>
              <ContactComponent
                addSupplierContact={(newData: any) => addSupplierContact(0, newData)}
                supplierContacts={supplierContacts}
                optionStates={optionStates}
                optionAddressType={optionAddressType}
                updateSupplierContact={(index: any, value: any) =>
                  updateSupplierContactHandler(index, value)
                }
                removeSupplierContact={(index: any) => removeSupplierContact(index)}
                resetContacts={(supplierContact: ISupplierContact[]) =>
                  resetContacts(supplierContact)
                }
                replaceContacts={(supplierContact: ISupplierContact[]) => replaceSupplierContact(supplierContact)}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <h3 className='mb-1 mt-2'>Supplier Approval</h3>
              <table className='w-100'>
                <tbody>
                  <tr>
                    <td style={{ width: 'calc(100% / 12)' }}>
                      <label className='form-label'>
                        Initial Review
                      </label>
                    </td>
                    <td style={{ width: 'calc(100% * 2 / 12)' }}>
                      <Controller
                        control={control}
                        name='supplierApproval.initialDate'
                        render={({ field: { value, name, onChange, onBlur } }) => {
                          const date = value ? new Date(value || '') : null
                          return (
                            <DatePicker
                              format='dd/MM/yyyy'
                              name={name}
                              value={date}
                              onChange={onChange}
                              disabled={!isCanEdit}
                              tabIndex={11}
                              onBlur={() => {
                                onBlur();
                                handleDateBlur(value, onChange);
                              }}
                            />
                          )
                        }}
                      /></td>
                    <td style={{ textAlign: 'right' }}>
                      <label className="form-label" >
                        <input className="form-check-input me-2" type="checkbox"
                          disabled={!isCanEdit}
                          {...register(`supplierApproval.initialApproved`)}
                          tabIndex={12} />
                        Approved Supplier
                      </label>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <label className="form-label" >
                        <input className="form-check-input me-2" type="checkbox"
                          disabled={!isCanEdit}
                          {...register(`supplierApproval.initialCritical`)}
                          tabIndex={13} />
                        Critical Supplier
                      </label>
                    </td>
                    <td>
                      <label className='form-label'>
                        Approved by:
                      </label>
                    </td>
                    <td style={{ width: 'calc(100% * 1 / 6)' }}>
                      <select
                        style={{ width: '100%' }}
                        className={`form-control`}
                        disabled={!isCanEdit}
                        tabIndex={14}
                        {...register(`supplierApproval.initialApprovedBy`)}
                      >
                        <option value={0}>Select Approver</option>
                        {(userApproval || []).map((item, idx) => {
                          return (
                            <option key={idx} value={item.id}>
                              {item.firstName + ' ' + item.lastName}
                            </option>
                          )
                        })}
                      </select>
                    </td>
                    <td style={{ width: 'calc(100% / 3)' }}>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label className='form-label col-md-auto me-1' htmlFor=''>
                        Last Review
                      </label>
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name='supplierApproval.lastDate'
                        render={({ field: { value, name, onChange, onBlur } }) => {
                          const date = value ? new Date(value || '') : null
                          return (
                            <DatePicker
                              format='dd/MM/yyyy'
                              name={name}
                              value={date}
                              onChange={onChange}
                              disabled={!isCanEdit}
                              tabIndex={15}
                              onBlur={() => {
                                onBlur();
                                handleDateBlur(value, onChange);
                              }}
                            />
                          )
                        }}
                      />
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <label className="form-label" >
                        <input className="form-check-input me-2" type="checkbox"
                          disabled={!isCanEdit}
                          {...register(`supplierApproval.lastApproved`)}
                          tabIndex={16} />
                        Approved Supplier
                      </label>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <label className="form-label" >
                        <input className="form-check-input me-2" type="checkbox"
                          disabled={!isCanEdit}
                          {...register(`supplierApproval.lastCritical`)}
                          tabIndex={17} />
                        Critical Supplier
                      </label>
                    </td>
                    <td>
                      <label className='form-label'>
                        Approved by:
                      </label>
                    </td>
                    <td>
                      <select
                        className={`form-control`}
                        disabled={!isCanEdit}
                        {...register(`supplierApproval.lastApprovedBy`)}
                        tabIndex={18}
                      >
                        <option value={0}>Select Approver</option>
                        {(userApproval || []).map((item, idx) => {
                          return (
                            <option key={idx} value={item.id}>
                              {item.firstName + ' ' + item.lastName}
                            </option>
                          )
                        })}
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label className='form-label col-md-auto me-1' htmlFor=''>
                        Next Review Due
                      </label>
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name='supplierApproval.nextDate'
                        render={({ field: { value, name, onChange, onBlur } }) => {
                          const date = value ? new Date(value || '') : null
                          return (
                            <DatePicker
                              format='dd/MM/yyyy'
                              name={name}
                              value={date}
                              onChange={onChange}
                              disabled={!isCanEdit}
                              tabIndex={19}
                              onBlur={() => {
                                onBlur();
                                handleDateBlur(value, onChange);
                              }}
                            />
                          )
                        }}
                      />
                    </td>
                    <td colSpan={2} rowSpan={1}>&nbsp;</td>
                    <td colSpan={2} rowSpan={1}>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  )
}

export { SupplierForm }
