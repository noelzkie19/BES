/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import * as auth from '../redux/AuthRedux'
import {login} from '../redux/AuthCRUD'
import { CustomAlert, IAlert } from '../../../shared/components/CustomAlert'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: '',
  password: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<IAlert | undefined>()
  
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setTimeout(() => {
        login(values.email, values.password)
          .then(({data: {token}}: any) => {
            setLoading(false)
            localStorage.setItem("loginEmail",values.email)
            dispatch(auth.actions.login(token))
          }).catch((err: any) => {
            setToast({
              message: err.response ? err.response.data.message : 
                `${err.message}. Please try again later.`,
              header: ``,
              type: 'danger',
            })

            setLoading(false)
            setSubmitting(false)
            setStatus('The login detail is incorrect')
          })
      }, 1000)
    },
  })

  return (
    <React.Fragment>
      {toast && <CustomAlert {...toast} />}
      <form
        className='form w-100'
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
      >
        {/* begin::Heading */}
        <div className='mb-10 text-left'>
          <h1 className='text-dark mb-3'>Sign In</h1>
        </div>
        {/* begin::Heading */}

        {/* {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>
            Use account <strong>admin@demo.com</strong> and password <strong>demo</strong> to
            continue.
          </div>
        </div>
      )} */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
          <input
            placeholder='Email'
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              { 'is-invalid': formik.touched.email && formik.errors.email },
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
            type='email'
            name='email'
            autoComplete='off'
          />
          {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <div className='d-flex justify-content-between mt-n5'>
            <div className='d-flex flex-stack mb-2'>
              {/* begin::Label */}
              <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
              {/* end::Label */}
              {/* begin::Link */}
              {/* <Link
                to='/auth/forgot-password'
                className='link-primary fs-6 fw-bolder'
                style={{ marginLeft: '5px' }}
              >
                Forgot Password ?
              </Link> */}
              {/* end::Link */}
            </div>
          </div>
          <input
            placeholder='Password'
            type='password'
            autoComplete='off'
            {...formik.getFieldProps('password')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.password && formik.errors.password,
              },
              {
                'is-valid': formik.touched.password && !formik.errors.password,
              }
            )}
          />
          {formik.touched.password && formik.errors.password && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Action */}
        <div className='text-left'>
          <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn btn-lg btn-primary mb-5'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>Sign In</span>}
            {loading && (
              <span className='indicator-progress' style={{ display: 'block' }}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>

        {/* end::Action */}
      </form>
    </React.Fragment>
  )
}
