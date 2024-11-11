import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useContext, useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { CustomAlert, IAlert } from "../../../shared/components/CustomAlert";
import { createRole, deleteRole, updateRole } from "../api";
import { ROLE_FORM_DEFAULT } from "../constant/role-default";
import { RoleContext } from "../context/RoleContext";
import { RoleFormModal } from "../enum/action";
import { IRole } from "../models/role-model";
import { roleFormValidationSchema } from "../validators/role-form";
import { DeleteRoleModal } from "./DeleteRoleModal";
import { DeleteButton } from "../../../../_metronic/partials/content/button/action/DeleteButton";


interface IProps {
  roleData?: IRole
}

const roleModals = {
  Delete: false
};

const RoleForm: React.FC<IProps> = ({roleData}) => {
  const history = useHistory()
  const [customAlert, setCustomAlert] = useState<IAlert | undefined>()

  const [modalAction, dispatchModalAction] = useReducer((state: any, action: any) => {
    switch (action.modal) {
      case RoleFormModal.Delete:
        return {
          Delete: action.show
        }
      default:
        return state;
    }
  }, roleModals);
  
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: roleData,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(roleFormValidationSchema),
  })

  useEffect(() => {
    if (roleData) {
      reset({
        ...roleData,
      })
    } else {
      reset(ROLE_FORM_DEFAULT)
    }
  }, [roleData, reset])

  const onSubmit = async (values: IRole) => {
    const payload: IRole = values
    if (!roleData) {
      createRole(payload)
        .then(() => {
          setCustomAlert({
            message: `Role added successfully.`,
            header: `Role Add`,
            type: 'primary',
          })
        })
        .catch((err) => {
          setCustomAlert({
            message: err.response.data ? err.response.data : 'Error saving',
            header: `Error Saving Role`,
            type: 'danger',
          })
        })
    } else {
      updateRole(payload)
        .then(() => {
          setCustomAlert({
            message: `Role edited successfully.`,
            header: `Role Edit`,
            type: 'primary',
          })
        })
        .catch((err) => {
          setCustomAlert({
            message: err.response.data ? err.response.data.title : 'Error saving',
            header: `Error Edit Role`,
            type: 'danger',
          })
        })
    }
  }

  const onReset = () => {
    reset(ROLE_FORM_DEFAULT)
  }

  return (
    <React.Fragment>
       <DeleteRoleModal
        show={modalAction.Delete}
        handleClose={() => {
          dispatchModalAction({
            modal: RoleFormModal.Delete,
            show: false
          })
        }}
        roleData={roleData}
        deleteCallback={() => {
          dispatchModalAction({
            modal: RoleFormModal.Delete,
            show: false
          })
          history.push('/role/list')
        }}
      />
      {customAlert && <CustomAlert {...customAlert} />}
      <form onSubmit={handleSubmit(onSubmit)} onReset={onReset} name='user'>
        <div className='modal-body'>
          <div className='d-flex actions justify-content-end'>
            {roleData?.id !== '' && (
                <DeleteButton title={`Delete Role ${roleData?.name}`}
                  modalMessage={'You are deleting a Role, Continue?'}
                  className={'me-5'}
                  disabled={false}
                  deleteHandler={() => {
                    if (roleData) {
                      deleteRole(roleData).then(() => {
                        history.push('/role/list')
                      })
                    }
                  }}></DeleteButton>
              )} 
            <button className='btn btn-outline-primary col-auto me-5'
              onClick={() => {
                history.push('/role/list')
              }}
            >
              Back
            </button>
            {/* {roleData && (
              <button
                type='button'
                className='btn btn-primary col-auto me-4'
                onClick={() => {
                  dispatchModalAction({
                    modal: RoleFormModal.Delete,
                    show: true
                  })
                }}
              >
                Delete
              </button>
            )} */}
            <button type='submit' className='btn btn-primary col-auto'>
              Save
            </button>
          </div>
          <div className='row align-items-center mt-6 pe-2'>
            {/* <div className='col-lg-3 col-md-3 col-12 mb-4'>
              <label className='form-label' htmlFor='dislayId'>
                Role ID
              </label>
              <input
                type='text'
                className={`form-control${errors.id ? ' border-danger' : ''}`}
                {...register('displayId')}
                disabled
              />
            </div> */}
            <div className='col-lg-3 col-md-3 col-12 mb-4'>
              <label className='form-label' htmlFor='name'>
                Name
              </label>
              <input
                type='text'
                className={`form-control${errors.name ? ' border-danger' : ''}`}
                placeholder='Enter Name'
                autoFocus
                {...register('name')}
              />
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  )
}

export {RoleForm}
