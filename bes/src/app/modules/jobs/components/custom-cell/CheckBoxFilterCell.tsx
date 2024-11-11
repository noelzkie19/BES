import { useState } from 'react';
import ThreeStateCheckbox from '../../../../../_metronic/partials/content/checkbox/ThreeStateCheckbox'

export const CheckBoxFilterCell = (props: any) => {
    
    let hasValue: any = (value: string) => Boolean(value && value !== props.defaultItem);

    const onChange = (event: any) => {
        hasValue = hasValue(event);
        props.onChange({
            value: hasValue ? event : '',
            operator: hasValue ? 'eq' : ''
        });
        props.setPrintState(event)
    }
  
  return (
    <div className='k-filtercell'>
       <ThreeStateCheckbox initialState={props.printState} changeHandler={onChange} disabled={props.isLoading}></ThreeStateCheckbox>
    </div>
  )
}
