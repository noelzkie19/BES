import React from 'react'
interface IProps {
  isVisible: boolean
  isClick: any
}
const IsFormVisible = (props: IProps) => {
  return (
    <a className='is-form-visible' onClick={props.isClick}>
      {!props.isVisible ? (
        <span>
          <i className='fas fa-chevron-down'></i> Show Advanced Search
        </span>
      ) : (
        <span>
          <i className='fas fa-chevron-up'></i> Hide Advanced Search
        </span>
      )}
    </a>
  )
}
export default IsFormVisible
