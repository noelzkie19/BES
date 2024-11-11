import {FC, useContext, useEffect, useState} from 'react'
import {IPurchaseData} from '../../models/purchase-model'
import PurchaseHeader from './PurchaseHeader'
import {PurchaseOrderContext} from '../../context/PurchaseOrderContext'
import {ISupplierData} from '../../../suppliers/models/supplier-model'
import {CurrencyFormatter, dateFormat} from '../../../../shared/service/utils'
import classes from '../ui/PurchaseOrderForm.module.css'

interface Props {
  refs?: any
  purchaseData: IPurchaseData
  isPrint: boolean
}

const PurchaseContent: FC<Props> = ({refs, purchaseData, isPrint}) => {
  const {suppliers} = useContext(PurchaseOrderContext)
  const [selectedSupplier, setSelectedSupplier] = useState<ISupplierData>()

  // document.title = window.parent.document.title = `Purchase-Order-${purchaseData.purchaseNumber}`

  useEffect(() => {
    if (purchaseData.supplierId) {
      const supplier = suppliers.find((sup) => sup.id === purchaseData.supplierId)
      setSelectedSupplier(supplier)
    }
  }, [purchaseData, suppliers])

  const getLineTotal = () => {
    return purchaseData.purchaseLines.reduce((sum, current) => sum + current.costEachTotal, 0)
  }
  const getGtsLineTotal = () => {
    return purchaseData.purchaseLines.reduce((sum, current) => sum + current.gstAmount, 0)
  }

  const getTotalAmount = () => {
    return getLineTotal() + getGtsLineTotal()
  }

  return (
    <div ref={refs} className={classes.purchaseOrder}>
      <PurchaseHeader
        poNumber={purchaseData.purchaseNumber}
        date={purchaseData.date}
        isPrint={isPrint}
        createdBy={purchaseData.createdBy}
      />
      <div className='row mb-4'>
        <div className='col-7'>
          <div className='fw-bold'>Brisbane Engineering Service Pty Ltd</div>
          <address className='fw-bold m-0'>4/12 Maiella Street</address>
          <div className='mb-2 fw-bold'>Stapylton QLD 4207</div>
          <address className='fw-bold m-0'>Phone: +61 7 3807 3807</address>
          {/* <address className="fw-bold m-0">Fax: +61 7 3382 6336</address> */}
          <div className='fw-bold'>ABN: 74 539 697 586</div>
        </div>
        <div className='col-5'>
          <span className='fw-bold text-decoration-underline'>Order To:</span>
          <address
            className='w-100 p-3 mt-2 mb-2'
            style={{border: '1px solid #000', boxShadow: '3px 4px'}}
          >
            <span>{purchaseData.supplierName}</span>
            <br />
            <span>{selectedSupplier?.street}</span>
            <br />
            <span className='d-flex justify-content-between'>
              <span>{selectedSupplier?.suburb}</span>
              <span></span>
            </span>
            <span className='d-flex justify-content-between'>
              <span>
                {selectedSupplier?.state?.toUpperCase()} {selectedSupplier?.postCode}
              </span>
              <span className='pe-0'>
                <label>Phone:</label> {selectedSupplier?.phone}
              </span>
            </span>
          </address>
        </div>
      </div>
      <table className='w-100'>
        <thead style={{borderTop: '2px solid #000'}}>
          <tr>
            <th style={{width: '5%'}}></th>
            <th style={{width: '40%'}}>
              <b>Description</b>
            </th>
            <th style={{width: '8%'}}>
              <b>Mat Cert Rec</b>
            </th>
            <th style={{width: '10%'}}>
              <b>Quantity</b>
            </th>
            <th style={{width: '10%'}}>
              <b>Unit Price</b>
            </th>
            <th style={{width: '10%'}}>
              <b>Line Amount</b>
            </th>
            <th style={{width: '8%'}}>
              <b>Inc. GST</b>
            </th>
            <th style={{width: '15%'}}>
              <b>Due Date</b>
            </th>
          </tr>
        </thead>
        <tbody style={{borderTop: '1px solid #000'}}>
          {(purchaseData.purchaseLines || []).map((poline: any, row: number) => {
            return (
              <tr key={poline.id} style={{borderBottom: '1px dotted #000'}}>
                <td className='text-nowrap'> {row + 1} </td>
                <td> {poline.description} </td>
                <td> {poline.isMaterialCertRequired ? 'Yes' : 'No'}</td>
                <td> {poline.quantity} </td>
                <td> {CurrencyFormatter(poline.costEach)}</td>
                <td> {CurrencyFormatter(poline.costEachTotal)}</td>
                <td> {poline.isIncludeGST ? 'Yes' : 'No'}</td>
                <td> {dateFormat(poline.dueDate)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <br />
      <div className='mt-3' style={{display: 'table', width: '100%'}}>
        <div style={{display: 'table-row-group'}}>
          <div style={{display: 'table-row'}}>
            <div style={{display: 'table-cell', whiteSpace: 'nowrap'}}>Created by:</div>
            <table className='ms-1 w-100' style={{border: '1px solid #000'}}>
              <tbody>
                <tr>
                  <td>{purchaseData.createdBy}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{display: 'table-row', lineHeight: '50%'}}>&nbsp;</div>
          <div style={{display: 'table-row'}}>
            <div style={{display: 'table-cell', verticalAlign: 'top'}}>Shipping:</div>
            <table className='ms-1 w-100' style={{border: '1px solid #000'}}>
              <tbody>
                <tr>
                  <td>
                    {purchaseData.isCourPlsReceivePays && (
                      <span>
                        Courier Please - Receiver Pays
                        <br />
                      </span>
                    )}
                    {purchaseData.isBesArrCollection && (
                      <span>
                        BES to arrange collection
                        <br />
                      </span>
                    )}
                    {purchaseData.isCallReady && (
                      <span>
                        Please call when ready
                        <br />
                      </span>
                    )}
                    {purchaseData.isCallReadyQuoting && (
                      <span>
                        Please call when ready quoting PO number, weight, and dimensions
                        <br />
                      </span>
                    )}
                    {purchaseData.isOthers && (
                      <span>
                        {purchaseData.otherNotes}
                        <br />
                      </span>
                    )}
                    All deliveries are to be made Monday to Thursday, between 7:00AM and 3:30PM and
                    Friday 7:00AM and 1:00PM
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{display: 'table-row', lineHeight: '50%'}}>&nbsp;</div>
          <div style={{display: 'table-row'}}>
            <div
              className='text-decoration-underline font-weight-bold'
              style={{display: 'table-cell'}}
            >
              Notes:
            </div>
            <table className='ms-1 w-100' style={{border: '1px solid #000'}}>
              <tbody>
                <tr>
                  <td>{purchaseData.poNotes}&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{display: 'table-row', lineHeight: '50%'}}>&nbsp;</div>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-4 offset-7 fw-bold'>
          <div style={{display: 'table', width: '100%'}}>
            <div style={{display: 'table-row-group'}}>
              <div style={{display: 'table-row'}}>
                <div style={{display: 'table-cell', width: '40%'}}>Line Total:</div>
                <div
                  style={{display: 'table-cell', border: '1px solid #000', boxShadow: '1px 2px'}}
                  className='text-end pe-2'
                >
                  {CurrencyFormatter(getLineTotal())}
                </div>
              </div>
              <div style={{display: 'table-row', lineHeight: '50%'}}>&nbsp;</div>
              <div style={{display: 'table-row'}}>
                <div style={{display: 'table-cell', whiteSpace: 'nowrap'}} className='pe-2'>
                  GST Included:
                </div>
                <div
                  style={{display: 'table-cell', border: '1px solid #000', boxShadow: '1px 2px'}}
                  className='text-end pe-2'
                >
                  {CurrencyFormatter(getGtsLineTotal())}
                </div>
              </div>
              <div style={{display: 'table-row', lineHeight: '50%'}}>&nbsp;</div>
              <div style={{display: 'table-row'}}>
                <div style={{display: 'table-cell'}}>Total:</div>
                <div
                  style={{display: 'table-cell', border: '1px solid #000', boxShadow: '1px 2px'}}
                  className='text-end pe-2'
                >
                  {CurrencyFormatter(getTotalAmount())}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {PurchaseContent}
