import {useEffectOnce} from 'react-use'
import {DropDownList, DropDownListChangeEvent} from '@progress/kendo-react-dropdowns'
import {
  Grid,
  GridCellProps,
  GridColumn,
  GridFilterCellProps,
  GridFilterChangeEvent,
} from '@progress/kendo-react-grid'
import React, {useContext, useEffect, useState, useCallback} from 'react'
import {useHistory} from 'react-router-dom'
import {getResources} from '../api'
import {GridSetup, Resource} from '../models/resource-model'
import {toLinQExpression} from '../../../shared/service/utils'
import {FILTER_DEFAULT} from '../models/config-model'
import {Initial_GridSetup} from '../constant/config-defaults'
import {ResourceContext} from '../context/ResourceContext'
import { transformResourceFilter, transformResourceSort } from '../transformer/resource-transformer'
import { DropdownFilterCell } from './DropdownFilterCell'
import { DeleteResourceModal } from './DeleteResourceModal'
import { CustomAlert, IAlert } from '../../../shared/components/CustomAlert'
import { MainRowRender } from '../../../shared/components/kendo/MainGridRenderer'

const BoolenCell = (props: any) => {
  return <td>{props.dataItem[props.field] ? '✅' : '❌'}</td>
}
const loadingPanel = (
  <div className='k-loading-mask'>
    <span className='k-loading-text'>Loading</span>
    <div className='k-loading-image'></div>
    <div className='k-loading-color'></div>
  </div>
)
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
const ResourceList: React.FC = () => {
  const history = useHistory()
  const {contextToaster, setSelectedData} = useContext(ResourceContext)
  const [gridSetup, setGridSetup] = useState<GridSetup>(Initial_GridSetup)
  const [tableData, setTableData] = useState<Resource[]>([])
  const [totalRows, setTotalRows] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [deleteData, setDeleteData] = useState<Resource | undefined>()
  const [toast, setToast] = useState<IAlert | undefined>()

  const fetchData = useCallback(() => {
    setIsLoading(true)
    var { sort, skip, take } = gridSetup
    var filter = transformResourceFilter(gridSetup.filter);
    var data = toLinQExpression(filter);
    const sortField = transformResourceSort(sort);
    getResources(skip, take, sortField, data || FILTER_DEFAULT)
      .then((response: any) => {
        setTableData(response.data.items)
        setTotalRows(response.data.totalCount)
        setIsLoading(false)

      })
      .catch(() => { setIsLoading(false)})
  }, [gridSetup])

  useEffect(() => {
    fetchData()
  }, [gridSetup, fetchData])
  useEffectOnce(() => {
    fetchData()
  })

  useEffect(() => {
    if (contextToaster?.message != null && contextToaster?.message !== '') {
      setToast(contextToaster)
      setTimeout(() => setToast(undefined), 1000)
    }
  }, [contextToaster])
  
  const handleFilter = (filter: GridFilterChangeEvent) => {
    setGridSetup({
      ...Initial_GridSetup,
      filter: filter.filter,
    })
  }

  const handlePageChange = (pageProps: any) => {
    setGridSetup({
      ...gridSetup,
      skip: pageProps.page.skip,
      take: pageProps.page.take,
    })
  }

  //--------------------------

  const commandChangeHandler = (event: DropDownListChangeEvent) => {
    const {
      text,
      value: {dataItem},
    } = event.target.value

    if (text === 'Edit') {
      setSelectedData(dataItem)
      history.push('/resource/edit')
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
  const handleSortChange = (pageProps: any) => {
    setGridSetup({
      ...gridSetup,
      sort: pageProps.sort,
    })
  }
  const closeModal = () => {
    setModalShow(false)
  }
  const types: string[] = ['Active', 'Inactive']

  const CategoryFilterCell: any = (props: GridFilterCellProps) => (
    <DropdownFilterCell {...props} data={types} defaultItem={'All'} />
  )

  const deleteHandler = () => {
    setModalShow(false)
    fetchData()
  }

  const RowRenderer = (tr: any, props: any) => (
    <MainRowRender originalProps={props} tr={tr} onDoubleClick={() => {
      history.push({
        pathname: '/resource/edit',
        search: `?id=${props.dataItem.id}`,
      })
    }}></MainRowRender>
  )
  
  
  return (
    <React.Fragment>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
          <DeleteResourceModal
              show={modalShow}
              handleClose={closeModal}
              resourceData={deleteData}
              deleteCallback={deleteHandler}
            />
            <div className='row justify-content-between align-items-center'>
              <div className='actions'>
                <button
                  className='btn btn-primary col-auto'
                  onClick={() => {
                    history.push('/resource/new')
                  }}
                >
                  <i className='bi bi-plus-lg'></i> New Resource
                </button>
              </div>
            </div>
          </div>
          {toast && <CustomAlert {...toast} />}
          <div className='App'>
           {isLoading && loadingPanel}
            <Grid
              resizable={true}
              reorderable={true}
              data={tableData}
              // pageable={true}
              total={totalRows}
              onPageChange={handlePageChange}
              sortable={true}
              onSortChange={handleSortChange}
              filterable={true}
              onFilterChange={handleFilter}
              {...gridSetup}
              filterOperators={filterOperators}
              rowRender={RowRenderer}
            >
              {/* <GridColumn cell={actionCellDD} width='160px' filterable={false} /> */}
              <GridColumn field='name' title='Name' />
              <GridColumn field='description' title='Description' />
              <GridColumn field='hourlyRate' title='Hourly Rate' />
              <GridColumn cell={BoolenCell} field='isActive' title='Status' filterCell={CategoryFilterCell} />
            </Grid>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export {ResourceList}
