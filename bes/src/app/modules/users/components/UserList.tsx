import {SortDescriptor} from '@progress/kendo-data-query'
import {
  Grid,
  GridColumn as Column,
  GridCellProps,
  GridFilterChangeEvent,
  GridColumnResizeEvent,
} from '@progress/kendo-react-grid'
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {CustomAlert, IAlert} from '../../../shared/components/CustomAlert'
import {toObjectExpression} from '../../../shared/service/utils'
import {getUsers} from '../api'
import {Initial_GridSetup, USER_FORM_DEFAULT} from '../constant/user-default'
import {UserContext} from '../context/UserContext'
import {GridSetup, IUserData} from '../models/user-model'
import {DeleteUserModal} from './DeleteUserModal'
import {DropdownFilterCell} from './DropdownFilterCell'
import {GridFilterCellProps} from '@progress/kendo-react-grid'
import {DropDownList, DropDownListChangeEvent} from '@progress/kendo-react-dropdowns'
import {useEffectOnce} from 'react-use'
import {usePageData} from '../../../../_metronic/layout/core'
import { FIELD_USER_KEY, FIELD_USER_LIST } from '../constant/config-default'
import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from '../../../shared/service/grid-setup-utils'
import { GoToPageCell } from '../../../shared/components/kendo/inline/GoToPageCell'
import { MainRowRender } from '../../../shared/components/kendo/MainGridRenderer'

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

const UserList: React.FC = () => {
  const {setSelectedData, contextToaster, getAllRolesAsync} = useContext(UserContext)
  const [gridSetup, setGridSetup] = useState<GridSetup>(Initial_GridSetup)
  const [tableData, setTableData] = useState<IUserData[]>([])
  const [deleteData, setDeleteData] = useState<IUserData | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<IAlert | undefined>()
  const [totalRows, setTotalRows] = useState<number>(0)
  const [modalShow, setModalShow] = useState(false)
  const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_USER_KEY)

  const history = useHistory()
  const {currentUser} = usePageData()
  // setUser(true);
  var userRoles: any = currentUser.userRoles

  useEffect(() => {
    if (!userRoles.includes('Administrator')) {
      history.push('/dashboard')
    }
  }, [currentUser])
  
  useEffectOnce(() => {
    const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_USER_LIST)
    if (columnLocal) {
      setAutoColumns(columnLocal)
    }
  })

  const fetchData = useCallback(() => {
    setIsLoading(true)
    var {sort, skip, take} = gridSetup
    var data = toObjectExpression(gridSetup.filter)
    getUsers(skip, take, sort[0], data)
      .then((response: any) => {
        setTableData(response.data.items)
        setTotalRows(response.data.totalCount)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [gridSetup])
  const types: string[] = ['Active', 'Inactive']

  const CategoryFilterCell: any = (props: GridFilterCellProps) => (
    <DropdownFilterCell {...props} data={types} defaultItem={'All'} />
  )
  useEffectOnce(() => {
    getAllReferences()
  })

  const getAllReferences = async () => {
    await getAllRolesAsync()
  }

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

  const handleFilter = (filter: GridFilterChangeEvent) => {
    setGridSetup({
      ...gridSetup,
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

  const handleSortChange = (pageProps: any) => {
    setGridSetup({
      ...gridSetup,
      sort: pageProps.sort,
    })
  }

 
  const handleResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, autoColumns, GRID_WIDTH.GRID_USER_LIST);
  }

  // const actionCellDD = (props: GridCellProps) => (
  //   <td className='k-command-cell'>
  //     <DropDownList
  //       data={[
  //         {text: 'Edit', value: props},
  //         {text: 'Delete', value: props},
  //       ]}
  //       textField='text'
  //       defaultItem={defaultItem}
  //       value={defaultItem}
  //       onChange={commandChangeHandler}
  //     />
  //   </td>
  // )

  // const GoToPageRenderer = (props: GridCellProps) => {
  //   return (<GoToPageCell props={props} goToPage={(id: number) => {
  //     history.push({
  //       pathname: '/user/edit',
  //       search: `?id=${id}`,
  //     })
  //   }}/>)
  // }
  
  const RowRenderer = (tr: any, props: any) => (
    <MainRowRender originalProps={props} tr={tr} onDoubleClick={() => {
      history.push({
        pathname: '/user/edit',
        search: `?id=${props.dataItem.id}`,
      })
    }}></MainRowRender>
  )
  
  return (
    <React.Fragment>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <DeleteUserModal
              show={modalShow}
              handleClose={closeModal}
              userData={deleteData}
              deleteCallback={deleteHandler}
            />
            <div className='row justify-content-between align-items-center'>
              <div className='actions'>
                <button
                  className='btn btn-primary col-auto'
                  onClick={() => {
                    setSelectedData(USER_FORM_DEFAULT)
                    history.push('/user/new')
                  }}
                >
                  <i className='bi bi-plus-lg'></i> New User
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
              pageable={true}
              total={totalRows}
              onPageChange={handlePageChange}
              sortable={true}
              onSortChange={handleSortChange}
              filterable={true}
              onFilterChange={handleFilter}
              onColumnResize={handleResizeColumn}
              {...gridSetup}
              filterOperators={filterOperators}
              rowRender={RowRenderer}
            >
              {/* <Column 
                title=' '
                field={autoColumns[FIELD_USER_LIST.action].field}
                width={autoColumns[FIELD_USER_LIST.action].width}
                cell={actionCellDD}  
                filterable={false} /> */}
              <Column 
                field={autoColumns[FIELD_USER_LIST.email].field}
                width={autoColumns[FIELD_USER_LIST.email].width}
                title='Email'/>
              <Column 
                // cell={GoToPageRenderer}
                field={autoColumns[FIELD_USER_LIST.userName].field}
                width={autoColumns[FIELD_USER_LIST.userName].width}
                title='User Name'/>
              <Column 
                field={autoColumns[FIELD_USER_LIST.firstName].field}
                width={autoColumns[FIELD_USER_LIST.firstName].width}
                title='First Name' />
              <Column 
                 field={autoColumns[FIELD_USER_LIST.lastName].field}
                 width={autoColumns[FIELD_USER_LIST.lastName].width}
                 title='Last Name'/>
              <Column 
                 field={autoColumns[FIELD_USER_LIST.userRoleDisplay].field}
                 width={autoColumns[FIELD_USER_LIST.userRoleDisplay].width}
                title='Roles' />
              <Column 
                field={autoColumns[FIELD_USER_LIST.status].field}
                width={autoColumns[FIELD_USER_LIST.status].width}
                title='Status' filterCell={CategoryFilterCell} />
            </Grid>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export {UserList}
