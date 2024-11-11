import clsx from 'clsx'
import React, {FC} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {HeaderUserMenu, Search} from '../../../partials'
import {shallowEqual, useSelector} from 'react-redux'
import {useLayout, usePageData} from '../../core'
import {UserModel} from '../../../../app/modules/auth/models/UserModel'
import {RootState} from '../../../../setup'
import * as auth from '../../../../app/modules/auth/redux/AuthRedux'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'

const Topbar: FC = () => {
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const {config} = useLayout()
  const {currentUser} = usePageData()
  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {/* Search */}
      <div className={clsx('d-flex align-items-stretch', toolbarButtonMarginClass)}>
        {/* <Search /> */}
      </div>

      {/* begin::User */}
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        {/* begin::Toggle */}
        <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <div className='btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2 avatar'>
            <span className='text-muted font-weight-bold font-size-base d-none d-md-inline greeting'>
              Hi,
            </span>{' '}
            <span className='text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3 name'>
              {currentUser.firstName ? currentUser.firstName : 'There'}
            </span>
            <span className='symbol symbol-35'>
              <span className='symbol-label font-weight-bold'>
                <i className='fas fa-user text-dark'></i>
              </span>
            </span>
          </div>
        </div>
        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}

      {/* begin::Aside Toggler */}
      {/* {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )} */}
    </div>
  )
}

export {Topbar}
