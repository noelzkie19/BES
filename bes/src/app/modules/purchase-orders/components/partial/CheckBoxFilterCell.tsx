import ThreeStateCheckbox from '../../../../../_metronic/partials/content/checkbox/ThreeStateCheckbox'

export const CheckBoxFilterCell = (props: any) => {

  const onChange = (event: any) => {
    props.onChange(event)
  }

  
  return (
    <div className='k-filtercell'>
       <ThreeStateCheckbox initialState={props.state} changeHandler={onChange} disabled={props.isLoading}></ThreeStateCheckbox>
    </div>
  )
}
