import * as React from "react";
import { useEffect, useState } from "react";
import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from "../../../../shared/service/grid-setup-utils";
import { useEffectOnce } from "react-use";
import { FIELD_JOB_COLUMN_KEY, FIELD_JOB_LIST, Initial_GridSetup } from "../../constant/config-default";
import { GridSetup } from "../../models/config-model";
import { transformJobSort } from "../../transformers/job-transformer";
import { filterToObject } from "../../../../shared/service/utils";
import { getJobassembliesByjob, getJobs } from "../../api";
import { GridColumnResizeEvent, GridColumn as Column, GridDetailRowProps, GridFilterChangeEvent, Grid, GridCellProps, GridFilterCellProps } from "@progress/kendo-react-grid";
import { DateFormatCell } from "../../../../shared/components/kendo/format/DateFormatCell";
import { DateFilterCell } from "@progress/kendo-react-data-tools";
import { CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { INITIAL_FILTER } from "../../../deliveries/constant/config-default";
import { LoadingCell } from "../../../../shared/components/kendo/LoadingCell";
import { CheckBoxFilterCell } from "../custom-cell/CheckBoxFilterCell";
import { useHistory } from "react-router-dom";
import { GoToPageCell } from "../../../../shared/components/kendo/inline/GoToPageCell";
import { ClientFilterDropdownCell } from "../../../../shared/components/kendo/filter/ClientFilterDropdownCellProps";
import { JobContext, JobContextProvider } from "../../context/JobContext";
import { LoadingPanel } from "../../../../shared/components/kendo/GridLoading";
import { MainRowRender } from "../../../../shared/components/kendo/MainGridRenderer";
import { usePageData } from "../../../../../_metronic/layout/core";
import './../ui/JobGrid.scss'

interface IProps {
    requestRefresh: boolean,
    advanceSearch: string,
    selectedTag: string,
    actionHandler: (event: any, dataItem: any, dataIndex: number) => void,
    doneRefresh: () => void,
    requestClear: boolean,
    handleDoneClear: (event: boolean) => void
}
let fetchQue: any;
const JobListGrid: React.FC<IProps> = ({requestRefresh, advanceSearch, selectedTag, doneRefresh , requestClear, handleDoneClear}) => {
  const requestInProgress = React.useRef(false);
  const [gridData, setGridData] = React.useState<any>([]);
  const {clients, getAllClientsAsync} = React.useContext(JobContext)
  const { currentUser } = usePageData();
  const [admin, setAdmin] = useState<boolean>(false)

  useEffect(() => {
    var userRoles: any = currentUser.userRoles;
    userRoles.forEach((element: any) => {
      if (element.toLowerCase() == "administrator") {
        setAdmin(true);
      }
    });
  }, [currentUser])

  const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_JOB_COLUMN_KEY)
  const [totalRows, setTotalRows] = useState<number>(0)
  const [gridSetup, setGridSetup] = useState<GridSetup>(Initial_GridSetup)
  const [filter, setFilter] = useState<CompositeFilterDescriptor>(INITIAL_FILTER)
  const [printState, setPrintState] = useState<string>('all')
  const history = useHistory()
  const [loader, setLoader] = React.useState<boolean>(false);

  useEffectOnce(() => {
    if (!clients || clients.length === 0) {
      getAllClientsAsync()
    }
  })
  
  useEffect(() => {
    // In filter reset verything
    if (requestRefresh) {
      setGridData([])
      setTotalRows(0);
      fetchQue = setTimeout(function() { 
        setLoader(true)
        requestData(0);
      }, 100)
    }
  }, [requestRefresh])

  useEffect(() => {
    if (requestClear) {
      setPrintState('all')
      setGridData([])
      setFilter({...INITIAL_FILTER})
      setGridSetup({
        ...Initial_GridSetup
      })
      setTotalRows(0);
      if (fetchQue) {
        clearTimeout(fetchQue)
      }
      fetchQue = setTimeout(function() { 
        setLoader(true)
        requestData(0);
      }, 100)
    }
  }, [requestClear])
  
  React.useEffect(() => {
    
    requestIfNeeded(gridSetup.skip);
  }, [gridData]);


  useEffectOnce(() => {
    const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_JOB_LIST, FIELD_JOB_COLUMN_KEY)
    if (columnLocal) {
      setAutoColumns(columnLocal)
    }
  })
  
  const requestIfNeeded = (skip: any) => {
    for (let i = skip; i < skip + gridSetup.take && i < gridData.length; i++) {
      if (gridData[i].id === undefined) {
        // request data only if not already fetched
        requestData(skip);
        return;
      }
    }
  };

  
  const requestData = (skipParameter: any) => {
    var {sort, take} = gridSetup
    const sortField = transformJobSort(sort);
    const search =  requestClear ? '' : filterToObject(filter) 

    if (requestInProgress.current) {
      return;
    }
    requestInProgress.current = true;
    const skip = skipParameter; 
    
    // data = specialCondition(data, gridSetup.filter);
    getJobs(skip, take, sortField, selectedTag, search, advanceSearch)
    .then((json: any) => {
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
            };
        });
        requestInProgress.current = false;
        setGridData(newOrders);
        doneRefresh()
        handleDoneClear(false)
        setLoader(false)
    }).catch(() => {
      requestInProgress.current = false;
      doneRefresh()
      handleDoneClear(false)
      setLoader(false)
    })
  }


  React.useEffect(() => {
    requestIfNeeded(gridSetup.skip);
  }, [gridData]);

  useEffectOnce(() => {
    // request the first page on initial load
    const autoColumns = getResizeColumnByName(GRID_WIDTH.GRID_JOB_LIST, FIELD_JOB_COLUMN_KEY)
    
    if (autoColumns) {
        setAutoColumns(autoColumns)
    }
    fetchQue = setTimeout(function() { 
      requestData(0);
    }, 100)
  });

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

  
  React.useEffect(() => {
    if (fetchQue) {
      clearTimeout(fetchQue);
    }
    fetchQue = setTimeout(function() { 
     // In filter reset verything
     setLoader(true)
     setGridData([])
     setTotalRows(0);
     requestData(0);
    }, 500)
  }, [filter, gridSetup.sort])

  const handleFilter = (filter: GridFilterChangeEvent) => {
    setFilter(filter.filter)
  }
  
  
  const handleResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, autoColumns, GRID_WIDTH.GRID_JOB_LIST);
  }

  const expandChange = (event: any) => {
    let newData = gridData.map((item: any, i: any) => {
      if (item.jobId === event.dataItem.jobId) {
        item.expanded = !event.dataItem.expanded
      }
      if (item.expanded && (item.jobSubAssemblies || []).length === 0) {
        item.isLoading = true
        expandedDetails(event.dataItem.id, i)
      }
      return item
    })
    setGridData([...newData])
  }

  const expandedDetails = async (jobId: any, dataIndex: number) => {
    const [data]: any = await getJobassembliesByjob(jobId)
    if (data && data.data.length > 0) {
        gridData[dataIndex] = {
        ...gridData[dataIndex],
        jobSubAssemblies: data.data,
      }
    }
    setGridData([...gridData])
  }

  // const ActionCell = (props: GridCellProps, tag: string) => {
  //   var action = (selectedTag === 'Pending' || selectedTag === 'All') ? Job_List_Action : [
  //     {text: ActionEnum.View, value: ActionEnum.View},
  //   ]

  //   if (tag === 'parent' && (selectedTag === 'Pending' || selectedTag === 'All')) {
  //     action = [...action, {text: 'Sub Assembly', value: ActionEnum.SubAssembly}]
  //   }
  //   return (<GridActionDropdownCell actions={action} changeHandler={actionHandler} gridCellProps={props} />)
  // }

  const dateFilterCell = (props: any) => (
    <DateFilterCell {...props} onDateFilterChange={handleDateFilterChange}/>
  );
  
  const printFilterCell = (props: any) => (
    <CheckBoxFilterCell {...props} isLoading={requestInProgress.current} setPrintState={setPrintState} printState={printState}/>
  );


  const handleDateFilterChange = (event: any) => {
    const newfilter = filter.filters.filter((filter: any) => {
      return !(
        filter.field === "dueDate"
      );
    })
    filter.filters = newfilter;
    filter.filters.push(
      {
        field: "dueDate",
        operator: event.operator,
        value: event.value,
      }
    );

    setGridData([])
    setTotalRows(0);
    requestData(0);
  }

  const RowRenderer = (tr: any, props: any) => (
    <MainRowRender originalProps={props} tr={tr} onDoubleClick={() => {
      history.push({
        pathname: '/job/edit',
        search: `?id=${props.dataItem.id}`,
      })
    }}></MainRowRender>
  )
  
  // const GoToPageRenderer = (props: GridCellProps) => {
  //   return (<GoToPageCell props={props} goToPage={(id: number) => {
  //     history.push({
  //       pathname: '/job/edit',
  //       search: `?id=${id}`,
  //     })
  //   }}/>)
  // }

  const types: string[] = clients.map((client: any) => client.name).filter(name => name.trim() !== '');
  const ClientFilterCell: any = (props: GridFilterCellProps) => (
    <ClientFilterDropdownCell {...props} data={types} defaultItem={''} />
  )

  const gridSkip = isNaN(gridSetup.skip) ? 0 : gridSetup.skip;

  const jobAssemblyComponent = (props: GridDetailRowProps) =>
  (
    <Grid data={props.dataItem.jobSubAssemblies} rowRender={RowRenderer}>
      {/* <Column cell={(cprops) => ActionCell(cprops, 'details')} width='160px' filterable={false} /> */}
      <Column field='jobId' title='Job No.' width={150} />
      <Column field='description' title='Description'/>
      <Column field='status' title='Status' width={90} />
      <Column field='quantity' title='Quantity' width={90}/>
      <Column
        field='dueDate'
        title='Due Date'
        width={230}
        filterable={false}
        cell={DateFormatCell}
      />
    </Grid>
  )
  
  return (
      <React.Fragment>
        {loader && LoadingPanel}
        <Grid
              resizable={true}
              reorderable={true}
              data={gridData.slice(gridSkip, gridSkip + gridSetup.take)}
              total={totalRows}
              onPageChange={pageChange}
              sortable={true}
              onSortChange={handleSortChange}
              filterable={true}
              onFilterChange={handleFilter}
              detail={jobAssemblyComponent}
              expandField='expanded'
              onExpandChange={expandChange}
              onColumnResize={handleResizeColumn}
              scrollable={"virtual"}
              rowHeight={35}
              dataItemKey={'id'}
              filter={filter}
              cellRender={LoadingCell}
              rowRender={RowRenderer}
              style={{
                height: "500px",
              }}
              {...gridSetup}
            >
              {/* <Column 
                field={autoColumns[FIELD_JOB_LIST.action].field}
                width={autoColumns[FIELD_JOB_LIST.action].width}
                title=' '
                cell={(cprops) => ActionCell(cprops, 'parent')}
                filterable={false} /> */}

              <Column 
                 field={autoColumns[FIELD_JOB_LIST.jobId].field}
                 width={autoColumns[FIELD_JOB_LIST.jobId].width}
                 title='Job No.' />
              <Column 
                field={autoColumns[FIELD_JOB_LIST.description].field}
                width={autoColumns[FIELD_JOB_LIST.description].width}
                title='Description' />
              <Column 
                field={autoColumns[FIELD_JOB_LIST.drawingNumber].field}
                width={autoColumns[FIELD_JOB_LIST.drawingNumber].width}
                title='Drawing' />
              <Column 
                field={autoColumns[FIELD_JOB_LIST.revisionNumber].field}
                width={autoColumns[FIELD_JOB_LIST.revisionNumber].width}
                title='Revision' />
              <Column 
                field={autoColumns[FIELD_JOB_LIST.orderNumber].field}
                width={autoColumns[FIELD_JOB_LIST.orderNumber].width}
                title='Order No' />
              <Column 
                 field={autoColumns[FIELD_JOB_LIST.client].field}
                 width={autoColumns[FIELD_JOB_LIST.client].width}
                 filterCell={ClientFilterCell}
                  title='Client'/>
              <Column 
                  field={autoColumns[FIELD_JOB_LIST.quantity].field}
                  width={autoColumns[FIELD_JOB_LIST.quantity].width}
                  title='Qty' filterable={false}/>
              <Column 
                field={autoColumns[FIELD_JOB_LIST.quantityDelivered].field}
                width={autoColumns[FIELD_JOB_LIST.quantityDelivered].width}
                title='Del Qty' filterable={false} />
              {
                admin && (
                  <Column 
                  field={autoColumns[FIELD_JOB_LIST.delivered].field}
                  width={autoColumns[FIELD_JOB_LIST.delivered].width}
                  title='Del' 
                  filterCell={printFilterCell}
                  cell={(props: GridCellProps) => {
                    return (
                      <td className='k-command-cell'>
                        <input type="checkbox" checked={props.dataItem.delivered} disabled />
                      </td>
                    )
                  }}/>   
                )
              }
                           
              <Column
                field={autoColumns[FIELD_JOB_LIST.dueDate].field}
                width={autoColumns[FIELD_JOB_LIST.dueDate].width}
                title='Due Date'
                format={'{0:dd/MM/yyy}'}
                filterCell={dateFilterCell}
                cell={DateFormatCell}
                filterable={false}
              />
            </Grid>
      </React.Fragment>
      
  );
}

export { JobListGrid }
