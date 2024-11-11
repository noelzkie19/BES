import * as React from 'react';

import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import { GridFilterCellProps } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';

interface StatusFilterDropdownCellProps extends GridFilterCellProps {
  defaultItem: string,
  data: string[]
}

export const StatusFilterDropdownCell = (props: StatusFilterDropdownCellProps) => {
    let hasValue: any = (value: string) => Boolean(value && value !== props.defaultItem);

    const onChange = (event: DropDownListChangeEvent) => {
        hasValue = hasValue(event.target.value);
        props.onChange({
            value: hasValue ? event.target.value : '',
            operator: hasValue ? 'eq' : '',
            syntheticEvent: event.syntheticEvent
        });
    }

    const onClearButtonClick = (event:any) => {
        event.preventDefault();
        props.onChange({
            value: '',
            operator: '',
            syntheticEvent: event
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
        <Button
          title="Clear"
          disabled={!hasValue(props.value)}
          onClick={onClearButtonClick}
          icon="filter-clear"
        />
      </div>
    );
}
