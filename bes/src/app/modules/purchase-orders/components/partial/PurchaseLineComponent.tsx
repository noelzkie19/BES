
import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridColumnResizeEvent,
} from '@progress/kendo-react-grid'
import React, { useEffect, useReducer, useState } from 'react'
import { ActionEnum, ActionOption } from '../../../../../_metronic/partials/widgets/grid/constant/ActionOption';
import { InlineCellAmountCell } from '../../../../shared/components/kendo/incell/InCellAmountCell';
import { InCellBooleanCell } from '../../../../shared/components/kendo/incell/InCellBooleanCell';
import { InCellDateCell } from '../../../../shared/components/kendo/incell/InCellDateCell';
import { InCellMultiColumn } from '../../../../shared/components/kendo/incell/InCellMultiColumn';
import { CurrencyFormatter, gtsComputation, onKeyDownHandler } from '../../../../shared/service/utils';
import { FIELD_PURCHASE_LINE_COLUMN_KEY, FIELD_PURCHASE_LINE_LIST, optionColumns, Purchase_Line_Action } from '../../constant/config-default';
import { PURCHASELINESRECEIPT_FORM_DEFAULT, PURCHASELINES_FORM_DEFAULT } from '../../constant/purchase-defaults';
import { IPurchaseReceiptData, PurchaseLine } from '../../models/purchase-model';
import { transforJobOption, trasformPurchaseReceipt } from '../../transformer/purchase-transformer';
import { HistoryForm } from '../modal/HistoryForm';
import { PurchaseLineForm } from '../modal/PurchaseLineForm';
import { ReceiptPurchaseItem } from '../modal/ReceiptPurchaseItem';
import { CellRender, RowRender } from '../../../../shared/components/kendo/renderer';
import { InCellTextCell } from '../../../../shared/components/kendo/incell/InCellTextCell';
import { GridActionIconCell } from '../../../../../_metronic/partials/widgets/grid/action/GridActionIconCell';
import { AddButtonHeader } from '../../../../../_metronic/partials/content/button/kendo/AddButtonHeader';
import { Modal1 } from '../../../../../_metronic/partials/modals/Modal1';
import { FIELD_PO_COLUMN_KEY } from '../../constant/tabkey-default';
import { InCellNumericCell } from '../../../../shared/components/kendo/incell/InCellNumericCell';
import { InCellTextAreaCell } from '../../../../shared/components/kendo/incell/InCellTextAreaCell';
import { useEffectOnce } from 'react-use';
import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from '../../../../shared/service/grid-setup-utils';

const EDIT_FIELD = 'inEdit'
const PurchaseLineComponent: React.FC<any> = (props: any) => {

  const [purchaseLines, setPurchaseLines] = useState<PurchaseLine[]>(props.purchaseLines)
  const [selectedPurchaseLine, setSelectedPurchaseLine] = useState<PurchaseLine>()
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [selectedReceipt, setSelectedReceipt] = useState<IPurchaseReceiptData>(
    PURCHASELINESRECEIPT_FORM_DEFAULT
  )
  const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_PURCHASE_LINE_COLUMN_KEY)
  const [modalState, dispatchModalState] = useReducer((state: any, action: any) => {
    if (action.type === 'SHOW' && action.modal === ActionEnum.Hist)
      return { history: true, reciept: false, purchaseForm: false }

    if (action.type === 'SHOW' && action.modal === ActionEnum.Rec)
      return { history: false, reciept: true, purchaseForm: false }

    if (action.type === 'SHOW' && action.modal === 'purchase')
      return { history: false, reciept: false, purchaseForm: true }

    return { history: false, reciept: false, purchaseForm: false }
  }, { history: false, reciept: false, purchaseForm: false })
  const [isShowDeletedModal, setIsShowDeletedModal] = useState<boolean>(false)
  const [isTabKey, setIsTabKey] = useState<boolean>(false)
  const [isJobIdNull, setIsJobIdNull] = useState<boolean>(false)

  const footerCellStyle = {
    padding: '5px 5px', // Adjust the padding value as needed
    fontWeight: 'bold' // Apply any other styling you want
  };

  useEffect(() => {
    if (props.purchaseLines.length > 0) {
      setPurchaseLines(props.purchaseLines)
    }
    else {
      addNewPurchase();
    }
  }, [props.purchaseLines])

  useEffectOnce(() => {
    const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_PO_LINE_LIST)
    if (columnLocal) {
      setAutoColumns(columnLocal)
    }
  })

  const addNewPurchase = () => {
    props.addPurchaseLines({
      ...PURCHASELINES_FORM_DEFAULT,
      jobId: +props.sourceJobId || null
    })
    setSelectedIndex(0)
    setIsEdit(false)
  }

  const onSuccessHandler = (values: PurchaseLine, dataIndex: number) => {
    dispatchModalState({})
    if ((values.refId && (values.refId > 0)) || isEdit) {
      props.updatePurchaseLines(dataIndex, { ...values })
    } else {
      props.addPurchaseLines(values)
    }
  }

  const actionHandler = (event: any, dataItem: any, dataIndex: number) => {
    setSelectedIndex(dataIndex)
    setSelectedPurchaseLine(dataItem)
    switch (event) {
      case ActionEnum.Edit:
        dispatchModalState({ type: 'SHOW', modal: 'purchase' })
        setIsEdit(true)
        break;
      case ActionEnum.Delete:
        setIsShowDeletedModal(true)
        break;
      case ActionEnum.Rec:
        if (!dataItem.jobId) {
          setIsJobIdNull(true)
          break;
        }
        addReceiptHandler(dataItem, dataIndex)
        dispatchModalState({ type: 'SHOW', modal: ActionEnum.Rec })
        break;
      case ActionEnum.Hist:
        addReceiptHandler(dataItem, dataIndex)
        dispatchModalState({ type: 'SHOW', modal: ActionEnum.Hist })
        break;
    }
  }

  const addReceiptHandler = (dataItem: any, dataIndex: number) => {
    const dataReceipt = trasformPurchaseReceipt(
      dataItem,
      props.selectedSupplier ? props.selectedSupplier.name : '',
      dataIndex,
      props.purchaseData?.date,
      props.purchaseData?.dateCreated,
      selectedJob(dataItem.jobId),
      selectedLotNumber(dataItem, dataItem.purchaseLineNumber)
    )
    setSelectedReceipt(dataReceipt)
  }

  const selectedJob = (jobid: number) => {
    const selected = props.jobs.find((x: any) => x.id === jobid);
    return selected !== undefined ? selected : undefined;
  }

  const selectedLotNumber = (dataItem: any, purchaseLineNumber: number) => {
    const selected = dataItem.purchaseReceipts.find((x: any) => x.purchaseLineNumber === purchaseLineNumber);
    return selected !== undefined ? selected.lotNumber : '';
  }

  const submitReceiptHandler = (value: IPurchaseReceiptData) => {
    props.submitReceiptHandler(value);
    dispatchModalState({});
  }


  const enterEdit = (_: any, field: any, dataIndex: any) => {
    var newData: any = []
    // if (!props.isCanEdit) return;
    purchaseLines.forEach((item, index) => {
      newData.push({
        ...item,
        [EDIT_FIELD]: dataIndex === index ? field : undefined,
        isEdit: dataIndex === index,
      })
      //  props.updatePurchaseLines(index, newData)
    })
    props.replacePurchaseLines(newData)
  }

  const exitEdit = () => {
    if (isTabKey) {
      setIsTabKey(false)
      return;
    }
    var newData: any = []
    purchaseLines.forEach((item, index) => {
      newData.push({
        ...item,
        [EDIT_FIELD]: undefined,
        isEdit: false,
      })
    })
    props.replacePurchaseLines(newData)

  }

  const onKeyDown = (event: any) => {
    var newData: any = []

    const { nextField, dataIndex } =
      onKeyDownHandler(event, FIELD_PO_COLUMN_KEY)

    purchaseLines.forEach((item: any, index) => {
      newData.push({
        ...item,
        [event.field]: event.dataIndex === index ? event.value : item[event.field],
        [EDIT_FIELD]: dataIndex === index ? nextField : undefined,
        isEdit: dataIndex === index,
      })
    })
    props.replacePurchaseLines(newData)
    setIsTabKey(true)
  };

  const itemChange = (event: any) => {
    let field = event.field || ''

    if (isTabKey) {
      setIsTabKey(false)
      return;
    }
    event.dataItem[field] = event.value
    const idx = purchaseLines.findIndex((po) => po.isEdit)
   
    if (field === 'costEach') {
      const costEachTotal = (event.dataItem.costEach * event.dataItem.quantity)
      let gstAmount = 0
      if (event.dataItem.isIncludeGST) {
        gstAmount = gtsComputation(event.dataItem.quantity, event.dataItem.costEach, event.dataItem.isIncludeGST)
      }

      event.dataItem = {
        ...event.dataItem,
        gstAmount: gstAmount,
        costEachTotal: costEachTotal,
        costTotal: (costEachTotal + gstAmount).toFixed(2),
      }
    }
    if (field === 'costTotal') {
      let costTotal = event.dataItem.costTotal
      // let gstAmount = 0
      // if (event.dataItem.isIncludeGST) {
      //   gstAmount = event.dataItem.costTotal * 0.1
      // }
      event.dataItem = {
        ...event.dataItem,
        gstAmount: 0,
        isIncludeGST: false,
        costEachTotal: costTotal,
        costEach: (costTotal / event.dataItem.quantity).toFixed(2),
      }
    }
    if (field === 'isIncludeGST') {
      let totalGst = 0;
      if (event.dataItem[field]) {
        totalGst = gtsComputation(event.dataItem.quantity, event.dataItem.costEach, event.dataItem.isIncludeGST)
      }
      const costEachTotal = event.dataItem.costEach * event.dataItem.quantity;

      event.dataItem = {
        ...event.dataItem,
        gstAmount: totalGst.toFixed(2),
        costTotal: (costEachTotal + totalGst).toFixed(2),
        costEachTotal: costEachTotal,
      }
    }


    props.updatePurchaseLines(idx, event.dataItem)
    // preload Notes for exit edit
    purchaseLines[idx] = event.dataItem
    setPurchaseLines(purchaseLines)
  }

  const customRowRender = (tr: any, props: any) => (
    <RowRender originalProps={props} tr={tr} exitEdit={exitEdit} editField={EDIT_FIELD} />
  )

  const customCellRender = (td: any, cellProps: GridCellProps) => (
    <CellRender
      originalProps={cellProps}
      td={td}
      enterEdit={enterEdit}
      editField={EDIT_FIELD}
      exitEdit={exitEdit}
    />
  )


  const selectJobFormatCell = (cellProps: GridCellProps) => (
    <InCellMultiColumn
      props={cellProps}
      enterEdit={enterEdit}
      onChange={itemChange}
      exitEdit={exitEdit}
      optionColumn={optionColumns}
      data={transforJobOption(props.jobs)}
      onKeyDown={onKeyDown}
    />
  )

  const textCell = (cellProps: GridCellProps) => (
    <InCellTextCell
      props={cellProps}
      enterEdit={enterEdit}
      onChange={itemChange}
      exitEdit={exitEdit}
      onKeyDown={onKeyDown}
    />
  )

  const textAreaCell = (cellProps: GridCellProps) => (
    <InCellTextAreaCell
      props={cellProps}
      enterEdit={enterEdit}
      onChange={itemChange}
      exitEdit={exitEdit}
      onKeyDown={onKeyDown}
    />
  )


  const NumericCell = (cellProps: GridCellProps) => (
    <InCellNumericCell
      props={cellProps}
      enterEdit={enterEdit}
      onChange={itemChange}
      exitEdit={exitEdit}
      onKeyDown={onKeyDown}
    />
  )

  const checkboxCell = (props: any) => (
    <InCellBooleanCell
      props={props}
      enterEdit={enterEdit}
      onChange={itemChange}
      exitEdit={exitEdit}
      onKeyDown={onKeyDown}
    ></InCellBooleanCell>
  )

  const dateFormatCell = (props: any) => (
    <InCellDateCell
      props={props}
      enterEdit={enterEdit}
      onChange={itemChange}
      exitEdit={exitEdit}
      onKeyDown={onKeyDown}
    ></InCellDateCell>
  )

  const amountFormatCell = (props: any) => (
    <InlineCellAmountCell
      props={props}
      enterEdit={enterEdit}
      onChange={itemChange}
      exitEdit={exitEdit}
      onKeyDown={onKeyDown}
    ></InlineCellAmountCell>
  )

  const actionCell = (props: GridCellProps) => (
    <GridActionIconCell actions={[
      ActionOption.Delete,
      ActionOption.Hist,
      ActionOption.Rec
    ]}
      gridCellProps={props}
      changeHandler={actionHandler} />
  )

  const addButtonHeader = (props: any) => {
    return (
      <AddButtonHeader title={props.title} clickHandler={addNewPurchase}></AddButtonHeader>
    );
  };

  const proceedHandler = () => {
    setIsShowDeletedModal(false)
    const data = props.purchaseLines.filter((x: any) => !x.isDeleted)[selectedIndex];
    const index = props.purchaseLines.indexOf(data)
    if (selectedPurchaseLine && selectedPurchaseLine?.refId > 0) {
      props.updatePurchaseLines(index, { ...selectedPurchaseLine, isDeleted: true })
    } else {
      props.removePurchaseLines(index)
    }
  }

  const handleResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, autoColumns, GRID_WIDTH.GRID_PO_LINE_LIST);
  }

  const getLineTotal = () => {
    return purchaseLines.filter((lin) => !lin.isDeleted).reduce((sum, current) => sum + (current.costEach * current.quantity), 0)
  }
  const getGtsLineTotal = () => {
    // Not include GST total

    return purchaseLines.filter((lin) => !lin.isDeleted).reduce((sum, current) => sum + 
    (gtsComputation(current.quantity, current.costEach, current.isIncludeGST)), 0)
  }

  const getTotalAmount = () => {
    return getLineTotal() + getGtsLineTotal();
  }

  const costTotalsLabelFooterCell = (props: any) => {    
    return <td style={footerCellStyle}>Totals</td>;
  }

  const costEachTotalFooterCell = (props: any) => {
    const data = (purchaseLines.filter((lin) => !lin.isDeleted) || []).map((item: any) => item.costEach); // Extract the values from the appropriate column
    const total = data.reduce((acc: any, value: any) => acc + value, 0);
    return <td style={footerCellStyle}>{CurrencyFormatter(total)}</td>;
  }

  const costTotalFooterCell = (props: any) => {
    const data = (purchaseLines.filter((lin) => !lin.isDeleted) || []).map((item: any) => item.costTotal); // Extract the values from the appropriate column
    const total = data.reduce((acc: any, value: any) => acc + value, 0);
    return <td style={footerCellStyle}>{CurrencyFormatter(total)}</td>;
  }

  const costTotalWithGSTFooterCell = (props: any) => {
    // const data = (purchaseLines.filter((lin) => !lin.isDeleted && lin.isIncludeGST) || []).map((item: any) => item.costTotal + (item.costTotal * 0.1));
    // const dataGST = (purchaseLines.filter((lin) => !lin.isDeleted && !lin.isIncludeGST) || []).map((item: any) => item.costTotal);
    // const total = data.reduce((acc: any, value: any) => acc + value, 0);
    // const totalGST = dataGST.reduce((acc: any, value: any) => acc + value, 0);
    return <td style={footerCellStyle}>{getTotalAmount()}</td>;
  }

  return (
    <React.Fragment>
      {modalState.history && (
        <HistoryForm
          toggleDialog={() => dispatchModalState({})}
          dataReceipt={selectedReceipt} />
      )}
      {modalState.purchaseForm && (
        <PurchaseLineForm
          handleClose={() => dispatchModalState({})}
          purchaseLineValue={selectedPurchaseLine}
          onSuccess={onSuccessHandler}
          optionJobs={transforJobOption(props.jobs)}
          dataIndex={selectedIndex} />
      )}
      {modalState.reciept && (
        <ReceiptPurchaseItem
          toggleDialog={() => dispatchModalState({})}
          dataReceipt={selectedReceipt}
          submit={submitReceiptHandler} />
      )}
      <Modal1 show={isShowDeletedModal}
        title={`Delete Purchase order in row ${selectedIndex + 1}.`}
        message={'You are deleting an Purchase order, Continue?'}
        handleClose={() => setIsShowDeletedModal(false)}
        proceed={proceedHandler} />
      <Modal1 show={isJobIdNull}
        title={'No Job No.'}
        message={'Job No. is a required field.'}
        handleClose={() => setIsJobIdNull(false)}
        proceed={() => setIsJobIdNull(false)} />
      <Grid
        className='mt-5'
        resizable={true}
        data={purchaseLines.filter((lin) => !lin.isDeleted) || []}
        cellRender={customCellRender}
        rowRender={customRowRender}
        onItemChange={itemChange}
        editField={EDIT_FIELD}
        onColumnResize={handleResizeColumn}
      >
        <Column
          field={autoColumns[FIELD_PURCHASE_LINE_LIST.action].field}
          width={autoColumns[FIELD_PURCHASE_LINE_LIST.action].width}
          cell={actionCell}
          headerCell={addButtonHeader} />
        <Column
          title='Line No.'
          field={autoColumns[FIELD_PURCHASE_LINE_LIST.row].field}
          width={autoColumns[FIELD_PURCHASE_LINE_LIST.row].width}
          editable={false}
          cell={(props: GridCellProps) => (
            <td className='k-command-cell'>
              <span> {props.dataIndex + 1}</span>
            </td>
          )} />
        <Column
          field={autoColumns[FIELD_PURCHASE_LINE_LIST.description].field}
          width={autoColumns[FIELD_PURCHASE_LINE_LIST.description].width}
          title='Description'
          cell={textAreaCell} />
        <Column
          field={autoColumns[FIELD_PURCHASE_LINE_LIST.internal].field}
          width={autoColumns[FIELD_PURCHASE_LINE_LIST.internal].width}
          title='Internal'
          editor='boolean'
          cell={checkboxCell}
        ></Column>
        <Column
          field={autoColumns[FIELD_PURCHASE_LINE_LIST.jobId].field}
          width={autoColumns[FIELD_PURCHASE_LINE_LIST.jobId].width}
          title='Job'
          cell={selectJobFormatCell}></Column>

        <Column
          field={autoColumns[FIELD_PURCHASE_LINE_LIST.quantity].field}
          width={autoColumns[FIELD_PURCHASE_LINE_LIST.quantity].width}
          title='Qty'
          editor='numeric'
          cell={NumericCell}></Column>
        <Column
          field={autoColumns[FIELD_PURCHASE_LINE_LIST.quantityReceived].field}
          width={autoColumns[FIELD_PURCHASE_LINE_LIST.quantityReceived].width}
          title='Received'
          editor='numeric'
          editable={false}
          cell={(props: GridCellProps) => (
            <td className='k-command-cell'>
              <span>
                {(props.dataItem.purchaseReceipts || []).reduce(
                  (sum: any, current: any) => sum + current.quantity,
                  0
                )}
              </span>
            </td>
          )}
          footerCell={costTotalsLabelFooterCell}
        />
        <Column
          field={autoColumns[FIELD_PURCHASE_LINE_LIST.costEach].field}
          width={autoColumns[FIELD_PURCHASE_LINE_LIST.costEach].width}
          title='Price Each'
          cell={amountFormatCell}
          footerCell={costEachTotalFooterCell}
        />
        <Column
          field={autoColumns[FIELD_PURCHASE_LINE_LIST.total].field}
          width={autoColumns[FIELD_PURCHASE_LINE_LIST.total].width}
          title='Total'
          editor='numeric'
          editable={false}
          format='{0:c2}'
          cell={amountFormatCell}
          footerCell={costTotalFooterCell}
        />
        <Column
          field={autoColumns[FIELD_PURCHASE_LINE_LIST.isIncludeGST].field}
          width={autoColumns[FIELD_PURCHASE_LINE_LIST.isIncludeGST].width}
          title='GST Inc'
          cell={checkboxCell} 
        ></Column>       
        <Column
          field={autoColumns[FIELD_PURCHASE_LINE_LIST.dueDate].field}
          width={autoColumns[FIELD_PURCHASE_LINE_LIST.dueDate].width}
          title='Due Date'
          cell={dateFormatCell} ></Column>
        <Column
          field={autoColumns[FIELD_PURCHASE_LINE_LIST.isMaterialCertRequired].field}
          width={autoColumns[FIELD_PURCHASE_LINE_LIST.isMaterialCertRequired].width}
          title='MCR'
          editor='boolean'
          cell={checkboxCell}
        ></Column>
        <Column
          field={autoColumns[FIELD_PURCHASE_LINE_LIST.invoiceNumber].field}
          width={autoColumns[FIELD_PURCHASE_LINE_LIST.invoiceNumber].width}
          title='Invoice No.'
          cell={textCell}></Column>
      </Grid>
      {/* <div className="row mt-3">
            <div className="col-3 offset-9 fw-bold">
                <div style={{ display: "table", width: "100%" }}>
                    <div style={{ display: "table-row-group" }}>
                        <div style={{ display: "table-row" }}>
                            <div style={{ display: "table-cell", width: "40%" }}>Line Total:</div>
                            <div style={{ display: "table-cell", border: '1px solid #000'}} className='text-end pe-2'>
                                {CurrencyFormatter(getLineTotal())}
                            </div>
                        </div>
                        <div style={{ display: "table-row", lineHeight: '50%' }}>&nbsp;</div>
                        <div style={{ display: "table-row" }}>
                            <div style={{ display: "table-cell", whiteSpace: 'nowrap' }} className='pe-2'>GST Included in line Total:</div>
                            <div style={{ display: "table-cell", border: '1px solid #000'}} className='text-end pe-2'>
                                {CurrencyFormatter(getGtsLineTotal())}
                            
                            </div>
                        </div>
                        <div style={{ display: "table-row", lineHeight: '50%' }}>&nbsp;</div>
                        <div style={{ display: "table-row" }}>
                            <div style={{ display: "table-cell"  }}>Total:</div>
                            <div style={{ display: "table-cell", border: '1px solid #000' }} className='text-end pe-2'>
                                {CurrencyFormatter(getTotalAmount())}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </div> */}

    </React.Fragment>
  )
}

export { PurchaseLineComponent }
