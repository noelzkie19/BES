import * as React from 'react';

import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import { GridFilterCellProps } from '@progress/kendo-react-grid';
import PhoneInput1 from '../../../../../_metronic/partials/content/inputs/PhoneInput1';

interface PhoneFilterCellProps extends GridFilterCellProps {

}

export const PhoneFilterCell = (props: PhoneFilterCellProps) => {
    let fetchQue: any;

    const onChange = (event: any, phoneNumber: string) => {
        if (fetchQue) {
            clearTimeout(fetchQue)
        }
        fetchQue = setTimeout(() => {
            props.onChange({
                value: phoneNumber,
                operator: 'eq',
                syntheticEvent: event
            });
        }, 500)
    }

    return (
      <div className="k-filtercell">
         <PhoneInput1 phoneNumber={props.value} onChangeHandlerFilter={onChange}></PhoneInput1>
      </div>
    );
}
