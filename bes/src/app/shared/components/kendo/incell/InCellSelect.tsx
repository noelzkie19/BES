import { filterBy } from "@progress/kendo-data-query";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { useEffect, useRef } from "react";

export const InCellSelect = (cellProps: any) => {

    const handleChange = (e: any) => {
        if (cellProps.onChange) {
            cellProps.onChange({
                dataIndex: 0,
                dataItem: dataItem,
                field: field,
                syntheticEvent: e.syntheticEvent,
                value: e.target.value ? e.target.value.id : null,
            });
        }
    };

    const handleKeyDown = (event: any) => {
        if(event.keyCode === 9) { 
            if (cellProps.onKeyDown) {
                cellProps.onKeyDown({
                    dataIndex: dataIndex,
                    colIndex: columnIndex,
                    dataItem: cellProps.props.dataItem,
                    field: cellProps.props.field,
                    value: selectRef.current.value ? selectRef.current.value.id : '',
                })
            }
        }
    
    }


    const onClick = (e: any) => {
        if (dataItem.inEdit !== field)
            cellProps.enterEdit(dataItem, field, dataIndex)
    }

    const filterChange = (event: any) => {
        dataSource = filterBy((cellProps.data || []).slice(), event.filter);
    };

    const { dataItem, dataIndex, field, columnIndex } = cellProps.props;
    const dataValue = dataItem[field] === null ? "" : dataItem[field];
    let dataSource = (cellProps.data || []);
    const selectedData = dataSource.find((c: any) => c.id === dataValue);

    const selectRef = useRef<any>(null)
    
    useEffect(() => {
        if (selectRef.current) {
            selectRef.current.element.onkeydown = handleKeyDown;
            selectRef.current.focus();
        }
    }, [selectRef])

    return (
        <td onClick={onClick} key={dataItem.id} tabIndex={cellProps.tabIndex ? cellProps.tabIndex : 0}>
            {(dataItem.inEdit || '') === field ? (
                 <ComboBox
                    data={dataSource}
                    value={selectedData}
                    onChange={handleChange}
                    filterable={true}
                    onFilterChange={filterChange}
                    textField="text"
                    dataItemKey="id"
                    ref={selectRef}
                
                />
            ) : (
                 selectedData ? selectedData.text : dataValue
            )}
        </td>
    );
};