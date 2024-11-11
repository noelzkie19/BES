/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import { ResetPassword } from './components/ResetPassword'
export function AuthPage() {
  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    <div
      className='login login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white'
      // style={{
      //   backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
      // }}
    >
      {/* begin::Aside */}
      <div
        className='login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10'
        style={{
          backgroundImage: `url(${toAbsoluteUrl('/images/login-bg.jpg')})`,
        }}
      >
        <div className='d-flex flex-row-fluid flex-column justify-content-between'>
          <div className='flex-column-fluid d-flex flex-column justify-content-center'>
            <h3 className='font-size-h1 mb-5 text-white'>Welcome to BES!</h3>
            <p className='font-weight-lighter text-white opacity-80'>
              Brisbane Engineering Services is the trusted name in the industry. We specialise in
              producing high quality machined components for a wide range of industries and
              applications.
            </p>
          </div>
        </div>
      </div>
      {/* end::Aside */}
      {/* begin::Content */}
      <div className='d-flex flex-column flex-column-fluid flex-center position-relative p-7 overflow-hidden'>
        {/* begin::Logo */}
        <div className='text-center mb-20'>
          <a href='#' className='mb-12'>
            {<img alt='Logo' src={toAbsoluteUrl('/images/logo.svg')} className='mx-100' />}
          </a>
        </div>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className='w-lg-400px mx-auto'>
          <Switch>
            <Route path='/auth/login' component={Login} />
            <Route path='/auth/registration' component={Registration} />
            <Route path='/auth/forgot-password' component={ForgotPassword} />
            <Route path='/auth/reset-password' component={ResetPassword} />
            <Redirect from='/auth' exact={true} to='/auth/login' />
            <Redirect to='/auth/login' />
          </Switch>
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
    </div>
  )
}
