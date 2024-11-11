import { cloneElement, useCallback, useContext, useEffect, useState } from "react";
import { useEffectOnce } from "react-use";
import { usePageData } from "../../../../_metronic/layout/core";
import { GridSetup } from "../../users/models/user-model";
import { getScheduleStaff } from "../api";
import { Initial_GridSetup } from "../constant/config-defaults";
import { IScheduleJob } from "../models/schedule-model";

import {
    Grid,
    GridCellProps,
    GridColumn as Column,
    GridDetailRowProps,
    GridFilterChangeEvent,
    GridPageChangeEvent,
} from '@progress/kendo-react-grid'
import { DateFormatCell } from "../../../shared/components/kendo/format/DateFormatCell";
import { ScheduleContext } from "../context/ScheduleContext";
import { JobModal } from "./modal/JobModal";
import { transformJobSort } from "../transformer/schedule-transformer";
import { filterToObject } from "../../../shared/service/utils";
import { DateFilterCell } from "./custom-cell/DateFilterCell";
import { ScheduleStaffList } from "./ScheduleStaffList";

let delayTimer: any;
const ScheduleStaff: React.FC = () => {
    const { currentUser } = usePageData()

    const [isLoading, setIsLoading] = useState(false)
    const [gridSetup, setGridSetup] = useState<GridSetup>(Initial_GridSetup)
    const [allocatedData, setAllocatedData] = useState<IScheduleJob[]>([])
    const [totalRows, setTotalRows] = useState<number>(0)
    const [isModalShow, setIsModalShow] = useState<boolean>(false)

    const {
        getAllMachinesAsync,
        machines,
        getJobByidAsync,
        fetchingJobData
    } = useContext(ScheduleContext)

    useEffectOnce(() => {
        // fetchAllocatedData();
        getAllMachinesAsync();
    })


    
    const fetchAllocatedData = useCallback(() => {
        if (delayTimer) {
            clearTimeout(delayTimer);
            setIsLoading(false)
        }
        delayTimer = setTimeout(function() {
            setIsLoading(true)
            let { sort, skip, take } = gridSetup;
            const search = filterToObject(gridSetup.filter)
            const sortField = transformJobSort(sort)
            getScheduleStaff(currentUser.id, skip, take, sortField, search).then((response: any) => {
                setAllocatedData(response.data.items)
                setTotalRows(response.data.totalCount)
                setIsLoading(false)
            }).catch((ex) => {
                setIsLoading(false)
            })
        }, 1000); // Will do the ajax stuff after 1000 ms, or 1 s
    }, [gridSetup, currentUser])

    useEffect(() => {
        fetchAllocatedData()
    }, [gridSetup, fetchAllocatedData])


    const pageChangeHandle = (pageProps: GridPageChangeEvent) => {
        setGridSetup({
            ...gridSetup,
            skip: pageProps.page.skip,
            take: pageProps.page.take
        })
    }
    const filterHandle = (filter: GridFilterChangeEvent) => {
        setGridSetup({
            ...Initial_GridSetup,
            filter: filter.filter
        })
    }

    const handleSortChange = (pageProps: any) => {
        setGridSetup({
            ...gridSetup,
            sort: pageProps.sort,
        })
    }

    const expandDetailChange = (event: any) => {
        let newData = allocatedData.map((item) => {
            if (item.jobId === event.dataItem.jobId) {
                item.expanded = !event.dataItem.expanded
            }
            return item
        })
        setAllocatedData(newData)
    }

    const viewJobDetails = async (jobId: number) => {
        getJobByidAsync(jobId)
        setIsModalShow(true)
    }

    const operationsComponent = (props: GridDetailRowProps) => (
        <Grid data={props.dataItem.operations || []}>
            <Column field='number' title='Operation Number' width={300} editable={false} />
            <Column field='description' title='Operation' width={300} editable={false} />
            <Column field='machineId' title='Machine' cell={(props: GridCellProps) => (
                <td className='k-command-cell'>
                    <span>{(machines || []).find(x => x.id === props.dataItem.machineId)?.description}</span>
                </td>
            )} editable={false} />
          
        </Grid>
    )
    
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

    const dateFilterCell = (props: any) => (
        <DateFilterCell
            {...props}
            onDateFilterChange={handleDateFilterChange}
        />
    ); 

    const rowRender = (trElement: any, props: any) => {
        const urgent = props.dataItem.isUrgent;
        const red = {
            backgroundColor: "rgb(243, 23, 0, 0.32)",
        };
        const trProps = {
            style: urgent ? red : {
                backgroundColor: "transparent",
            },
        };
        return cloneElement(
            trElement,
            {
                ...trProps,
            },
            trElement.props.children
        );
    };

    return (
        <div className='row'>
            <div className='col-md-12'>
               
                <h3>My Jobs </h3>
                <ScheduleStaffList></ScheduleStaffList>
                {/* <Grid
                    data={allocatedData}
                    total={totalRows}
                    pageable={true}
                    onPageChange={pageChangeHandle}
                    filterable={true}
                    onFilterChange={filterHandle}
                    detail={operationsComponent}
                    expandField='expanded'
                    sortable={true}
                    onSortChange={handleSortChange}
                    onExpandChange={expandDetailChange}
                    rowRender={rowRender}
                    {...gridSetup}
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
                </Grid> */}
            </div>
        </div>
        )
}

export { ScheduleStaff }