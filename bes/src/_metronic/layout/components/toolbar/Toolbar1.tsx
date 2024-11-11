/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {FC} from 'react'
import {KTSVG} from '../../../helpers'
import {useLayout} from '../../core'
import {DefaultTitle} from '../header/page-title/DefaultTitle'

const Toolbar1: FC = () => {
  const {classes} = useLayout()
  const d = new Date()

  const getMonth = d.toLocaleString('en-AU', {month: 'short'})
  const getDay = d.toLocaleString('en-AU', {day: 'numeric'})

  return (
    <div className='toolbar' id='kt_toolbar'>
      {/* begin::Container */}
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
      >
        <DefaultTitle />

        {/* begin::Actions */}
        <div className='d-flex align-items-center py-1'>
          {/* begin::Wrapper */}
          <div className='me-4'>
            {/* begin::Date */}
            <a
              href='#'
              className='btn btn-light btn-sm font-weight-bold'
              id='kt_dashboard_daterangepicker'
              data-toggle='tooltip'
              title='Select dashboard daterange'
              data-placement='left'
            >
              <span
                className='text-muted font-weight-bold mr-2 today'
                id='kt_dashboard_daterangepicker_title'
              >
                Today
              </span>
              <span
                className='text-primary font-weight-bold date'
                id='kt_dashboard_daterangepicker_date'
              >
                {getMonth} {getDay}
              </span>
            </a>

            {/* end::Date */}
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Actions */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export {Toolbar1}
