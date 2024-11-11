import * as React from "react";
import { Grid, GridColumn as Column, GridFilterChangeEvent, GridColumnResizeEvent, GridCellProps } from "@progress/kendo-react-grid";
import { useEffect, useState } from "react";
import { GridSetup } from "../models/stock-model";
import { Initial_GridSetup } from "../constant/stock-default";
import { FIELD_STOCK_COLUMN_KEY, FIELD_STOCK_LIST, FILTER_DEFAULT, Stock_List_Action } from "../constant/config-map";
import { getStock } from "../api";
import { transformStockFilter, transformStockSort } from "../transformer/stock-transformer";
import { toLinQExpression } from "../../../shared/service/utils";
import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from "../../../shared/service/grid-setup-utils";
import { LoadingPanel } from "../../../shared/components/kendo/GridLoading";
import { GridActionDropdownCell } from "../../../../_metronic/partials/widgets/grid/action/GridActionDropdownCell";
import { GoToPageCell } from "../../../shared/components/kendo/inline/GoToPageCell";
import { useHistory } from "react-router-dom";
import { MainRowRender } from "../../../shared/components/kendo/MainGridRenderer";

interface IProps {
  advanceSearch: string,
  requestReload: boolean,
  handleDoneReload: (event: boolean) => void,
  actionHandler: (event: any, dataItem: any, dataIndex: number) => void
}
let fetchQue: any;
const StockGrid: React.FC<IProps> = ({ requestReload, handleDoneReload, advanceSearch, actionHandler }) => {
  const requestInProgress = React.useRef(false);
  const [totalRows, setTotalRows] = useState<number>(0)

  const [gridSetup, setGridSetup] = useState<GridSetup>(Initial_GridSetup)
  const [data, setData] = React.useState<any>([])
  const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_STOCK_COLUMN_KEY)
  const history = useHistory()

  useEffect(() => {
    if (requestReload) {
      setData([])
      setTotalRows(0);
      requestData(0);
    }
  }, [requestReload])

  const requestIfNeeded = (skip: any) => {
    for (let i = skip; i < skip + gridSetup.take && i < data.length; i++) {
      if (data[i].id === undefined) {
        // request data only if not already fetched
        requestData(skip);
        return;
      }
    }
  };

  const requestData = (skipParameter: any) => {
    const { sort, take } = gridSetup
    var filter = transformStockFilter(gridSetup.filter)
    var data = toLinQExpression(filter)
    const sortField = transformStockSort(sort)

    if (requestInProgress.current) {
      return;
    }
    requestInProgress.current = true;
    const skip = skipParameter;
    getStock(skip, take, sortField, data || FILTER_DEFAULT, advanceSearch)
      .then((json) => {
        requestInProgress.current = false;
        const data = json.items;
        var totalC = json.totalCount;
        if (totalRows === 0)
          setTotalRows(totalC)

        if(data)
        {
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
              }
            });
            setData(newOrders);
        }
        
        handleDoneReload(false)
      });
  };

  React.useEffect(() => {
    requestIfNeeded(gridSetup.skip);
  }, [data]);

  React.useEffect(() => {
    // request the first page on initial load
    const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_STOCK_LIST)
    if (columnLocal) {
      setAutoColumns(columnLocal)
    }
    if (fetchQue) {
      clearTimeout(fetchQue);
    }
    fetchQue = setTimeout(function () {
      requestData(0);
    }, 100)
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
    setGridSetup({
      ...gridSetup,
      sort: pageProps.sort,
    })
  }

  useEffect(() => {
    // In filter reset verything
    if (fetchQue) {
      clearTimeout(fetchQue);
    }
    fetchQue = setTimeout(function () {
      setData([])
      setTotalRows(0);
      requestData(0);
    }, 500)

  }, [gridSetup.filter, gridSetup.sort])

  const handleFilter = (filter: GridFilterChangeEvent) => {
    setGridSetup({
      ...Initial_GridSetup,
      filter: filter.filter,
    })
  }

  const handleResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, autoColumns, GRID_WIDTH.GRID_STOCK_LIST);
  }

  // const actionCell = (props: GridCellProps) => {
  //   return (<GridActionDropdownCell actions={Stock_List_Action} changeHandler={actionHandler} gridCellProps={props} />)
  // }

  const RowRenderer = (tr: any, props: any) => (
    <MainRowRender originalProps={props} tr={tr} onDoubleClick={() => {
      history.push({
        pathname: '/stock/edit',
        search: `?id=${props.dataItem.id}`,
      })
    }}></MainRowRender>
  )

  // const GoToPageRenderer = (props: GridCellProps) => {
  //   return (<GoToPageCell props={props} goToPage={(id: number) => {
  //     history.push({
  //       pathname: '/stock/edit',
  //       search: `?id=${id}`
  //     })
  //   }}/>)
  // }

  const gridSkip = isNaN(gridSetup.skip) ? 0 : gridSetup.skip;

  return (
    <React.Fragment>
      {requestInProgress.current && LoadingPanel}

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
        {...gridSetup}
        dataItemKey={"id"}
        rowRender={RowRenderer}
      >
        {/* <Column 
              title=' '
              field={autoColumns[FIELD_STOCK_LIST.action].field}
              width={autoColumns[FIELD_STOCK_LIST.action].width}
              cell={actionCell} filterable={false} /> */}
        <Column
          field={autoColumns[FIELD_STOCK_LIST.clientName].field}
          width={autoColumns[FIELD_STOCK_LIST.clientName].width}
          title='Client Name' />
        <Column
          field={autoColumns[FIELD_STOCK_LIST.description].field}
          width={autoColumns[FIELD_STOCK_LIST.description].width}
          title='Description' />
        <Column
          field={autoColumns[FIELD_STOCK_LIST.drawing].field}
          width={autoColumns[FIELD_STOCK_LIST.drawing].width}
          title='Drawing' />
        <Column
          field={autoColumns[FIELD_STOCK_LIST.revision].field}
          width={autoColumns[FIELD_STOCK_LIST.revision].width}
          title='Revision' />
        <Column
          field={autoColumns[FIELD_STOCK_LIST.quantity].field}
          width={autoColumns[FIELD_STOCK_LIST.quantity].width}
          title='Qty (+/-)' />
        <Column
          // cell={GoToPageRenderer}
          field={autoColumns[FIELD_STOCK_LIST.sJobId].field}
          width={autoColumns[FIELD_STOCK_LIST.sJobId].width}
          title='Source/Destination Job No.' />
        <Column 
          field={autoColumns[FIELD_STOCK_LIST.notes].field}
          width={autoColumns[FIELD_STOCK_LIST.notes].width}
          title='Notes' />
      </Grid>
    </React.Fragment>

  );
}

export { StockGrid }
