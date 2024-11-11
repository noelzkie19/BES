/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {UserModel} from '../../../../app/modules/auth/models/UserModel'
import {RootState} from '../../../../setup'
import {Languages} from './Languages'
import * as auth from '../../../../app/modules/auth/redux/AuthRedux'
import {useDispatch} from 'react-redux'
import {toAbsoluteUrl} from '../../../helpers'

const HeaderUserMenu: FC = () => {
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel

  const dispatch = useDispatch()
  const logout = () => {
    localStorage.setItem('loginEmail', '')
    dispatch(auth.actions.logout())
  }

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content px-3'>
          <div className='d-flex flex-column'>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {user.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <Link to={'/profile'} className='menu-link px-5'>
          My Profile
        </Link>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <a onClick={logout} className='px-5 btn btn-danger text-white'>
          <i className='fas fa-sign-out-alt' style={{fontSize: '12px'}}></i> Sign Out
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
