import React, {useContext, useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {CustomAlert, IAlert} from '../../../shared/components/CustomAlert'
import {ClientContext} from '../context/ClientContext'
import {CLIENT_FORM_DEFAULT} from '../constant/client-defaults'
import {DeleteClientModal} from './DeleteClientModal'

import {IClientData} from '../models/client-model'
import { ActionEnum } from '../../../../_metronic/partials/widgets/grid/constant/ActionOption'
import { SearchWidget1 } from '../../../../_metronic/partials/widgets/search/SearchWidget1'
import { ClientListGrid } from './ClientListGrid'

const ClientList: React.FC = () => {

  const { 
    setSelectedData, 
    contextToaster,
    setIsCanEdit
   } = useContext(ClientContext)

  const [deleteData, setDeleteData] = useState<IClientData | undefined>()
  const [toast, setToast] = useState<IAlert | undefined>()
  const [modalShow, setModalShow] = useState(false)
  const advanceSearch = useRef('');
  const [requestReload, setRequestReload] = useState<boolean>(false)
  const history = useHistory()

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
    setRequestReload(true)
  }

  const actionHandler = (event: any, dataItem: any, _: number) => {
    switch(event.value.value) {
      case ActionEnum.Edit: 
        setIsCanEdit(true)
        setSelectedData(dataItem)
        history.push({
          pathname: '/client/edit',
          search: `?id=${dataItem.id}`,
        })
        break;
      case ActionEnum.View: 
        setIsCanEdit(false)
        setSelectedData(dataItem)
        history.push({
          pathname: '/client/edit',
          search: `?id=${dataItem.id}`,
        })
        break;
      case ActionEnum.Delete: 
        setModalShow(true)
        setDeleteData(dataItem)
        break;
    }
  }

  const searchHandler = (result: string) => {
    advanceSearch.current = result;
    setRequestReload(true)
  }

  return (
    <React.Fragment>
      <div className='card card-custom'>
        <div className='card-body'>
            <DeleteClientModal
              show={modalShow}
              handleClose={closeModal}
              clientData={deleteData}
              deleteCallback={deleteHandler}
            />
            
          <div className='row justify-content-between align-items-center'>
            <div className='actions'>
              <button
                className='btn btn-primary col-auto'
                onClick={() => {
                  setIsCanEdit(true)
                  setSelectedData(CLIENT_FORM_DEFAULT)
                  history.push('/client/new')
                }}
              >
                <i className='bi bi-plus-lg'></i> New Client
              </button>
            </div>
          </div>
          {toast && <CustomAlert {...toast} />}
          <div className='App'>
            <SearchWidget1 search={searchHandler} shouldClearSearch ={false}></SearchWidget1>
            <ClientListGrid  actionHandler={actionHandler}
              advanceSearch={advanceSearch.current}
              handleDoneReload={() => setRequestReload(false)}
              requestReload={requestReload}></ClientListGrid>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export {ClientList}
