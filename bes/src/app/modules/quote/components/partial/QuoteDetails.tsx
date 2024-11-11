import React, {useEffect, useState} from 'react'
import {QuoteDetail} from '../../models/quote-detail'
import {Modal1} from '../../../../../_metronic/partials/modals/Modal1'
import {
  ActionEnum,
  ActionOption,
} from '../../../../../_metronic/partials/widgets/grid/constant/ActionOption'
import {QUOTE_DETAIL_DEFAULT} from '../../constant/quote-default'
import {CellRender, RowRender} from '../../../../shared/components/kendo/renderer'
import {onKeyDownHandler} from '../../../../shared/service/utils'
import {
  FIELD_QUOTES_COLUMN_KEY,
  FIELD_QUOTE_MAT_COLUMN_KEY,
  FIELD_QUOTE_MAT_LIST,
} from '../../constant/config-map'
import {GRID_WIDTH, saveResizeColumn} from '../../../../shared/service/grid-setup-utils'

import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridColumnResizeEvent,
} from '@progress/kendo-react-grid'
import {AddButtonHeader} from '../../../../../_metronic/partials/content/button/kendo/AddButtonHeader'
import {InCellTextCell} from '../../../../shared/components/kendo/incell/InCellTextCell'
import {InlineCellAmountCell} from '../../../../shared/components/kendo/incell/InCellAmountCell'
import {InCellNumericCell} from '../../../../shared/components/kendo/incell/InCellNumericCell'
import {GridActionIconCell} from '../../../../../_metronic/partials/widgets/grid/action/GridActionIconCell'

const EDIT_FIELD = 'inEdit'

interface IProps {
  details: QuoteDetail[]
  isCanEdit: boolean
  addDetail: (material: QuoteDetail) => void
  updateDetail: (idx: number, material: QuoteDetail) => void
  updateDetails: (materials: QuoteDetail[]) => void
  removeDetail: (idx: number) => void
  replaceDetails: (material: QuoteDetail[]) => void
}

const QuoteDetails: React.FC<IProps> = ({
  details,
  isCanEdit,
  addDetail,
  updateDetail,
  updateDetails,
  removeDetail,
  replaceDetails,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [qouteDetails, setQouteDetails] = useState<QuoteDetail[]>(details)

  useEffect(() => {
    if (details) {
      setQouteDetails(details)
    }
  }, [details])
  // **
  // Event Handler
  // **
  const [selectedDetail, setSelectedDetail] = useState<QuoteDetail>(QUOTE_DETAIL_DEFAULT)
  const [isShowDeletedModal, setIsShowDeletedModal] = useState<boolean>(false)
  const actionHandler = (event: any, dataItem: any, dataIndex: number) => {
    setSelectedIndex(dataIndex)
    setSelectedDetail(dataItem)
    switch (event) {
      case ActionEnum.Delete:
        setIsShowDeletedModal(true)
        break
    }
  }

  const proceedHandler = () => {
    setIsShowDeletedModal(false)
    if (selectedDetail) {
      if (selectedDetail.id && selectedDetail.id > 0) {
        updateDetail(selectedIndex, {...selectedDetail, isDeleted: true})
      } else {
        removeDetail(selectedIndex)
      }
    }
  }

  const onKeyDown = (event: any) => {
    var newData: any = []

    const {nextField, dataIndex} = onKeyDownHandler(event, FIELD_QUOTES_COLUMN_KEY)

    qouteDetails.forEach((item: any, index) => {
      newData.push({
        ...item,
        [event.field]: event.dataIndex === index ? event.value : item[event.field],
        [EDIT_FIELD]: dataIndex === index ? nextField : undefined,
        isEdit: dataIndex === index,
      })
    })
    replaceDetails(newData)
    setIsTabKey(true)
  }

  const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_QUOTE_MAT_COLUMN_KEY)
  const handleResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, autoColumns, GRID_WIDTH.GRID_QUOTES_MAT_LIST)
  }

  const addNewMaterial = () => {
    setSelectedIndex(0)
    addDetail({...QUOTE_DETAIL_DEFAULT})
  }

  // **
  // Grid Renderer
  // **
  const [isTabKey, setIsTabKey] = useState<boolean>(false)
  const itemChange = (event: any) => {
    if (isTabKey) {
      setIsTabKey(true)
      return
    }
    let field = event.field || ''
    event.dataItem[field] = event.value

    if (field === 'quantity' || field === 'costPerUnit') {
      const {costPerUnit, quantity} = event.dataItem
      event.dataItem = {
        ...event.dataItem,
        totalCost: quantity === 0 ? 0 : Number((quantity * costPerUnit).toFixed(2)),
      }
    }
    if (field === 'totalCost') {
      let {quantity} = event.dataItem
      event.dataItem = {
        ...event.dataItem,
        costPerUnit: quantity === 0 ? 0 : Number((event.value / quantity).toFixed(2)),
      }
    }

    const idx = qouteDetails.findIndex((po) => po.isEdit)
    qouteDetails[idx] = event.dataItem
    updateDetail(idx, qouteDetails[idx])
    // Preload
    setQouteDetails(qouteDetails)
  }

  const enterEdit = (_: any, field: any, dataIndex: any) => {
    if (!isCanEdit) return
    const data = qouteDetails
    const callData: any = []
    data.forEach((item, index) => {
      var newData = {
        ...item,
        [EDIT_FIELD]: dataIndex === index ? field : undefined,
        isEdit: dataIndex === index,
      }
      callData.push(newData)
    })
    updateDetails(callData)
  }
  const exitEdit = () => {
    if (isTabKey) {
      setIsTabKey(false)
      return
    }
    const data = qouteDetails
    const callData: any = []
    data.forEach((item) => {
      var newData = {
        ...item,
        [EDIT_FIELD]: undefined,
        isEdit: false,
      }
      callData.push(newData)
    })
    updateDetails(callData)
  }

  const customCellRender = (td: any, props: any) => (
    <CellRender
      originalProps={props}
      td={td}
      enterEdit={enterEdit}
      editField={EDIT_FIELD}
      exitEdit={exitEdit}
      onKeyDown={onKeyDown}
    />
  )

  const customRowRender = (tr: any, props: any) => (
    <RowRender originalProps={props} tr={tr} exitEdit={exitEdit} editField={EDIT_FIELD} />
  )

  const addButtonHeader = (props: any) => {
    return (
      <AddButtonHeader
        title={props.title}
        clickHandler={addNewMaterial}
        isCanEdit={isCanEdit}
      ></AddButtonHeader>
    )
  }

  const amountFormatCell = (props: any) => (
    <InlineCellAmountCell
      props={props}
      enterEdit={enterEdit}
      onChange={itemChange}
      exitEdit={exitEdit}
      onKeyDown={onKeyDown}
      tabIndex={0}
    ></InlineCellAmountCell>
  )

  const textCell = (cellProps: GridCellProps) => (
    <InCellTextCell
      props={cellProps}
      enterEdit={enterEdit}
      onChange={itemChange}
      exitEdit={exitEdit}
      onKeyDown={onKeyDown}
      tabIndex={0}
    />
  )

  const NumericCell = (cellProps: GridCellProps) => (
    <InCellNumericCell
      props={cellProps}
      enterEdit={enterEdit}
      onChange={itemChange}
      exitEdit={exitEdit}
      onKeyDown={onKeyDown}
      tabIndex={0}
    />
  )

  const actionCell = (props: GridCellProps) => (
    <GridActionIconCell
      actions={[ActionOption.Delete]}
      gridCellProps={props}
      changeHandler={actionHandler}
    />
  )

  return (
    <React.Fragment>
      <Modal1
        show={isShowDeletedModal}
        title={`Delete Material in row ${selectedIndex + 1}.`}
        message={'You are deleting an Material, Continue?'}
        handleClose={() => setIsShowDeletedModal(false)}
        proceed={proceedHandler}
      />
      <Grid
        className='mt-5'
        resizable={true}
        reorderable={true}
        data={(qouteDetails || []).filter((ops) => !ops.isDeleted)}
        cellRender={customCellRender}
        rowRender={customRowRender}
        onItemChange={itemChange}
        editField={EDIT_FIELD}
        style={{height: '250px'}}
        onColumnResize={handleResizeColumn}
      >
        <Column
          field={autoColumns[FIELD_QUOTE_MAT_LIST.action].field}
          width={autoColumns[FIELD_QUOTE_MAT_LIST.action].width}
          cell={actionCell}
          editable={false}
          headerCell={addButtonHeader}
        />
        <Column title='Description' field='description' cell={textCell}></Column>
        <Column title='Drawing' field='drawing' cell={textCell}></Column>
        <Column title='Revision' field='revision' cell={textCell}></Column>
        <Column title='Qty' field='quantity' cell={NumericCell}></Column>
        <Column title='Cost Per Unit' field='costPerUnit' cell={amountFormatCell}></Column>
        <Column title='Total Cost' field='totalCost' cell={amountFormatCell}></Column>
        <Column title='Estimated Lead Time' field='estLeadTime' cell={textCell}></Column>
      </Grid>
    </React.Fragment>
  )
}

export {QuoteDetails}
