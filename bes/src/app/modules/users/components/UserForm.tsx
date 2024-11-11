import {yupResolver} from '@hookform/resolvers/yup'
import React, {useEffect, useReducer} from 'react'
import Select from 'react-select'
import {useContext, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import {CustomAlert, IAlert} from '../../../shared/components/CustomAlert'
import {USER_FORM_DEFAULT, USER_STATUS} from '../constant/user-default'
import {UserContext} from '../context/UserContext'
import {IUserData} from '../models/user-model'
import {userFormValidationSchema} from '../validators/user-form'
import {
  transformDataAdminRoles,
  transformDataStatus,
  transformSaveAdminRoles,
} from '../transformers/user-transformer'
import {createUser, updateUser} from '../api'
import {DeleteUserModal} from './DeleteUserModal'
import {UserFormModal} from '../enum/action'
import { usePageData } from '../../../../_metronic/layout/core'
import { ErrorMessage } from '@hookform/error-message'


interface IProps {
  userData?: IUserData
}

const userModals = {
  Delete: false,
}

const UserForm: React.FC<IProps> = ({userData}) => {
  const history = useHistory()

  const {setContextToaster, roleOptions} = useContext(UserContext)
  const [formNotification, setformNotification] = useState<IAlert | undefined>()
  const [isDisabled, setDisabled] = useState(false)

  const [modalAction, dispatchModalAction] = useReducer((state: any, action: any) => {
    switch (action.modal) {
      case UserFormModal.Delete:
        return {
          Delete: action.show,
        }
      default:
        return state
    }
  }, userModals)
  const { currentUser } = usePageData();
  var userRoles: any = currentUser.userRoles;
  useEffect(() => {
    if (!userRoles.includes("Administrator")) {
      history.push('/dashboard')
    }
}, [currentUser])
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: userData,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(userFormValidationSchema),
  })

  useEffect(() => {
    if (userData) {
      userData.selectedData = transformDataAdminRoles(userData.userRoles)
      userData.isActive = transformDataStatus(userData.status)
      userData.id === 0 ? setDisabled(false) : setDisabled(true)
      reset({
        ...userData,
      })
    } else {
      reset(USER_FORM_DEFAULT)
    }
  }, [userData, reset])

  const onSubmit = async (values: IUserData) => {
    const payload: IUserData = values
    payload.userRoles = transformSaveAdminRoles(values.selectedData)
    if (values.userRoles.length === 0) {
      setformNotification({
        message: 'Error saving No User Role',
        header: `Error Saving User`,
        type: 'danger',
      })
    }
    if (values.id === 0 && values.userRoles.length >= 1) {
      createUser(payload)
        .then(() => {
          setContextToaster({
            message: `User added successfully.`,
            header: `User Add`,
            type: 'primary',
          })
          history.push('/user/list')
        })
        .catch((err) => {
          setformNotification({
            message: err.response.data ? err.response.data : 'Error saving',
            header: `Error Saving User`,
            type: 'danger',
          })
        })
    } if (values.userRoles.length >= 1 && userData) {
      updateUser(payload)
        .then(() => {
          setContextToaster({
            message: `User edited successfully.`,
            header: `User Edit`,
            type: 'primary',
          })
          history.push('/user/list')
        })
        .catch((err) => {
          setformNotification({
            message: err.response.data ? err.response.data.title : 'Error saving',
            header: `Error Edit User`,
            type: 'danger',
          })
        })
    }
  }

  const onReset = () => {
    reset(USER_FORM_DEFAULT)
  }

  return (
    <React.Fragment>
      <DeleteUserModal
        show={modalAction.Delete}
        handleClose={() => {
          dispatchModalAction({
            modal: UserFormModal.Delete,
            show: false,
          })
        }}
        userData={userData}
        deleteCallback={() => {
          dispatchModalAction({
            modal: UserFormModal.Delete,
            show: false,
          })
          history.push('/user/list')
        }}
      />
      {formNotification && <CustomAlert {...formNotification} />}
      <form onSubmit={handleSubmit(onSubmit)} onReset={onReset} name='user'>
        <div className='modal-body'>
          <div className='d-flex'>
            <button hidden type='reset' className='btn btn-primary' tabIndex={8}>
              Clear
            </button>
          <span className='me-auto'></span>

            <button
              type='submit'
              className='btn btn-outline-primary col-auto me-4'
              tabIndex={9}
              onClick={() => {
                history.push('/user/list')
                setContextToaster({
                  message: ``,
                  header: ``,
                  type: 'primary',
                })
              }}
            >
              Back
            </button>
            {/* {userData && (
              <button
                type='button'
                className='btn btn-primary col-auto me-4'
                onClick={() => {
                  dispatchModalAction({
                    modal: UserFormModal.Delete,
                    show: true,
                  })
                }}
              >
                Delete
              </button>
            )} */}
            <button type='submit' className='btn btn-primary col-auto me-4' tabIndex={10}>
              Save
            </button>
          </div>

          <div className='row align-items-center mt-6 pe-2'>
            <div className='col-lg-3 col-md-6 col-12 mb-4'>
              <label className='form-label' htmlFor='id'>
                User ID
              </label>
              <input
                type='text'
                className={`form-control${errors.id ? ' border-danger' : ''}`}
                {...register('id')}
                disabled
              />
            </div>
          </div>
          <div className='row align-items-center mt-6 pe-2'>
            <div className='col-lg-3 col-md-3 col-12 mb-4'>
              <label className='form-label' htmlFor='userName'>
                Username <span className='text-danger'>*</span>
              </label>
              <input
                type='text'
                className={`form-control${errors.userName ? ' border-danger' : ''}`}
                placeholder='Enter Username'
                {...register('userName')}
                disabled={isDisabled}
                tabIndex={1}
                autoFocus
              />
            </div>

            <div className='col-lg-3 col-md-3 col-12 mb-4'>
              <label className='form-label' htmlFor='email'>
                Email <span className='text-danger'>*</span>
              </label>
              <input
                type='text'
                className={`form-control${errors.email ? ' border-danger' : ''}`}
                placeholder='Enter Email'
                {...register('email')}
                tabIndex={2}
                disabled={isDisabled}
              />
            </div>
          </div>
          <div className='row align-items-center mt-6 pe-2'>
            <div className='col-lg-3 col-md-3 col-12 mb-4'>
              <label className='form-label' htmlFor='firstName'>
                First Name <span className='text-danger'>*</span>
              </label>
              <input
                type='text'
                className={`form-control${errors.firstName ? ' border-danger' : ''}`}
                placeholder='Enter First Name'
                {...register('firstName')}
                tabIndex={3}
              />
            </div>

            <div className='col-lg-3 col-md-3 col-12 mb-4'>
              <label className='form-label' htmlFor='lastName'>
                Last Name <span className='text-danger'>*</span>
              </label>
              <input
                type='text'
                className={`form-control${errors.lastName ? ' border-danger' : ''}`}
                placeholder='Enter Last Name'
                tabIndex={4}
                {...register('lastName')}
              />
            </div>
          </div>
          <div className='row align-items-center mt-6 pe-2'>
            <div className='col-lg-3 col-md-3 col-12 mb-4'>
              <label className='form-label' htmlFor='isActive'>
                Status
              </label>
              <select
                className={`form-select${errors.isActive ? ' border-danger' : ''}`}
                {...register('isActive')}
                tabIndex={5}
              >
                {(USER_STATUS || []).map((item, i) => {
                  return (
                    <option key={i} value={item.value}>
                      {item.label}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className='col-lg-3 col-md-3 col-12 mb-4'>
              <label className='form-label' htmlFor='roles'>
                Roles
              </label>
              <Controller
                control={control}
                name='selectedData'
                render={({field: {onChange, value}}) => (
                  <Select
                    isMulti={true}
                    options={roleOptions}
                    value={value}
                    onChange={(e) => onChange(e)}
                    className='controllerSelect'
                    tabIndex={6}
                  />
                )}
              />
            </div>
          </div>
          {
             userData && (
              <div className='row align-items-center mt-6 pe-2'>
                <div className='col-lg-3 col-md-3 col-12 mb-4'>
                  <label className='form-label' htmlFor='isActive'>
                    New Password
                  </label>
                  <input
                    type='password'
                    className={`form-control${errors.newPassword ? ' border-danger' : ''}`}
                    placeholder='New Password'
                    tabIndex={9}
                    autoComplete="off"
                    {...register('newPassword')}
                  />
                  <ErrorMessage errors={errors} name='newPassword' as={<span className='spanError' />} />
                </div>
              </div>
             )
          }
          
          <div className='row align-items-center mt-6 pe-2'>
            <div className='col-md-6 col-12 mb-4'>
              <div className='alert alert-warning' role='alert'>
                A user will be redirected to the Reset Password Form after logging in if the box is
                checked.
              </div>
              <div className='col-9 col-form-label'>
                <div className='form-check'>
                  <label className='checkbox'>
                    <input
                      {...register('isResetPasswordRequired')}
                      type='checkbox'
                      tabIndex={8}
                    />
                    <span> Reset password required</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  )
}

export {UserForm}
