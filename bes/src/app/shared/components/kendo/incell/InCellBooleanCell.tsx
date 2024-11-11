import { Checkbox, CheckboxChangeEvent } from '@progress/kendo-react-inputs'

export const InCellBooleanCell = (cellProps: any) => {
    const handleChange = (e: any) => {
        if (cellProps.onChange) {
            cellProps.onChange({
                dataIndex: dataIndex,
                dataItem: {
                    ...cellProps.props.dataItem,
                    isSelected: e.target.checked
                },
                field: cellProps.props.field,
                syntheticEvent: e.syntheticEvent,
                value: e.target.checked,
            })
        }
    }
    const onClick = () => {
        if (dataItem.inEdit !== field)
            cellProps.enterEdit(dataItem, field, dataIndex)
    }

    const onBlur = (event: any) => {
        cellProps.exitEdit()
    }

    const onKeyDown = (event: any) => {
        if(event.keyCode === 9) { 
            if (cellProps.onKeyDown) {
                cellProps.onKeyDown({
                    dataIndex: dataIndex,
                    colIndex: columnIndex,
                    dataItem: {
                        ...cellProps.props.dataItem,
                        isSelected: event.currentTarget.checked
                    },
                    field: cellProps.props.field,
                    value: event.currentTarget.checked,
                })
            }
        }
    
    }


    const { dataItem, dataIndex, columnIndex } = cellProps.props
    const field = cellProps.props.field || ''
    const dataValue = dataItem[field] === null ? '' : dataItem[field]

    return (
        <td onClick={onClick} key={dataItem.id} tabIndex={cellProps.tabIndex ? cellProps.tabIndex : 0}>
            {dataItem.inEdit === field ? (
                <input
                    type='checkbox'
                    onChange={handleChange}
                    checked={dataValue}
                    onKeyDown={onKeyDown}
                    onBlur={onBlur} 
                    autoFocus={true}/>
            ) : (
                <Checkbox onChange={handleChange} value={dataValue} disabled />
            )}
        </td>
    )
}