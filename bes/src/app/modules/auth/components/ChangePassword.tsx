import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import { useDispatch } from 'react-redux'
import { changePassword, resetPassword, updateChangePasswordIsRequired } from '../redux/AuthCRUD'
import {useHistory} from 'react-router-dom'
import { usePageData } from '../../../../_metronic/layout/core'
// import * as auth from '../redux/AuthRedux'

const initialValues = {
  password: '',
  confirmPassword: '',
  oldPassword: ''
}

const resetPasswordSchema = Yup.object().shape({
   password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .max(50, 'Maximum 50 characters')
    .required('Password is required')
    .test("isValidPass", "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One special case Character", (value:any, context) => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSymbol = /["!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/.test(value);
      let validConditions = 0;
      const numberOfMustBeValidConditions = 4;
      const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbol];
      conditions.forEach((condition) =>
        condition ? validConditions++ : null
      );
      if (validConditions >= numberOfMustBeValidConditions) {
        return true;
      }
      return false;
    }),
    confirmPassword: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
  oldPassword: Yup.string()
  .min(6, 'Minimum 6 characters')
  .max(50, 'Maximum 50 characters')
  .required('Password is required')
  .test("isValidPass", "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One special case Character", (value:any, context) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /["!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/.test(value);
    let validConditions = 0;
    const numberOfMustBeValidConditions = 4;
    const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbol];
    conditions.forEach((condition) =>
      condition ? validConditions++ : null
    );
    if (validConditions >= numberOfMustBeValidConditions) {
      return true;
    }
    return false;
  })
})

export function ChagePassword() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const history = useHistory()
  const { currentUser } = usePageData();
  const formik = useFormik({
    initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setHasErrors(undefined)
      let email = localStorage.getItem("loginEmail")
      setTimeout(() => {
        changePassword(values.oldPassword,values.password,email)
          .then(({data: {token}}) => {
            setLoading(false)
            setHasErrors(false)
            updateChangePasswordIsRequired(currentUser.id);
          })
          .catch((e) => {
            setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
            setStatus('The old password detail is incorrect')
          })
      }, 1000)
    },
  })

  return (
    <>
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework modal-body'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik.handleSubmit}
      >
        <div className='text-left mb-10'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>Change Password</h1>
          {/* end::Title */}
        </div>

        {/* begin::Title */}
        {hasErrors === true && (
          <div className='mb-lg-15 alert alert-danger col-lg-6 col-md-6 col-12'>
            <div className='alert-text font-weight-bold'>
              Sorry, old password is incorrect, please try again.
            </div>
          </div>
        )}

        {hasErrors === false && (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info'>Password changed, please relogin.</div>
          </div>
        )}
        {/* end::Title */}

        {/* begin::Form group */}
        <div className='fv-row mb-10 col-lg-6 col-md-6 col-12'>
          <label className='form-label fw-bolder text-gray-900 fs-6'>Old Password</label>
          <input
            type='password'
            placeholder='Old Password'
            autoComplete='off'
            {...formik.getFieldProps('oldPassword')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.oldPassword && formik.errors.oldPassword},
              {
                'is-valid': formik.touched.oldPassword && !formik.errors.oldPassword,
              }
            )}
            autoFocus
            tabIndex={1}
          />
          {formik.touched.oldPassword && formik.errors.oldPassword && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.oldPassword}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}
        <div className='fv-row mb-10 col-lg-6 col-md-6 col-12'>
          <label className='form-label fw-bolder text-gray-900 fs-6'>Password</label>
          <input
            type='password'
            placeholder='Password'
            autoComplete='off'
            {...formik.getFieldProps('password')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.password && formik.errors.password},
              {
                'is-valid': formik.touched.password && !formik.errors.password,
              }
            )}
            tabIndex={2}
          />
          {formik.touched.password && formik.errors.password && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>
        {/* begin::Form group */}
         <div className='fv-row mb-10 col-lg-6 col-md-6 col-12'>
          <label className='form-label fw-bolder text-gray-900 fs-6'>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm Password'
            autoComplete='off'
            {...formik.getFieldProps('confirmPassword')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword},
              {
                'is-valid': formik.touched.confirmPassword && !formik.errors.confirmPassword,
              }
            )}
            tabIndex={3}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.confirmPassword}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='d-flex flex-wrap justify-content-left pb-lg-0'>
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn btn-lg btn-primary fw-bolder me-4'
            tabIndex={4}
          >
            <span className='indicator-label'>Submit</span>
            {loading && (
              <span className='indicator-progress'>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <Link to='/settings'>
            <button
              type='button'
              id='kt_login_password_reset_form_cancel_button'
              className='btn btn-lg btn-light-primary fw-bolder'
              disabled={formik.isSubmitting || !formik.isValid}
              tabIndex={5}
            >
              Cancel
            </button>
          </Link>{' '}
        </div>
        {/* end::Form group */}
      </form>
    </>
  )
}
