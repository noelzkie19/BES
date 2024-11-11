import React from 'react'
import {MenuItem} from './MenuItem'
import {useIntl} from 'react-intl'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title='Help' to='/help' />
      <MenuItem title='About' to='/about' />
      {/* <MenuItem title='Resources' to='/resource' /> */}
      <MenuItem title='Password' to='/change-password' />
    </>
  )
}
