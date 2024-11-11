import { useEffect, useRef } from "react"
import PhoneInput from "react-phone-input-2"
import { ref } from "yup"
import PhoneInput1 from "../../../../../_metronic/partials/content/inputs/PhoneInput1"
import { formatMobileNumber, formatPhoneNumber } from "../../../service/utils"
import MobileInput1 from "../../../../../_metronic/partials/content/inputs/MobileInput1"

export const InCellMobileCell = (cellProps: any) => {
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

    const { dataItem, dataIndex, columnIndex } = cellProps.props
    const field = cellProps.props.field || ''
    const dataValue = dataItem[field] === null ? '' : dataItem[field]

    return (
        <td onClick={onClick} key={dataItem.id} tabIndex={cellProps.tabIndex ? cellProps.tabIndex : 0}>
            {dataItem.inEdit === field ? (
                <MobileInput1 phoneNumber={dataValue} onBlurHandler={onBlur}></MobileInput1>
            ) : (
                formatMobileNumber(dataValue)
            )}
        </td>
    )
}