import { useEffect, useRef } from "react"
import InputMask from "react-input-mask"

export const InCellHourCell = (cellProps: any) => {
  const onClick = () => {
    if (dataItem.inEdit !== field)
      cellProps.enterEdit(dataItem, field, dataIndex)
  }

  const onKeyDown = (event: any) => {
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
          value: event.currentTarget.value,
        })
      }
    }
  }

  const { dataItem, dataIndex, columnIndex } = cellProps.props
  const field = cellProps.props.field || ''
  const dataValue = dataItem[field] === null ? '' : dataItem[field]

  const textRef = useRef<any>(null)

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
    }
  }, [textRef])

  const onBlur = (e: any) => {
    if (cellProps.onChange) {
      const inputTime = e.currentTarget.value; // HH:mm format
      const [hours, minutes] = inputTime.split(':');
      const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);

      cellProps.onChange({
        dataIndex: dataIndex,
        dataItem: {
          ...cellProps.props.dataItem,
          expectedProcessTime: totalMinutes, // Update expectedProcessTime in minutes
          expectedProcessTimeText: inputTime, // Update expectedProcessTimeText
        },
        field: cellProps.props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.currentTarget.value,
      });
    }
    cellProps.exitEdit();
  };


  return (
    <td onClick={onClick} key={dataItem.id} tabIndex={cellProps.tabIndex ? cellProps.tabIndex : 0}
      width={cellProps.width && dataItem.inEdit === field ?
        cellProps.width : ''}>
      {dataItem.inEdit === field ? (
        <InputMask
          mask="99:99"
          className="form-control"
          onBlur={onBlur}
          defaultValue={dataValue}
          onKeyDown={onKeyDown}
        />
      ) : (
        dataValue
      )}
    </td>
  )
}
