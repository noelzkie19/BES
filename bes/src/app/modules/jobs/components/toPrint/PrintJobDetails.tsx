import React from 'react'
import HeaderPrintJob from './HeaderPrintJob'
import { IJobPurchaseData } from '../../models/job-model'
import { dateFormat } from '../../../../shared/service/utils'
import { transformResourcesOption, transformUserOption } from '../../transformers/job-transformer'

interface IMyProps {
  refs?: any
  purchaseOrder: IJobPurchaseData[]
  operations: any
  jobDetails: any,
  users: any,
  resources: any
}

const PrintJobDetails: React.FC<IMyProps> = ({ refs, purchaseOrder, operations, jobDetails, users, resources }) => {

  let totalExpectedProcessTime = 0;
  let totalProg = 0;
  let totalSet = 0;
  let totalRun = 0;
  let totalOthers = 0;

  for (const operation of operations) {
    if (typeof operation.expectedProcessTime === 'number') {
      totalExpectedProcessTime += operation.expectedProcessTime;
      totalProg += operation.prog;
      totalSet += operation.set;
      totalRun += operation.run;
      totalOthers += operation.other;
    }
    totalExpectedProcessTime = +totalExpectedProcessTime.toFixed(2)
    totalProg = +totalProg.toFixed(2)
    totalSet = +totalSet.toFixed(2)
    totalRun = +totalRun.toFixed(2)
    totalOthers = +totalOthers.toFixed(2)
  }

  return (
    <div id='layoutPrint' ref={refs} className='job-card-print'>
      <HeaderPrintJob jobDetails={jobDetails} />
      <div className='printJob mt-5'>
        <div className='row no-break'>
          <div className='col-6 setupText'>
            <div className='p-2 jobInformation'>
              <div className='row'>
                <div className='col-4'>Description:</div>
                <div className='col'>
                  {jobDetails != null
                    ? <span>{jobDetails.description}</span>
                    : <span>Description Placeholder</span>
                  }
                </div>
              </div>
              <div className='row'>
                <div className='col-4'>Client:</div>
                <div className='col'>
                  {jobDetails != null
                    ? <span>{jobDetails.client}</span>
                    : <span>Client Placeholder</span>
                  }
                </div>
              </div>
              <div className='row'>
                <div className='col-4'>Purchase Order:</div>
                <div className='col'>
                  {jobDetails != null
                    ? <span>{jobDetails.orderNumber}</span>
                    : <span>Order Placeholder</span>
                  }
                </div>
              </div>
              <div className='row'>
                <div className='col-4'>Quantity:</div>
                <div className='col'>
                  {jobDetails != null
                    ? <span>{jobDetails.quantity}</span>
                    : <span>Quantity Placeholder</span>
                  }
                </div>
              </div>
              <div className='row'>
                <div className='col-4'>Drawing/Revision:</div>
                <div className='col'>
                  {
                    jobDetails && (<span>{jobDetails.drawingNumber}/{jobDetails.revisionNumber}</span>)
                  }
                </div>
              </div>
              <div className='row'>
                <div className='col-4'>Date Due:</div>
                <div className='col'>
                  {jobDetails != null
                    ? <span>{dateFormat(jobDetails.dueDate)}</span>
                    : <span>Date Due Placeholder</span>
                  }
                </div>
              </div>
              <div className='row'>
                <div className='col-4'>NCR Number:</div>
                <div className='col'>
                  {jobDetails != null
                    ? <span>{jobDetails.ncrNumber}</span>
                    : <span>NCR Number Placeholder</span>
                  }
                </div>
              </div>
              <div className='row'>
                <div className='col-4'>Overruns:</div>
                <div className='col'>
                {jobDetails != null
                    && (
                      <span>    
                        {jobDetails.qtyAuthorisedOverruns}
                        <span> Number Authorised Overruns</span>
                      </span>)
                   
                  }

              
                </div>
              </div>
            </div>
          </div>
          <div className='col-6 setupText'>
            <div className='row'>
              <div className='poTblWrap col-12'>
                <div className='jobDetailsHeading'>Purchase Order</div>
                <table
                  style={{ borderWidth: '1px', borderColor: '#000000', borderStyle: 'solid', width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th className='p-1'>
                        <b>PO#</b>
                      </th>
                      <th className='p-1'>
                        <b>Supplier</b>
                      </th>
                      <th className='p-1'>
                        <b>Description</b>
                      </th>
                      <th className='p-1'>
                        <b>Qty</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      (purchaseOrder || []).map((po: any, rowid: number) => {
                        return (
                          <tr key={rowid}>
                            <td className='p-1'>
                              {po.purchaseNumber}
                            </td>
                            <td className='p-1'>
                              {po.supplier}
                            </td>
                            <td className='p-1'>
                              {po.description}
                            </td>
                            <td className='p-1'>
                              {po.quantity}
                            </td>
                          </tr>
                        )
                      }
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 '>
                <div style={{ height: 100 }} className='setupText'>
                  Consumables Used:
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row mt-4 no-break'>
          <div className='col p-0'>
            <div className='setupText'>
              <span className='jobDetailsHeading'>Setup Text:</span>
              {jobDetails != null
                ? <span>{jobDetails.setupText}</span>
                : <span></span>
              }
            </div>
          </div>
        </div>

        <div className='row mt-4 no-break'>
          <div className='col p-0'>
            <table style={{ borderWidth: '1px', borderColor: '#000000', borderStyle: 'solid', width: '100%' }}>
              <thead>
                <tr>
                  <th className='p-1' rowSpan={2} style={{ width: 'calc(100% * 1/22)' }}>
                    <b>Op #</b>
                  </th>
                  <th className='p-1' rowSpan={2} style={{ width: 'calc(100% * 2/22)' }}>
                    <b>Resource</b>
                  </th>
                  <th className='p-1' rowSpan={2} style={{ width: 'calc(100% * 1/22)' }}>
                    <b>Qty</b>
                  </th>
                  <th className='p-1' rowSpan={2} style={{ width: 'calc(100% * 3/22)' }}>
                    <b>Operation Description</b>
                  </th>
                  <th className='p-1' rowSpan={2} style={{ width: 'calc(100% * 1/22)' }}>
                    <b>Expected Process Time (hrs)</b>
                  </th>
                  <th className='p-1' rowSpan={1} colSpan={4} style={{ width: 'calc(100% * 4/22)' }}>
                    <b>Actual Process Time</b>
                  </th>
                  <th className='p-1' rowSpan={2} colSpan={4} style={{ width: 'calc(100% * 4/22)' }}>
                    <b>First Off Checks</b>
                  </th>
                   <th className='p-1' rowSpan={2} colSpan={4} style={{ width: 'calc(100% * 4/22)' }}>
                    <b>Production Checks</b>
                  </th>
                  <th className='p-1' rowSpan={2} style={{ width: 'calc(100% * 2/22)' }}>
                    <b>Process Inspection Complete</b>
                  </th>
                  {/* <th className='p-1' rowSpan={1} colSpan={4} style={{ width: 'calc(100% * 4/22)' }}>
                    <b>Production Checks</b>
                  </th> */}
                  {/* <th className='p-1' rowSpan={1} colSpan={2} style={{ width: 'calc(100% * 2/22)' }}>
                    <b>Production Inspection</b>
                  </th> */}
                </tr>
                <tr>
                  <th className='p-1' colSpan={1} rowSpan={1}>
                    <b>Prog</b>
                  </th>
                  <th className='p-1' colSpan={1} rowSpan={1}>
                    <b>Set</b>
                  </th>
                  <th className='p-1' colSpan={1} rowSpan={1}>
                    <b>Run</b>
                  </th>
                  <th className='p-1' colSpan={1} rowSpan={1}>
                    <b>Other</b>
                  </th>
                  {/* <th className='p-1' colSpan={1} rowSpan={1}>
                    First
                  </th> */}
                  {/* <th className='p-1' colSpan={1} rowSpan={1}>
                    INS
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {
                  (operations || []).map((operation: any, rowid: number) => {
                    return (
                      <tr key={rowid}>
                        <td className='p-1'>{operation.number}</td>
                        <td className='p-1'>{
                          <span> 
                            {
                            transformResourcesOption(resources)
                              .find((c: any) => c.id === operation.resourceId)?.text
                          }
                          </span>}
                        </td>
                        <td className='p-1'>{operation.quantity}</td>
                        <td className='p-1'>{operation.description}</td>
                        <td className='p-1'>
                          {(typeof operation.expectedProcessTime) == 'number'
                            ? <span>{operation.expectedProcessTime}</span>
                            : <span></span>
                          }
                        </td>
                        <td className='p-1'>{operation.prog}</td>
                        <td className='p-1'>{operation.set}</td>
                        <td className='p-1'>{operation.run}</td>
                        <td className='p-1'>{operation.other}</td>
                        {/* First Off Checks */}
                        <td className='p-1'></td>
                        <td className='p-1'></td>
                        <td className='p-1'></td>
                        <td className='p-1'></td>
                         {/* Production Checks */}
                         <td className='p-1'></td>
                        <td className='p-1'></td>
                        <td className='p-1'></td>
                        {/* <td className='p-1 k-command-cell' height={45}>
                          <span>{operation.firstFocHr}</span>
                          <span>{
                            transformUserOption(users)
                              .find((c: any) => c.id === operation.firstFocOperatorId)?.text
                          }</span>
                        </td>
                        <td className='p-1 k-command-cell' height={45}>
                          <span>{operation.secondFocHr}</span>
                          <span>{
                            transformUserOption(users)
                              .find((c: any) => c.id === operation.secondFocOperatorId)?.text
                          }</span>
                        </td>
                        <td className='p-1 k-command-cell' height={45}>
                          <span>{operation.thirdFocHr}</span>
                          <span>{
                            transformUserOption(users)
                              .find((c: any) => c.id === operation.thirdFocOperatorId)?.text
                          }</span>
                        </td>
                        <td className='p-1 k-command-cell' height={45}>
                          <span>{operation.fourthFocHr}</span>
                          <span>{
                            transformUserOption(users)
                              .find((c: any) => c.id === operation.fourthFocOperatorId)?.text
                          }</span>
                        </td> */}

                        <td className='p-1 k-command-cell' height={45}>
                          <span>{operation.firstPcHr}</span>
                          <span>{
                            transformUserOption(users)
                              .find((c: any) => c.id === operation.firstPcOperatorId)?.text
                          }</span>
                        </td>
                        <td className='p-1 k-command-cell' height={45}>
                          <span>{operation.secondPcHr}</span>
                          <span>{
                            transformUserOption(users)
                              .find((c: any) => c.id === operation.secondPcOperatorId)?.text
                          }</span>
                        </td>
                        {/* <td className='p-1 k-command-cell' height={45}>
                          <span>{operation.thirdPcHr}</span>
                          <span>{
                            transformUserOption(users)
                              .find((c: any) => c.id === operation.thirdPcOperatorId)?.text
                          }</span>
                        </td>
                        <td className='p-1 k-command-cell' height={45}>
                          <span>{operation.fourthPcHr}</span>
                          <span>{
                            transformUserOption(users)
                              .find((c: any) => c.id === operation.fourthPcOperatorId)?.text
                          }</span>
                        </td>
                        <td className='p-1 k-command-cell' height={45}>
                          &nbsp;
                        </td> */}
                      </tr>
                    )
                  })
                }
              </tbody>
              <tfoot>
                <tr>
                  <td className='p-1'></td>
                  <td className='p-1'></td>
                  <td className='p-1'></td>
                  <td className='p-1'></td>
                  <td className='p-1' style={{ borderTop: "1px solid black" }}>{totalExpectedProcessTime}</td>
                  <td className='p-1' style={{ borderTop: "1px solid black" }}>{totalProg}</td>
                  <td className='p-1' style={{ borderTop: "1px solid black" }}>{totalSet}</td>
                  <td className='p-1' style={{ borderTop: "1px solid black" }}>{totalRun}</td>
                  <td className='p-1' style={{ borderTop: "1px solid black" }}>{totalOthers}</td>
                  <td className='p-1'></td>
                  <td className='p-1'></td>
                  <td className='p-1'></td>
                  <td className='p-1'></td>
                  <td className='p-1'></td>
                  <td className='p-1'></td>
                  <td className='p-1'></td>
                  <td className='p-1'></td>
                  <td className='p-1'></td>
                  {/* <td className='p-1'></td>
                  <td className='p-1'></td>
                  <td className='p-1'></td>
                  <td className='p-1'></td>
                  <td className='p-1'></td>
                  <td className='p-1'></td>
                  <td className='p-1'></td> */}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className='row mt-4 no-break'>
          <div className='col-6 p-0'>
            <div className='finalInspection'>
              <div className='jobDetailsHeading'>Final Inspection Declaration:</div>
              <div className='jobDetailsBody'>
                <span>The operator states that the final inspection of component/s has been completed as per details listed above and the item/s are ready for dispatch</span>
              </div>

              <div className='row'>
                <div className='col-6 text-center'>
                  <p>Signature</p>
                </div>
                <div className='col-6 text-center'>
                  <p>Date</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrintJobDetails
