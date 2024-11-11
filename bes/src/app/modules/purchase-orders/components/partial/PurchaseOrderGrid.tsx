import * as React from "react";
import { Grid, GridColumn as Column, GridFilterChangeEvent, GridColumnResizeEvent, GridCellProps, GridFilterCellProps } from "@progress/kendo-react-grid";
import { useEffect, useState } from "react";
import { FIELD_PURCHASE_COLUMN_KEY, FIELD_PURCHASE_LIST, FILTER_DEFAULT, Initial_GridSetup, Purchase_Action } from "../../constant/config-default";
import { GridSetup } from "../../../users/models/user-model";
import { toLinQExpression } from "../../../../shared/service/utils";
import { transformPurchaseFilter, transformPurchaseSort } from "../../transformer/purchase-transformer";
import { getPurchaseOrders } from "../../api";
import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from "../../../../shared/service/grid-setup-utils";
import { GridActionDropdownCell } from "../../../../../_metronic/partials/widgets/grid/action/GridActionDropdownCell";
import { LoadingCell } from "../../../../shared/components/kendo/LoadingCell";
import { SupplierFilterDropdownCell } from "../SupplierFilterCell";
import {PurchaseOrderContext} from '../../context/PurchaseOrderContext'
import {useEffectOnce} from 'react-use'
import { CheckBoxFilterCell } from "./CheckBoxFilterCell";
import { GoToPageCell } from "../../../../shared/components/kendo/inline/GoToPageCell";
import { useHistory } from "react-router-dom";
import { MainRowRender } from "../../../../shared/components/kendo/MainGridRenderer";
import { LoadingPanel } from "../../../../shared/components/kendo/GridLoading";
import { ORDER_STATUS } from '../../constant/config-default'

interface IProps {
  actionHandler: (event: any, dataItem: any, dataIndex: number) => void,
  advanceSearch: string,
  orderStatus: ORDER_STATUS,
  requestRefresh: boolean,
  doneRequestHandler: () => void,
  savedFilter?: any,
  requestClear: boolean,
  doneRequestClearHandler: () => void,
  savedPrintState?: any,
  internal: string
}
let fetchQue: any;

const PurchaseOrderGrid: React.FC<IProps> = ({ savedFilter, 
    advanceSearch,
    orderStatus, 
    requestRefresh, 
    doneRequestHandler, 
    requestClear,
    doneRequestClearHandler,
    savedPrintState,
    internal 
  }) => {
  const requestInProgress = React.useRef(false);
  const [totalRows, setTotalRows] = useState<number>(0)
  const [gridSetup, setGridSetup] = useState<GridSetup>(savedFilter || Initial_GridSetup)
  const [data, setData] = React.useState<any>([]);
  const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_PURCHASE_COLUMN_KEY)
  const {suppliers} = React.useContext(PurchaseOrderContext)
  const history = useHistory()
  const [printState, setPrintState] = useState<string>(savedPrintState || 'all')
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true)
  

  useEffect(() => { 
    if (requestClear) {
      setGridSetup({
        ...Initial_GridSetup
      })
      setData([])
      setTotalRows(0);
      requestData(0);
    }
  }, [requestClear])

  useEffect(() => { 
    if (requestRefresh) {
      setData([])
      setTotalRows(0);
      requestData(0);
    }
  }, [requestRefresh])

  useEffect(() => {
    if (printState) {
      setData([])
      // if (isInitialLoading && !sa) {
      //   setGridSetup({
      //     ...Initial_GridSetup
      //   })
      // }
    
      setTotalRows(0);
      setTotalRows(0);
      if (fetchQue) {
        clearTimeout(fetchQue);
      }
      fetchQue = setTimeout(function() { 
        requestData(0);
      }, 100)
    }
  }, [printState])

  const requestIfNeeded = (skip: any) => {
    for (let i = skip; i < skip + gridSetup.take && i < data.length; i++) {
      if (data[i].id === undefined) {
          requestData(skip);
        return;
      }
    }
  };

  React.useEffect(() => {
    if (fetchQue) {
      clearTimeout(fetchQue);
    }
    fetchQue = setTimeout(function() { 
      setData([]);
      setTotalRows(0);
      requestData(0);
    }, 500)
 
  }, [gridSetup.filter, gridSetup.sort]);


  const requestData = (skipParameter: any) => {
    const {sort, take} = gridSetup
    // Request by Refresh
    let filter = requestRefresh ? '' : transformPurchaseFilter(gridSetup.filter)
    // Request by Clear
    if (requestClear) {
       filter =  transformPurchaseFilter(Initial_GridSetup.filter)
    }
    
    let data = toLinQExpression(filter)
    data = specialCondition(data, requestClear ? Initial_GridSetup.filter : gridSetup.filter)
    const sortField = transformPurchaseSort(sort)
    const currPrintState = requestRefresh ? 'all' : printState

    if (requestInProgress.current) {
      return;
    }
    requestInProgress.current = true;
    const skip = skipParameter;

    getPurchaseOrders(skip, take, sortField, data || FILTER_DEFAULT, advanceSearch, currPrintState, orderStatus, internal)
      .then((json) => {
        requestInProgress.current = false;
        const data = json.items;
        var totalC = json.totalCount;
        if (totalRows === 0)
          setTotalRows(totalC)

        const newOrders =
        data.length === totalC
            ? [...data]
            : new Array(totalC).fill({}).map((e, i) => ({
                Index: i,
              }));

        data.forEach((delivery: any, i: any) => {
        newOrders[i + skip] = {
            Index: i + skip,
            ...delivery
        }});
        setData(newOrders);
        setIsInitialLoading(false)
        if (requestRefresh) {
          doneRequestHandler()
        }
        if (requestClear) {
          doneRequestClearHandler()
        }
      }).catch(() => {
        setIsInitialLoading(false)
      });
  };

  const specialCondition = (linqSort: any, filter: any) => {
    if (!filter) return linqSort

    const dataFilter = (filter.filters || []).find((fl: any) => fl.field === 'supplierAddress')
    if (dataFilter) {
      linqSort = `ConcatSupplierAddress.startsWith("${dataFilter.value}")`
      return linqSort
    } else return linqSort
  }

  React.useEffect(() => {
    if (data.length > 0) {
      if (fetchQue) {
        clearTimeout(fetchQue);
      }
      fetchQue = setTimeout(function() { 
        requestIfNeeded(gridSetup.skip);
      }, 100)
    }
  }, [data]);

  React.useEffect(() => {
    const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_PO_LIST, FIELD_PURCHASE_COLUMN_KEY)
    if (columnLocal) {
      setAutoColumns(columnLocal)
    }
    // if (savedFilter) {
    //   const parsedFilter = JSON.parse(savedFilter);
    //   setGridSetup({
    //     ...Initial_GridSetup,
    //     filter: parsedFilter,
    //   });
    // } else {
    //   requestData(0);
    // }
  }, []);

  

  const pageChange = (event: any) => {
    requestIfNeeded(event.page.skip);
    setGridSetup({
      ...gridSetup,
      skip: event.page.skip,
      take: event.page.take,
    })
  };

  const handleSortChange = (pageProps: any) => {
      const newFilter = {
        ...gridSetup,
        sort: pageProps.sort,
      }
      setGridSetup(newFilter)
      localStorage.setItem('filter', JSON.stringify(newFilter));
  }



  const handleFilter = (filter: GridFilterChangeEvent) => {
    const newFilter = {
      ...Initial_GridSetup,
      filter: filter.filter,
    }
    setGridSetup(newFilter)

    localStorage.setItem('filter', JSON.stringify(newFilter));
  }
  
  const handleResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, autoColumns, GRID_WIDTH.GRID_PO_LIST);
  }

  const types: string[] = suppliers.map(supplier => supplier.name).filter(name => name.trim() !== '');
  const SupplierFilterCell: any = (props: GridFilterCellProps) => (
    <SupplierFilterDropdownCell {...props} data={types} defaultItem={''} />
  )

  const printFilterCell = (props: any) => (
    <CheckBoxFilterCell {...props} isLoading={requestInProgress.current} state={printState} 
      onChange={(event: any) => {
      setPrintState(event)
      localStorage.setItem('printState',JSON.stringify(event))
    }}/>
  );


  const RowRenderer = (tr: any, props: any) => (
    <MainRowRender originalProps={props} tr={tr} onDoubleClick={() => {
      history.push({
        pathname: '/purchase-order/edit',
        search: `?id=${props.dataItem.purchaseNumber}`,
      })
    }}></MainRowRender>
  )

  const gridSkip = isNaN(gridSetup.skip) ? 0 : gridSetup.skip;

  return (
      <React.Fragment>
        {isInitialLoading && LoadingPanel} 
        <Grid
              resizable={true}
              reorderable={true}
              data={data.slice(gridSkip, gridSkip + gridSetup.take)}
              style={{
                height: "500px",
              }}
              rowHeight={15}
              scrollable={"virtual"}
              total={totalRows}
              onPageChange={pageChange}
              sortable={true}
              onSortChange={handleSortChange}
              filterable={true}
              onFilterChange={handleFilter}
              onColumnResize={handleResizeColumn}
              cellRender={LoadingCell}
              dataItemKey={"id"}
              rowRender={RowRenderer}
              {...gridSetup}
            >
              <Column 
                field={autoColumns[FIELD_PURCHASE_LIST.purchaseNumber].field}
                width={autoColumns[FIELD_PURCHASE_LIST.purchaseNumber].width}
                title='PO Number'></Column>
                <Column 
                 field={autoColumns[FIELD_PURCHASE_LIST.description].field}
                 width={autoColumns[FIELD_PURCHASE_LIST.description].width}
                title='Description'></Column>
              <Column 
                 field={autoColumns[FIELD_PURCHASE_LIST.displayJobId].field}
                 width={autoColumns[FIELD_PURCHASE_LIST.displayJobId].width}
                title='Job No.'></Column>
              <Column 
                 field={autoColumns[FIELD_PURCHASE_LIST.supplierName].field}
                 width={autoColumns[FIELD_PURCHASE_LIST.supplierName].width}
                title='Supplier'
                filterCell={SupplierFilterCell}></Column>
              <Column
                field={autoColumns[FIELD_PURCHASE_LIST.purchaseDate].field}
                width={autoColumns[FIELD_PURCHASE_LIST.purchaseDate].width}
                title='Purchase Date'
                filterable={false}
                cell={(props: GridCellProps) => {
                  if (props.dataItem.purchaseDate) {
                    const [year, month, day] = props.dataItem.purchaseDate.split('T')[0].split('-')
                    return (
                      <td className='k-command-cell'>
                        <span> {`${day}/${month}/${year}`}</span>
                      </td>
                    )
                  } else {
                    return (
                      <td className='k-command-cell'>
                        <span></span>
                      </td>
                    )
                  }
                }}
              ></Column>
              <Column 
                field={autoColumns[FIELD_PURCHASE_LIST.printedDate].field}
                width={autoColumns[FIELD_PURCHASE_LIST.printedDate].width}
                filterCell={printFilterCell}
                sortable={false}
                title='Print' 
                cell={(props: GridCellProps) => {
                    return (
                      <td className='k-command-cell'>
                        <input type="checkbox" checked={props.dataItem.printedDate} disabled />
                      </td>
                    )
                }}
              >
            </Column>
            <Column
              field={autoColumns[FIELD_PURCHASE_LIST.dueDate].field}
              width={autoColumns[FIELD_PURCHASE_LIST.dueDate].width}
              title='Due Date'
              filterable={false}
              cell={(props: GridCellProps) => {
                if (props.dataItem.dueDate) {
                  const [year, month, day] = props.dataItem.dueDate.split('T')[0].split('-')
                  return (
                    <td className='k-command-cell'>
                      <span> {`${day}/${month}/${year}`}</span>
                    </td>
                  )
                } else {
                  return (
                    <td className='k-command-cell'>
                      <span></span>
                    </td>
                  )
                }
              }}
            ></Column>
            <Column 
              field={autoColumns[FIELD_PURCHASE_LIST.quantity].field}
              width={autoColumns[FIELD_PURCHASE_LIST.quantity].width}
              title='Ordered Qty' filterable={false}></Column>
            <Column
            field={autoColumns[FIELD_PURCHASE_LIST.quantityReceived].field}
            width={autoColumns[FIELD_PURCHASE_LIST.quantityReceived].width}
            title='Received'
            editor='numeric'
            filterable={false}
            cell={(props: GridCellProps) => (
              <td className='k-command-cell'>
                <span>
                  {(props.dataItem.purchaseReceipts || []).reduce(
                    (sum: any, current: any) => sum + current.quantity,
                    0
                  )}
                </span> 
              </td>
            )}
          ></Column>
          <Column 
                field={autoColumns[FIELD_PURCHASE_LIST.isCompleted].field}
                width={autoColumns[FIELD_PURCHASE_LIST.isCompleted].width}
                title='Completed' 
                filterable={false}
                cell={(props: GridCellProps) => {
                  return (
                    <td className='k-command-cell'>
                      <input type="checkbox" checked={props.dataItem.isCompleted} disabled />
                    </td>
                  )
                }}
                // cell={(props: GridCellProps) => {
                //     return (
                //       <td className='k-command-cell'>
                //         <input type="checkbox" checked={(props.dataItem.quantity === (props.dataItem.purchaseReceipts 
                //           || []).reduce((sum: any, current: any) => sum + current.quantity,0)) && props.dataItem.quantity > 0} disabled />
                //       </td>
                //     )
                // }}
              >
            </Column>
       </Grid>
      </React.Fragment>
      
  );
}

export { PurchaseOrderGrid }
