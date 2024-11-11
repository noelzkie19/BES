/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {useLayout} from '../../core'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {AsideMenu} from './AsideMenu'
import * as auth from '../../../../app/modules/auth/redux/AuthRedux'
import {useDispatch} from 'react-redux'

const AsideDefault: FC = () => {
  const {config, classes} = useLayout()
  const {aside} = config

  const dispatch = useDispatch()
  const logout = () => {
    dispatch(auth.actions.logout())
    localStorage.setItem("loginEmail","")
    localStorage.removeItem('purchaseOrderFilter');
  }

  return (
    <div
      id='kt_aside'
      className={clsx('aside', classes.aside.join(' '))}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_mobile_toggle'
    >
      {/* begin::Brand */}
      <div className='aside-logo flex-column-auto' id='kt_aside_logo'>
        {/* begin::Logo */}
        {aside.theme === 'dark' && (
          <Link to='/dashboard'>
            <img alt='Logo' className='h-50px logo' src={toAbsoluteUrl('/images/logo.svg')} />
          </Link>
        )}
        {aside.theme === 'light' && (
          <Link to='/dashboard'>
            <img alt='Logo' className='h-50px logo' src={toAbsoluteUrl('/images/logo.svg')} />
          </Link>
        )}
        {/* end::Logo */}

        {/* begin::Aside toggler */}
        {aside.minimize && (
          <div
            id='kt_aside_toggle'
            className='btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle'
            data-kt-toggle='true'
            data-kt-toggle-state='active'
            data-kt-toggle-target='body'
            data-kt-toggle-name='aside-minimize'
          >
            <span className={`svg-icon svg-icon-1 rotate-180`}>
              <img alt='arrow' className='h-50px logo' 
                height="24"
                width="24"
                src={toAbsoluteUrl('/media/icons/duotune/arrows/arr080.svg')} />
            </span>
          </div>
        )}
        {/* end::Aside toggler */}
      </div>
      {/* end::Brand */}

      {/* begin::Aside menu */}
      <div className='aside-menu flex-column-fluid'>
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
      {/* end::Aside menu */}

      {/* begin::Footer */}
      <div
        className='aside-footer flex-column-auto pt-5 pb-7 px-5 text-center'
        id='kt_aside_footer'
      >
        <a onClick={logout} className='btn btn-danger btn-logout'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='btn-label logout-title'>Logout</span>
        </a>
      </div>
      {/* end::Footer */}
    </div>
  )
}

export {AsideDefault}
