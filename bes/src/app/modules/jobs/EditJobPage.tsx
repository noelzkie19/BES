import React, {useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { ActionEnum } from '../../../_metronic/partials/widgets/grid/constant/ActionOption'
import { getJobByid } from './api'
import { JobForm } from './components/JobForm'
import { JOB_FORM_DEFAULT } from './constant/job-default'
import { IJobData } from './models/job-model'
const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Job',
    path: '/job/list',
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

const EditJobPage: React.FC = () => {
  const urlParam = new URLSearchParams(useLocation().search)
  const idquery: string | null = urlParam.get('id')
  const redirect: string | null = urlParam.get('redirect')
  const view: string | null = urlParam.get('view')
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCanEdit] = useState<boolean>(true);
  const [selectedData, setSelectedData] = useState<IJobData>(JOB_FORM_DEFAULT)
  const history = useHistory()

  useEffectOnce(() => {
    fetchJobByid();
  })

  const fetchJobByid = async () => {
    setIsLoading(true)
    const [data]: any = await getJobByid(idquery)
    
    if (data) {
      setSelectedData(data.data)
      setIsLoading(false)
    } else {
      history.push('/job/list')
      setIsLoading(false)
    }
    // setIsCanEdit(view === null)
    // setIsCanEdit(redirect === null || view === null)
  }


  return (
    <>
      <div className='card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <div className='row justify-content-between align-items-center'>
              {/* <h2 className='col'>{isCanEdit ? 'Update' : 'View' }  Job</h2> */}
              {isCanEdit ? (
                 <PageTitle breadcrumbs={widgetsBreadCrumbs}>Update Job</PageTitle>
              ) : (
                  <PageTitle breadcrumbs={widgetsBreadCrumbs}>Job</PageTitle>
              )}
              {!isLoading && (
                <JobForm jobData={selectedData} isCanEdit={isCanEdit}/>
                ) 
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditJobPage
