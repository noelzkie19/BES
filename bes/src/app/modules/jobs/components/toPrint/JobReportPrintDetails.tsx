import React from 'react';
import { useEffect, useState } from 'react';
import { CurrencyFormatter, dateFormat } from '../../../../shared/service/utils';
import { ISelectedJobTypeData } from '../../models/job-model';
import classes from '../ui/JobReport.module.css'
interface IMyProps {
  refs?: any,
  dataItem: any,
  jobTypesData: ISelectedJobTypeData[]
}

const JobReportPrintDetails: React.FC<IMyProps> = ({ refs, dataItem, jobTypesData }) => {

  const [dataPrint, setDataPrint] = useState<any>({})

  useEffect(() => {
    if (dataItem && dataItem.length > 0) {
      let newData = {};
      jobTypesData.forEach((data) => {
        const dataRes = dataItem.filter((x: any) => x.jobTypeId === data.id)
        if (dataRes && dataRes.length > 0) {
          newData = {
            ...newData,
            [data.description]: dataRes
          }
        }
      })
      setDataPrint({...newData})
    }
  }, [dataItem, jobTypesData])


  const totalPrice = (data: any) => {
    return data.reduce((acc: number, obj: any) => {
      return acc + obj.totalPrice;
    }, 0)
  }

  return (
    <div className={classes.jobReport} ref={refs}>
      <div className='mb-5'>
        <div className='row'>
          <div className='col-8'>
            <img src='/images/logo.svg' alt='BES logo' className='h-70px' />
          </div>
          <div className='col-4'>
            <h2 style={{ textAlign: 'right' }}>Job Report</h2>
          </div>
        </div>
      </div>
      
      {
        (Object.keys(dataPrint || {})).map((keys: any, idx: number) => { 

          return(
            <React.Fragment
              key={idx}>
             <h1 className='mt-5' style={{marginTop: '1000px'}}>{keys}</h1>
             <br/>
              <table
                style={{ borderWidth: '1px', borderColor: '#000000', borderStyle: 'solid', width: '100%' }}
              >
                <thead>
                  <tr>
                    <th style={{width: '10%'}}>
                      <b>Job No.</b>
                    </th>
                    <th style={{ width: '30%' }}>
                      <b>Description</b>
                    </th>
                    <th style={{ width: '20%' }}>
                      <b>Customer</b>
                    </th>
                    <th style={{ width: '10%' }}>
                      <b>Qty</b>
                    </th>
                    <th style={{ width: '20%' }}>
                      <b>Due Date</b>
                    </th>
                    <th style={{ width: '10%' }}>
                      <b>Price</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    (dataPrint[keys] || []).map((job: any, rowid: number) => {
                      return (
                        <tr key={rowid}>
                          <td>{job.jobNumber}</td>
                          <td>{job.description}</td>
                          <td>{job.client}</td>
                          <td>{job.quantityDelivered}</td>
                          <td>{dateFormat(job.dueDate)}</td>
                          <td>{CurrencyFormatter(job.totalPrice)}</td>
                        </tr>
                      )
                    })
                  }
                  <tr>
                    <td colSpan={5} align='right' style={{ borderRight: 0 }}>
                      <b>Sub Total:</b>
                    </td>
                    <td style={{ borderLeft: 0 }}>
                      <b>{CurrencyFormatter(totalPrice(dataPrint[keys]))}</b>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5} align='right' style={{ borderRight: 0 }}>
                      <b>Total:</b>
                    </td>
                    <td style={{ borderLeft: 0 }}>
                      <b>{CurrencyFormatter(totalPrice(dataPrint[keys]))}</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </React.Fragment>
          )

        })
      }

 
    </div>
  )
}

export default JobReportPrintDetails
