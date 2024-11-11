import {ErrorMessage} from '@hookform/error-message'
import {yupResolver} from '@hookform/resolvers/yup'
import {DatePicker} from '@progress/kendo-react-dateinputs'
import React, {useContext, useEffect, useState} from 'react'
import {Controller, useForm, useWatch} from 'react-hook-form'
import {useHistory, useLocation} from 'react-router-dom'
import Select from 'react-select'
import {useEffectOnce} from 'react-use'
import { CustomAlert, IAlert } from '../../../shared/components/CustomAlert'
import {dataProvider} from '../../../shared/data/data-provider'
import {INcr, IUser, IUserData} from '../../users/models/user-model'
import {createNonConformance, getAllUsers, updateNonConformance, getNewNCRnumber, deleteNonConformance} from '../api'
import {NON_CONFORMANCEFORM_DEFAULT} from '../constant/nonconformance-default'
import {NonConformanceContext} from '../context/NonConformanceContext'
import {ICorrectiveAction, IDetermineCause, INatureOfConference, INCrecordedBy, IReviewOfCorrectiveAction} from '../models/config-model'
import {INoncoformanceData} from '../models/nonconformance-model'
import {
  transformCorrectiveOption,
  transformDetermineCauseOption,
  transformNatureOption,
  transformPurchaseOption,
  transformUserOption,
  transformRecordedBy,
  transformJobOption,
  transformReviewCorrectiveOption,
  transformAdminUserOption
} from '../transformers/non-conformance-transaformer'
import {nonConformanceFormValidationSchema} from '../validators/non-conformance-form'
import { DeleteButton } from '../../../../_metronic/partials/content/button/action/DeleteButton'

interface IProps {
  nonConformanceData?: INoncoformanceData | null
  isCanEdit: boolean
  isFieldDisabled: boolean
  userLists: IUser[]
  adminUserLists: IUser[]
}

const EDIT_FIELD = 'inEdit'
const NonConformanceForm: React.FC<IProps> = ({
  nonConformanceData,
  isCanEdit,
  isFieldDisabled,
  userLists,
  adminUserLists
}) => {
  const history = useHistory()
  const {setSelectedData, getAllAvailablePOAsync, purchases, jobs, getJobsAsync} = useContext(NonConformanceContext)

  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [customAlert, setCustomAlert] = useState<IAlert | undefined>()

  const search = useLocation().search
  const copy: string | null = new URLSearchParams(search).get('copy')

  const [natureOfNonConference, setNatureOfConference] = useState<INatureOfConference[]>([])
  // const [users, setUsers] = useState<IUser[]>([])
  const [determineCauses, setdetermineCause] = useState<IDetermineCause[]>([])
  const [determineCauseCode, setdetermineCauseCode] = useState<string>('')
  const [correctiveActions, setcorrectiveActions] = useState<ICorrectiveAction[]>([])
  const [reviewcorrectiveActions, setreviewcorrectiveActions] = useState<IReviewOfCorrectiveAction[]>([])
  const [correctiveAction, setcorrectiveAction] = useState<string>('')
  const [ncRecordedBy, setNCrecordedBy] = useState<INCrecordedBy[]>([])

  useEffectOnce(() => {
    getAllReferences()
  })

  const getAllReferences = async () => {
    // const users: any = await getAllUsers();

    setNatureOfConference(dataProvider.natureOfConference)
    setdetermineCause(dataProvider.determineCause)
    setcorrectiveActions(dataProvider.correctiveAction)
    setreviewcorrectiveActions(dataProvider.reviewOfCorrectiveAction)
    setNCrecordedBy(dataProvider.ncRecorderBy)
    getAllAvailablePOAsync()
    getJobsAsync()
    // setUsers(users.data)
  }

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
  } = useForm({
    defaultValues: nonConformanceData || NON_CONFORMANCEFORM_DEFAULT,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(nonConformanceFormValidationSchema),
  })

  const determineIdValue = useWatch({
    control,
    name: 'determineCause',
  })
  const correctedActionIdValue = useWatch({
    control,
    name: 'correctedAction',
  })

  useEffect(() => {
    if (!isFieldDisabled){
      getNewNCRnumber()
      .then(response => {
        console.log('new n ', response.data)
        setValue('ncrNumber', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
    console.log(jobs)
  }, [setValue]);

  useEffect(() => {
    if (determineIdValue) {
      setdetermineCauseCode(determineIdValue)
    }
  }, [determineIdValue, determineCauses, setValue])

  useEffect(() => {
    if (correctedActionIdValue) {
      setcorrectiveAction(correctedActionIdValue)
    }
  }, [correctedActionIdValue, correctiveActions, setValue])

  const onSubmit = async (values: INoncoformanceData) => {
    const payload: INoncoformanceData = values
    setIsSaving(true)
    if (values.id === 0) {
      createNonConformance(payload)
        .then(() => {
          setCustomAlert({
            message: `Non-Conformance added successfully.`,
            header: `Non-Conformance Add`,
            type: 'primary',
          })
          setIsSaving(false)
        })
        .catch((err) => {
          setCustomAlert({
            message: err.response.data ? err.response.data.title : 'Error saving',
            header: `Error Saving Non-Conformance`,
            type: 'danger',
          })
          setIsSaving(false)
        })
    } else {
      updateNonConformance(payload)
        .then(() => {
          setCustomAlert({
            message: `Non-Conformance edited successfully.`,
            header: `Non-Conformance Edit`,
            type: 'primary',
          })
          setIsSaving(false)
        })
        .catch((err) => {
          setCustomAlert({
            message: err.response.data ? err.response.data.title : 'Error saving',
            header: `Error Edit Non-Conformance`,
            type: 'danger',
          })
          setIsSaving(false)
        })
    }
  }
  const onReset = () => {
    reset(NON_CONFORMANCEFORM_DEFAULT)
  }

  return (
      <React.Fragment>
    
      {customAlert && <CustomAlert {...customAlert} />}
      <form onSubmit={handleSubmit(onSubmit)} onReset={onReset} name='non-conformance'>
        <div className='modal-body' style={{ padding: '0px'}}>
            <div className='d-flex'>
                <button type='reset' className='btn btn-primary col-auto me-auto' tabIndex={22}>
                  Clear
                </button>
                {(nonConformanceData?.id || 0) > 0 && (
                  <DeleteButton title={`Delete Non conformance ${nonConformanceData?.id}`}
                    modalMessage={'You are deleting a Non conformance, Continue?'}
                    className={'me-5'}
                    disabled={false}
                    deleteHandler={() => {
                      if (nonConformanceData) {
                        deleteNonConformance(nonConformanceData).then(() => {
                          history.push('/non-conformance/list')
                        })
                      }
                    }}></DeleteButton>
                )}   
                <button
                  type='submit'
                  className='btn btn-outline-primary col-auto me-4'
                  tabIndex={23}
                  onClick={() => {
                    history.push('/non-conformance/list')
                  }}
                >
                  Back
                </button>
                <button type='submit' className='btn btn-primary col-auto' disabled={isSaving} tabIndex={24}>
                  Save
                </button>
            </div>
        </div>
        <div className='row job-information-container mt-5'>
          <div className='col-12 col-lg-4 col-md-4'>
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
                      <label className='form-label' htmlFor='ncrNumber'>
                      NCR Number
                      </label>
                    </td>
                    <td>
                    <input
                        type='text'
                        className={`form-control`}
                        disabled={true}
                        {...register('ncrNumber')}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
        <div className='row job-information-container mt-5'>
          <div className='col-12 col-lg-4 col-md-4'>
            <table style={{width: '100%'}}>
              <tbody>
              <tr>
                  <th style={{width: '30%'}}></th>
                  <th></th>
                </tr>
                <tr>
                  <td>
                    <label className='form-label col-12' htmlFor='recordedBy'>
                        Non Conformance Recorded by:
                    </label>
                  </td>
                  <td>
                      <Controller
                      control={control}
                      name='recordedBy'
                      render={({field: {value, name, onChange}}) => {
                        return (
                          <Select
                            options={transformRecordedBy(ncRecordedBy)}
                            onChange={(event: any) => onChange(event.value)}
                            className={`controllerSelect${
                              errors.recordedBy ? ' border-danger' : ''
                            }`}
                            name={name}
                            value={transformRecordedBy(ncRecordedBy).find(
                              (cl: any) => cl.value === value
                            )}
                            isDisabled={!isCanEdit}
                            tabIndex={2}
                          ></Select>
                        )
                      }}
                    />
                    <ErrorMessage errors={errors} name='recordedBy' />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='form-label col-12' htmlFor='natureOfNonConference'>
                        Nature of Non-Conformance:
                    </label>
                  </td>
                  <td>
                  <Controller
                      control={control}
                      name='natureOfNonConference'
                      render={({field: {value, name, onChange}}) => {
                        return (
                          <Select
                            options={transformNatureOption(natureOfNonConference)}
                            onChange={(event: any) => onChange(event.value)}
                            className={`controllerSelect${
                              errors.natureOfNonConference ? ' border-danger' : ''
                            }`}
                            name={name}
                            value={transformNatureOption(natureOfNonConference).find(
                              (cl: any) => cl.value === value
                            )}
                            isDisabled={!isCanEdit}
                            tabIndex={2}
                          ></Select>
                        )
                      }}
                    />
                    <ErrorMessage errors={errors} name='natureOfNonConference' />
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
                      <label className='form-label' htmlFor='dateRecorded'>
                          Date Recorded
                      </label>
                    </td>
                    <td>
                    <Controller
                        control={control}
                        name='dateRecorded'
                        render={({field: {value, name, onChange}}) => {
                          return (
                            <DatePicker
                              format='dd/MM/yyyy'
                              name={name}
                              onChange={onChange}
                              value={value ? new Date(value || '') : null}
                              disabled={isFieldDisabled}
                            />
                          )
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label' htmlFor='jobNumber'>
                          Job Number
                      </label>
                    </td>
                    <td>
                      {/* <input type='text'
                        className={`form-control${errors.jobNumber ? ' border-danger' : ''}`}
                        disabled={isFieldDisabled}
                        {...register('jobNumber')}
                        tabIndex={3}
                      />
                      <ErrorMessage errors={errors} name='jobNumber' /> */}
                      <Controller
                          control={control}
                          name='jobNumber'
                          render={({field: {value, name, onChange}}) => {
                            return (
                              <Select
                                options={transformJobOption(jobs)}
                                onChange={(event: any) => onChange(event.value)}
                                className={`controllerSelect${
                                  errors.determineCause ? ' border-danger' : ''
                                }`}
                                name={name}
                                value={transformJobOption(jobs).find(
                                  (cl: any) => cl.value === value
                                )}
                                isDisabled={!isCanEdit}
                                tabIndex={3}
                              ></Select>
                            )
                          }}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label' htmlFor='operator'>
                          Operator
                      </label>
                    </td>
                    <td>
                    <input
                      type='text'
                      className={`form-control${errors.operator ? ' border-danger' : ''}`}
                      disabled={isFieldDisabled}
                      {...register('operator')}
                      tabIndex={5}
                          />
                          {/* <Controller
                          control={control}
                          name='operator'
                          render={({field: {value, name, onChange}}) => {
                            return (
                              <Select
                                options={transformUserOption(userLists)}
                                onChange={(event: any) => onChange(event.value)}
                                className={`controllerSelect${errors.operator ? ' border-danger' : ''}`}
                                name={name}
                                value={transformUserOption(userLists).find((cl: any) => cl.value === value)}
                                isDisabled={isFieldDisabled}
                              ></Select>
                            )
                          }}
                        /> */}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label' htmlFor='clientNcrNumber'>
                          Client NCR No.
                      </label>
                    </td>
                    <td>
                    <input
                          type='text'
                          className={`form-control${errors.clientNcrNumber ? ' border-danger' : ''}`}
                          disabled={isFieldDisabled}
                          {...register('clientNcrNumber')}
                          tabIndex={7}
                        />
                        <ErrorMessage errors={errors} name='clientNcrNumber' />
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
        <div className='row job-information-container mt-5'>
            <div className='col-12 col-lg-8 col-md-8'>
              <table style={{width: '100%'}}>
                <tbody>
                <tr>
                    <th style={{width: '15%'}}></th>
                    <th></th>
                </tr>
                <tr>
                    <td>
                      <label className='form-label col-12' htmlFor='natureNotes'>
                            Nature of Non-Conformance Notes:
                      </label>
                    </td>
                    <td>
                      <textarea
                      className={`form-control${errors.natureNotes ? ' border-danger' : ''}`}
                      tabIndex={4}
                      {...register('natureNotes')}
                        />
                        <ErrorMessage errors={errors} name='natureNotes' />
                    </td>
                  </tr> 
                </tbody>
              </table>
            </div>
        </div>
        <div className='row job-information-container mt-5'>
          <div className='col-12 col-lg-4 col-md-4'>
          <table style={{width: '100%'}}>
              <tbody>
              <tr>
                  <th style={{width: '30%'}}></th>
                  <th></th>
                </tr>
                <tr>
                  <td>
                    <label className='form-label col-12' htmlFor='determineCause'>
                      Determined Cause
                    </label>
                  </td>
                    <td>
                          <Controller
                          control={control}
                          name='determineCause'
                          render={({field: {value, name, onChange}}) => {
                            return (
                              <Select
                                options={transformDetermineCauseOption(determineCauses)}
                                onChange={(event: any) => onChange(event.value)}
                                className={`controllerSelect${
                                  errors.determineCause ? ' border-danger' : ''
                                }`}
                                name={name}
                                value={transformDetermineCauseOption(determineCauses).find(
                                  (cl: any) => cl.value === value
                                )}
                                isDisabled={!isCanEdit}
                                tabIndex={9}
                              ></Select>
                            )
                          }}
                        />
                    </td>
                </tr>
                <tr>
                  <td>
                    <label className='form-label col-12' htmlFor='correctedAction'>
                        Corrective Action
                    </label>
                  </td>
                  <td>
                  <Controller
                      control={control}
                      name='correctedAction'
                      render={({field: {value, name, onChange}}) => {
                        return (
                          <Select
                            options={transformCorrectiveOption(correctiveActions)}
                            onChange={(event: any) => onChange(event.value)}
                            className={`controllerSelect${
                              errors.correctedAction ? ' border-danger' : ''
                            }`}
                            name={name}
                            value={transformCorrectiveOption(correctiveActions).find(
                              (cl: any) => cl.value === value
                            )}
                            tabIndex={11}
                            isDisabled={!isCanEdit}
                          ></Select>
                        )
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='form-label col-12' htmlFor='action'>
                    Action By
                    </label>
                  </td>
                    <td>
                    <Controller
                      control={control}
                      name='action'
                      render={({field: {value, name, onChange}}) => {
                        return (
                          <Select
                            options={transformUserOption(userLists)}
                            onChange={(event: any) => onChange(event.value)}
                            className={`controllerSelect${errors.action ? ' border-danger' : ''}`}
                            name={name}
                            value={transformUserOption(userLists).find((cl: any) => cl.value === value)}
                            isDisabled={!isCanEdit}
                            tabIndex={13}
                          ></Select>
                        )
                      }}
                    />
                    </td>
                  </tr>
                  <tr>
                  <td>
                    <label className='form-label col-12' htmlFor='reviewOfCorrectiveAction'>
                      Review of Corrective Action
                    </label>
                  </td>
                    <td>
                      <Controller
                        control={control}
                        name='reviewOfCorrectiveAction'
                        render={({field: {value, name, onChange}}) => {
                          return (
                            <Select
                              options={transformReviewCorrectiveOption(reviewcorrectiveActions)}
                              onChange={(event: any) => onChange(event.value)}
                              className={`controllerSelect${
                                errors.reviewOfCorrectiveAction ? ' border-danger' : ''
                              }`}
                              name={name}
                              value={transformReviewCorrectiveOption(reviewcorrectiveActions).find((cl: any) => cl.value === value)}
                              isDisabled={!isCanEdit}
                              tabIndex={15}
                            ></Select>
                          )
                        }}
                        />
                    </td>
                  </tr>
                  <tr>
                  <td>
                    <label className='form-label col-12' htmlFor='iunderTakenBy'>
                        Undertaken By
                    </label>
                  </td>
                    <td>
                    <Controller
                    control={control}
                      name='iunderTakenBy'
                      render={({field: {value, name, onChange}}) => {
                        return (
                          <Select
                            options={transformUserOption(userLists)}
                            onChange={(event: any) => onChange(event.value)}
                            className={`controllerSelect${errors.iunderTakenBy ? ' border-danger' : ''}`}
                            name={name}
                            value={transformUserOption(userLists).find((cl: any) => cl.value === value)}
                            isDisabled={!isCanEdit}
                            tabIndex={17}
                          ></Select>
                        )
                      }}
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
                      <label className='form-label' htmlFor='otherCause'>
                      Determined Cause Notes
                      </label>
                    </td>
                    <td>
                      <input
                          type='text'
                          className={`form-control${errors.otherCause ? ' border-danger' : ''}`}
                          disabled={!isCanEdit}
                          {...register('otherCause')}
                          tabIndex={11}
                        />
                        <ErrorMessage errors={errors} name='otherCause' />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label' htmlFor='correctiveNotes'>
                          Corrective Action Notes
                      </label>
                    </td>
                    <td>
                        <input
                          type='text'
                          className={`form-control${errors.correctiveNotes ? ' border-danger' : ''}`}
                          disabled={!isCanEdit}
                          {...register('correctiveNotes')}
                          tabIndex={12}
                        />
                        <ErrorMessage errors={errors} name='correctiveNotes' />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label' htmlFor='actionDate'>
                          Action Date
                      </label>
                    </td>
                    <td>
                        <Controller
                            control={control}
                            name='actionDate'
                            render={({field: {value, name, onChange}}) => {
                              return (
                                <DatePicker
                                  format='dd/MM/yyyy'
                                  name={name}
                                  onChange={onChange}
                                  value={value ? new Date(value || '') : null}
                                  disabled={!isCanEdit}
                                  tabIndex={14}
                                />
                              )
                            }}
                          />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label' htmlFor='reviewDate'>
                         Review Date
                      </label>
                    </td>
                    <td>
                        <Controller
                          control={control}
                          name='reviewDate'
                          render={({field: {value, name, onChange}}) => {
                            return (
                              <DatePicker
                                format='dd/MM/yyyy'
                                name={name}
                                onChange={onChange}
                                value={value ? new Date(value || '') : null}
                                disabled={!isCanEdit}
                                tabIndex={16}
                              />
                            )
                          }}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='form-label' htmlFor='completedDate'>
                         Completed Date
                      </label>
                    </td>
                    <td>
                        <Controller
                        control={control}
                        name='completedDate'
                        render={({field: {value, name, onChange}}) => {
                          return (
                            <DatePicker
                              format='dd/MM/yyyy'
                              name={name}
                              onChange={onChange}
                              value={value ? new Date(value || '') : null}
                              disabled={!isCanEdit}
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
        </div>
        <div className='row job-information-container mt-5'>
            <div className='col-12 col-lg-8 col-md-8'>
              <table style={{width: '100%'}}>
                <tbody>
                <tr>
                    <th style={{width: '15%'}}></th>
                    <th></th>
                </tr>
                <tr>
                    <td>
                      <label className='form-label col-12' htmlFor='note'>
                          Note
                      </label>
                    </td>
                    <td>
                    <textarea
                        className={`form-control${errors.note ? ' border-danger' : ''}`}
                        disabled={!isCanEdit}
                        {...register('note')}
                        tabIndex={19}
                      />
                      <ErrorMessage errors={errors} name='note' />
                    </td>
                  </tr> 
                </tbody>
              </table>
            </div>
        </div>
        <div className='row job-information-container mt-5'>
          <div className='col-12 col-lg-4 col-md-4'>
          <table style={{width: '100%'}}>
              <tbody>
                <tr>
                  <th style={{width: '30%'}}></th>
                  <th></th>
                </tr>
                <tr>
                    <td>
                      <label className='form-label col-12' htmlFor='ncrClearedBy'>
                            NCR Cleared By
                      </label>
                    </td>
                    <td>
                      <Controller
                            control={control}
                            name='ncrClearedBy'
                            render={({field: {value, name, onChange}}) => {
                              return (
                                <Select
                                  options={transformAdminUserOption(adminUserLists)}
                                  onChange={(event: any) => onChange(event.value)}
                                  className={`controllerSelect${errors.ncrClearedBy ? ' border-danger' : ''}`}
                                  name={name}
                                  value={transformAdminUserOption(adminUserLists).find((cl: any) => cl.value === value)}
                                  isDisabled={!isCanEdit}
                                  tabIndex={20}
                                ></Select>
                              )
                            }}
                          />
                    </td>
                 </tr>
                 <tr>
                    <td>
                      <label className='form-label col-12' htmlFor='linkTo'>
                          Link To
                      </label>
                    </td>
                    <td>
                    <input
                        type='text'
                        className={`form-control${errors.linkTo ? ' border-danger' : ''}`}
                        {...register('linkTo')}
                        tabIndex={8}
                      />
                      <ErrorMessage errors={errors} name='linkTo' />
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
                      <label className='form-label' htmlFor='ncrClearedDate'>
                         Cleared Date
                      </label>
                    </td>
                    <td>
                    <Controller
                        control={control}
                        name='ncrClearedDate'
                        render={({field: {value, name, onChange}}) => {
                          return (
                            <DatePicker
                              format='dd/MM/yyyy'
                              name={name}
                              onChange={onChange}
                              value={value ? new Date(value || '') : null}
                              disabled={!isCanEdit}
                              tabIndex={21}
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
       
      </form>
    </React.Fragment>
  )
}

export {NonConformanceForm}
