
import {
    Grid,
    GridCellProps,
    GridColumn as Column,
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
  import { OPERATION_DEFAULT } from '../../constant/job-default'
  import { Operation } from '../../models/job-model';
  import { transformResourcesOption, transformUserOption } from '../../transformers/job-transformer';
  import { Modal1 } from '../../../../../_metronic/partials/modals/Modal1';
  import { onKeyDownHandler } from '../../../../shared/service/utils';
  import { FIELD_OPERATION_COLUMN_KEY_NEW, FIELD_OPERATION_COLUMN_SIZE_KEY_NEW, FIELD_OPERATION_LIST_NEW } from '../../constant/config-default';
  import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
  import { useEffectOnce } from 'react-use';
  import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from '../../../../shared/service/grid-setup-utils';
  import './../ui/JobForm.scss'
  
  const EDIT_FIELD = 'inEdit'
  const initialSort: Array<SortDescriptor> = [
    { field: "number", dir: "asc" },
  ];
  const footerCellStyle = {
    padding: '5px 5px', // Adjust the padding value as needed
    fontWeight: 'bold' // Apply any other styling you want
  };
  const NewOperationComponent: React.FC<any> = (props: any) => {
  
    const [operations, setOperations] = useState<Operation[]>(props.operations)
    const [selectedOperation, setSelectedOperation] = useState<Operation>(OPERATION_DEFAULT)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isShowDeletedModal, setIsShowDeletedModal] = useState<boolean>(false)
    const [isTabKey, setIsTabKey] = useState<boolean>(false)
    const [sort, setSort] = React.useState(initialSort);
    const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_OPERATION_COLUMN_SIZE_KEY_NEW)
  
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
      const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_JOB_OPERATION_LIST, FIELD_OPERATION_COLUMN_SIZE_KEY_NEW)
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
      if (field === 'resourceId') {
        const rate = event.value ? props.resources.find((x: any) => x.id === event.value).hourlyRate : 0;
        event.dataItem = {
          ...event.dataItem,
          hourlyRate: rate
        }
      }
      event.dataItem[field] = event.value
      const idx = operations.findIndex((po) => po.isEdit)
      

      props.updateOperation(idx, event.dataItem)
      // preload operation for exit edit
      operations[idx] = event.dataItem
      setOperations(operations)
    }
  
    const onKeyDown = (event: any) => {
      var newData: any = []
  
      const { nextField, dataIndex } =
        onKeyDownHandler(event, FIELD_OPERATION_COLUMN_KEY_NEW)
  
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

    const opsNumericMFormatCell = (cellProps: GridCellProps) => (
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
  
  
    const opsSelectOperatorFormatCell = (cellProps: GridCellProps) => (
      <InCellSelect
        props={cellProps}
        data={transformUserOption(props.users)}
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

    const opsFirstChange = (dataItem: any, dataIndex: number, dataField: string, value: any) => {
        dataItem[dataField] = value
        const idx = operations[dataIndex]

        props.updateOperation(idx, dataItem)
        // preload operation for exit edit
        operations[dataItem] = dataItem
        setOperations(operations)
    }
    
    const opsFirstFormatCell = (cellProps: GridCellProps) => (
        <td>
            <div className='d-flex justify-content-around'>
                <input type='checkbox' checked={cellProps.dataItem.proInsFirst1} disabled={!props.isCanEdit}
                    onChange={(e) => opsFirstChange(cellProps.dataItem, cellProps.dataIndex, 'proInsFirst1', e.target.checked)}/>
                <input type='checkbox' checked={cellProps.dataItem.proInsFirst2} disabled={!props.isCanEdit}
                    onChange={(e) => opsFirstChange(cellProps.dataItem, cellProps.dataIndex, 'proInsFirst2', e.target.checked)}/>
                <input type='checkbox' checked={cellProps.dataItem.proInsFirst3} disabled={!props.isCanEdit}
                    onChange={(e) => opsFirstChange(cellProps.dataItem, cellProps.dataIndex, 'proInsFirst3', e.target.checked)}/>
            </div>
        </td>
    )

    const opsINSFormatCell = (cellProps: GridCellProps) => (
        <td>
            <div className='d-flex justify-content-around'>
             <input type='checkbox'  disabled={!props.isCanEdit}
              checked={cellProps.dataItem.proInsINS} 
              onChange={(e) => opsFirstChange(cellProps.dataItem, cellProps.dataIndex, 'proInsINS', e.target.checked)}/>
            </div>
        </td>
    )
  
    // End Renderer //
  
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

    const proceedHandler = () => {
      setIsShowDeletedModal(false)
      setIsEdit(false)
      if ((selectedOperation.refId && selectedOperation.refId > 0) || isEdit) {
        props.updateOperation(selectedIndex, { ...selectedOperation, isDeleted: true })
      } else {
        props.removeOperation(selectedOperation)
      }
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
    const progFooterCell = (props: any) => {
      if (!operations)
      return <td style={footerCellStyle}>0</td>;
      const data = (operations.filter((lin) => !lin.isDeleted) || []).map((item: any) => item.prog); 
      const total = data.reduce((acc: any, value: any) => acc + value, 0);
      return <td style={footerCellStyle}>{total.toFixed(2)}</td>;
    }
    const setFooterCell = (props: any) => {
      if (!operations)
      return <td style={footerCellStyle}>0</td>;
      const data = (operations.filter((lin) => !lin.isDeleted) || []).map((item: any) => item.set); 
      const total = data.reduce((acc: any, value: any) => acc + value, 0);
      return <td style={footerCellStyle}>{total.toFixed(2)}</td>;
    }
    const runFooterCell = (props: any) => {
      if (!operations)
      return <td style={footerCellStyle}>0</td>;
      const data = (operations.filter((lin) => !lin.isDeleted) || []).map((item: any) => item.run); 
      const total = data.reduce((acc: any, value: any) => acc + value, 0);
      return <td style={footerCellStyle}>{total.toFixed(2)}</td>;
    }
    const otherFooterCell = (props: any) => {
      if (!operations)
        return <td style={footerCellStyle}>0</td>;

      const data = (operations.filter((lin) => !lin.isDeleted) || []).map((item: any) => item.other);
      const total = data.reduce((acc: any, value: any) => acc + value, 0);
      return <td style={footerCellStyle}>{total.toFixed(2)}</td>;
    }
    
    const expectedFooterCell = (props: any) => {
      if (!operations)
      return <td style={footerCellStyle}>0</td>;
      const data = (operations.filter((lin) => !lin.isDeleted) || []).map((item: any) => item.expectedProcessTime);
      const total = data.reduce((acc: any, value: any) => acc + value, 0);
      return <td style={footerCellStyle}>{total.toFixed(2)}</td>;
    }
    
    
    return (
      <React.Fragment>
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
          expandField='expanded'
          onExpandChange={expandChange}
          onColumnResize={handleResizeColumn}
        >
          <Column
            field={autoColumns[FIELD_OPERATION_LIST_NEW.action].field}
            width={autoColumns[FIELD_OPERATION_LIST_NEW.action].width}
            cell={ActionCell}
            editable={false}
            title={'Operation'}
            headerCell={addButtonHeader} />
          <Column
            field={autoColumns[FIELD_OPERATION_LIST_NEW.number].field}
            width={autoColumns[FIELD_OPERATION_LIST_NEW.number].width}
            title='Op#'
            cell={opsNumericFormatCell}
          />
         <Column title="Resource" 
            field={autoColumns[FIELD_OPERATION_LIST_NEW.resource].field}
            width={autoColumns[FIELD_OPERATION_LIST_NEW.resource].width}
            cell={opsSelectResourceFormatCell}>
        </Column>
        <Column title='Qty' 
                cell={opsNumericFormatCell}
                field={autoColumns[FIELD_OPERATION_LIST_NEW.quantity].field}
                width={autoColumns[FIELD_OPERATION_LIST_NEW.quantity].width}/>
        <Column title='Operation Description' 
                field={autoColumns[FIELD_OPERATION_LIST_NEW.description].field}
                width={autoColumns[FIELD_OPERATION_LIST_NEW.description].width}
                minResizableWidth={autoColumns[FIELD_OPERATION_LIST_NEW.description].minWidth}
                cell={opsTextCellCell}/>
            <Column title='Expected Process Time (hrs)' 
                field={autoColumns[FIELD_OPERATION_LIST_NEW.expectedProcessTime].field}
                width={autoColumns[FIELD_OPERATION_LIST_NEW.expectedProcessTime].width}
                cell={opsNumericMFormatCell}
                headerClassName='custom-k-header'
                footerCell={expectedFooterCell}/>
            <Column title="Actual Process Time" >
                <Column title='Prog' 
                    cell={opsNumericFormatCell}
                    field={autoColumns[FIELD_OPERATION_LIST_NEW.prog].field}
                    width={autoColumns[FIELD_OPERATION_LIST_NEW.prog].width}
                    footerCell={progFooterCell}/>
                <Column title='Set' 
                    cell={opsNumericFormatCell}
                    field={autoColumns[FIELD_OPERATION_LIST_NEW.set].field}
                    width={autoColumns[FIELD_OPERATION_LIST_NEW.set].width}
                    footerCell={setFooterCell}/>
                <Column title='Run' 
                    cell={opsNumericFormatCell}
                    field={autoColumns[FIELD_OPERATION_LIST_NEW.run].field}
                    width={autoColumns[FIELD_OPERATION_LIST_NEW.run].width}
                    footerCell={runFooterCell}/>
                <Column title='Other' 
                    cell={opsNumericFormatCell}
                    field={autoColumns[FIELD_OPERATION_LIST_NEW.other].field}
                    width={autoColumns[FIELD_OPERATION_LIST_NEW.other].width}
                    footerCell={otherFooterCell}/>
            </Column>
            <Column title='Operator' 
                cell={opsSelectOperatorFormatCell}
                field={autoColumns[FIELD_OPERATION_LIST_NEW.operatorId].field}
                width={autoColumns[FIELD_OPERATION_LIST_NEW.operatorId].width}/>
            <Column title="Process Inspection" headerClassName='text-center' >
                <Column title='FIRST' 
                    cell={opsFirstFormatCell}
                    width={100}
                    field='first'/>
                <Column title='INS' 
                    cell={opsINSFormatCell}
                    field={autoColumns[FIELD_OPERATION_LIST_NEW.proInsINS].field}
                    width={autoColumns[FIELD_OPERATION_LIST_NEW.proInsINS].width}/>
            </Column>
         
        </Grid>
  
      </React.Fragment>
    )
  }
  
  export { NewOperationComponent }
  