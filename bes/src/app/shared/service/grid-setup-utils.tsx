import { GridColumnResizeEvent } from "@progress/kendo-react-grid";

export const GRID_SETUP_STATE = "gridSetupState";


export enum GRID_WIDTH {
  GRID_PENDING_DELIVERY = 'gridPendingDelivery',
  GRID_DELIVERY = "gridDelivery",
  GRID_DELIVERY_DOCKET = "gridDeliveryDocket",
  GRID_CLIENT_LIST = "gridClientList",
  GRID_CLIENT_ADDRESS = "gridClientAddress",
  GRID_CLIENT_CONTACT = "gridClientClient",
  GRID_CLIENT_HISTORY = "gridClientHistory",
  GRID_SUPPLIER_LIST = "gridSupplierList",
  GRID_SUPPLIER_ADDRESS = "gridSupplierAddress",
  GRID_SUPPLIER_CONTACT = "gridSupplierClient",
  GRID_SUPPLIER_HISTORY = "gridSupplierHistory",
  GRID_NONCONFORMANCE_LIST = "gridNonConformanceList",
  GRID_JOB_LIST = "gridJobList",
  GRID_JOB_OPERATION_LIST = "gridJobOperationList",
  GRID_PO_LIST = "gridPoList",
  GRID_PO_LINE_LIST = "gridPoLineList",
  GRID_STOCK_LIST = "gridStockList",
  GRID_SCHEDULE_UNALLOCATED_LIST = "gridScheduleList",
  GRID_SCHEDULE_ALLOCATED_LIST = "gridScheduleAllocatedList",
  GRID_QUOTES_LIST = "gridQuoteList",
  GRID_QUOTES_MAT_LIST = "gridQuoteMatList",
  GRID_USER_LIST = "gridUserList",
  GRID_ROLE_LIST = "gridRoleList"
}


export const GRID_SETUP_STORAGE: any = {
    delivery: undefined,
    deliveryPending: undefined,
    deliveryDocket: undefined,
    clientList: undefined,
    clientAddress: undefined,
    clientContact: undefined,
    clientHistory: undefined,
    supplierList: undefined,
    supplierAddress: undefined,
    supplierContact: undefined,
    supplierHistory: undefined,
    nonConformanceList: undefined,
    jobList: undefined,
    jobOperationList: undefined,
    poList: undefined,
    poLineList: undefined,
    stockList: undefined,
    scheduleUnallocatedList: undefined,
    scheduleAllocatedList: undefined,
    quoteList: undefined,
    quoteMatList: undefined,
    userList: undefined,
    roleList: undefined
};

export const saveResizeColumn = (props: GridColumnResizeEvent, autoColumns: any[], gridName: string) => {
    const {newWidth, index, columns} = props;
    const column = autoColumns[index];
    column.width = newWidth === 0 ? columns[index].width : newWidth;
    autoColumns[index] = column;

    let gridSession = getResizeColumn()

    switch (gridName) {
        case GRID_WIDTH.GRID_PENDING_DELIVERY:
            gridSession.deliveryPending = autoColumns;
            break;
        case GRID_WIDTH.GRID_DELIVERY:
            gridSession.delivery = autoColumns;
            break;
        case GRID_WIDTH.GRID_DELIVERY_DOCKET:
            gridSession.deliveryDocket = autoColumns;
            break;
        case GRID_WIDTH.GRID_CLIENT_LIST:
            gridSession.clientList = autoColumns;
            break;
        case GRID_WIDTH.GRID_SUPPLIER_LIST:
            gridSession.supplierList = autoColumns;
            break;
        case GRID_WIDTH.GRID_NONCONFORMANCE_LIST:
            gridSession.nonConformanceList = autoColumns;
            break;
        case GRID_WIDTH.GRID_JOB_LIST:
            gridSession.jobList = autoColumns;
            break;
        case GRID_WIDTH.GRID_PO_LIST:
            gridSession.poList = autoColumns;
            break;
        case GRID_WIDTH.GRID_STOCK_LIST:
            gridSession.stockList = autoColumns;
            break;
        case GRID_WIDTH.GRID_SCHEDULE_UNALLOCATED_LIST:
            gridSession.scheduleUnallocatedList = autoColumns;
            break;
        case GRID_WIDTH.GRID_SCHEDULE_ALLOCATED_LIST:
            gridSession.scheduleAllocatedList = autoColumns;
            break;
        case GRID_WIDTH.GRID_QUOTES_LIST:
            gridSession.quoteList = autoColumns;
            break;
        case GRID_WIDTH.GRID_USER_LIST:
            gridSession.userList = autoColumns;
            break;
        case GRID_WIDTH.GRID_ROLE_LIST:
            gridSession.roleList = autoColumns;
            break;
        case GRID_WIDTH.GRID_CLIENT_ADDRESS:
            gridSession.clientAddress = autoColumns;
            break;
        case GRID_WIDTH.GRID_CLIENT_CONTACT:
            gridSession.clientContact = autoColumns;
            break;
        case GRID_WIDTH.GRID_CLIENT_HISTORY:
            gridSession.clientHistory = autoColumns;
            break;
        case GRID_WIDTH.GRID_SUPPLIER_ADDRESS:
            gridSession.supplierAddress = autoColumns;
            break;
        case GRID_WIDTH.GRID_SUPPLIER_CONTACT:
            gridSession.supplierContact = autoColumns;
            break;
        case GRID_WIDTH.GRID_SUPPLIER_HISTORY:
            gridSession.supplierHistory = autoColumns;
            break;
        case GRID_WIDTH.GRID_PO_LINE_LIST:
            gridSession.poLineList = autoColumns;
            break;
        case GRID_WIDTH.GRID_QUOTES_MAT_LIST:
            gridSession.quoteMatList = autoColumns;
            break;  
        case GRID_WIDTH.GRID_JOB_OPERATION_LIST:
            gridSession.jobOperationList = autoColumns;
            break; 
            
    }

    localStorage.setItem(GRID_SETUP_STATE, JSON.stringify(gridSession));
}


export const getResizeColumn: any = () => {
    let gridStorage = localStorage.getItem(GRID_SETUP_STATE);
    if (!gridStorage) {
        localStorage.setItem(GRID_SETUP_STATE, JSON.stringify(GRID_SETUP_STORAGE));
        gridStorage = GRID_SETUP_STORAGE
    } else {
        gridStorage = JSON.parse(gridStorage);
    }
    return gridStorage;
}

export const getResizeColumnByName: any = (gridName: string, columnKey?: []) => {
    let gridStorage: any = localStorage.getItem(GRID_SETUP_STATE);
    if (!gridStorage) {
        localStorage.setItem(GRID_SETUP_STATE, JSON.stringify(GRID_SETUP_STORAGE));
        gridStorage = GRID_SETUP_STORAGE
    } else {
        gridStorage = JSON.parse(gridStorage);
    }
    let returnStorge: any;
    switch (gridName) {
        case GRID_WIDTH.GRID_PENDING_DELIVERY:
            returnStorge = gridStorage.deliveryPending;
            break;
        case GRID_WIDTH.GRID_DELIVERY:
            returnStorge = gridStorage.delivery;
            break;
        case GRID_WIDTH.GRID_DELIVERY_DOCKET:
            returnStorge = gridStorage.deliveryDocket;
            break;
        case GRID_WIDTH.GRID_CLIENT_LIST:
            returnStorge = gridStorage.clientList;
            break;
        case GRID_WIDTH.GRID_SUPPLIER_LIST:
            returnStorge = gridStorage.supplierList;
            break;
        case GRID_WIDTH.GRID_NONCONFORMANCE_LIST:
            returnStorge = gridStorage.nonConformanceList;
        break;
        case GRID_WIDTH.GRID_JOB_LIST:
            returnStorge = gridStorage.jobList;
            break;
        case GRID_WIDTH.GRID_PO_LIST:
            returnStorge = gridStorage.poList;
            break;
        case GRID_WIDTH.GRID_STOCK_LIST:
            returnStorge = gridStorage.stockList;
            break;
        case GRID_WIDTH.GRID_QUOTES_LIST:
            returnStorge = gridStorage.quoteList;
            break;
        case GRID_WIDTH.GRID_USER_LIST:
            returnStorge = gridStorage.userList;
            break;
        case GRID_WIDTH.GRID_ROLE_LIST:
            returnStorge = gridStorage.roleList;
            break;
        case GRID_WIDTH.GRID_SCHEDULE_UNALLOCATED_LIST:
            returnStorge = gridStorage.scheduleUnallocatedList;
            break;
        case GRID_WIDTH.GRID_SCHEDULE_ALLOCATED_LIST:
            returnStorge = gridStorage.scheduleAllocatedList;
            break;
        case GRID_WIDTH.GRID_CLIENT_ADDRESS:
            returnStorge = gridStorage.clientAddress;
            break;
        case GRID_WIDTH.GRID_CLIENT_CONTACT:
            returnStorge = gridStorage.clientContact;
            break;
        case GRID_WIDTH.GRID_CLIENT_HISTORY:
            returnStorge = gridStorage.clientHistory;
            break;
        case GRID_WIDTH.GRID_SUPPLIER_ADDRESS:
            returnStorge = gridStorage.supplierAddress;
            break;
        case GRID_WIDTH.GRID_SUPPLIER_CONTACT:
            returnStorge= gridStorage.supplierContact ;
            break;
        case GRID_WIDTH.GRID_SUPPLIER_HISTORY:
            returnStorge = gridStorage.supplierHistory;
            break;
        case GRID_WIDTH.GRID_PO_LINE_LIST:
            returnStorge = gridStorage.poLineList;
            break;
        case GRID_WIDTH.GRID_QUOTES_MAT_LIST:
            returnStorge = gridStorage.quoteMatList;
            break;
        case GRID_WIDTH.GRID_JOB_OPERATION_LIST:
            returnStorge = gridStorage.jobOperationList;
            break; 
    }
    if (columnKey && returnStorge) {
       return validateColumnKey(returnStorge, columnKey)
    }
    return returnStorge;
}


const validateColumnKey = (returnStorge: any, columnKey: []): any => {
    columnKey.map((key: any) => {
        const store = returnStorge.find((x: any) => x.field === key.field);
        if (store && store.width) {
            key.width = store.width
        }
    });
    return columnKey;
}