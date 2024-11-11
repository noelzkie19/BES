export const InCellNumericCell = (cellProps: any) => {
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
          isSelected: e.currentTarget.value
        },
        field: cellProps.props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.currentTarget.value === '' ? null : +e.currentTarget.value,
      })
    }
    cellProps.exitEdit()
  }

  const onKeyDown = (event: any) => {
    if (event.keyCode === 189) {
      event.preventDefault()
      return false;
    }
    if (event.keyCode === 9) {
      if (cellProps.onKeyDown) {
        cellProps.onKeyDown({
          dataIndex: dataIndex,
          colIndex: columnIndex,
          dataItem: {
            ...cellProps.props.dataItem,
            isSelected: event.currentTarget.value
          },
          field: cellProps.props.field,
          value: +event.currentTarget.value,
        })
      }
    }
  }

  const { dataItem, dataIndex, columnIndex } = cellProps.props
  const field = cellProps.props.field || ''

  let dataValue = 1
  if (dataItem[field] != undefined) {
    dataValue = dataItem[field]
  }

  return (
    <td onClick={onClick} key={dataItem.id} tabIndex={cellProps.tabIndex ? cellProps.tabIndex : 0}>
      {dataItem.inEdit === field ? (
        <input type="number"
          className='form-control'
          onBlur={onBlur}
          defaultValue={dataValue}
          onKeyDown={onKeyDown}
          min='0'
          autoFocus />
      ) : (
        <span>
          {`${dataValue}${cellProps.numberLabel ? cellProps.numberLabel : ''}`}
        </span>
      )}
    </td>
  )
}
