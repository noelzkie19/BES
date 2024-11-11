import { DropDownList } from "@progress/kendo-react-dropdowns";
import { useEffect, useRef } from "react";

export const InCellDropDownCell = (cellProps: any) => {

    const handleChange = (e: any) => {
        if (cellProps.onChange) {
            cellProps.onChange({
                dataIndex: 0,
                dataItem: dataItem,
                field: field,
                syntheticEvent: e.syntheticEvent,
                value: e.target.value.value,
            });
        }
    };

    const onClick = (e: any) => {
        if (dataItem.inEdit !== field)
            cellProps.enterEdit(dataItem, field, dataIndex)
    }

    const handleKeyDown = (event: any) => {
        if(event.keyCode === 9) { 
            if (cellProps.onKeyDown) {
                cellProps.onKeyDown({
                    dataIndex: dataIndex,
                    colIndex: columnIndex,
                    dataItem: cellProps.props.dataItem,
                    field: cellProps.props.field,
                    value: dropdownRef.current.value.id,
                })
            }
        }
    
    }


    const { dataItem, dataIndex, field, columnIndex } = cellProps.props;
    const dataValue = dataItem[field] === null ? "" : dataItem[field] ;
    const selectedData = (cellProps.data || []).find((c: any) => c.value === dataValue);
    const dropdownRef = useRef<any>(null)
    
    useEffect(() => {
        if (dropdownRef.current) {
            dropdownRef.current.element.onkeydown = handleKeyDown;
            dropdownRef.current.focus();
        }
    }, [dropdownRef])

    return (
        <td onClick={onClick} key={dataItem.id} tabIndex={cellProps.tabIndex ? cellProps.tabIndex : 0}>
            {(dataItem.inEdit || '') === field ? (
                <DropDownList
                    style={{
                        width: "100%",
                    }}
                    onChange={handleChange}
                    value={cellProps.data ? cellProps.data.find((c: any) => c.value === dataValue) : []}
                    data={cellProps.data || []}
                    textField="text"
                    ref={dropdownRef}
                />
            ) : (
                    selectedData ? selectedData.text : dataValue
            )}
        </td>
    );
};
