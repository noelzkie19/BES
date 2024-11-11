import React, {useCallback, useContext, useEffect, useState} from 'react'
import {
  Grid,
  GridColumn as Column,
  GridFilterChangeEvent,
  GridDetailRowProps,
  GridCellProps,
  GridColumnResizeEvent,
} from '@progress/kendo-react-grid'
import {orderBy} from '@progress/kendo-data-query'
import {
  allocateSchedule,
  getScheduleAllocatedJob,
  getScheduleUnAllocatedJob,
  unAllocateSchedule,
  updateJobSchedule,
  updateScheduleNotes,
} from '../api'
import {GridSetup} from '../../../shared/model/grid-config'
import {FIELD_ALLOCATED_KEY, FIELD_ALLOCATED_LIST, FIELD_UNALLOCATED_KEY, FIELD_UNALLOCATED_LIST, Initial_AllocatedGridSetup, Initial_GridSetup, INITIAL_OPERATOR_SORT} from '../constant/config-defaults'
import {useEffectOnce} from 'react-use'
import {IScheduleJob, IUnAllocatedJob} from '../models/schedule-model'
import {DateFormatCell} from '../../../shared/components/kendo/format/DateFormatCell'
import {CellRender, RowRender} from '../../../shared/components/kendo/renderer'
import {InCellSelect} from '../../../shared/components/kendo/incell/InCellSelect'
import {
  transforMachineOption,
  transformAllocatedJob,
  transformAssignAllocatedJob,
  transformJobSort,
  transforStaffOption,
} from '../transformer/schedule-transformer'
import {ScheduleContext} from '../context/ScheduleContext'
import {InCellTextCell} from '../../../shared/components/kendo/incell/InCellTextCell'
import {AssigneeModal} from './modal/AssigneeModal'
import {InCellBooleanCell} from '../../../shared/components/kendo/incell/InCellBooleanCell'
import {CustomAlert, IAlert} from '../../../shared/components/CustomAlert'
import {filterToObject} from '../../../shared/service/utils'
import {DateFilterCell} from './custom-cell/DateFilterCell'
import {TextFilterCell} from './custom-cell/TextFilterCell'
import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from '../../../shared/service/grid-setup-utils'
//start pagination

const loadingPanel = (
  <div className='k-loading-mask'>
    <span className='k-loading-text'>Loading</span>
    <div className='k-loading-image'></div>
    <div className='k-loading-color'></div>
  </div>
)
let allocatedQue: any;
let unallocatedQue: any;

const ParentRowRender = (properties: any) => {
  const {row, props, onDrop, onDragStart, exitEdit} = properties

  const urgent = props.dataItem.isUrgent
  const red = {
    backgroundColor: 'rgb(243, 23, 0, 0.32)',
  }
  const trProps = {
    style: urgent
      ? red
      : {
          backgroundColor: 'white',
        },
  }

  const additionalProps = {
    onDragStart: () => onDragStart(props.dataItem),
    onDragOver: (e: any) => {
      e.preventDefault()
    },
    onDrop: () => {
      onDrop()
    },
    onBlur: () => {
      if (exitEdit) exitEdit()
    },
    draggable: true,
  }
  return React.cloneElement(row, {...row.props, ...additionalProps, ...trProps}, row.props.children)
}

const EDIT_FIELD = 'inEdit'

const ScheduleList: React.FC = () => {
  //start filter
  const [isLoading, setIsLoading] = useState(false)

  const [gridSetupUnallocated, setGridSetupUnallocated] = useState<GridSetup>(Initial_GridSetup)
  const [gridSetupAllocated, setGridSetupAllocated] = useState<GridSetup>(Initial_AllocatedGridSetup)
  const [operatorSort, setOperatorSort] = useState([] as any)

  const [allocatedRows, setAllocatedRows] = useState<number>(0)
  const [unAllocatedRows, setUnAllocatedRows] = useState<number>(0)
  //end filter

  const [unallocatedData, setUnallocatedData] = useState<IUnAllocatedJob[]>([])
  const [allocatedData, setAllocatedData] = useState<IScheduleJob[]>([])
  const [dragFrom, setDragFrom] = useState<any>('')
  let [dragDataItem, setDragDataItem] = useState<any>()

  const [toaster, setToaster] = useState<IAlert | undefined>()

  // assignee
  const [assignee, setAssignee] = useState<boolean>(false)

  const {getAllUsersAsync, users, getAllMachinesAsync, machines} = useContext(ScheduleContext)

  const [unallocatedAutoColumns, setUnallocatedAutoColumns] = useState<any[]>(FIELD_UNALLOCATED_KEY)
  const [allocatedAutoColumns, setAllocatedAutoColumns] = useState<any[]>(FIELD_ALLOCATED_KEY)

  useEffectOnce(() => {

    const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_SCHEDULE_UNALLOCATED_LIST)
    if (columnLocal) {
      setUnallocatedAutoColumns(columnLocal)
    }

    const allocatedColumnLocal = getResizeColumnByName(GRID_WIDTH.GRID_SCHEDULE_ALLOCATED_LIST)
    if (allocatedColumnLocal) {
      setAllocatedAutoColumns(allocatedColumnLocal)
    }

    fetchUnAllocatedData()
    fetchAllocatedData()
    getAllUsersAsync()
    getAllMachinesAsync()
  })

  const fetchUnAllocatedData = useCallback(() => {
    if (unallocatedQue) {
        clearTimeout(unallocatedQue);
        setIsLoading(false)
    }
    unallocatedQue = setTimeout(function() {
      setIsLoading(true)
      var {sort, skip, take, filter} = gridSetupUnallocated
      const search = filterToObject(filter)
      const sortField = transformJobSort(sort)
      getScheduleUnAllocatedJob(skip, take, sortField, search)
        .then((response: any) => {
          setUnallocatedData(response.items)
          setUnAllocatedRows(response.totalCount)
          setIsLoading(false)
        })
        .catch(() => {
          setIsLoading(false)
        })
    }, 1000); // Will do the ajax stuff after 1000 ms, or 1 s

  }, [gridSetupUnallocated])

  const fetchAllocatedData = useCallback(() => {
    if (allocatedQue) {
      clearTimeout(allocatedQue);
      setIsLoading(false)
    }
    allocatedQue = setTimeout(function() {
      setIsLoading(true)
      let {sort, skip, take, filter} = gridSetupAllocated
      const search = filterToObject(filter)
      const sortField = transformJobSort(sort)
      getScheduleAllocatedJob(skip, take, sortField, search)
        .then((response: any) => {
          setAllocatedData(transformAllocatedJob(response.items))
          setAllocatedRows(response.totalCount)
          setIsLoading(false)
        })
        .catch(() => {
          setIsLoading(false)
        })
    }, 1000); // Will do the ajax stuff after 1000 ms, or 1 s
    
  }, [gridSetupAllocated])

  useEffect(() => {
    fetchAllocatedData()
    console.log(gridSetupAllocated)
  }, [gridSetupAllocated, fetchAllocatedData])

  useEffect(() => {
    console.log(gridSetupUnallocated)
    fetchUnAllocatedData()
  }, [gridSetupUnallocated, fetchUnAllocatedData])

  const closeToasterHandler = () => {
    setToaster(undefined)
  }

  useEffect(() => {
    const newSort = allocatedData.map(() => [
      {
        ...INITIAL_OPERATOR_SORT,
      },
    ])
    setOperatorSort(newSort)
  }, [allocatedData])

  const handleOnDropUnallocated = async () => {
    if (dragFrom === 'allocated') {
      let newDataAllocated = allocatedData.filter((item: any) => item.jobId !== dragDataItem.jobId)

      let newDataUnallocated = [dragDataItem, ...unallocatedData]

      await unAllocateSchedule(dragDataItem)

      setToaster({
        message: `Unallocate job successfully.`,
        header: `Schedule`,
        type: 'primary',
        closeToaster: closeToasterHandler,
      })

      setUnallocatedData(newDataUnallocated)
      setAllocatedData(newDataAllocated)
      setAllocatedRows((data) => data++)
      setUnAllocatedRows((data) => data--)
    }
  }

  const assigneeClickHandler = (dataItem: any) => {
    setDragFrom('unallocated')
    setDragDataItem(dataItem)
    setAssignee(true)
  }

  const handleDragStartUnallocated = (dataItem: any) => {
    setDragFrom('unallocated')
    setDragDataItem(dataItem)
  }

  const handleOnDropAllocated = () => {
    if (dragFrom === 'unallocated') {
      setAssignee(true)
    }
  }

  const allocateAssignedJob = async (assignee: number) => {
    const data = await allocateSchedule(dragDataItem, assignee)
    dragDataItem = {
      ...transformAssignAllocatedJob(dragDataItem, assignee),
      assignee: assignee,
      id: data.data,
    }

    let newDataUnAllocated = unallocatedData.filter(
      (item: any) => item.jobId !== dragDataItem.jobId
    )
    let newAllocateData = [dragDataItem, ...allocatedData]

    setToaster({
      message: `Allocate job success.`,
      header: `Schedule`,
      type: 'primary',
      closeToaster: closeToasterHandler,
    })
    setAllocatedData(transformAllocatedJob(newAllocateData))
    setUnallocatedData(newDataUnAllocated)
    setAllocatedRows(allocatedRows + 1)
    setUnAllocatedRows(allocatedRows - 1)

    setAssignee(false)
  }

  const handleAssigneeModal = () => {
    setAssignee(false)
  }
  const handleDragStartAllocated = (dataItem: any) => {
    setDragFrom('allocated')
    setDragDataItem(dataItem)
  }
  // ---------  Unallocated Grid Setup

  const rowForGridUnallocated = (tr: any, props: any) => {
    return (
      <RowRender originalProps={props} tr={tr} editField={EDIT_FIELD} />
      // <ParentRowRender
      //   props={props}
      //   row={tr}
      //   onDrop={handleOnDropUnallocated}
      //   onDragStart={handleDragStartUnallocated}
      // />
    )
  }

  const pageChangeUnAllocated = (pageProps: any) => {
    setGridSetupUnallocated({
      ...gridSetupUnallocated,
      skip: pageProps.page.skip,
      take: pageProps.page.take,
    })
  }

  const filterUnallocatedHandle = (filter: GridFilterChangeEvent) => {
    setGridSetupUnallocated({
      ...Initial_GridSetup,
      filter: filter.filter,
    })
  }

  const handleSortUnallocatedChange = (pageProps: any) => {
    setGridSetupUnallocated({
      ...gridSetupUnallocated,
      sort: pageProps.sort,
    })
  }


  const handleUnallocatedFilterChange = (event: any) => {
    const newfilter = gridSetupUnallocated.filter.filters.filter((filter: any) => {
      return !(filter.field === event.field)
    })
    gridSetupUnallocated.filter.filters = newfilter
    gridSetupUnallocated.filter.filters.push({
      field: event.field,
      operator: event.operator,
      value: event.value,
    })

    setGridSetupUnallocated({...gridSetupUnallocated})
  }
  // ---------  Allocated Grid Setup
  // Parent //

  const customParentRowRender = (tr: any, props: any) => {
    return (
      <RowRender originalProps={props} 
      tr={tr} exitEdit={exitParentEdit} editField={EDIT_FIELD} />
      // <ParentRowRender
      //   props={props}
      //   row={row}
      //   onDrop={handleOnDropAllocated}
      //   onDragStart={handleDragStartAllocated}
      //   exitEdit={exitParentEdit}
      // />
    )
  }

  const customParentCellRender = (td: any, props: any) => (
    <CellRender
      originalProps={props}
      td={td}
      enterEdit={enterParentEdit}
      editField={EDIT_FIELD}
      exitEdit={exitParentEdit}
    />
  )

  const enterParentEdit = (_: any, field: any, dataIndex: any) => {
    const newallocatedData = allocatedData.map((allocated, index) => {
      if (index === dataIndex) {
        return {
          ...allocated,
          [EDIT_FIELD]: field,
          isEdit: dataIndex === index,
        }
      } else return allocated
    })
    setAllocatedData(newallocatedData)
  }

  const itemParentChange = (event: any) => {
    let field = event.field || ''
    const idx = allocatedData.findIndex((allo) => allo.mainJobId === event.dataItem.mainJobId)
    allocatedData[idx] = {
      ...event.dataItem,
      [field]: event.value,
    }
    updateScheduleNotes(allocatedData[idx])
    setToaster({
      message: `Update details successfully.`,
      header: `Schedule`,
      type: 'primary',
      closeToaster: closeToasterHandler,
    })

    setAllocatedData([...allocatedData])
  }

  const exitParentEdit = () => {
    const newallocatedData: any = allocatedData.map((item, index) => {
      var newData = {
        ...item,
        [EDIT_FIELD]: undefined,
        isEdit: false,
      }
      return newData
    })
    setAllocatedData([...newallocatedData])
  }

  const filterAllocatedHandle = (filter: GridFilterChangeEvent) => {
    setGridSetupAllocated({
      ...Initial_GridSetup,
      filter: filter.filter,
    })
  }

  const handleDateFilterChange = (event: any) => {
    const newfilter = gridSetupAllocated.filter.filters.filter((filter: any) => {
      return !(filter.field === 'dueDate')
    })
    gridSetupAllocated.filter.filters = newfilter
    gridSetupAllocated.filter.filters.push({
      field: 'dueDate',
      operator: event.operator,
      value: event.value,
    })

    setGridSetupAllocated({...gridSetupAllocated})
  }

  const handleAllocatedFilterChange = (event: any) => {
    const newfilter = gridSetupAllocated.filter.filters.filter((filter: any) => {
      return !(filter.field === event.field)
    })
    gridSetupAllocated.filter.filters = newfilter
    gridSetupAllocated.filter.filters.push({
      field: event.field,
      operator: event.operator,
      value: event.value,
    })

    setGridSetupAllocated({...gridSetupAllocated})
  }

  const filterCellAllocated = (props: any) => (
    <TextFilterCell {...props} 
      onfilterChange={handleAllocatedFilterChange}/>
  )


  const dateFilterCell = (props: any) => (
    <DateFilterCell {...props} onDateFilterChange={handleDateFilterChange}/>
  )

  const handleSortChange = (pageProps: any) => {
    setGridSetupAllocated({
      ...gridSetupAllocated,
      sort: pageProps.sort,
    })
  }

  const pageChangeAllocated = (pageProps: any) => {
    setGridSetupAllocated({
      ...gridSetupAllocated,
      skip: pageProps.page.skip,
      take: pageProps.page.take,
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
  const notesTextCell = (props: any) => (
    <InCellTextCell
      props={props}
      enterEdit={enterParentEdit}
      onChange={itemParentChange}
      exitEdit={exitParentEdit}
    />
  )
  const checkboxCell = (props: any) => (
    <InCellBooleanCell
      props={props}
      enterEdit={enterParentEdit}
      onChange={itemParentChange}
      exitEdit={exitParentEdit}
    ></InCellBooleanCell>
  )

  // OPeration //
  const enterOperationEdit = (data: any, field: any, dataIndex: any) => {
    const idx = allocatedData.findIndex((allo) => allo.mainJobId === data.jobId)
    const newallocatedData = allocatedData.map((allocated, index) => {
      if (index === idx) {
        var data = orderBy(allocated.operations, operatorSort[index])
        allocated.operations = data.map((item, oidx) => {
          var newData = {
            ...item,
            [EDIT_FIELD]: dataIndex === oidx ? field : undefined,
            isEdit: dataIndex === oidx,
          }
          return newData
        })
      }
      return allocated
    })
    setAllocatedData(newallocatedData)
  }

  const exitOperationEdit = () => {
    allocatedData.map((item, index) => {
      var newData = {
        ...item,
        [EDIT_FIELD]: undefined,
        isEdit: false,
      }
      return newData
    })
  }

  const itemChange = (event: any) => {
    let field = event.field || ''
    const idx = allocatedData.findIndex((allo) => allo.mainJobId === event.dataItem.jobId)
    allocatedData[idx].operations = allocatedData[idx].operations.map((data: any) => {
      if (data.isEdit) {
        const newdata = {
          ...data,
          [field]: event.value,
        }
        updateJobSchedule(newdata)
        setToaster({
          message: `Item update successfully.`,
          header: `Schedule`,
          type: 'primary',
          closeToaster: closeToasterHandler,
        })

        return newdata
        //
      }
      return data
    })
    setAllocatedData([...allocatedData])
  }

  const customRowRender = (tr: any, props: any) => (
    <RowRender originalProps={props} tr={tr} exitEdit={exitOperationEdit} editField={EDIT_FIELD} />
  )

  const customCellRender = (td: any, props: any) => (
    <CellRender
      originalProps={props}
      td={td}
      enterEdit={enterOperationEdit}
      editField={EDIT_FIELD}
      exitEdit={exitOperationEdit}
    />
  )
  const dropdownCell = (props: any) => (
    <InCellSelect
      props={props}
      enterEdit={enterOperationEdit}
      onChange={itemChange}
      exitEdit={exitOperationEdit}
      data={transforMachineOption(machines)}
    ></InCellSelect>
  )

  const dropdownStaffCell = (props: any) => (
    <InCellSelect
      props={props}
      enterEdit={enterOperationEdit}
      onChange={itemChange}
      exitEdit={exitOperationEdit}
      data={transforStaffOption(users)}
    ></InCellSelect>
  )

  const operationsComponent = (props: GridDetailRowProps) =>
    props && (
      <Grid
        rowRender={customRowRender}
        cellRender={customCellRender}
        onItemChange={itemChange}
        editField={EDIT_FIELD}
        data={orderBy(
          allocatedData[props.dataItem.rowId].operations,
          operatorSort[props.dataItem.rowId]
        )}
        sortable={true}
        sort={operatorSort[props.dataItem.rowId]}
        onSortChange={(e: any) => {
          operatorSort[props.dataItem.rowId] = e.sort
          setOperatorSort([...operatorSort])
        }}
      >
        <Column field='number' title='Operation Number'  editable={false} />
        <Column field='description' title='Operation' editable={false} />
        <Column field='machineId' title='Machine' cell={dropdownCell} />
        <Column field='staffId' title='Staff' cell={dropdownStaffCell} />
      </Grid>
    )
    
  const handleResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, unallocatedAutoColumns, GRID_WIDTH.GRID_SCHEDULE_UNALLOCATED_LIST);
  }

  const handleAllocatedResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, allocatedAutoColumns, GRID_WIDTH.GRID_SCHEDULE_ALLOCATED_LIST);
  }

  return (
    <React.Fragment>
      {assignee && (
        <AssigneeModal
          jobData={dragDataItem}
          proceedCallback={(assignee) => allocateAssignedJob(assignee)}
          handleClose={handleAssigneeModal}
        />
      )}

      {toaster && <CustomAlert {...toaster} />}
      <div className='row drag-row '>
        <div className='col-md-4 mb-5 drag-col'>
          <h3>Unallocated Jobs </h3>
          { isLoading && loadingPanel }
          <Grid
            id='unallocated'
            // data={unallocatedData.length > 0 ? unallocatedData : [INITIALSCHED_DEFAULT]}
            data={unallocatedData}
            rowRender={rowForGridUnallocated}
            total={unAllocatedRows}
            // pageable={true}
            onPageChange={pageChangeUnAllocated}
            sortable={true}
            onSortChange={handleSortUnallocatedChange}
            filterable={true}
            onFilterChange={filterUnallocatedHandle}
            onColumnResize={handleResizeColumn}
            resizable={true}
            {...gridSetupUnallocated}
          >
            <Column 
              field={unallocatedAutoColumns[FIELD_UNALLOCATED_LIST.jobId].field}
              width={unallocatedAutoColumns[FIELD_UNALLOCATED_LIST.jobId].width}
              title='Job No.' />
            <Column 
              field={unallocatedAutoColumns[FIELD_UNALLOCATED_LIST.description].field}
              width={unallocatedAutoColumns[FIELD_UNALLOCATED_LIST.description].width}
              title='Description'  />
            <Column field='client' title='Client Name'  />
            <Column
              field={unallocatedAutoColumns[FIELD_UNALLOCATED_LIST.assignee].field}
              width={unallocatedAutoColumns[FIELD_UNALLOCATED_LIST.assignee].width}
              title='Assignee'
              filterable={false}
              cell={(props: GridCellProps) => (
                <td className='text-center' onClick={() => assigneeClickHandler(props.dataItem)}>
                  <i className='fas fa-users'></i>
                </td>
              )}
            />
          </Grid>
        </div>
        <div className='col-md-8 mb-5 drag-col'>
          <div className='row'>
            <div className='col-md-5'>
              <h3>Allocated Jobs </h3>
            </div>
          </div>
          <Grid
              resizable={true}
              id='allocated'
              data={allocatedData}
              rowRender={customParentRowRender}
              total={allocatedRows}
              // pageable={true}
              onPageChange={pageChangeAllocated}
              filterable={true}
              onFilterChange={filterAllocatedHandle}
              detail={operationsComponent}
              expandField='expanded'
              onExpandChange={expandDetailChange}
              cellRender={customParentCellRender}
              onItemChange={itemParentChange}
              sortable={true}
              onSortChange={handleSortChange}
              editField={EDIT_FIELD}
              onColumnResize={handleAllocatedResizeColumn}
              {...gridSetupAllocated}
            >
              <Column
                field={allocatedAutoColumns[FIELD_ALLOCATED_LIST.isUrgent].field}
                width={allocatedAutoColumns[FIELD_ALLOCATED_LIST.isUrgent].width}
                title='Urgent'
                cell={checkboxCell}
                filter='boolean'
                filterable={false}
              />
              <Column 
                field={allocatedAutoColumns[FIELD_ALLOCATED_LIST.jobId].field}
                width={allocatedAutoColumns[FIELD_ALLOCATED_LIST.jobId].width}
                title='Job Number' editable={false} />
              <Column 
                 field={allocatedAutoColumns[FIELD_ALLOCATED_LIST.description].field}
                 width={allocatedAutoColumns[FIELD_ALLOCATED_LIST.description].width}
                title='Description' editable={false} 
                />
              <Column 
                field={allocatedAutoColumns[FIELD_ALLOCATED_LIST.client].field}
                width={allocatedAutoColumns[FIELD_ALLOCATED_LIST.client].width}
                title='Client Name' editable={false} 
              />
              <Column
                field={allocatedAutoColumns[FIELD_ALLOCATED_LIST.notes].field}
                width={allocatedAutoColumns[FIELD_ALLOCATED_LIST.notes].width}
                title='Notes'
                cell={notesTextCell}
                filterable={false}
              />
              <Column
                field={allocatedAutoColumns[FIELD_ALLOCATED_LIST.dueDate].field}
                width={allocatedAutoColumns[FIELD_ALLOCATED_LIST.dueDate].width}
                title='Due Date'
                filterCell={dateFilterCell}
                cell={DateFormatCell}
                editable={false}
              />
            </Grid>
          
        </div>
      </div>
    </React.Fragment>
  )
}

export {ScheduleList}
