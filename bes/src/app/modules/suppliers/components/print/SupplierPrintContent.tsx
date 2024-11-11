import * as React from "react";
import classes from '../ui/Suppliers.module.css'

import { FC } from "react";
import {
  Grid,
  GridCellProps,
  GridColumn as Column
} from "@progress/kendo-react-grid";

import { ISupplierReport } from "../../models/supplier-model";
import SupplierHeader from "./SupplierHeader";
import { dateFormat } from "../../../../shared/service/utils";

interface Props {
  refs?: any,
  dataItem: ISupplierReport[]
}

const getPageMargins = () => {
  return `@page { margin: 48px; }`;
};

const SupplierPrintContent: FC<Props> = ({ refs, dataItem }) => {

  return (
    <div ref={refs} style={{
      padding: '0',
      background: '#ffffff', fontSize: '12px'
    }}>
      <style>{getPageMargins()}</style>
      <div className={classes.suppliers}>
        <SupplierHeader />
        <table style={{ width: '100%' }}>
          {dataItem != null && (
            <tbody>
              <tr>
                <th className='ps-2'>
                  <b>Supplier Name</b>
                </th>
                <th className='ps-2'>
                  <b>Approved</b>
                </th>
                <th className='ps-2'>
                  <b>Critical</b>
                </th>
                <th className='ps-2'>
                  <b>Last Review</b>
                </th>
                <th className='ps-2'>
                  <b>Next Review</b>
                </th>
              </tr>
              {dataItem != null && (
                (dataItem || []).map((x: ISupplierReport, index) => {
                  return (
                    <tr key="index">
                      <td className='ps-2'>{x.suppierName}</td>
                      <td className='ps-2'><span>{x.approved ? 'Yes' : 'No'}</span></td>
                      <td className='ps-2'><span>{x.critical ? 'Yes' : 'No'}</span></td>
                      <td className='ps-2'><span>{dateFormat(x.lastReview)}</span></td>
                      <td className='ps-2'><span>{dateFormat(x.nextReview)}</span></td>
                    </tr>
                  )
                })
              )}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export { SupplierPrintContent }