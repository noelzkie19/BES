
import { FC, useRef, useState } from "react";
import {
  Grid,
  GridCellProps,
  GridColumn as Column
} from "@progress/kendo-react-grid";

import { IStockReport } from "../models/stock-model";
import StockHeader from "./StockHeader";

interface Props {
  refs?: any,
  dataItem: IStockReport[]
}

const StockPrintContent: FC<Props> = ({ refs, dataItem }) => {
  return (
    <div ref={refs} style={{ marginLeft: "15px", marginRight: "15px", padding: "0" }}>
      <StockHeader />
      <Grid data={dataItem}>
        <Column field="clientName" title="Client Name" headerClassName="w-25 align-middle" className="w-25"/>
        <Column field="description" title="Description" headerClassName="w-25 align-middle" className="w-25" />
        <Column field="drawing" title="Drawing" headerClassName="align-middle" />
        <Column field="revision" title="Revision" headerClassName="align-middle" />
        <Column field="quantity" title="Qty (+/-)" headerClassName="align-middle" />
        <Column field="jobNumber" title="Source/Destination Job No." headerClassName="align-middle" />
        <Column field="notes" title="Notes" headerClassName="w-25 align-middle" className="w-25" />
      </Grid>
    </div>
  );
};

export { StockPrintContent }
