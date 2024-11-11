import { filterBy } from "@progress/kendo-data-query";
import { MultiColumnComboBox, MultiSelect } from "@progress/kendo-react-dropdowns";
import { useEffect, useRef, useState } from "react";

export const InCellMultiColumn = (cellProps: any) => {
    const handleChange = (e: any) => {
        if (cellProps.onChange) {
            cellProps.onChange({
                dataIndex: 0,
                dataItem: dataItem,
                field: field,
                syntheticEvent: e.syntheticEvent,
                value: e.target.value ? e.target.value.id : '',
            });
        }
    };

    const onClick = (e: any) => {
        if (dataItem.inEdit !== field)
            cellProps.enterEdit(dataItem, field, dataIndex)
    }

    const handleFilterChange = (event: any) => {
        setFilter(event.filter)
    }

    const handleKeyDown = (event: any) => {
        if(event.keyCode === 9) { 
            if (cellProps.onKeyDown) {
                cellProps.onKeyDown({
                    dataIndex: dataIndex,
                    colIndex: columnIndex,
                    dataItem: cellProps.props.dataItem,
                    field: cellProps.props.field,
                    value: comboBoxRef.current.value.id,
                })
            }
        }
    
    }


    const { dataItem, dataIndex, field, columnIndex } = cellProps.props;
    const dataValue = dataItem[field] === null ? "" : dataItem[field];
    const selectedData = (cellProps.data || []).find((c: any) => c.id === dataValue);
    const [filter,setFilter] = useState<any>(undefined)
    const comboBoxRef = useRef<any>(null)

    useEffect(() => {
    if (comboBoxRef.current) {
        comboBoxRef.current.element.onkeydown = handleKeyDown;
        comboBoxRef.current.focus();
    }
    }, [comboBoxRef])
    
    return (
        <td onClick={onClick} key={dataItem.id} tabIndex={cellProps.tabIndex ? cellProps.tabIndex : 0}>
            {(dataItem.inEdit || '') === field ? (
                 <MultiColumnComboBox
                   data={filterBy(cellProps.data || [], filter)}
                   columns={cellProps.optionColumn}
                   onChange={handleChange}
                
                   textField={"text"}
                   value={selectedData}
                   filterable={true}
                   onFilterChange={handleFilterChange}
                   ref={comboBoxRef}
                   style={{
                     width: "100%",
                   }}
                   placeholder="Please select ..."
                 />
            ) : (
                selectedData ? selectedData.text : dataValue
            )}
        </td>
    );
};