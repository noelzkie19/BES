import * as React from "react";
import { Grid, GridColumn as Column, GridFilterChangeEvent, GridColumnResizeEvent, GridCellProps } from "@progress/kendo-react-grid";
import { useEffect, useState } from "react";
import { formatPhoneNumber, toLinQExpression } from "../../../shared/service/utils";
import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from "../../../shared/service/grid-setup-utils";
import { LoadingPanel } from "../../../shared/components/kendo/GridLoading";
import { GridActionDropdownCell } from "../../../../_metronic/partials/widgets/grid/action/GridActionDropdownCell";
import { IClientData } from "../models/client-model";
import { GridSetup } from "../../users/models/user-model";
import { Client_Action, Initial_GridSetup } from "../constant/config-defaults";
import { CLIENT_FIELD, FIELD_COLUMN_KEY } from "../constant/tabkey-default";
import { getClients } from "../api";
import { LoadingCell } from "../../../shared/components/kendo/LoadingCell";
import { Skeleton } from "@progress/kendo-react-indicators";
import { useHistory } from "react-router-dom";
import { MainRowRender } from "../../../shared/components/kendo/MainGridRenderer";
import { ClientContext } from "../context/ClientContext";
import { PhoneFilterCell } from "./partial/PhoneFilterCell";

interface IProps {
  advanceSearch: string,
  requestReload: boolean,
  handleDoneReload: (event: boolean) => void,
  actionHandler: (event: any, dataItem: any, dataIndex: number) => void
}
let fetchQue: any;
const ClientListGrid: React.FC<IProps> = ({ requestReload, handleDoneReload, advanceSearch, actionHandler}) => {
  const { 
    setSelectedData, 
    setIsCanEdit
   } = React.useContext(ClientContext)
   
  const requestInProgress = React.useRef(false);
  const [totalRows, setTotalRows] = useState<number>(0)

  const [gridSetup, setGridSetup] = useState<GridSetup>(Initial_GridSetup)
  const [data, setData] = useState<IClientData[]>([])
  const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_COLUMN_KEY)
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
    var { sort, take } = gridSetup;
    var data = toLinQExpression(gridSetup.filter);
    var sortQuery: any = sort[0] ? sort[0] : { field: 'Client.Id', dir: 'asc' } 
    if (requestInProgress.current) {
      return;
    }
    requestInProgress.current = true;
    const skip = skipParameter; 
    getClients(skip, take, sortQuery, advanceSearch, data || `Client.Name.Contains("")`)
      .then((json: any) => {
        requestInProgress.current = false;
        const data = json.data.items;
        var totalC = json.data.totalCount;
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
    const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_STOCK_LIST)
    if (columnLocal) {
      setAutoColumns(columnLocal)
    }
    fetchQue = setTimeout(function() { 
      requestData(0);
    }, 500)
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
  const handleFilter = (filter: GridFilterChangeEvent) => {
    setGridSetup({
      ...Initial_GridSetup,
      filter: filter.filter,
    })
  }

  useEffect(() => {
    if (fetchQue) {
      clearTimeout(fetchQue);
    }
    fetchQue = setTimeout(function() { 
      setData([])
      setTotalRows(0);
      requestData(0);
    }, 500)
  }, [gridSetup.filter, gridSetup.sort])
  
  const handleResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, autoColumns, GRID_WIDTH.GRID_STOCK_LIST);
  }
  const RowRenderer = (tr: any, props: any) => (
    <MainRowRender originalProps={props} tr={tr} onDoubleClick={() => {
      setIsCanEdit(true)
      setSelectedData(props.dataItem)
      history.push({
        pathname: '/client/edit',
        search: `?id=${props.dataItem.id}`,
      })
    }}></MainRowRender>
  )
  const phoneFilterCell = (props: any) => (
    <PhoneFilterCell {...props} />
  );


  // const actionCell = (props: GridCellProps) => {
  //   return (<GridActionDropdownCell actions={Client_Action} changeHandler={actionHandler} gridCellProps={props} />)
  // }
  const gridSkip = isNaN(gridSetup.skip) ? 0 : gridSetup.skip

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
            cellRender={LoadingCell}
            {...gridSetup}
            dataItemKey={"id"}
            rowRender={RowRenderer}
          >
           {/* <Column cell={actionCell} width={150} filterable={false}/> */}
              <Column field={autoColumns[CLIENT_FIELD.name].field}
                title='Client Name' 
                width={autoColumns[CLIENT_FIELD.name].width}
                cell={(props: GridCellProps) => {
                return (
                  (props.dataItem.name === undefined) ? (
                      <td>
                        {" "}
                        <Skeleton
                          shape={"text"}
                          style={{
                            width: "100%",
                          }}
                        />
                      </td>
                  ) : (
                    <td className='k-command-cell' onDoubleClick={() => {
                        history.push({
                          pathname: '/client/edit',
                          search: `?id=${props.dataItem.id}`,
                        })
                      }}>
                      <span> {props.dataItem.name} </span>
                    </td>
                    )
                  )
                }} 
              />
              <Column field={autoColumns[CLIENT_FIELD.contactPerson].field}
               title='Contact Person' 
               width={autoColumns[CLIENT_FIELD.contactPerson].width}
                cell={(props: GridCellProps) => {
                return (
                  (props.dataItem.contactPerson === undefined) ? (
                    <td>
                      {" "}
                      <Skeleton
                        shape={"text"}
                        style={{
                          width: "100%",
                        }}
                      />
                    </td>
                ) : (
                  <td className='k-command-cell'>
                    <span> {props.dataItem.contactPerson} </span>
                  </td>
                  )
                )
              }} />
               <Column field={autoColumns[CLIENT_FIELD.street].field} title='Address' 
                width={autoColumns[CLIENT_FIELD.street].width}
                cell={(props: GridCellProps) => {
                return (
                  (props.dataItem.street === undefined) ? (
                    <td>
                      {" "}
                      <Skeleton
                        shape={"text"}
                        style={{
                          width: "100%",
                        }}
                      />
                    </td>
                  ) : (
                    <td className='k-command-cell'>
                      <span> {props.dataItem.street} </span>
                    </td>
                  )
                )
              }} />
               <Column field={autoColumns[CLIENT_FIELD.suburb].field} title='Suburb' 
                width={autoColumns[CLIENT_FIELD.suburb].width}
                cell={(props: GridCellProps) => {
                return (
                  (props.dataItem.suburb === undefined) ? (
                    <td>
                      {" "}
                      <Skeleton
                        shape={"text"}
                        style={{
                          width: "100%",
                        }}
                      />
                    </td>
                  ) : (
                    <td className='k-command-cell'>
                      <span> {props.dataItem.suburb} </span>
                    </td>
                  )
                )
              }} />
              <Column field={autoColumns[CLIENT_FIELD.postCode].field} 
                title='Postcode' 
                width={autoColumns[CLIENT_FIELD.postCode].width}
                cell={(props: GridCellProps) => {
                return (
                  (props.dataItem.postCode === undefined) ? (
                    <td>
                      {" "}
                      <Skeleton
                        shape={"text"}
                        style={{
                          width: "100%",
                        }}
                      />
                    </td>
                  ) : (
                    <td className='k-command-cell'>
                      <span> {props.dataItem.postCode} </span>
                    </td>
                  )
                )
              }}/>
              <Column field={autoColumns[CLIENT_FIELD.phone].field} 
                title='Phone Number' 
                width={autoColumns[CLIENT_FIELD.phone].width}
                filterCell={phoneFilterCell}
                cell={(props: GridCellProps) => {
                return (
                  (props.dataItem.phone === undefined) ? (
                    <td>
                      {" "}
                      <Skeleton
                        shape={"text"}
                        style={{
                          width: "100%",
                        }}
                      />
                    </td>
                  ) : (
                    <td className='k-command-cell'>
                      <span> {formatPhoneNumber(props.dataItem.phone)} </span>
                    </td>
                  )
                )
              }}/>
              <Column field={autoColumns[CLIENT_FIELD.operatingHrs].field} 
                title='Operating Hrs' 
                width={autoColumns[CLIENT_FIELD.operatingHrs].width} 
                cell={(props: GridCellProps) => {
                return (
                  (props.dataItem.operatingHrs === undefined) ? (
                    <td>
                      {" "}
                      <Skeleton
                        shape={"text"}
                        style={{
                          width: "100%",
                        }}
                      />
                    </td>
                  ) : (
                    <td className='k-command-cell'>
                      <span> {props.dataItem.operatingHrs} </span>
                    </td>
                  )
                )
              }}/>
          </Grid>
      </React.Fragment>
      
  );
}

export { ClientListGrid }