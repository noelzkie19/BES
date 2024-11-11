
import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridDetailRowProps,
  GridColumnResizeEvent
} from '@progress/kendo-react-grid'
import React, { useEffect, useState } from 'react'
import { AddButtonHeader } from '../../../../../_metronic/partials/content/button/kendo/AddButtonHeader';
import { GridActionIconCell } from '../../../../../_metronic/partials/widgets/grid/action/GridActionIconCell';
import { ActionEnum, ActionOption } from '../../../../../_metronic/partials/widgets/grid/constant/ActionOption';
import { InCellNumericCell } from '../../../../shared/components/kendo/incell/InCellNumericCell';
import { InCellSelect } from '../../../../shared/components/kendo/incell/InCellSelect';
import { InCellTextCell } from '../../../../shared/components/kendo/incell/InCellTextCell';
import { CellRender, RowRender } from '../../../../shared/components/kendo/renderer';
import { DATACHECK_DEFAULT, OPERATION_DEFAULT } from '../../constant/job-default'
import { IDataChecks, Operation } from '../../models/job-model';
import { transformCheckEdit, transformCheckToSave, transformResourcesOption, transformUserOption } from '../../transformers/job-transformer';
import { OperationFormModal } from '../modal/OperationFormModal';
import { Modal1 } from '../../../../../_metronic/partials/modals/Modal1';
import { onKeyDownHandler } from '../../../../shared/service/utils';
import { FIELD_OPERATION_COLUMN_KEY, FIELD_OPERATION_COLUMN_SIZE_KEY, FIELD_OPERATION_LIST } from '../../constant/config-default';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { useEffectOnce } from 'react-use';
import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from '../../../../shared/service/grid-setup-utils';
import { InCellDateCell } from '../../../../shared/components/kendo/incell/InCellDateCell';
import { InCellHourCell } from '../../../../shared/components/kendo/incell/InCellHourCell';

const EDIT_FIELD = 'inEdit'
const initialSort: Array<SortDescriptor> = [
  { field: "number", dir: "asc" },
];
const OperationComponent: React.FC<any> = (props: any) => {

  const [operations, setOperations] = useState<Operation[]>(props.operations)
  const [editCheck, setEditCheck] = useState<IDataChecks>(DATACHECK_DEFAULT)
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [selectedField, setSelectedField] = useState<string>('')
  const [selectedOperation, setSelectedOperation] = useState<Operation>(OPERATION_DEFAULT)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isShowDeletedModal, setIsShowDeletedModal] = useState<boolean>(false)
  const [isTabKey, setIsTabKey] = useState<boolean>(false)
  const [sort, setSort] = React.useState(initialSort);
  const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_OPERATION_COLUMN_SIZE_KEY)

  useEffect(() => {
    if (props.operations) {
      let operationArr: any = orderBy(props.operations, sort)

      for (let i = 0; i < operationArr.length; i++) {
        let operation = operationArr[i];

        if (operation.expectedProcessTime !== null) {
          let hours = Math.floor(operation.expectedProcessTime / 60);
          let minutes = operation.expectedProcessTime % 60;

          let formattedHours = hours.toString().padStart(2, '0');
          let formattedMinutes = minutes.toString().padStart(2, '0');

          operation.expectedProcessTimeText = formattedHours + ':' + formattedMinutes;
        } else {
          operation.expectedProcessTimeText = '00:00';
        }
      }

      setOperations(operationArr)
    }
  }, [props.operations])

  useEffectOnce(() => {
    const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_JOB_OPERATION_LIST)
    if (columnLocal) {
      setAutoColumns(columnLocal)
    }
  })

  const opsEnterEdit = (_: any, field: any, dataIndex: any) => {
    if (!props.isCanEdit) return;

    var newData: any = []
    operations.forEach((item, index) => {
      newData.push({
        ...item,
        [EDIT_FIELD]: dataIndex === index ? field : undefined,
        isEdit: dataIndex === index,
      })
    })
    props.replaceOperations(newData)
  }

  const opsExitEdit = () => {
    if (isTabKey) {
      setIsTabKey(false)
      return;
    }
    operations.forEach((item, index) => {
      var newData = {
        ...item,
        [EDIT_FIELD]: undefined,
        isEdit: false,
      }
      props.updateOperation(index, newData)
    })
  }



  const opsItemChange = (event: any) => {
    if (isTabKey) {
      setIsTabKey(false)
      return
    }
    let field = event.field || ''
    event.dataItem[field] = event.value
    const idx = operations.findIndex((po) => po.isEdit)

    if (field === 'resourceId') {
      const rate = event.value ? props.resources.find((x: any) => x.id === event.value).hourlyRate : 0;
      event.dataItem = {
        ...event.dataItem,
        hourlyRate: rate
      }
    }

    props.updateOperation(idx, event.dataItem)
    // preload operation for exit edit
    operations[idx] = event.dataItem
    setOperations(operations)
  }

  const onKeyDown = (event: any) => {
    var newData: any = []

    const { nextField, dataIndex } =
      onKeyDownHandler(event, FIELD_OPERATION_COLUMN_KEY)

    operations.forEach((item: any, index) => {
      newData.push({
        ...item,
        [event.field]: event.dataIndex === index ? event.value : item[event.field],
        [EDIT_FIELD]: dataIndex === index ? nextField : undefined,
        isEdit: dataIndex === index,
      })
    })
    props.replaceOperations(newData)
    setIsTabKey(true)
  };



  // Renderer //
  const opsCustomRowRender = (tr: any, props: any) => (
    <RowRender originalProps={props} tr={tr} exitEdit={opsExitEdit} editField={EDIT_FIELD} />
  )

  const opsCustomCellRender = (td: any, cellProps: GridCellProps) => (
    <CellRender
      originalProps={cellProps}
      td={td}
      enterEdit={opsEnterEdit}
      editField={EDIT_FIELD}
      exitEdit={opsExitEdit}
    />
  )

  const opsNumericFormatCell = (cellProps: GridCellProps) => (
    <InCellNumericCell
      props={cellProps}
      enterEdit={opsEnterEdit}
      onChange={opsItemChange}
      exitEdit={opsExitEdit}
      onKeyDown={onKeyDown}
    />
  )

  const opsTextCellCell = (cellProps: GridCellProps) => (
    <InCellTextCell
      props={cellProps}
      enterEdit={opsEnterEdit}
      onChange={opsItemChange}
      exitEdit={opsExitEdit}
      onKeyDown={onKeyDown}
    />
  )


  const opsSelectResourceFormatCell = (cellProps: GridCellProps) => (
    <InCellSelect
      props={cellProps}
      data={transformResourcesOption(props.resources)}
      enterEdit={opsEnterEdit}
      onChange={opsItemChange}
      exitEdit={opsExitEdit}
      onKeyDown={onKeyDown}
    />
  )

  const opsDateFormatCell = (cellProps: GridCellProps) => (
    <InCellDateCell
      props={cellProps}
      enterEdit={opsEnterEdit}
      onChange={opsItemChange}
      exitEdit={opsExitEdit}
      onKeyDown={onKeyDown}
    ></InCellDateCell>
  )

  const opsHourFormatCell = (cellProps: GridCellProps) => (
    <InCellHourCell
      props={cellProps}
      enterEdit={opsEnterEdit}
      onChange={opsItemChange}
      exitEdit={opsExitEdit}
      onKeyDown={onKeyDown}
    ></InCellHourCell>
  )

  const checkCell = (cellProps: GridCellProps, pRow: number) => (
    <td className='k-command-cell' height={45} onClick={() => detailEnterEdit(cellProps.field, pRow)}
    >
      <div>{cellProps.dataItem[`${cellProps.field}Hr`]}</div>
      <div>{
        transformUserOption(props.users)
          .find((c: any) => c.id === cellProps.dataItem[`${cellProps.field}OperatorId`])?.text
      }</div>
    </td>
  )
  // End Renderer //

  const detailEnterEdit = (field: any, dataIndex: any) => {
    if (!props.isCanEdit) return;

    const editCheck = transformCheckEdit(operations[dataIndex], field)
    setEditCheck(editCheck);
    setSelectedField(field);
    setIsShowModal(true);
    setIsEdit(true)
    const newData = operations.map((item, index) => ({
      ...item,
      [EDIT_FIELD]: dataIndex === index ? field : undefined,
      isEdit: dataIndex === index,
    }))
    props.operationChange(newData)
  }

  const expandChange = (event: any) => {
    let newData = operations.map((item: any, i) => {
      if (event.dataIndex === i) {
        item.expanded = !event.dataItem.expanded
      }
      return item
    })
    setOperations(newData)
  }

  const addOperation = () => {
    props.addOperation({ ...OPERATION_DEFAULT })
    setSelectedIndex(0)
    setIsEdit(false)
  }

  const closeHandler = () => {
    setIsShowModal(false)
    setIsEdit(false)
    setSelectedIndex(0)
  }

  const proceedHandler = () => {
    setIsShowDeletedModal(false)
    setIsShowModal(false)
    setIsEdit(false)
    if ((selectedOperation.refId && selectedOperation.refId > 0) || isEdit) {
      props.updateOperation(selectedIndex, { ...selectedOperation, isDeleted: true })
    } else {
      props.removeOperation(selectedOperation)
    }
  }

  const proceedConfirmHandler = (checkData: IDataChecks) => {
    const dataRes = transformCheckToSave(checkData, selectedField)
    const idx = operations.findIndex((po) => po.isEdit)
    var newOperation = {
      ...operations[idx],
      ...dataRes
    }
    props.updateOperation(idx, newOperation)
    setIsShowModal(false);
  }

  const ActionCell = (props: GridCellProps) => (
    <GridActionIconCell actions={[
      ActionOption.Delete
    ]}
      gridCellProps={props}
      changeHandler={actionHandler} />
  )


  const actionHandler = (event: any, dataItem: any, dataIndex: number) => {
    if (!props.isCanEdit) return;
    setSelectedIndex(dataIndex)
    setSelectedOperation(dataItem)
    switch (event) {
      case ActionEnum.Edit:
        setIsShowModal(true)
        setIsEdit(true)
        break;
      case ActionEnum.Delete:
        setIsShowDeletedModal(true)
        break;
    }
  }

  const addButtonHeader = (bprops: any) => {
    return (
      <AddButtonHeader title={bprops.title} clickHandler={addOperation} isCanEdit={props.isCanEdit}></AddButtonHeader>
    );
  };

  const handleResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, autoColumns, GRID_WIDTH.GRID_JOB_OPERATION_LIST);
  }

  const detailsComponent = (pcellProps: GridDetailRowProps) =>
  (
    <Grid data={[pcellProps.dataItem]}
    >
      <Column title='First Off Checks'>
        <Column field='firstFoc' title='1st' width={200} editable={props.isCanEdit}
          cell={(cellProps: GridCellProps) => checkCell(cellProps, pcellProps.dataIndex)} />
        <Column field='secondFoc' title='2nd' width={200}
          editable={props.isCanEdit}
          cell={(cellProps: GridCellProps) => checkCell(cellProps, pcellProps.dataIndex)} />
        <Column field='thirdFoc' title='3rd' width={200} cell={
          (cellProps: GridCellProps) => checkCell(cellProps, pcellProps.dataIndex)
        } editable={props.isCanEdit} />
        <Column field='fourthFoc' title='4th' width={200}
          cell={(cellProps: GridCellProps) => checkCell(cellProps, pcellProps.dataIndex)} editable={props.isCanEdit} />
      </Column>
      <Column title='Production Checks'>
        <Column field='firstPc' title='1st' width={200}
          cell={(cellProps: GridCellProps) => checkCell(cellProps, pcellProps.dataIndex)} editable={props.isCanEdit} />
        <Column field='secondPc' title='2nd' width={200}
          cell={(cellProps: GridCellProps) => checkCell(cellProps, pcellProps.dataIndex)} editable={props.isCanEdit} />
        <Column field='thirdPc' title='3rd' width={200}
          cell={(cellProps: GridCellProps) => checkCell(cellProps, pcellProps.dataIndex)} editable={props.isCanEdit} />
        <Column field='fourthPc' title='4th' width={200}
          cell={(cellProps: GridCellProps) => checkCell(cellProps, pcellProps.dataIndex)} editable={props.isCanEdit} />
      </Column>
    </Grid>
  )
  return (
    <React.Fragment>
      {
        isShowModal && (
          <OperationFormModal
            field={selectedField}
            checkData={editCheck}
            toggleDialog={closeHandler}
            proceedConfirm={proceedConfirmHandler}
            resources={transformUserOption(props.users)}
          />
        )
      }

      <Modal1 show={isShowDeletedModal}
        title={`Delete Operation in row ${selectedIndex + 1}.`}
        message={'You are deleting an Operation, Continue?'}
        handleClose={() => setIsShowDeletedModal(false)}
        proceed={proceedHandler} />
      <Grid
        className='mt-5'
        resizable={true}
        reorderable={true}
        data={(operations || []).filter((ops: any) => !ops.isDeleted)}
        cellRender={opsCustomCellRender}
        rowRender={opsCustomRowRender}
        onItemChange={opsItemChange}
        editField={EDIT_FIELD}
        style={{ width: '100%', height: '20vh' }}
        detail={detailsComponent}
        expandField='expanded'
        onExpandChange={expandChange}
        onColumnResize={handleResizeColumn}
      >
        <Column
          field={autoColumns[FIELD_OPERATION_LIST.action].field}
          width={autoColumns[FIELD_OPERATION_LIST.action].width}
          cell={ActionCell}
          editable={false}
          title={'Operation'}
          headerCell={addButtonHeader} />
        <Column
          field={autoColumns[FIELD_OPERATION_LIST.number].field}
          width={autoColumns[FIELD_OPERATION_LIST.number].width}
          title='Operation Number'
          cell={opsNumericFormatCell}
        />
        <Column
          field={autoColumns[FIELD_OPERATION_LIST.quantity].field}
          width={autoColumns[FIELD_OPERATION_LIST.quantity].width}
          title='Quantity'
          cell={opsNumericFormatCell}
          editable={props.isCanEdit}
        />
        <Column
          field={autoColumns[FIELD_OPERATION_LIST.resource].field}
          width={autoColumns[FIELD_OPERATION_LIST.resource].width}
          title='Resource'
          cell={opsSelectResourceFormatCell}
          editable={props.isCanEdit}
        />
        <Column
          field={autoColumns[FIELD_OPERATION_LIST.description].field}
          width={autoColumns[FIELD_OPERATION_LIST.description].width}
          title='Description'
          cell={opsTextCellCell} />
        <Column
          field={autoColumns[FIELD_OPERATION_LIST.dateCompleted].field}
          width={autoColumns[FIELD_OPERATION_LIST.dateCompleted].width}
          title='Completion Date'
          cell={opsDateFormatCell}
          editable={false} />
        <Column
          field={autoColumns[FIELD_OPERATION_LIST.expectedProcessTimeText].field}
          width={autoColumns[FIELD_OPERATION_LIST.expectedProcessTimeText].width}
          title='Expected Process Time'
          cell={opsHourFormatCell}
          editable={props.isCanEdit}
        />
      </Grid>

    </React.Fragment>
  )
}

export { OperationComponent }
