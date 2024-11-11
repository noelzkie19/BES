import { Grid, 
         GridColumn as Column,
         GridCellProps, 
         GridFilterChangeEvent } from "@progress/kendo-react-grid"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { usePageData } from "../../../../_metronic/layout/core"
import { GridActionDropdownCell } from "../../../../_metronic/partials/widgets/grid/action/GridActionDropdownCell"
import { ActionEnum } from "../../../../_metronic/partials/widgets/grid/constant/ActionOption"
import { CustomAlert, IAlert } from "../../../shared/components/CustomAlert"
import { toObjectExpression } from "../../../shared/service/utils"
import { getRoles } from "../api"
import { Role_Action } from "../constant/config-constant"
import { Initial_GridSetup, ROLE_FORM_DEFAULT } from "../constant/role-default"
import { RoleContext } from "../context/RoleContext"
import { GridSetup, IRole } from "../models/role-model"
import { DeleteRoleModal } from "./DeleteRoleModal"
import { GoToPageCell } from "../../../shared/components/kendo/inline/GoToPageCell"

const loadingPanel = (
    <div className="k-loading-mask">
      <span className="k-loading-text">Loading</span>
      <div className="k-loading-image"></div>
      <div className="k-loading-color"></div>
    </div>
  )
  
  
  const filterOperators = {
    text: [
      {
        text: "grid.filterContainsOperator",
        operator: "contains",
      },
    ]
  }
  
  const RoleList: React.FC = () => {
    const {setSelectedData, contextToaster} = useContext(RoleContext)
    const [gridSetup, setGridSetup] = useState<GridSetup>(Initial_GridSetup)
    const [tableData, setTableData] = useState<IRole[]>([])
    const [deleteData, setDeleteData] = useState<IRole | undefined>()
    const [isLoading, setIsLoading] = useState(false)
    const [toast, setToast] = useState<IAlert | undefined>()
    const [modalShow, setModalShow] = useState(false)
    const [totalRows, setTotalRows] = useState<number>(0)
  
    const history = useHistory()
    const { currentUser } = usePageData();
    
    // setUser(true);
    var userRoles: any = currentUser.userRoles;
    useEffect(() => {
      if (!userRoles.includes("Administrator")) {
        history.push('/dashboard')
      }
  }, [currentUser])
    const fetchData = useCallback(() => {
      setIsLoading(true)
      var { skip,take,sort } = gridSetup;
      var data = toObjectExpression(gridSetup.filter);
      setIsLoading(false)
      getRoles(skip, take,sort[0], data).then((response: any) => {
        setTableData(response.data.items)
        setTotalRows(response.data.totalCount)
        setIsLoading(false)
      }).catch(() => {
        setIsLoading(false)
      })
    }, [gridSetup])
  
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
        filter: filter.filter
      })
    }
  
    const handleSortChange = (pageProps: any) => {
      setGridSetup({
        ...gridSetup,
        sort: pageProps.sort
      })
    }
    const handlePageChange = (pageProps: any) => {
      setGridSetup({
        ...gridSetup,
        skip: pageProps.page.skip,
        take: pageProps.page.take,
      })
    }
    
  const actionHandler = (event: any, dataItem: any, dataIndex: number) => {
      switch(event.value.value) {
        case ActionEnum.Edit: 
          setSelectedData(dataItem)
          history.push('/role/edit')
        break;
      case ActionEnum.Delete: 
          setModalShow(true)
          setDeleteData(dataItem)
        break;
    }
  }

  const GoToPageRenderer = (props: GridCellProps) => {
    return (<GoToPageCell props={props} goToPage={(id: number) => {
      history.push({
        pathname: '/role/edit',
        search: `?id=${id}`,
      })
    }}/>)
  }
  

    const actionCell = (props: GridCellProps) => {
      return (<GridActionDropdownCell actions={Role_Action} changeHandler={actionHandler} gridCellProps={props} />)
    }
  
  
    return (
      <React.Fragment>
        <div className='card card-custom'>
          <div className='card-body'>
            <div className='container-fluid px-0 mb-10'>
              <DeleteRoleModal
                show={modalShow}
                handleClose={closeModal}
                roleData={deleteData}
                deleteCallback={deleteHandler}
              />
              <div className='row justify-content-between align-items-center'>
                <div className='actions'>
                  <button className='btn btn-primary col-auto'
                    onClick={() => {
                      setSelectedData(ROLE_FORM_DEFAULT)
                      history.push('/role/new')
                    }}>
                    <i className='bi bi-plus-lg'></i> New Role
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
                sortable={true}
                onSortChange={handleSortChange}
                filterable={true}
                onFilterChange={handleFilter}
                // pageable={true}
                total={totalRows}
                onPageChange={handlePageChange}
                {...gridSetup }
                filterOperators={filterOperators}>
                  {/* <Column cell={actionCell}
                    width={150} 
                    filterable={false}/> */}
                  <Column field='name' title='Role' cell={GoToPageRenderer} />
              </Grid>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
  
  export {RoleList}