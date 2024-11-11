import * as React from "react";
import { Grid, GridColumn as Column, GridFilterChangeEvent, GridCellProps } from "@progress/kendo-react-grid";
import { useContext, useEffect, useState } from "react";
import { getScheduleStaff } from "../api";
import { filterToObject, toLinQExpression } from "../../../shared/service/utils";
import { LoadingPanel } from "../../../shared/components/kendo/GridLoading";
import { DateFormatCell } from "../../../shared/components/kendo/format/DateFormatCell";
import { DateFilterCell } from "@progress/kendo-react-data-tools";
import { useEffectOnce } from "react-use";
import { ScheduleContext } from "../context/ScheduleContext";
import { GridSetup } from "../../users/models/user-model";
import { Initial_GridSetup } from "../constant/config-defaults";
import { transformJobSort } from "../transformer/schedule-transformer";
import { FILTER_DEFAULT } from "../../quote/constant/config-map";
import { usePageData } from "../../../../_metronic/layout/core";
import { JobModal } from "./modal/JobModal";
import { LoadingCell } from "../../../shared/components/kendo/LoadingCell";

interface IProps {
//   advanceSearch: string,
//   requestReload: boolean,
//   handleDoneReload: (event: boolean) => void,
//   actionHandler: (event: any, dataItem: any, dataIndex: number) => void
}

const ScheduleStaffList: React.FC<IProps> = ({ }) => {
    const {
        getAllMachinesAsync,
        machines,
        getJobByidAsync,
        fetchingJobData
    } = useContext(ScheduleContext)

  const { currentUser } = usePageData()
  const requestInProgress = React.useRef(false);
  const [totalRows, setTotalRows] = useState<number>(0)

  const [gridSetup, setGridSetup] = useState<GridSetup>(Initial_GridSetup)
  const [data, setData] = React.useState<any>([])
  const [isModalShow, setIsModalShow] = useState<boolean>(false)

//   useEffect(() => {
//     if(requestReload) {
//       setData([])
//       setTotalRows(0);
//       requestData(0);
//     }
//   }, [requestReload])

  useEffectOnce(() => {
        // fetchAllocatedData();
        getAllMachinesAsync();
    })

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
    const {sort, take} = gridSetup
    const search = filterToObject(gridSetup.filter)
    const sortField = transformJobSort(sort)

    if (requestInProgress.current) {
      return;
    }
    requestInProgress.current = true;
    const skip = skipParameter; 
    getScheduleStaff(currentUser.id, skip, take, sortField, search)
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
        // handleDoneReload(false)
      });
  };

  React.useEffect(() => {
    requestIfNeeded(gridSetup.skip);
  }, [data]);


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
    setData([])
    setTotalRows(0);
    requestData(0);
  }, [gridSetup.filter])

  const handleFilter = (filter: GridFilterChangeEvent) => {
    setGridSetup({
      ...Initial_GridSetup,
      filter: filter.filter,
    })
  }
  
  const dateFilterCell = (props: any) => (
        <DateFilterCell
            {...props}
            onDateFilterChange={handleDateFilterChange}
        />
); 

const handleDateFilterChange = (event: any) => { 
    let newGridFilter = Initial_GridSetup;
    const newfilter = newGridFilter.filter.filters.filter((filter: any) => {
        return !(
            filter.field === "dueDate" 
        );
    })
    newGridFilter.filter.filters = newfilter;
    newGridFilter.filter.filters.push(
        {
            field: "dueDate",
            operator: event.operator,
            value: event.value,
        }
    );

    setGridSetup({ ...newGridFilter });
}

const viewJobDetails = async (jobId: number) => {
    getJobByidAsync(jobId)
    setIsModalShow(true)
}


  return (
      <React.Fragment>
        {requestInProgress.current && LoadingPanel}
        {
           (isModalShow && !fetchingJobData) && (
                    <JobModal handleClose={() => setIsModalShow(false)}></JobModal>
                )
            }
    
          <Grid
            resizable={true}
            reorderable={true}
            data={data.slice(gridSetup.skip, gridSetup.skip + gridSetup.take)}
            style={{
              height: "540px",
            }}
            rowHeight={15}
            scrollable={"virtual"}
            total={totalRows}
            onPageChange={pageChange}
            sortable={true}
            onSortChange={handleSortChange}
            filterable={true}
            onFilterChange={handleFilter}
            cellRender={LoadingCell}
            {...gridSetup}
            dataItemKey={"id"}
          >
           <Column field='jobId' title='Job Number' width='200px' />
            <Column field='description' title='Description' width='400px'/>
            <Column field='client' title='Client Name' width='200'  />
            <Column field='notes' title='Notes' width='400px' filterable={false}
                sortable={false}/>
            <Column field='dueDate' title='Due Date' width='230px'
                filterCell={dateFilterCell}
                cell={DateFormatCell} />
            <Column title='Operations' width='200px'
                filterable={false}
                cell={(props: GridCellProps) => (
                    <td className='k-command-cell'>
                        <button className="btn btn-primary btn-sm" 
                            onClick={() => viewJobDetails(props.dataItem.mainJobId)}>
                            Open Operations
                        </button>
                    </td>
                )} editable={false} />
            <Column title='Complete' width='140px' 
                filterable={false}  cell={() => (
                <td className='k-command-cell'>
                    <input type='checkbox' className=""/>
                </td>
            )} editable={false} />
          </Grid>
      </React.Fragment>
      
  );
}

export { ScheduleStaffList }