import React, { useEffect, useState } from "react"
import {
    Grid,
    GridCellProps,
    GridColumn as Column,
    GridDetailRowProps
} from '@progress/kendo-react-grid'
import { DateFormatCell } from "../../../../shared/components/kendo/format/DateFormatCell"
import { IJobPurchaseData } from "../../models/job-model"
import { CellRender, RowRender } from "../../../../shared/components/kendo/renderer"
import { InCellNumericCell } from "../../../../shared/components/kendo/incell/InCellNumericCell"
import { InCellTextAreaCell } from "../../../../shared/components/kendo/incell/InCellTextAreaCell"
import { InlineCellAmountCell } from "../../../../shared/components/kendo/incell/InCellAmountCell"
import { FIELD_PO_COLUMN_KEY } from "../../constant/config-default"
import { onKeyDownHandler } from "../../../../shared/service/utils"
import { AddButtonHeader } from "../../../../../_metronic/partials/content/button/kendo/AddButtonHeader"
import { useHistory } from "react-router-dom"
import { HistoryForm } from "../../../purchase-orders/components/modal/HistoryForm"
import { IPurchaseReceiptData } from "../../../purchase-orders/models/purchase-model"
import { PURCHASELINESRECEIPT_FORM_DEFAULT } from "../../../purchase-orders/constant/purchase-defaults"
import { trasformPurchaseReceipt } from "../../../purchase-orders/transformer/purchase-transformer"

const EDIT_FIELD = 'inEdit'
const PurchaseOrderComponent: React.FC<any> = (stateProps: any) => {
    const history = useHistory()
    const [purchaseOrder, setPurchaseOrder] = useState<IJobPurchaseData[]>(stateProps.purchaseOrder)
    const [isTabKey, setIsTabKey] = useState<boolean>(false)
    const [isShowHistory, setIsShowHistory] = useState<boolean>(false)
    const [selectedReceipt, setSelectedReceipt] = useState<IPurchaseReceiptData>(
        PURCHASELINESRECEIPT_FORM_DEFAULT
      )

    useEffect(() => {
        if (stateProps.purchaseOrder) {
            setPurchaseOrder([...stateProps.purchaseOrder])
        }
    }, [stateProps.purchaseOrder])

    const purchaseExpandChange = (event: any) => {
        let newData = purchaseOrder.map((item: any) => {
            if (item.purchaseLineNumber === event.dataItem.purchaseLineNumber) {
                item.expanded = !event.dataItem.expanded
            }
            return item
        })
        stateProps.setPurchaseOrder(newData)
    }


    // const deleteHandler = (dataItem: any) => {
    //     const newPurchaseData = purchaseOrder;
    //     const idx = newPurchaseData.indexOf(dataItem);
    //     newPurchaseData.splice(idx, 1);
    //     stateProps.setPurchaseOrder(newPurchaseData)
    // }

    // const purchaseDetailsComponent = (props: GridDetailRowProps) =>
    // (
    //     <Grid data={props.dataItem.purchaseReceipts}>
    //         <Column
    //             field='date'
    //             title='Received Date'
    //             filterable={false}
    //             cell={DateFormatCell}
    //         />
    //         <Column field='heatNumber' title='Heat Number' />
    //         <Column field='goodInspctReceivedBy' title='Received By' />
    //         <Column field='quantity' title='Received Qty' />
    //     </Grid>
    // )

    const changeSelectHandler = (dataItem: any, isSelect: boolean) => {
        const newPurchaseData = purchaseOrder;
        const idx = newPurchaseData.indexOf(dataItem);
        newPurchaseData[idx].isSelected = isSelect;
        stateProps.setPurchaseOrder(newPurchaseData)
    }


    const selectPOCell = (props: GridCellProps) => (
        <td className='k-command-cell'>
            <div><input type="checkbox" checked={props.dataItem.isSelected} 
            onChange={(e) => {
                changeSelectHandler(props.dataItem, e.target.checked)
            }}/></div>
        </td>
    )
    

    const enterEdit = (_: any, field: any, dataIndex: any) => {
        if (!stateProps.isCanEdit)
            return

        var newData: any = []
        purchaseOrder.forEach((item: any, index: any) => {
            newData.push({
                ...item,
                [EDIT_FIELD]: dataIndex === index ? field : undefined,
               isEdit: dataIndex === index,
            })
        //    props.updateOperation(index, newData)
       })
    //    setPurchaseOrder(newData)
       stateProps.setPurchaseOrder(newData)
    //    props.replaceOperations(newData)
    }

    const exitEdit = () => {
        if (isTabKey) {
            setIsTabKey(false)
            return
        }
        purchaseOrder.forEach((item, index) => {
            var newData = {
                ...item,
                [EDIT_FIELD]: undefined,
                isEdit: false,
            }
            stateProps.updatePurchaseOrder(newData, index)
        })
    }

   

    const itemChange = (event: any) => {
        if (!stateProps.isCanEdit)
            return
        
        if (isTabKey) {
            setIsTabKey(false)
            return
        }
        let field = event.field || ''
        event.dataItem[field] = event.value
        const idx = purchaseOrder.findIndex((po) => po.isEdit)

        // preload operation for exit edit
        let { costEach, costTotal, quantity } = event.dataItem;
      
        if (field === 'costEach' || field === 'quantity') {
            if (quantity > 0) {
                costTotal = (costEach * quantity).toFixed(2)
            } else costTotal = 0
        }
        if (field === 'costTotal') {
            if (quantity > 0) {
                costEach = (costTotal / quantity).toFixed(2)
            } else costEach = 0
        }

        purchaseOrder[idx] = {
            ...event.dataItem,
            costEach,
            costTotal
        }

        stateProps.updatePurchaseOrder(purchaseOrder, idx)
        setPurchaseOrder(purchaseOrder)
    }

    const onKeyDown = (event: any) => {
        if (!stateProps.isCanEdit)
            return
    
        var newData: any = []
        
        const { nextField, dataIndex} = 
            onKeyDownHandler(event, FIELD_PO_COLUMN_KEY)

           
        purchaseOrder.forEach((item: any, index) => {
            let { costEach, costTotal } = item;
            let itemData = {
                ...item,
                [event.field]: event.dataIndex === index ? event.value: item[event.field],
                [EDIT_FIELD]: dataIndex === index ? nextField : undefined,
                isEdit: dataIndex === index
            }

            if (event.dataIndex === index) {
                if (event.field === 'quantity') {
                    if (event.dataItem.quantity > 0) { 
                        costTotal = (event.dataItem.costEach * event.value).toFixed(2)
                    } else costTotal = 0
                    itemData = {
                        ...itemData,
                        costTotal
                    }
                  
                }
                if (event.field === 'costEach') {
                    if (event.dataItem.quantity > 0) { 
                        costTotal = (event.value * event.dataItem.quantity).toFixed(2)
                    } else costTotal = 0

                    itemData = {
                        ...itemData,
                        costTotal
                    }
                }
                if (event.field === 'costTotal') {
                    if (event.dataItem.quantity > 0) { 
                        costEach = (event.value / event.dataItem.quantity).toFixed(2)
                    } else costEach = 0

                    itemData = {
                        ...itemData,
                        costEach
                    }
                }
            }
        
            newData.push(itemData)
        })
        stateProps.setPurchaseOrder(newData)
        setPurchaseOrder(newData)
        setIsTabKey(true)
    };
      


    // Renderer //
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

   const textCellCell = (cellProps: GridCellProps) => (
        <InCellTextAreaCell
            props={cellProps}
            enterEdit={enterEdit}
            onChange={itemChange}
            exitEdit={exitEdit}
            width={140}
            onKeyDown={onKeyDown}
        />
    )

    const numericFormatCell = (cellProps: GridCellProps) => (
        <InCellNumericCell
           props={cellProps}
           enterEdit={enterEdit}
           onChange={itemChange}
           exitEdit={exitEdit}
           onKeyDown={onKeyDown}
       />
    )
    

    const amountFormatCell = (cellProps: GridCellProps) => (
        <InlineCellAmountCell
           props={cellProps}
           enterEdit={enterEdit}
           onChange={itemChange}
           exitEdit={exitEdit}
           onKeyDown={onKeyDown}
       />
    )
    const ActionCell = (props: GridCellProps) => (
        <td className="k-command-cell">
           <button type="button" className="btn btn-primary" style={{width: '100%', padding: '0px'}}
            onClick={() => {
                const dataReceipt = trasformPurchaseReceipt(
                    props.dataItem,
                    props.dataItem.supplier,
                    props.dataIndex,
                    props.dataItem?.purchaseDate,
                    props.dataItem.createdBy,
                    {
                        jobId: stateProps.jobData.jobId,
                        client: {
                            name: stateProps.clientName,
                        },
                        description: stateProps.jobData.description
                    },
                    ''
                  )
                setSelectedReceipt(dataReceipt)
                setIsShowHistory(true)
            }}>Hist</button>
        </td>
    )

        
    const addPurchaseOrder = () => {
        stateProps.addPurchaseOrder()
    }

    const goToPurchaseOrder = (purchaseOrderId: number) => {
        stateProps.goToPurchaseOrder(purchaseOrderId)
    }


    const purchaseNumberCell = (cellProps: GridCellProps) => (
        <td onDoubleClick={() => goToPurchaseOrder(cellProps.dataItem.purchaseNumber)} key={cellProps.dataItem.id}>
            {cellProps.dataItem.purchaseNumber}
        </td>
    )

    const addButtonHeader = (bprops: any) => {
        return (
         <AddButtonHeader title={bprops.title} clickHandler={addPurchaseOrder} isCanEdit={stateProps.isCanEdit}></AddButtonHeader>
        );
    };

 
    return (
        <React.Fragment>
            {isShowHistory && (
                <HistoryForm
                toggleDialog={() => {
                    setIsShowHistory(false)
                }}
                dataReceipt={selectedReceipt} />
            )}
            <Grid resizable={true} reorderable={true}
                data={purchaseOrder || []}
                // detail={purchaseDetailsComponent}
                expandField='expanded'
                style={{width: '100%', height: '20vh'}}
                onExpandChange={purchaseExpandChange}
                cellRender={customCellRender}
                rowRender={customRowRender}
                onItemChange={itemChange}
                editField={EDIT_FIELD}>
                {
                    stateProps.createCopy && (
                        <Column field='isSelected' title=' ' width={50} cell={selectPOCell}/>
                    )
                }
                {
                    stateProps.poAction && (
                        <Column field='actionButton' title=' ' width={50} cell={ActionCell} editable={false} headerCell={addButtonHeader}/>
                    )
                }
                <Column field='purchaseNumber' title='PO#' editable={false} width={65} cell={purchaseNumberCell}/>
                <Column field='supplier' title='Supplier' editable={false}/>
                <Column field='description' title='Desc.' cell={textCellCell} editable={stateProps.createCopy}/>
                <Column field='purchaseDate' title='PO Date' cell={DateFormatCell}  editable={false}/>
                <Column field='quantity' title='Qty' cell={numericFormatCell} editable={stateProps.createCopy} width={80}/>
                <Column field='costEach' title='Each $' cell={amountFormatCell} editable={stateProps.createCopy}/>
                <Column field='costTotal' title='Total $' cell={amountFormatCell} editable={stateProps.createCopy}/>
                <Column field='received' title={`Rec'd #`} editable={false} width={80}/>
{/*                 
                <Column field='dueDate' title='Due On' cell={dateFormatCell}  editable={stateProps.createCopy}/>
                <Column field='createdBy' title='Created' editable={false}/> */}
              
            </Grid>
       </React.Fragment>
    )
}

export { PurchaseOrderComponent }