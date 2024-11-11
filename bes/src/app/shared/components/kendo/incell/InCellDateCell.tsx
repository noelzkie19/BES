
import { DatePicker, ToggleButton } from '@progress/kendo-react-dateinputs'
import { dateFormat, validateDate } from '../../../service/utils'
import { useEffect, useRef } from 'react';

export const InCellDateCell = (cellProps: any) => {
    const handleChange = (e: any) => {
        if (cellProps.onChange) {
            if (!validateDate(e.target.value))
                return;

            cellProps.onChange({
                dataIndex: dataIndex,
                dataItem: dataItem,
                field: cellProps.props.field,
                syntheticEvent: e.syntheticEvent,
                value: e.target.value
            })
        }
    }
    const onClick = () => {
        if (dataItem.inEdit !== field)
            cellProps.enterEdit(dataItem, field, dataIndex)
    }

    const onBlur = (e: any) => {
        cellProps.exitEdit()
    }

    const onKeyDown = (e: any) => {
      cellProps.exitEdit()
  }
  

    const customToggleButton = (togglerProps: any) => {
        const { onClick, onMouseDown, ...others } = togglerProps;
        return (
          <>
            <ToggleButton {...others}>
              <span
                className="k-icon k-i-calendar"
                onClick={onClick}
                onMouseDown={onMouseDown}
                onKeyDown={onKeyDown}
              />
              <span
                className="k-link k-link-clear"
                onClick={() => {
                    cellProps.onChange({
                        dataIndex: dataIndex,
                        dataItem: dataItem,
                        field: cellProps.props.field,
                        syntheticEvent: null,
                        value: null
                    })
                }}
              >
                <span
                  unselectable="on"
                  className="k-icon k-i-close"
                />
              </span>
            </ToggleButton>
          </>
        );
      };

    const handleKeyDown = ((event: any) => {
      if(event.keyCode === 9) { 
        if (cellProps.onKeyDown) {
            cellProps.onKeyDown({
                dataIndex: dataIndex,
                colIndex: columnIndex,
                dataItem: {
                    ...cellProps.props.dataItem,
                    isSelected: datePickerRef.current.value
                },
                field: cellProps.props.field,
                value: datePickerRef.current.value
            })
        }
    }
    })

    const { dataItem, dataIndex, columnIndex } = cellProps.props
    const field = cellProps.props.field || ''
    const dataValue = dataItem[field] === null ? '' : dataItem[field]
    const datePickerRef = useRef<any>(null)

    useEffect(() => {
      if (datePickerRef.current) {
        datePickerRef.current.handleKeyDown = handleKeyDown;
        datePickerRef.current.focus();
      }
    }, [datePickerRef])

    return (
        <td onClick={onClick} key={dataItem.id} tabIndex={cellProps.tabIndex ? cellProps.tabIndex : 0}>
            {dataItem.inEdit === field ? (
                 <div className="k-filtercell custom-date-filter">
                    <DatePicker
                        format="dd/MM/yyyy"
                        onBlur={onBlur}
                        onChange={handleChange}
                        
                        toggleButton={customToggleButton}
                        defaultValue={dataValue ? new Date(dataValue || '') : null}
                        ref={datePickerRef}
                    />
                </div>
            ) : (
                    dateFormat(dataValue)
            )}
        </td>
    )
}