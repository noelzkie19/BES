import * as React from 'react'
import {
  Grid,
  GridColumn as Column,
  GridFilterChangeEvent,
  GridColumnResizeEvent,
  GridCellProps,
  GridDetailRowProps,
  GridExpandChangeEvent,
  GridFilterCellProps,
} from '@progress/kendo-react-grid'
import {useEffect, useState} from 'react'
import {useEffectOnce} from 'react-use'
import {GridSetup} from '../../models/quote-model'
import {Initial_GridSetup} from '../../constant/quote-default'
import {
  FIELD_QUOTES_COLUMN_SIZE_KEY,
  FIELD_QUOTE_LIST,
  Quotes_List_Action,
} from '../../constant/config-map'
import {
  GRID_WIDTH,
  getResizeColumnByName,
  saveResizeColumn,
} from '../../../../shared/service/grid-setup-utils'
import {getQuoteWithVersion, getQuotes} from '../../api'
import {filterToObject} from '../../../../shared/service/utils'
import {transformQuoteSort, transformVersionQuoteGrid} from '../../transformer/quote-transformer'
import {LoadingPanel} from '../../../../shared/components/kendo/GridLoading'
import {GridActionDropdownCell} from '../../../../../_metronic/partials/widgets/grid/action/GridActionDropdownCell'
import {ActionEnum} from '../../../../../_metronic/partials/widgets/grid/constant/ActionOption'
import {StatusFilterDropdownCell} from '../StatusFilterCell'
import {DateFormatCell} from '../../../../shared/components/kendo/format/DateFormatCell'
import {FormatAmountCell} from '../../../../shared/components/kendo/format/FormatAmountCell'
import {INITIAL_FILTER} from '../../../deliveries/constant/config-default'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {LoadingCell} from '../../../../shared/components/kendo/LoadingCell'
import {GoToPageCell} from '../../../../shared/components/kendo/inline/GoToPageCell'
import {useHistory} from 'react-router-dom'
import {MainRowRender} from '../../../../shared/components/kendo/MainGridRenderer'

interface IProps {
  actionHandler: (event: any, dataItem: any, dataIndex: number) => void
  isSending: boolean
  advanceSearch: string
  requestRefresh: boolean
  doneRequestHandler: () => void
}

let fetchQue: any
const QouteGrid: React.FC<IProps> = ({
  actionHandler,
  isSending,
  advanceSearch,
  requestRefresh,
  doneRequestHandler,
}) => {
  const requestInProgress = React.useRef(false)
  const [data, setData] = React.useState<any>([])
  const [gridSetup, setGridSetup] = useState<GridSetup>(Initial_GridSetup)
  const [totalRows, setTotalRows] = useState<number>(0)
  const [includeVersion, setIncludeVersion] = useState<boolean>(false)

  const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_QUOTES_COLUMN_SIZE_KEY)
  const [qouteFilter, setQouteFilter] = useState<CompositeFilterDescriptor>(INITIAL_FILTER)
  const history = useHistory()
  const [loader, setLoader] = React.useState<boolean>(false)

  const filterOperators = {
    text: [
      {
        text: 'grid.filterContainsOperator',
        operator: 'contains',
      },
    ],
    boolean: [
      {
        text: 'grid.filterEqOperator',
        operator: 'eq',
      },
    ],
  }

  useEffect(() => {
    // In filter reset verything
    if (requestRefresh) {
      setData([])
      setTotalRows(0)
      requestData(0)
      doneRequestHandler()
    }
  }, [requestRefresh])

  useEffect(() => {
    if (fetchQue) {
      clearTimeout(fetchQue)
    }
    fetchQue = setTimeout(function () {
      setData([])
      setTotalRows(0)
      requestData(0)
    }, 500)
  }, [includeVersion])

  useEffectOnce(() => {
    const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_QUOTES_LIST)
    if (columnLocal) {
      setAutoColumns(columnLocal)
    }
  })

  const requestIfNeeded = (skip: any) => {
    for (let i = skip; i < skip + gridSetup.take && i < data.length; i++) {
      if (data[i].id === undefined) {
        // request data only if not already fetched
        requestData(skip)
        return
      }
    }
  }

  const requestData = (skipParameter: any) => {
    var {sort, take} = gridSetup
    const sortField = transformQuoteSort(sort)
    const search = filterToObject(qouteFilter)

    if (requestInProgress.current) {
      return
    }
    requestInProgress.current = true
    const skip = skipParameter

    // data = specialCondition(data, gridSetup.filter);
    getQuotes(skip, take, sortField, search, advanceSearch, includeVersion)
      .then((json: any) => {
        requestInProgress.current = false
        const data = json.items
        var totalC = json.totalCount
        if (totalRows === 0) setTotalRows(totalC)

        const newOrders =
          data.length === totalC
            ? [...data]
            : new Array(totalC).fill({}).map((e, i) => ({
                Index: i,
              }))

        data.forEach((delivery: any, i: any) => {
          newOrders[i + skip] = {
            Index: i + skip,
            ...delivery,
          }
        })
        setData(newOrders)
        setLoader(false)
      })
      .catch(() => {
        requestInProgress.current = false
        setLoader(false)
      })
  }

  React.useEffect(() => {
    requestIfNeeded(gridSetup.skip)
  }, [data])

  useEffectOnce(() => {
    // request the first page on initial load
    const autoColumns = getResizeColumnByName(GRID_WIDTH.GRID_QUOTES_LIST)
    if (autoColumns) {
      setAutoColumns(autoColumns)
    }
    fetchQue = setTimeout(function () {
      setLoader(true)
      requestData(0)
    }, 100)
  })

  const pageChange = (event: any) => {
    requestIfNeeded(event.page.skip)
    setGridSetup({
      ...gridSetup,
      skip: event.page.skip,
      take: event.page.take,
    })
  }

  const handleSortChange = (pageProps: any) => {
    setGridSetup({
      ...gridSetup,
      sort: pageProps.sort,
    })
  }

  useEffect(() => {
    if (fetchQue) {
      clearTimeout(fetchQue)
    }
    fetchQue = setTimeout(function () {
      setLoader(true)
      setData([])
      setTotalRows(0)
      requestData(0)
    }, 500)
  }, [qouteFilter, gridSetup.sort])

  const handleFilter = (filter: GridFilterChangeEvent) => {
    setQouteFilter(filter.filter)
  }

  const handleResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, autoColumns, GRID_WIDTH.GRID_QUOTES_LIST)
  }

  const [quoteVersion, setQuoteVersion] = React.useState<any[]>([])
  const expandChange = (event: GridExpandChangeEvent) => {
    event.dataItem.expanded = event.value
    setQuoteVersion([...quoteVersion])
    getQuoteWithVersion(event.dataItem.quoteNumber).then((response: any) => {
      setQuoteVersion(transformVersionQuoteGrid(response[0].data))
    })
    if (!event.value || event.dataItem.details) {
      return
    }
  }

  // const ActionCell = (props: GridCellProps) => {
  //   const action = [...Quotes_List_Action];
  //   if (props.dataItem.status === 'Completed') {
  //     action.push({text: ActionEnum.ConvertJob, value: ActionEnum.ConvertJob})
  //   }
  //   return (<GridActionDropdownCell actions={action} changeHandler={actionHandler} gridCellProps={props} isCanEdit={!isSending}/>)
  // }

  const types: string[] = ['On Going', 'For Client Confirmation', 'Completed']
  const StatusFilterCell: any = (props: GridFilterCellProps) => (
    <StatusFilterDropdownCell {...props} data={types} defaultItem={'All'} />
  )

  const RowRenderer = (tr: any, props: any) => (
    <MainRowRender
      originalProps={props}
      tr={tr}
      onDoubleClick={() => {
        history.push({
          pathname: '/quote/edit',
          search: `?id=${props.dataItem.id}`,
        })
      }}
    ></MainRowRender>
  )

  // const latestVersionCell = (cellProps: GridCellProps) => (
  //   <td className='k-command-cell'>{cellProps.dataItem.latestVersion}</td>
  // )

  const gridSkip = isNaN(gridSetup.skip) ? 0 : gridSetup.skip

  return (
    <React.Fragment>
      {loader && LoadingPanel}
      <div className={`d-flex flex-row mb-4`}>
        <input
          type='checkbox'
          name='completed'
          className='form-check-input ms-5'
          checked={includeVersion}
          onChange={(e) => {
            setIncludeVersion(e.target.checked)
          }}
        />{' '}
        <span className='ms-2'>Include Versions</span>
      </div>
      <Grid
        data={data.slice(gridSkip, gridSkip + gridSetup.take)}
        style={{
          height: '500px',
        }}
        rowHeight={15}
        total={totalRows}
        scrollable={'virtual'}
        resizable={true}
        reorderable={true}
        onPageChange={pageChange}
        sortable={true}
        onSortChange={handleSortChange}
        filterable={true}
        onFilterChange={handleFilter}
        {...gridSetup}
        filterOperators={filterOperators}
        // detail={detailComponent}
        expandField='expanded'
        onExpandChange={expandChange}
        onColumnResize={handleResizeColumn}
        filter={qouteFilter}
        cellRender={LoadingCell}
        dataItemKey={'id'}
        rowRender={RowRenderer}
      >
        <Column
          field={autoColumns[FIELD_QUOTE_LIST.quoteNumber].field}
          width={autoColumns[FIELD_QUOTE_LIST.quoteNumber].width}
          // cell={latestVersionCell}
          title='Quote Number'
        />
        <Column
          field={autoColumns[FIELD_QUOTE_LIST.description].field}
          width={autoColumns[FIELD_QUOTE_LIST.description].width}
          title='Description'
        />
        <Column
          field={autoColumns[FIELD_QUOTE_LIST.clientName].field}
          width={autoColumns[FIELD_QUOTE_LIST.clientName].width}
          title='Client Name'
        />
        <Column
          field={autoColumns[FIELD_QUOTE_LIST.clientContactPerson].field}
          width={autoColumns[FIELD_QUOTE_LIST.clientContactPerson].width}
          title='Contact Person'
        />
        <Column
          field={autoColumns[FIELD_QUOTE_LIST.status].field}
          width={autoColumns[FIELD_QUOTE_LIST.status].width}
          title='Status'
          filterCell={StatusFilterCell}
        />
      </Grid>
    </React.Fragment>
  )
}

export {QouteGrid}
