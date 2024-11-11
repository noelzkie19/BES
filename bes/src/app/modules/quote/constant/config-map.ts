import {ActionEnum} from '../../../../_metronic/partials/widgets/grid/constant/ActionOption'
import {GridSetup} from '../../../shared/model/grid-config'

export const FIELD_COLUMN_MAP = [
  {field: 'id', map: 'Quote.Id'},
  {field: 'quoteNumber', map: 'Quote.QuoteNumber', type: typeof ''},
  {field: 'clientName', map: 'Client.Name', type: typeof ''},
  {field: 'createdBy', map: 'Quote.CreatedBy', type: ''},
  {field: 'status', map: 'Quote.Status', type: ''},
  {field: 'clientContactPerson', map: 'Client.ContactPerson', type: typeof ''},
]
export const Initial_GridSetup: GridSetup = {
  sort: [{field: 'id', dir: 'desc'}],
  skip: 0,
  take: 35,
  filter: {
    logic: 'and',
    filters: [],
  },
  filterOperators: {
    text: [
      {
        text: 'grid.filterContainsOperator',
        operator: 'contains',
      },
    ],
  },
}
export const FIELD_DEFAULT = {field: 'id', dir: 'desc'}
export const FILTER_DEFAULT = 'Quote.Id > 0 '

export const Quotes_Action: any[] = [
  {text: ActionEnum.Edit, value: ActionEnum.Edit},
  {text: ActionEnum.Delete, value: ActionEnum.Delete},
]

export const Quotes_List_Action: any[] = [
  {text: ActionEnum.Edit, value: ActionEnum.Edit},
  {text: ActionEnum.Delete, value: ActionEnum.Delete},
  {text: ActionEnum.PrintQuote, value: ActionEnum.PrintQuote},
  {text: ActionEnum.EmailQuote, value: ActionEnum.EmailQuote},
  // {text: ActionEnum.SendQuote, value: ActionEnum.SendQuote}
]

export const Material_List_Action: any[] = [
  {text: ActionEnum.Edit, value: ActionEnum.Edit},
  {text: ActionEnum.Delete, value: ActionEnum.Delete},
]

export const FIELD_QUOTES_COLUMN_KEY = [
  {field: 'name', editable: true},
  {field: 'quantity', editable: true},
  {field: 'unitPrice', editable: true},
  {field: 'gst', editable: true},
  {field: 'totalPrice', editable: false},
]

export enum FIELD_QUOTE_LIST {
  expand,
  // action,
  quoteNumber,
  description,
  clientName,
  createdBy,
  status,
  clientContactPerson,
}

export const FIELD_QUOTES_COLUMN_SIZE_KEY = [
  {field: 'expand', editable: false, width: 10},
  // { field: 'action', editable: false, width: 170 },
  {field: 'quoteNumber', editable: false, width: undefined},
  {field: 'description', editable: false, width: undefined},
  {field: 'clientName', editable: false, width: undefined},
  {field: 'createdBy', editable: false, width: undefined},
  {field: 'status', editable: false, width: undefined},
  {field: 'contactName', editable: false, width: undefined},
]

export enum FIELD_QUOTE_MAT_LIST {
  action,
  name,
  quantity,
  unitPrice,
  gst,
  totalPrice,
}

export const FIELD_QUOTE_MAT_COLUMN_KEY = [
  {field: 'action', width: 80},
  {field: 'name', width: undefined},
  {field: 'quantity', width: undefined},
  {field: 'unitPrice', width: undefined},
  {field: 'gst', width: undefined},
  {field: 'totalPrice', width: undefined},
]
