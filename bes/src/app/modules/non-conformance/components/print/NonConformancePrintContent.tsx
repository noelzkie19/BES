import {FC, useEffect, useState} from 'react'
import {Grid, GridCellProps, GridColumn as Column} from '@progress/kendo-react-grid'
import {INonConformanceReport} from '../../models/nonconformance-model'
import NonConformanceHeader from './NonConformanceHeader'
import {dateFormat} from '../../../../shared/service/utils'
import classes from '../ui/NonConformanceReport.module.css'
import {dataProvider} from '../../../../shared/data/data-provider'
interface Props {
  refs?: any
  dataItem: INonConformanceReport[]
}

const NonConformancePrintContent: FC<Props> = ({refs, dataItem}) => {

  const [reportData, setReportData] = useState<INonConformanceReport>()

  useEffect(() => {
    if (dataItem.length > 0) {
      var correctionAction = dataItem[0].correctedAction
      var determineCause = dataItem[0].determineCause
      var natureOfConference = dataItem[0].natureOfNonConference
      dataItem[0].determineCause = dataProvider.determineCause.filter(
        (d) => d.code === determineCause
      )[0].value
      dataItem[0].correctedAction = dataProvider.correctiveAction.filter(
        (d) => d.code === correctionAction
      )[0].value
      dataItem[0].natureOfNonConference = dataProvider.natureOfConference.filter(
        (d) => d.code === natureOfConference
      )[0].value
    }
    setReportData(dataItem[0])
  }, [dataItem])

  return (
    <div
      className={classes.nonConformance}
      ref={refs}
      style={{marginLeft: '15px', marginRight: '15px', padding: '0'}}
    >
      <NonConformanceHeader />
      <table
        style={{borderWidth: '1px', borderColor: '#000000', borderStyle: 'solid', width: '100%'}}
      >
        <tbody>
          <tr className='btn-primary'>
            <td>
              <table style={{width: '100%', marginBottom: '-10px'}}>
                <tbody>
                  <tr>
                    <td style={{width: '100%'}}>
                      <h2 className={`text-center`}>Non-Conformance & Complaints Report Form</h2>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table style={{width: '100%', marginBottom: '30px'}}>
                <tbody>
                  <tr>
                    <td style={{width: '60%'}}>
                      <span> Non-Conformance Recorded By: {reportData?.recordedBy}</span>
                    </td>
                    <td style={{width: '40%'}}>
                      <span>NCR No: {reportData?.ncrNumber}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style={{width: '100%'}}>
                <tbody>
                  <tr>
                    <td style={{width: '60%'}}>
                      <span>Linked to: {reportData?.linkTo}</span>
                    </td>
                    <td style={{width: '40%'}}>
                      <span>Date: {dateFormat(reportData?.dateRecorded)} </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table style={{width: '100%', marginBottom: '70px'}}>
                <tbody>
                  <tr>
                    <td style={{width: '60%', verticalAlign: 'top'}}>
                      <span>
                        Nature of Non-Conformance or Complaint: 
                        <br></br>
                        {reportData?.natureOfNonConference}
                      </span>
                    </td>
                    <td style={{width: '40%', verticalAlign: 'top'}}>
                      <span>Customer NCR No: {reportData?.clientNcrNumber}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table style={{width: '100%', marginBottom: '70px'}}>
                <tbody>
                  <tr>
                    <td style={{width: '100%'}}>
                      <span>Determined Cause: {reportData?.determineCause}
                      <br></br>
                      {reportData?.otherCause}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <div className='row' style={{marginBottom: '100px'}}>
                <div className='col-md-6'>
                  <span>Corrective Action: {reportData?.correctedAction}
                  <br></br>
                  {reportData?.correctiveNotes}
                  </span>
                </div>
              </div>

              <table style={{width: '100%'}}>
                <tbody>
                  <tr>
                    <td style={{width: '60%'}}>
                      <span>Action By: {reportData?.reportAction}</span>
                    </td>
                    <td style={{width: '40%'}}>
                      <span>Action Date: {dateFormat(reportData?.actionDate)}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <div className='row' style={{marginBottom: '100px'}}>
                <div className='col-md-6'>
                  <span>Review of Corrective Action: {reportData?.reportReviewOfCorrectiveAction}</span>
                </div>
              </div>

              <table style={{width: '100%'}}>
                <tbody>
                  <tr>
                    <td style={{width: '60%'}}>
                      <span>Undertaken By: {reportData?.reportUnderTakenBy}</span>
                    </td>
                    <td style={{width: '40%'}}>
                      <span>Completed Date: {dateFormat(reportData?.completedDate)}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <div className='row pb-20'>
                <div className='col-md-6'>
                  <span>NCR Cleared By: {reportData?.reportNcrClearedBy}</span>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <span>Date: {dateFormat(reportData?.ncrClearedDate)}</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export {NonConformancePrintContent}
