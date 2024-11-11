/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
// import {Link} from 'react-router-dom'
// import {KTSVG} from '../../../../_metronic/helpers'
import { usePageData } from '../../../../_metronic/layout/core';
import { getUserByEmail } from '../api';
import { IUserData } from '../models/user-profile';
import { RegisterSmtp } from '../../purchase-orders/components/modal/RegisterSmtp';
import { registerEmailAuth } from '../../../shared/api/email';

const Overview : React.FC = () => {
  const { currentUser } = usePageData();
  const [userData, setUserData] = useState<IUserData>()
  const [isShowSmtpModal, setIsShowSmtpModal] = useState<boolean>(false)
  

  useEffect(() => {
    // if (!userRoles.includes("Administrator")) {
    //   history.push('/dashboard')
    // }
    getUserByEmail(currentUser.email).then((response: any) => {
      setUserData(response[0].data)
      
    }).catch(() => {
     
    })
   
  }, [currentUser])

  return (
    <React.Fragment>
       {
         isShowSmtpModal && (
          <RegisterSmtp smtpRegister={{
            email: currentUser.email,
            password: ''
          }} toggleDialog={() => {
            setIsShowSmtpModal(false)
          }} savePasswordHandler={(smtpRegister) => {
            registerEmailAuth(smtpRegister.email, smtpRegister.password)
            .then(() => {
              setIsShowSmtpModal(false)
            })
          }}></RegisterSmtp>
         )
       }
      
          
      <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>User Name</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{userData?.userName}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Email</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{userData?.email}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>First Name</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{userData?.firstName}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Last Name</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{userData?.lastName}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Role</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{userData?.userRoleDisplay}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>
                <Link to='/change-password'>Change Password</Link>
              </span>
            </div>
          </div>
          <div className='row mb-7'>
            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>
                <button className='btn btn-primary' onClick={() => setIsShowSmtpModal(true)}>Change Sender Credentials</button>
              </span>
            </div>
          </div>
        </div>
        {/*  */}
    </React.Fragment>
  )
}

export {Overview}