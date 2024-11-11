import {DateFilterCell} from '@progress/kendo-react-data-tools'
import {DropDownList, DropDownListChangeEvent} from '@progress/kendo-react-dropdowns'
import {
  Grid,
  GridColumn as Column,
  GridCellProps,
  GridFilterChangeEvent,
  GridColumnResizeEvent,
} from '@progress/kendo-react-grid'
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useReactToPrint} from 'react-to-print'
import {CustomAlert, IAlert} from '../../../shared/components/CustomAlert'
import {DateFormatCell} from '../../../shared/components/kendo/format/DateFormatCell'
import {filterToObject} from '../../../shared/service/utils'
import {getNonConformances} from '../api'
import {FIELD_NONCONFORMANCE_COLUMN_KEY, Initial_GridSetup} from '../constant/config-default'
import {NON_CONFORMANCEFORM_DEFAULT} from '../constant/nonconformance-default'
import {NonConformanceContext} from '../context/NonConformanceContext'
import {DeleteNonConformanceModal} from '../modal/DeleteNonConformanceModal'
import {PrintModal} from '../modal/PrintModal'
import {GridSetup} from '../models/config-model'
import {INonConformance, INonConformanceReport} from '../models/nonconformance-model'
import {
  transformNonConformanceSort,
} from '../transformers/non-conformance-transaformer'
import {NonConformancePrintContent} from './print/NonConformancePrintContent'
import { SearchWidget1 } from '../../../../_metronic/partials/widgets/search/SearchWidget1'
import { useEffectOnce } from 'react-use'
import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from '../../../shared/service/grid-setup-utils'
import { NonConformanceGrid } from './NonConformanceGrid'

const loadingPanel = (
  <div className='k-loading-mask'>
    <span className='k-loading-text'>Loading</span>
    <div className='k-loading-image'></div>
    <div className='k-loading-color'></div>
  </div>
)
const NonConformanceList: React.FC = () => {
  const history = useHistory()
  const [gridSetup, setGridSetup] = useState<GridSetup>(Initial_GridSetup)
  const [tableData, setTableData] = useState<INonConformance[]>([])
  const [deleteData, setDeleteData] = useState<INonConformance | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<IAlert | undefined>()
  const [totalRows, setTotalRows] = useState<number>(0)
  const [modalShow, setModalShow] = useState(false)
  const [printNonConformances, setPrintNonConformances] = useState<INonConformanceReport[]>([])
  const [modalPrint, setModalPrint] = useState(false)
  const componentRefDetails = useRef<any>()
  const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_NONCONFORMANCE_COLUMN_KEY)
  const printHandler = useReactToPrint({
    pageStyle: `@media print {
      @page {
        size: portrait;
      }
    }`,
    content: () => componentRefDetails.current,
  })

  const {contextToaster, setSelectedData} = useContext(NonConformanceContext)
  const advanceSearch = useRef('');
  const fetchData = useCallback(() => {
    setIsLoading(true)
    var {sort, skip, take, filter} = gridSetup
    const sortField = transformNonConformanceSort(sort)
    const search = filterToObject(filter)
    getNonConformances(
      skip,
      take,
      sortField,
      search,
      advanceSearch.current
    )
      .then((response: any) => {
        setTableData(response.data.items)
        setTotalRows(response.data.totalCount)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [gridSetup])

  
  useEffectOnce(() => {
    const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_NONCONFORMANCE_LIST)
    if (columnLocal) {
      setAutoColumns(columnLocal)
    }
  })


  useEffect(() => {
    fetchData()
  }, [gridSetup, fetchData])

  useEffect(() => {
    if (contextToaster?.message != null && contextToaster?.message !== '') {
      setToast(contextToaster)
      setTimeout(() => setToast(undefined), 1000)
    }
  }, [contextToaster])

  const closeModal = () => {
    setModalShow(false)
  }

  const deleteHandler = () => {
    setModalShow(false)
    fetchData()
  }

  // const handleFilter = (filter: GridFilterChangeEvent) => {
  //   setGridSetup({
  //     ...gridSetup,
  //     filter: filter.filter,
  //     skip: 0,
  //     take: 10,
  //   })
  // }

  // const dateFilterCell = (props: any) => (
  //   <DateFilterCell {...props} onDateFilterChange={handleDateFilterChange} />
  // )

  // const handleDateFilterChange = (event: any) => {
  //   const newfilter = gridSetup.filter.filters.filter((filter: any) => {
  //     return !(filter.field === 'dateRecorded')
  //   })
  //   gridSetup.filter.filters = newfilter
  //   gridSetup.filter.filters.push({
  //     field: 'dateRecorded',
  //     operator: event.operator,
  //     value: event.value,
  //   })

  //   setGridSetup({...gridSetup, skip: 0, take: 10})
  // }

  // const handlePageChange = (pageProps: any) => {
  //   setGridSetup({
  //     ...gridSetup,
  //     skip: pageProps.page.skip,
  //     take: pageProps.page.take,
  //   })
  // }

  // const handleSortChange = (pageProps: any) => {
  //   setGridSetup({
  //     ...gridSetup,
  //     sort: pageProps.sort,
  //   })
  // }

  const commandChangeHandler = (event: DropDownListChangeEvent) => {
    const {
      text,
      value: {dataItem},
    } = event.target.value

    if (text === 'Edit') {
      history.push({
        pathname: '/non-conformance/edit',
        search: `?id=${dataItem.id}`,
      })
    }
    if (text === 'Delete') {
      setModalShow(true)
      setDeleteData(dataItem)
    }
  }
  const defaultItem = {text: 'Action'}

  const actionCellDD = (props: GridCellProps) => (
    <td className='k-command-cell'>
      <DropDownList
        style={{width: '110px'}}
        data={[
          {text: 'Edit', value: props},
          {text: 'Delete', value: props},
        ]}
        textField='text'
        defaultItem={defaultItem}
        value={defaultItem}
        onChange={commandChangeHandler}
      />
    </td>
  )

  const searchHandler = (result: string) => {
    advanceSearch.current = result;
    fetchData()
  }


  return (
    <React.Fragment>
      <div className='card card-custom'>
        <div className='card-body'>
          {modalPrint && (
            <React.Fragment>
              <PrintModal
                title={'Non-Conformance Report'}
                toggleDialog={() => setModalPrint(false)}
                onPrint={(data) => {
                  setPrintNonConformances(data)
                  printHandler()
                }}
              ></PrintModal>
              <div style={{display: 'none'}}>
                <NonConformancePrintContent
                  refs={componentRefDetails}
                  dataItem={printNonConformances}
                ></NonConformancePrintContent>
              </div>
            </React.Fragment>
          )}
          <DeleteNonConformanceModal
            show={modalShow}
            handleClose={closeModal}
            nonConformanceData={deleteData}
            deleteCallback={deleteHandler}
          />

          <div className='row'>
            <div className='d-flex actions'>
              <button
                className='btn btn-primary col-auto me-auto'
                onClick={() => {
                  setSelectedData(NON_CONFORMANCEFORM_DEFAULT)
                  history.push('/non-conformance/new')
                }}
              >
                <i className='bi bi-plus-lg'></i> New Non-Conformance
              </button>

              <button className='btn btn-primary col-auto' onClick={() => setModalPrint(true)}>
                {' '}
                Print Non-Conformance Form
              </button>
            </div>
          </div>

          {toast && <CustomAlert {...toast} />}
          <div className='App'>
            {isLoading && loadingPanel}
            <SearchWidget1 search={searchHandler} shouldClearSearch ={false}></SearchWidget1>
            <NonConformanceGrid
              actionHandler={commandChangeHandler}
              advanceSearch={advanceSearch.current}
              handleDoneReload={() => {}}
              requestReload={false}></NonConformanceGrid>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export {NonConformanceList}
