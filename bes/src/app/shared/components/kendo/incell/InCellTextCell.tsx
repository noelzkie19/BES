import { useEffect, useRef } from "react"

export const InCellTextCell = (cellProps: any) => {
    const onClick = () => {
        if (dataItem.inEdit !== field)
            cellProps.enterEdit(dataItem, field, dataIndex)
    }

    const onBlur = (e: any) => {
        if (cellProps.onChange) {
            cellProps.onChange({
                dataIndex: dataIndex,
                dataItem: {
                    ...cellProps.props.dataItem,
                    isSelected: e.currentTarget.value
                },
                field: cellProps.props.field,
                syntheticEvent: e.syntheticEvent,
                value: e.currentTarget.value,
            })
        }
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
                        isSelected: event.currentTarget.value
                    },
                    field: cellProps.props.field,
                    value: event.currentTarget.value,
                })
            }
        }
    
    }

    const { dataItem, dataIndex, columnIndex } = cellProps.props
    const field = cellProps.props.field || ''
    const dataValue = dataItem[field] === null ? '' : dataItem[field]

    const textRef = useRef<any>(null)
    
    useEffect(() => {
        if (textRef.current) {
            textRef.current.focus();
        }
    }, [textRef])

    return (
        <td onClick={onClick} key={dataItem.id} tabIndex={cellProps.tabIndex ? cellProps.tabIndex : 0}
            width={cellProps.width && dataItem.inEdit === field ? 
                cellProps.width : ''}>
            {dataItem.inEdit === field ? (
                <input type="text"
                    className='form-control'
                    onBlur={onBlur}
                    defaultValue={dataValue}
                    onKeyDown={onKeyDown}
                    ref={textRef} />
            ) : (
                dataValue
            )}
        </td>
    )
}