import { number, string } from "yup";
import { ActionEnum } from "../../../../_metronic/partials/widgets/grid/constant/ActionOption";
import { IAlert } from "../../../shared/components/CustomAlert";
import { GridSetup } from "../../../shared/model/grid-config";
import { IStockPrintFilter } from "../models/stock-model";

export const TOASTER_DEFAULT: IAlert = {
  message: ``,
  header: ``,
  type: 'success'
}

export const Initial_GridSetup: GridSetup = {
  sort: [{ field: 'id', dir: 'desc' }],
  skip: 0,
  take: 35,
  filter: {
    logic: "and",
    filters: [],
  },
  filterOperators: {
    text: [
      {
        text: "grid.filterContainsOperator",
        operator: "contains",
      },
    ],
  }
}

export const FIELD_COLUMN_MAP = [
  { field: 'id', map: 'Stock.Id' },
  { field: 'sJobId', map: 'Job.JobId', type: typeof '' },
  { field: 'clientName', map: 'Client.Name', type: typeof '' },
  { field: 'drawing', map: 'Stock.Drawing', type: '' },
  { field: 'revision', map: 'Stock.Revision', type: typeof '' },
  { field: 'quantity', map: 'Stock.Quantity', type: typeof 0 },
  { field: 'notes', map: 'Stock.Notes', type: typeof '' },
  { field: 'description', map: 'Stock.Description', type: typeof '' }
]
export const FIELD_DEFAULT = { field: 'id', dir: 'desc' };
export const FILTER_DEFAULT = 'Stock.Id > 0 ';

export const PRINT_FILTER: IStockPrintFilter = {
  client: 0,
  sortBy: 'Stock.Id desc',
  isAllClient: true,
}


export const Stock_List_Action: any[] = [
  { text: ActionEnum.Edit, value: ActionEnum.Edit },
  { text: ActionEnum.Delete, value: ActionEnum.Delete }
]


export enum FIELD_STOCK_LIST {
  // action, 
  sJobId,
  clientName,
  description,
  drawing,
  revision,
  quantity,
  notes
}


export const FIELD_STOCK_COLUMN_KEY = [
  // { field: 'action', editable: false, width: 120 },
  { field: 'sJobId', editable: false, width: undefined },
  { field: 'clientName', editable: false, width: undefined },
  { field: 'description', editable: false, width: undefined },
  { field: 'drawing', editable: false, width: undefined },
  { field: 'revision', editable: true, width: undefined },
  { field: 'quantity', editable: true, width: undefined },
  { field: 'notes', editable: true, width: undefined }
]
