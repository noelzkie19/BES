import React, { useEffect, useState } from "react"
import {Grid, GridCellProps, GridColumn as Column, GridColumnResizeEvent} from '@progress/kendo-react-grid'
import { Material } from "../../models/quote-model"
import { CurrencyFormatter, onKeyDownHandler } from "../../../../shared/service/utils"
import { MATERIAL_DEFAULT } from "../../constant/quote-default"
import { MaterialFormModal } from "../modal/MaterialFormModal"
import { gtsComputation } from "../utils/material-utils"
import { GridActionIconCell } from "../../../../../_metronic/partials/widgets/grid/action/GridActionIconCell"
import { ActionEnum, ActionOption } from "../../../../../_metronic/partials/widgets/grid/constant/ActionOption"
import { FIELD_QUOTES_COLUMN_KEY, FIELD_QUOTE_MAT_COLUMN_KEY, FIELD_QUOTE_MAT_LIST, Material_List_Action } from "../../constant/config-map"
import { GridActionDropdownCell } from "../../../../../_metronic/partials/widgets/grid/action/GridActionDropdownCell"
import { CellRender, RowRender } from "../../../../shared/components/kendo/renderer"
import { InlineCellAmountCell } from "../../../../shared/components/kendo/incell/InCellAmountCell"
import { InCellBooleanCell } from "../../../../shared/components/kendo/incell/InCellBooleanCell"
import { AddButtonHeader } from "../../../../../_metronic/partials/content/button/kendo/AddButtonHeader"
import { SearchWidget1 } from "../../../../../_metronic/partials/widgets/search/SearchWidget1"
import { Modal1 } from "../../../../../_metronic/partials/modals/Modal1"
import { InCellTextCell } from "../../../../shared/components/kendo/incell/InCellTextCell"
import { InCellNumericCell } from "../../../../shared/components/kendo/incell/InCellNumericCell"
import { useEffectOnce } from "react-use"
import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from "../../../../shared/service/grid-setup-utils"

interface IProps {
    materials: Material[],
    isCanEdit: boolean,
    addMaterial: (material: Material) => void,
    updateMaterial: (idx: number, material: Material) => void,
    updateMaterials: (materials: Material[]) => void,
    removeMaterial: (idx: number) => void,
    replaceMaterials: (material: Material[]) => void,
}
const EDIT_FIELD = 'inEdit'
const QouteMaterial: React.FC<IProps> = ({materials, isCanEdit, updateMaterial, updateMaterials, removeMaterial, addMaterial, replaceMaterials}) => {
  
  const [qouteMaterials, setQouteMaterials] = useState<Material[]>(materials)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(MATERIAL_DEFAULT)
  const [isShowDeletedModal, setIsShowDeletedModal] = useState<boolean>(false)
  const [isTabKey, setIsTabKey] = useState<boolean>(false)
  const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_QUOTE_MAT_COLUMN_KEY)

  useEffect(() => {
    if (materials) {
      setQouteMaterials(materials)
    }
  }, [materials])

  useEffectOnce(() => {
    const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_QUOTES_MAT_LIST)
    if (columnLocal) {
      setAutoColumns(columnLocal)
    }
  })
  
  const itemChange = (event: any) => {
    if (isTabKey) {
      setIsTabKey(true)
      return
  }
      let field = event.field || ''
      event.dataItem[field] = event.value
      const idx = qouteMaterials.findIndex((po) => po.isEdit)

      let newMaterials = qouteMaterials;
      newMaterials[idx] = { ...event.dataItem, 
        totalPrice: gtsComputation(event.dataItem.quantity
          ,event.dataItem.unitPrice
          ,event.dataItem.gst) };
      
      updateMaterial(idx, newMaterials[idx])
      // Preload
      setQouteMaterials(newMaterials)
      
  }

  const enterEdit = (_: any, field: any, dataIndex: any) => {
      if (!isCanEdit) return;
      const data = qouteMaterials;
      const callData: any = [];
      data.forEach((item, index) => {
          var newData = {
              ...item,
              [EDIT_FIELD]: dataIndex === index ? field : undefined,
              isEdit: dataIndex === index,
          }
          callData.push(newData)
      })
      updateMaterials(callData)
  }
  const exitEdit = () => {
    if (isTabKey) {
        setIsTabKey(false)
        return;
    }
      const data = qouteMaterials
      const callData: any = [];
      data.forEach((item) => {
        var newData = {
            ...item,
            [EDIT_FIELD]: undefined,
            isEdit: false
        }
        callData.push(newData)
      })
      updateMaterials(callData)
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

  const onKeyDown = (event: any) => {
    var newData: any = []

    const { nextField, dataIndex} = 
      onKeyDownHandler(event, FIELD_QUOTES_COLUMN_KEY)

    qouteMaterials.forEach((item: any, index) => {
        newData.push({
          ...item,
          [event.field]: event.dataIndex === index ? event.value: item[event.field],
          [EDIT_FIELD]: dataIndex === index ? nextField : undefined,
          isEdit: dataIndex === index,
        })
    })
    replaceMaterials(newData)
    setIsTabKey(true)
  };


  const actionHandler = (event: any, dataItem: any, dataIndex: number) => {
    setSelectedIndex(dataIndex)
    setSelectedMaterial(dataItem)
    switch(event) {
      case ActionEnum.Delete: 
        setIsShowDeletedModal(true)
        break;
    }
  }

  const actionCell = (props: GridCellProps) => (
    <GridActionIconCell actions={[
        ActionOption.Delete
      ]}
      gridCellProps={props}
      changeHandler={actionHandler} />
  )

  const proceedHandler = () => {
    setIsShowDeletedModal(false)
      setIsEdit(false)
      if (selectedMaterial.refId && selectedMaterial.refId > 0) {
          updateMaterial(selectedIndex, { ...selectedMaterial, isDeleted: true })
      } else {
        removeMaterial(selectedIndex)
      }
  }

  const addNewMaterial = () => {
    setSelectedIndex(0)
    setIsEdit(false)
    addMaterial({...MATERIAL_DEFAULT})
  }

  const addButtonHeader = (props: any) => {
    return (
    <AddButtonHeader title={props.title} clickHandler={addNewMaterial} isCanEdit={isCanEdit}></AddButtonHeader>
    );
  };

  const customRowRender = (tr: any, props: any) => (
    <RowRender originalProps={props} tr={tr} exitEdit={exitEdit} editField={EDIT_FIELD} />
  )

  const customCheckRenderer = (props: any) => (
    <InCellBooleanCell props={props} 
        enterEdit={enterEdit} 
        exitEdit={exitEdit} 
        onChange={itemChange} 
        onKeyDown={onKeyDown}
        />
  )

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
  const handleResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, autoColumns, GRID_WIDTH.GRID_QUOTES_MAT_LIST);
  }
 
  return(
      <React.Fragment>
        <Modal1 show={isShowDeletedModal}
                title={`Delete Material in row ${selectedIndex + 1}.`}
                message={'You are deleting an Material, Continue?'}
                handleClose={() => setIsShowDeletedModal(false)}
                proceed={proceedHandler}/>
        <Grid
              className='mt-5'
              resizable={true}
              reorderable={true}
              data={(qouteMaterials || []).filter((ops) => !ops.isDeleted)}
              cellRender={customCellRender}
              rowRender={customRowRender}
              onItemChange={itemChange}
              editField={EDIT_FIELD}
              style={{height: '250px'}}
              onColumnResize={handleResizeColumn}
          >
            { isCanEdit && (
              <Column 
                field={autoColumns[FIELD_QUOTE_MAT_LIST.action].field}
                width={autoColumns[FIELD_QUOTE_MAT_LIST.action].width}
                cell={actionCell}  
                editable={false} 
                headerCell={addButtonHeader}/>
            )}
        
          <Column 
            field={autoColumns[FIELD_QUOTE_MAT_LIST.name].field}
            width={autoColumns[FIELD_QUOTE_MAT_LIST.name].width}
            title='Name' 
            editor='text' 
            cell={textCell}></Column>
          <Column 
            field={autoColumns[FIELD_QUOTE_MAT_LIST.quantity].field}
            width={autoColumns[FIELD_QUOTE_MAT_LIST.quantity].width}
            title='Quantity' 
            editor='numeric' 
            cell={NumericCell}></Column>
          <Column
            field={autoColumns[FIELD_QUOTE_MAT_LIST.unitPrice].field}
            width={autoColumns[FIELD_QUOTE_MAT_LIST.unitPrice].width}
            title='Unit Price'
            cell={amountFormatCell}
          ></Column>
          <Column 
            field={autoColumns[FIELD_QUOTE_MAT_LIST.gst].field}
            width={autoColumns[FIELD_QUOTE_MAT_LIST.gst].width}
            title='Inlcude GST' 
            cell={customCheckRenderer} ></Column>
          <Column
            field={autoColumns[FIELD_QUOTE_MAT_LIST.totalPrice].field}
            width={autoColumns[FIELD_QUOTE_MAT_LIST.totalPrice].width}
            title='Total Price'
            editor='numeric'
            editable={false}
            format='{0:c2}'
            cell={(props: GridCellProps) => (
              <td className='k-command-cell' tabIndex={0}>
                <span>
                  {
                    CurrencyFormatter(gtsComputation(props.dataItem.quantity, 
                        props.dataItem.unitPrice, 
                        props.dataItem.gst))
                  }
                </span>
              </td>
            )}
          ></Column>
        </Grid>
      </React.Fragment>
  )
}

export { QouteMaterial }