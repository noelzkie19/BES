import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { IUser } from '../users/models/user-model'
import { getAllUsers, getNonConformanceByid } from './api'
import { NonConformanceForm } from './components/NonConformanceForm'
import { NON_CONFORMANCEFORM_DEFAULT } from './constant/nonconformance-default'
import { INoncoformanceData } from './models/nonconformance-model'
import {useForm} from 'react-hook-form'
import { getAdminUsers } from '../users/api'

const widgetsBreadCrumbs: Array<PageLink> = [
    {
      title: 'Non Conformance',
      path: '/non-conformance/list',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]
  
  const EditNonConformancePage: React.FC = () => {
    const urlParam = new URLSearchParams(useLocation().search)
    const idquery: string | null = urlParam.get('id')
    const redirect: string | null = urlParam.get('redirect')
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isCanEdit, setIsCanEdit] = useState<boolean>(true);
    const [selectedData, setSelectedData] = useState<INoncoformanceData>(NON_CONFORMANCEFORM_DEFAULT)
    const [users, setUsers] = useState<IUser[]>([])
    const [adminusers, setAdminUsers] = useState<IUser[]>([])
    const history = useHistory()

    const { register, setValue } = useForm({
      defaultValues: selectedData || {
        ...NON_CONFORMANCEFORM_DEFAULT
      }
    });    
  
    useEffectOnce(() => {
      fetchNonConformanceByid();

    })
  
    const fetchNonConformanceByid = async () => {
      setIsLoading(true)
      const [data]: any = await getNonConformanceByid(idquery)
      const users: any = await getAllUsers();
      setUsers(users.data)

      const admin : any = await getAdminUsers();
      setAdminUsers(admin.data)
      
      if (data) {
        setSelectedData(data.data)
        setIsLoading(false)
      } else {
        history.push('/non-conformance/list')
        setIsLoading(false)
      }
      setIsCanEdit(redirect === null)
    }
  
  
    return (
      <>
        <div className='card card-custom'>
          <div className='card-body'>
            <div className='container-fluid px-0 mb-10'>
              <div className='row justify-content-between align-items-center'>
                {/* <h2 className='col'>{isCanEdit ? 'Update' : 'View' }Non-Conformance</h2> */}
                {isCanEdit ? (
                   <PageTitle breadcrumbs={widgetsBreadCrumbs}>Update Non-Conformance</PageTitle>
                ) : (
                    <PageTitle breadcrumbs={widgetsBreadCrumbs}>Non-Conformance</PageTitle>
                )}
                {!isLoading && (
                  <NonConformanceForm nonConformanceData={selectedData} isCanEdit={isCanEdit} isFieldDisabled = {true} userLists = {users} adminUserLists={adminusers}/>
                  ) 
                }
                
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  export default EditNonConformancePage
  