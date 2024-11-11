import * as React from 'react';

import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import { GridFilterCellProps } from '@progress/kendo-react-grid';

interface ClientFilterDropdownCellProps extends GridFilterCellProps {
  defaultItem: string,
  data: string[]
}

export const ClientFilterDropdownCell = (props: ClientFilterDropdownCellProps) => {
    let hasValue: any = (value: string) => Boolean(value && value !== props.defaultItem);

    const onChange = (event: DropDownListChangeEvent) => {
        hasValue = hasValue(event.target.value);
        props.onChange({
            value: hasValue ? event.target.value : '',
            operator: hasValue ? 'eq' : '',
            syntheticEvent: event.syntheticEvent
        });
    }

    return (
      <div className="k-filtercell">
        <DropDownList
          data={props.data}
          onChange={onChange}
          value={props.value || props.defaultItem}
          defaultItem={props.defaultItem}
            />
      </div>
    );
}
