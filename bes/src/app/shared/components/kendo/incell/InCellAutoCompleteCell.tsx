import { AutoComplete } from "@progress/kendo-react-dropdowns";

export const InCellAutoCompleteCell = (cellProps: any) => {

    const handleChange = (e: any) => {
        if (cellProps.onChange) {
            cellProps.onChange({
                dataIndex: 0,
                dataItem: dataItem,
                field: field,
                syntheticEvent: e.syntheticEvent,
                value: e.target.value,
            });
        }
    };

    const onClick = (e: any) => {
        if (dataItem.inEdit !== field)
            cellProps.enterEdit(dataItem, field, dataIndex)
    }

    const { dataItem, dataIndex, field } = cellProps.props;
    const dataValue = dataItem[field] === null ? "" : dataItem[field];
    const selectedData = (cellProps.data || []).find((c: any) => c.value === dataValue);
    return (
        <td onClick={onClick} key={dataItem.id} tabIndex={cellProps.tabIndex ? cellProps.tabIndex : 0}>
            {(dataItem.inEdit || '') === field ? (
                <AutoComplete
                    style={{
                        width: "300px",
                    }}
                    data={cellProps.data}
                    textField="text"
                    defaultValue={String(dataValue)}
                    className='form-control'
                    onBlur={handleChange}
                />
            ) : (
                selectedData ? selectedData.text : dataValue
            )}
        </td>
    );
};