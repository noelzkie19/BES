import React, {useContext, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {useEffectOnce} from 'react-use'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ActionEnum} from '../../../_metronic/partials/widgets/grid/constant/ActionOption'
import {getJobByid} from './api'
import {JobForm} from './components/JobForm'
import {JobContext} from './context/JobContext'
import {transformCopyJob} from './transformers/job-transformer'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Jobs',
    path: '/job',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'New',
    path: '/job/new',
    isSeparator: true,
    isActive: false,
  },
]

const CreateJobPage: React.FC = () => {
  const search = useLocation().search
  const copy: string | null = new URLSearchParams(search).get('copy')
  const action: string | null = new URLSearchParams(search).get('action')
  const idquery: string | null = new URLSearchParams(search).get('jobidsource')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const {selectedData, setSelectedData} = useContext(JobContext)

  useEffectOnce(() => {
    fetchJobByid()
  })

  const fetchJobByid = async () => {
    setIsLoading(true)
    if (action && action === ActionEnum.CopyJob) {
      const [data]: any = await getJobByid(idquery)
      if (data) {
        let params = transformCopyJob(data.data)
        setSelectedData(params)
      }
      setIsLoading(false)
    } else setIsLoading(false)
  }

  return (
    <>
      <div className='card-custom h-100'>
        <div className='card-body h-100'>
          <div className='container-fluid px-0 mb-10 h-100'>
            <div className='row justify-content-between align-items-center h-100'>
              {/* <PageTitle breadcrumbs={widgetsBreadCrumbs}>New Job</PageTitle> */}
              {!isLoading && <JobForm jobData={copy ? selectedData : null} isCanEdit={true} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateJobPage
