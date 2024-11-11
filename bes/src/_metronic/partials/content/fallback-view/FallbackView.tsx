import {toAbsoluteUrl} from '../../../helpers'

export function FallbackView() {
  return (
    <div className='splash-screen'>
      <img src={toAbsoluteUrl('/images/logo.svg')} style={{maxWidth: '250px'}} alt='Start logo' />
      <span>Loading ...</span>
    </div>
  )
}
