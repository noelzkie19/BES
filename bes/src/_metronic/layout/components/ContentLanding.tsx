import React, {useEffect} from 'react'
import {useLocation} from 'react-router'
import {Link} from 'react-router-dom'
import {useLayout} from '../core'
import {DrawerComponent} from '../../assets/ts/components'
import {MenuInner} from './header/MenuInner'
import {KTSVG, toAbsoluteUrl} from '../../helpers'
import * as auth from '../../../app/modules/auth/redux/AuthRedux'
import {useDispatch} from 'react-redux'

const Content: React.FC = ({children}) => {
  const {classes} = useLayout()
  const location = useLocation()

  const dispatch = useDispatch()
  const logout = () => {
    localStorage.setItem("loginEmail","")
    dispatch(auth.actions.logout())
  }

  useEffect(() => {
    DrawerComponent.hideAll()
  }, [location])

  return (
    <div className='landing_wrapper'>
      <div id='kt_head_container'>
        <div className='container'>
          <div className='header-menu d-flex'>
            <Link to='/dashboard'>
              <img alt='Logo' className='logo' src={toAbsoluteUrl('/images/logo.svg')} />
            </Link>
            <div className='menu menu-lg-rounded menu-state-bg menu-title-gray-700  menu-arrow-gray-400 fw-bold push'>
              <MenuInner />
            </div>
            <a onClick={logout} className='btn btn-danger'>
              Logout
            </a>
          </div>
        </div>
      </div>
      <div id='kt_content_container'>
        <div className='container'>{children}</div>
      </div>
    </div>
  )
}

export {Content}
