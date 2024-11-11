import { IStockSearch, IStocks, IJobSearch,GridSetup } from "../models/stock-model";
import { IAlert } from "../../../shared/components/CustomAlert";

export const STOCK_FORM_DEFAULT: IStocks = {
    id: 0,
    clientName: '',
    description: '',
    drawing: '',
    revision: '',
    quantity: 0,
    jobId: 0,
    notes: '',
}

export const TOASTER_DEFAULT: IAlert = {
    message: ``,
    header: ``,
    type: 'success'
}

export const SEARCH_DEFAULT: IStockSearch = {
    search: '',
    clientName: '',
    description: '',
    drawing: 0,
    revision: 0,
    quantity: 0,
    jobId: 0,
    notes: '',
}
export const JOB_SEARCH_DEFAULT: IJobSearch = {
    search: '',
    clientId: 0
}
export const Initial_GridSetup: GridSetup = {
    sort: [{ field: 'id', dir: 'desc' }],
    skip: 0,
    take: 35,
    filter: {
        logic: "and",
        filters: [],
    }
}
