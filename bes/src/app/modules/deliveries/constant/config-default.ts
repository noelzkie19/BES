import { IAlert } from "../../../shared/components/CustomAlert";
import { BooleanCell } from "../../../shared/components/kendo/format/BooleanCell";
import { NumberCell } from "../../../shared/components/kendo/inline/NumberCell";
import { GridSetup } from "../../../shared/model/grid-config";
import { IDeliveryPrintFilter } from "../models/delivery-model";

export const TOASTER_DEFAULT: IAlert = {
    message: ``,
    header: ``,
    type: 'success'
}

export const INITIAL_GRIDSETUP: any = {
    sort: [{ field: 'Job.Id', dir: 'desc' }],
    skip: 0,
    take: 50,
    filterOperators: {
        text: [
            {
                text: "grid.filterContainsOperator",
                operator: "contains",
            },
        ],
    }
}
export const INITIAL_FILTER: any = {
    logic: "and",
    filters: [],
}


export const INITIAL_DEL_GRIDSETUP: any = {
    sort: [{ field: 'Delivery.Id', dir: 'desc' }],
    skip: 0,
    take: 30,
    filterOperators: {
        text: [
            {
                text: "grid.filterContainsOperator",
                operator: "contains",
            },
        ],
    }
}


export const DELIVERED_CON_COLS = [
    {
        title: " ",
        field: "isSelected",
        width: 40
    }
]


export const PRINT_FILTER: IDeliveryPrintFilter = {
    from: new Date(),
    to: new Date(),
    clientId: 0,
    sortBy: 'asc',
    isAllClient: false,
    by: 'Delivery.Date'
}



export enum Tabs {
    pendingDeliveries,
    deliveries
}

