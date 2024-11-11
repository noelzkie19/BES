export const NumberCell = (props: any) => {

    const handleBlur = (e: any) => {
        if (props.onChange) {
            props.onChange({
                dataIndex: props.dataIndex,
                dataItem: {
                    ...dataItem,
                    [field]: e.target.value
                },
                field: props.field,
                syntheticEvent: e.syntheticEvent,
                value: e.target.value,
            });
        }
    };

    const { dataItem } = props;
    const field = props.field || "";
    const dataValue = dataItem[field] ?  dataItem[field] : '';
    return (
        <td>
            {dataItem.isSelected ? (
                <input type="number"
                    className="form-control"
                    onBlur={handleBlur}
                    defaultValue={dataItem[field]} />
            ) : (
                 dataValue.toString()
            )}
        </td>
    );
};