/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {LandingLayout} from '../../../_metronic/layout/LandingLayout'
import {Link, useHistory} from 'react-router-dom'
import {UserModel} from '../../modules/auth/models/UserModel'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../setup/redux/RootReducer'
import { IUserAccessModule, PageDataProvider, usePageData } from '../../../_metronic/layout/core/PageData'
import { useEffectOnce } from 'react-use'

const DashboardPage: FC<{userAccessModule: IUserAccessModule}> = ({userAccessModule}) => {
  return(
  <>
    {/* begin::Row */}
    <h1 className='landing-title'>Dashboard</h1>
    <div className='card card-custom mt-5'>
      <div className='card-body'>
        <div className='row'>
          {
            userAccessModule.quote && (
            <div className='col-md-2 col-lg-2 col-12 offset-lg-1'>
              <Link to='/quote'>
                <i className='fas fa-fw fa-clipboard-list'></i>
                <span>Quotes</span>
              </Link>
            </div>
            )
          }
          {
            userAccessModule.jobs && (
              <div className='col-md-2 col-lg-2 col-12'>
                <Link to='job'>
                  <i className='fas fa-fw fa-tasks'></i>
                  <span>Jobs</span>
                </Link>
              </div>
            )
          }
          {
            userAccessModule.purchaseOrder && (
              <div className='col-md-2 col-lg-2 col-12'>
              <Link to='purchase-order'>
                <i className='fas fa-fw fa-file-invoice-dollar'></i>
                <span>Purchase Orders</span>
              </Link>
            </div>
        
            )
          }
          {
            userAccessModule.deliveries && (
              <div className='col-md-2 col-lg-2 col-12'>
                <Link to='delivery'>
                  <i className='fas fa-fw fa-truck'></i>
                  <span>Deliveries</span>
                </Link>
              </div>
            )
          }
          {
            userAccessModule.stocks && (
              <div className='col-md-2 col-lg-2 col-12'>
                <Link to='stock'>
                  <i className='fas fa-fw fa-pallet'></i>
                  <span>Stocks</span>
                </Link>
              </div>
            )
          }
        </div>
        <div className='row'>
          {
            userAccessModule.clients && (
              <div className='col-md-2 col-lg-2 col-12 offset-lg-1'>
              <Link to='/client'>
                <i className='fas fa-fw fa-users'></i>
                <span>Clients</span>
              </Link>
            </div>
            )
          }
          {
            userAccessModule.schedules && (
              <div className='col-md-2 col-lg-2 col-12'>
                <Link to='/schedule'>
                  <i className='fas fa-fw fa-calendar-alt'></i>
                  <span>Schedules</span>
                </Link>
              </div>
            )
          }
          {
            userAccessModule.suppliers && (
              <div className='col-md-2 col-lg-2 col-12'>
                <Link to='/supplier'>
                  <i className='fas fa-fw fa-store'></i>
                  <span>Suppliers</span>
                </Link>
              </div>
            )
          }
         {
            userAccessModule.nonConformance && (
              <div className='col-md-2 col-lg-2 col-12'>
                <Link to='non-conformance'>
                  <i className='fas fa-fw fa-assistive-listening-systems'></i>
                  <span>Non-Conformance</span>
                </Link>
              </div>
            )
          }
         {
            userAccessModule.settings && (
              <div className='col-md-2 col-lg-2 col-12'>
              <Link to='/settings'>
                <i className='fas fa-fw fa-cog'></i>
                <span>Settings</span>
              </Link>
            </div>
            )
          }
        </div>
      </div>
    </div>

    {/* end::Row */}
  </>)
}

const DashboardWrapper: FC = () => {
 
  return (
    <>
      <PageDataProvider>
        <DashboardContent/>
      </PageDataProvider>
    </>
  )
}

const DashboardContent: FC = ()=> {
  const intl = useIntl()
  const history = useHistory()
  const {userAccessModule, currentUser} = usePageData()


  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  if (user.isResetPasswordRequired) {
    history.push('/change-password')
  }

  return (
    <>
      <LandingLayout>
        <DashboardPage userAccessModule={userAccessModule}/>
      </LandingLayout>
    </>
  )
}

export {DashboardWrapper}
