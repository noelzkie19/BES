/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { usePageData } from '../../../../_metronic/layout/core'


const SettingWrapper: FC = () => {
  const { currentUser } = usePageData();
  const [admin, setAdmin] = useState<boolean>(false)
  const intl = useIntl()

  // setAdmin(true);
  useEffect(() => {
    var userRoles: any = currentUser.userRoles;
    userRoles.forEach((element: any) => {
      if (element.toLowerCase() == "administrator") {
        setAdmin(true);
      }
    });
  }, [currentUser])
  return (
    <>
      {/* begin::Row */}
      <div className='landing_inner_wrapper'>
        <div className='card card-custom mt-5'>
          <div className='card-body'>
            <div className='row'>
              {!admin && ''}
              {admin && (
                <>
                  <div className='col-md-3'>
                    <Link to='/user'>
                      <i className='fas fa-fw fa-user-cog'></i>
                      <span>Users</span>
                    </Link>
                  </div>
                  <div className='col-md-3'>
                    <Link to='/role'>
                      <i className='fas fa-fw fa-shield-alt'></i>
                      <span>Role</span>
                    </Link>
                  </div>
                   <div className='col-md-3'>
                    <Link to='/resource'>
                      <i className='fas fa-fw fa-shield-alt'></i>
                      <span>Resource</span>
                    </Link>
                  </div>
                </>
              )}

              <div className='col-md-3'>
                <Link to='/change-password'>
                  <i className='fas fa-fw fa-lock'></i>
                  <span>Change Password</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* end::Row */}
    </>
  )
}

export { SettingWrapper }
