export const TextFilterCell = (cellProps: any) => {
    const handleOnBlur = (event: any) => {
        cellProps.onfilterChange({
            value: event.target.value,
            operator: "gt",
            field: field
        })
    }
    const { field, value } = cellProps

    return (
        <input type="text"
            className='form-control'
            onChange={handleOnBlur}
            value={value}
         />
    )
}