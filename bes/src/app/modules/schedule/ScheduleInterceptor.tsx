import React, { useEffect } from 'react'
import {  useHistory } from 'react-router-dom'
import {  usePageData } from '../../../_metronic/layout/core'


const ScheduleInterceptor: React.FC = () => {
    const { currentUser } = usePageData()
    const history = useHistory()
    
    useEffect(() => {
        if (currentUser) {
            const idx = (currentUser.userRoles || []).findIndex(x => x === 'Administrator')
            if (idx < 0) {
                history.push('/schedule/staff')
            }  else {
                history.push('/schedule/list')
            }
        }
    }, [currentUser, history])

    return (
       <React.Fragment></React.Fragment>
    )
}

export default ScheduleInterceptor
