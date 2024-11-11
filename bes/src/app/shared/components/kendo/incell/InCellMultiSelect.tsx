import { MultiSelect } from "@progress/kendo-react-dropdowns";

export const InCellMultiSelect = (cellProps: any) => {

    const handleChange = (e: any) => {
        if (cellProps.onChange) {
            cellProps.onChange({
                dataIndex: 0,
                dataItem: dataItem,
                field: field,
                syntheticEvent: e.syntheticEvent,
                value: e.target.value.map((data: any) => data.id),
            });
        }
    };

    const onClick = (e: any) => {
        if (dataItem.inEdit !== field)
            cellProps.enterEdit(dataItem, field, dataIndex)
    }

    const onFilterHandler = (e: any) => {
    }

    const { dataItem, dataIndex, field } = cellProps.props;
    const dataValue = dataItem[field] === null ? "" : dataItem[field];
    const selectValue = cellProps.data.filter((ft: any) =>
        (dataValue || []).some((x: any) => x === ft.id) 
    )
    return (
        <td onClick={onClick} key={dataItem.id} tabIndex={cellProps.tabIndex ? cellProps.tabIndex : 0}>
            {(dataItem.inEdit || '') === field ? (
                <MultiSelect
                    data={cellProps.data || []}
                    onBlur={handleChange}
                    defaultValue={selectValue}
                    textField="text"
                    dataItemKey="id"
                    filterable={true}
                    onFilterChange={onFilterHandler}
                    
                />
            ) : (
                    selectValue.map((data: any, idx: number) =>  (
                        `${idx > 0 ? ',' : ''} ${data.text} ` 
                    ))
            )}
        </td>
    );
};