import { useEffect, useRef } from "react"
import PhoneInput from "react-phone-input-2"
import { ref } from "yup"
import PhoneInput1 from "../../../../../_metronic/partials/content/inputs/PhoneInput1"
import { formatPhoneNumber } from "../../../service/utils"

export const InCellPhoneCell = (cellProps: any) => {
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
                    isSelected: e
                },
                field: cellProps.props.field,
                value: e,
            })
        }
        cellProps.exitEdit()
    }

    const handleKeyDown = (event: any) => {
        if(event.keyCode === 9) { 
            if (cellProps.onKeyDown) {
                cellProps.onKeyDown({
                    dataIndex: dataIndex,
                    colIndex: columnIndex,
                    dataItem: cellProps.props.dataItem,
                    field: cellProps.props.field,
                    value: event.target.value,
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
                <PhoneInput1 phoneNumber={dataValue} onBlurHandler={onBlur}></PhoneInput1>
            ) : (
                formatPhoneNumber(dataValue)
            )}
        </td>
    )
}