import React from 'react'
import {Modal} from 'react-bootstrap-v5'
import { Dialog, DialogActionsBar, Window } from "@progress/kendo-react-dialogs";
import { Controller, useForm } from 'react-hook-form'
import { IPurchaseReceiptData } from '../../models/purchase-model'
import {
  Grid,
  GridCellProps,
  GridColumn as Column
} from '@progress/kendo-react-grid'
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { dateFormat } from '../../../../shared/service/utils';

type Props = {
  dataReceipt: IPurchaseReceiptData,
  toggleDialog: () => void
}

const HistoryForm: React.FC<Props> = ({ dataReceipt, toggleDialog }) => {

  const {
    register,
    control,
  } = useForm({
    defaultValues: dataReceipt
  })

  return (
    <React.Fragment>

    <Window 
      title='Receipt History' 
      onClose={toggleDialog} 
      initialHeight={450}
      initialWidth={800}>
      <form name='history'>
        <div className='modal-body'>
          <div className='row'>

            <div className="col-12 col-lg-6">
              <div className="d-flex flex-row">
                <p className="font-weight-bold me-2">
                    Supplier Name:
                </p>
                <span>
                  {dataReceipt.supplierName}
                </span>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-flex flex-row">
                <p className="font-weight-bold me-2">
                  Purchase Order:
                </p>
                <span>
                  {dataReceipt.displayPurchaseNumber}
                </span>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-flex flex-row">
                <p className="font-weight-bold me-2">
                  Purchase Date:
                </p>
                <span>
                  {dateFormat(dataReceipt.purchaseDate)}
                </span>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-flex flex-row">
                <p className="font-weight-bold me-2">
                  Due Date:
                </p>
                <span>
                  {dateFormat(dataReceipt.dueDate)}
                </span>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="d-flex flex-row">
                <p className="font-weight-bold me-2">
                  Order Qty:
                </p>
                <span>
                  {dataReceipt.poQuantity}
                </span>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-flex flex-row">
                <p className="font-weight-bold me-2">
                  Job:
                </p>
                <span>
                  {dataReceipt.displayJobId}
                </span>
              </div>
            </div>
            
            <div className="col-12 col-lg-6">
              <div className="d-flex flex-row">
                <p className="font-weight-bold me-2">
                  Quantity Received:
                </p>
                <span>
                  {dataReceipt.quantityReceived}
                </span>
              </div>
            </div>
            {/* <div className="col-12 col-lg-6">
              <div className="d-flex flex-row">
                <p className="font-weight-bold me-2">
                  Lot Number:
                </p>
                <span>
                  {dataReceipt.lotNumber}
                </span>
              </div>
            </div> */}
            <div className='col col-12 pe-2  mb-4'>
              <div className="d-flex flex-row">
                <p className="font-weight-bold me-2">
                  Description:
                </p>
                <span>
                  {dataReceipt.decription}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Grid data={dataReceipt.historyReceipts}>
          <Column field='created' title='Receipt Date' cell={(props: GridCellProps) => {
            if (props.dataItem.date) {
              // const [year, month, day] = props.dataItem.date.toString().split('T')[0].split('-');
              return (
                <td className='k-command-cell'>
                  {/* <span> {`${day}/${month}/${year}`}</span> */}
                  {dateFormat(props.dataItem.created)}
                </td>
              )
            } else {
              return (
                <td className='k-command-cell'>
                  <span></span>
                </td>
              )
            }
          }}></Column>
          <Column field='goodInspctReceivedBy' title='Receipt By'></Column>
          <Column field='quantity' title='Quantity'></Column>
          <Column field='note' title='Receipt Note'></Column>
          <Column field='heatNumber' title='Heat Number'></Column>
          <Column field='lotNumber' title='Lot Number'></Column>
        </Grid>
      </form>
      
      <DialogActionsBar>
          <button className="btn btn-outline-primary"
            onClick={toggleDialog}>
            Close
          </button>
        </DialogActionsBar>
    </Window >
  </React.Fragment>
  )
}

export {HistoryForm}
