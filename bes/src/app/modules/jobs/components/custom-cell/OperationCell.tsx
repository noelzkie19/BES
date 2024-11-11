import { DropDownList } from "@progress/kendo-react-dropdowns"

export const InlineOperationCell = (cellProps: any) => {
    const onClick = () => {
        if (dataItem.inEdit !== field)
            cellProps.enterEdit(dataItem, field, dataIndex)
    }

    const onBlur = (e: any) => {
        if (cellProps.onChange && dataItem.inEdit !== field) {
            // cellProps.onChange({
            //     dataIndex: dataIndex,
            //     dataItem: {
            //         ...cellProps.props.dataItem,
            //         isSelected: e.currentTarget.value
            //     },
            //     field: cellProps.props.field,
            //     syntheticEvent: e.syntheticEvent,
            //     value: e.currentTarget.value,
            // })
        }
        // cellProps.exitEdit()
    }
    const { dataItem, dataIndex } = cellProps.props
    const field = cellProps.props.field || ''
    const dataValue = dataItem[field] === null ? '' : dataItem[field]

    return (
        <td onClick={onClick} key={dataItem.id}>
            {dataItem.inEdit === field ? (
                <div>
                    <input type="number"
                        className='form-control'
                        onBlur={onBlur}
                        defaultValue={dataValue} />
                    <DropDownList
                        // onChange={handleChange}
                        value={cellProps.data ? cellProps.data.find((c: any) => c.value === dataValue) : []}
                        data={cellProps.data || []}
                        textField="text"
                    />
                </div>
            ) : (
                // CurrencyFormatter(dataValue)
                ''
            )}
        </td>
    )
}