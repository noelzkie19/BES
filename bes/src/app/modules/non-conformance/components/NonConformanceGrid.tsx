import * as React from "react";
import { Grid, GridColumn as Column, GridFilterChangeEvent, GridColumnResizeEvent, GridCellProps } from "@progress/kendo-react-grid";
import { useEffect, useState } from "react";
import { filterToObject } from "../../../shared/service/utils";
import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from "../../../shared/service/grid-setup-utils";
import { FIELD_NONCONFORMANCE, FIELD_NONCONFORMANCE_COLUMN_KEY, Initial_GridSetup } from "../constant/config-default";
import { GridSetup } from "../models/config-model";
import { transformNonConformanceSort } from "../transformers/non-conformance-transaformer";
import { getNonConformances } from "../api";
import { DropDownList, DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import { DateFormatCell } from "../../../shared/components/kendo/format/DateFormatCell";
import { GoToPageCell } from "../../../shared/components/kendo/inline/GoToPageCell";
import { useHistory } from "react-router-dom";
import { MainRowRender } from "../../../shared/components/kendo/MainGridRenderer";

interface IProps {
  advanceSearch: string,
  requestReload: boolean,
  handleDoneReload: (event: boolean) => void,
  actionHandler: (event: DropDownListChangeEvent) => void
}
let fetchQue: any;
const NonConformanceGrid: React.FC<IProps> = ({ requestReload, handleDoneReload, advanceSearch, actionHandler}) => {
  const requestInProgress = React.useRef(false);
  const [totalRows, setTotalRows] = useState<number>(0)

  const [gridSetup, setGridSetup] = useState<GridSetup>(Initial_GridSetup)
  const [data, setData] = React.useState<any>([])
  const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_NONCONFORMANCE_COLUMN_KEY)
  const history = useHistory()

  useEffect(() => {
    if(requestReload) {
      setData([])
      setTotalRows(0);
      if (fetchQue) {
        clearTimeout(fetchQue);
      }
      fetchQue = setTimeout(function() { 
        requestData(0);
      }, 100)
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
    const {sort, take, filter} = gridSetup
    const sortField = transformNonConformanceSort(sort)
    const search = filterToObject(filter)

    if (requestInProgress.current) {
      return;
    }
    requestInProgress.current = true;
    const skip = skipParameter; 
    getNonConformances(
        skip,
        take,
        sortField,
        search,
        advanceSearch
      )
      .then((json: any) => {
        requestInProgress.current = false;
        const data = json.data.items || [];
        var totalC = json.data.totalCount || 0;
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
        handleDoneReload(false)
      });
  };

  React.useEffect(() => {
    requestIfNeeded(gridSetup.skip);
  }, [data]);

  React.useEffect(() => {
    // request the first page on initial load
    
    const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_NONCONFORMANCE_LIST)
    if (columnLocal) {
      setAutoColumns(columnLocal)
    }
    fetchQue = setTimeout(function() { 
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
    fetchQue = setTimeout(function() { 
      setData([])
      setTotalRows(0);
      requestData(0);
    }, 100)
  }, [gridSetup.filter, gridSetup.sort])

  const handleFilter = (filter: GridFilterChangeEvent) => {
    setGridSetup({
      ...Initial_GridSetup,
      filter: filter.filter,
    })
  }
  
  const handleResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, autoColumns, GRID_WIDTH.GRID_NONCONFORMANCE_LIST);
  }

  // const GoToPageRenderer = (props: GridCellProps) => {
  //   return (<GoToPageCell props={props} goToPage={(id: number) => {
  //     history.push({
  //       pathname: '/non-conformance/edit',
  //       search: `?id=${id}`,
  //     })
  //   }}/>)
  // }

  const RowRenderer = (tr: any, props: any) => (
    <MainRowRender originalProps={props} tr={tr} onDoubleClick={() => {
      history.push({
        pathname: '/non-conformance/edit',
        search: `?id=${props.dataItem.id}`,
      })
    }}></MainRowRender>
  )
  const gridSkip = isNaN(gridSetup.skip) ? 0 : gridSetup.skip;
  
  return (
      <React.Fragment>
        {/* {requestInProgress.current && LoadingPanel} */}
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
            rowRender={RowRenderer}
            {...gridSetup}
            // dataItemKey={"id"}
          >
            {/* <Column cell={actionCell} filterable={false} 
                field={autoColumns[FIELD_NONCONFORMANCE.actions].field}
                width={autoColumns[FIELD_NONCONFORMANCE.actions].width}
                title=' '/> */}

              <Column  
                field={autoColumns[FIELD_NONCONFORMANCE.ncrNumber].field}
                width={autoColumns[FIELD_NONCONFORMANCE.ncrNumber].width}
                title='NCR No.' />
              <Column  
                field={autoColumns[FIELD_NONCONFORMANCE.clientName].field}
                width={autoColumns[FIELD_NONCONFORMANCE.clientName].width}
                title='Client Name' />
              <Column 
                field={autoColumns[FIELD_NONCONFORMANCE.clientNcrNumber].field}
			          width={autoColumns[FIELD_NONCONFORMANCE.clientNcrNumber].width}  
                title='Client NCR No.' />
              <Column
                field={autoColumns[FIELD_NONCONFORMANCE.dateRecorded].field}
                width={autoColumns[FIELD_NONCONFORMANCE.dateRecorded].width}  
                title='Date Recorded'
                format={'{0:dd/MM/yyy}'}
                filterable={false}
                cell={DateFormatCell}
              />
              <Column 
               field={autoColumns[FIELD_NONCONFORMANCE.natureNotes].field}
               width={autoColumns[FIELD_NONCONFORMANCE.natureNotes].width}
               filterable={false}
               title='Nature of NC Notes'  />
              <Column    
                field={autoColumns[FIELD_NONCONFORMANCE.displayJobId].field}
			          width={autoColumns[FIELD_NONCONFORMANCE.displayJobId].width}
                title='Job No.' />
          </Grid>
      </React.Fragment>
      
  );
}

export { NonConformanceGrid }
