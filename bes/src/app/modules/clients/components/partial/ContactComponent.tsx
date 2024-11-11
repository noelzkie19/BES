
import {
    Grid,
    GridCellProps,
    GridColumn as Column,
    GridColumnResizeEvent,
} from '@progress/kendo-react-grid'
import React, { useContext, useEffect, useState } from 'react'
import { Modal1 } from '../../../../../_metronic/partials/modals/Modal1';
import { ActionEnum, ActionOption } from '../../../../../_metronic/partials/widgets/grid/constant/ActionOption';
import { CLIENT_CONTACT_DEFAULT } from '../../constant/client-defaults';
import { IClientContact } from '../../models/client-model';

import { ContactForm } from '../modal/ContactForm';
import { GridActionIconCell } from '../../../../../_metronic/partials/widgets/grid/action/GridActionIconCell';
import { CellRender, RowRender } from '../../../../shared/components/kendo/renderer';
import { InCellPhoneCell } from '../../../../shared/components/kendo/incell/InCellPhoneCell';
import { AddButtonHeader } from '../../../../../_metronic/partials/content/button/kendo/AddButtonHeader';
import { ClientContext } from '../../context/ClientContext';
import { onKeyDownHandler } from '../../../../shared/service/utils';
import { FIELD_CONTACT_COLUMN_KEY } from '../../constant/tabkey-default';
import { InCellTextCell } from '../../../../shared/components/kendo/incell/InCellTextCell';
import { FIELD_CONTACT_KEY, FIELD_CONTACT_LIST } from '../../constant/config-defaults';
import { useEffectOnce } from 'react-use';
import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from '../../../../shared/service/grid-setup-utils';
import { InCellMobileCell } from '../../../../shared/components/kendo/incell/InCellMobileCell';

const EDIT_FIELD = 'inEdit'
const ContactComponent: React.FC<any> = (props: any) => {

    const { isCanEdit } = useContext(ClientContext)
    
    const [addresses, setAddresses] = useState<IClientContact[]>(props.operations)
    const [isShowModal, setIsShowModal] = useState<boolean>(false)
    const [selectedContact, setSelectedContact] = useState<IClientContact>()
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isShowDeletedModal, setIsShowDeletedModal] = useState<boolean>(false)
    const [isTabKey, setIsTabKey] = useState<boolean>(false)
    const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_CONTACT_KEY)

    useEffectOnce(() => {
        const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_CLIENT_CONTACT)
        if (columnLocal) {
          setAutoColumns(columnLocal)
        }
      })
      
    useEffect(() => {
        if (props.clientContacts) {
            setAddresses(props.clientContacts)
        }
    }, [props.clientContacts])

    const addNewAddress = () => {
        if (!isCanEdit) return;

        props.addClientContact({...CLIENT_CONTACT_DEFAULT})
        setSelectedIndex(0)
        setIsEdit(false)
    }

    const onSuccessHandler = (values: IClientContact, dataIndex: number) => {
        setIsShowModal(false)
        if ((values.refId && (values.refId > 0)) || isEdit) { 
            props.updateClientContact(dataIndex, {...values})
        } else
            props.addClientContact(values)
    }

    // const ActionCell = (props: GridCellProps) => {
    //    return (<GridActionDropdownCell actions={Address_Action} changeHandler={actionHandler} gridCellProps={props} />)
    // }

    const actionHandler = (event: any, dataItem: any, dataIndex: number) => {
        if (!props.isCanEdit) return;
        setSelectedIndex(dataIndex)
        setSelectedContact(dataItem)
        switch(event) {
          case ActionEnum.Edit: 
            setIsShowModal(true)
            setIsEdit(true)
            break;
          case ActionEnum.Delete: 
            setIsShowDeletedModal(true)
            break;
        }
      }

    const proceedHandler = () => {
        setIsShowDeletedModal(false)
        if (selectedContact?.refId && selectedContact?.refId > 0) {
            props.updateClientContact(selectedIndex, { ...selectedContact, isDeleted: true })
        } else {
            props.removeClientContact(selectedIndex, { ...selectedContact, isDeleted: true })
        }
    }

    
    const ActionCell = (props: GridCellProps) => (
        <GridActionIconCell actions={[
            ActionOption.Delete
        ]}
        gridCellProps={props}
        changeHandler={actionHandler} />
    )

    
    const enterEdit = (_: any, field: any, dataIndex: any) => {
        if (!props.isCanEdit) return;
        var newData: any = []
        // if (!props.isCanEdit) return;
        addresses.forEach((item, index) => {
            newData.push({
                ...item,
                [EDIT_FIELD]: dataIndex === index ? field : undefined,
               isEdit: dataIndex === index,
            })
       })
       props.replaceContacts(newData)
    }

    const exitEdit = () => {
        if (isTabKey) {
            setIsTabKey(false)
            return
        }

        addresses.forEach((item, index) => {
            var newData = {
                ...item,
                [EDIT_FIELD]: undefined,
                isEdit: false,
            }
            props.updateClientContact(index, newData)
        })
    }

    const itemChange = (event: any) => {
        if (isTabKey) {
            setIsTabKey(true)
            return
        }

        let field = event.field || ''
        event.dataItem[field] = event.value
        const idx = addresses.findIndex((po) => po.isEdit)

        if (field === 'default') {
            addresses.forEach((data, idx) => {
                addresses[idx] = data;
            })
            props.resetAddress(addresses)
        } else {
            props.updateClientContact(idx, event.dataItem)
            // preload operation for exit edit
            addresses[idx] = event.dataItem
            setAddresses(addresses)
        }
    }

    const addButtonHeader = (props: any) => {
        return (
         <AddButtonHeader title={props.title} clickHandler={addNewAddress} isCanEdit={isCanEdit}></AddButtonHeader>
        );
    };

    const onKeyDown = (event: any) => {
        var newData: any = []
      
        const { nextField, dataIndex} = 
          onKeyDownHandler(event, FIELD_CONTACT_COLUMN_KEY)
      
          addresses.forEach((item: any, index) => {
              newData.push({
                ...item,
                [event.field]: event.dataIndex === index ? event.value: item[event.field],
                [EDIT_FIELD]: dataIndex === index ? nextField : undefined,
                isEdit: dataIndex === index,
              })
        })
        props.replaceContacts(newData)
        setIsTabKey(true)
      };
      
    const customRowRender = (tr: any, props: any) => (
        <RowRender originalProps={props} tr={tr} exitEdit={exitEdit} editField={EDIT_FIELD} />
    )

    const customCellRender = (td: any, cellProps: GridCellProps) => (
        <CellRender
            originalProps={cellProps}
            td={td}
            enterEdit={enterEdit}
            editField={EDIT_FIELD}
            exitEdit={exitEdit}
        />
    )

    const phoneCell = (cellProps: GridCellProps) => (
        <InCellPhoneCell
            props={cellProps}
            enterEdit={enterEdit}
            onChange={itemChange}
            exitEdit={exitEdit}
            onKeyDown={onKeyDown}
            tabIndex={1}
        />
    )

    const mobileCell = (cellProps: GridCellProps) => (
        <InCellMobileCell
            props={cellProps}
            enterEdit={enterEdit}
            onChange={itemChange}
            exitEdit={exitEdit}
            onKeyDown={onKeyDown}
            tabIndex={1}
        />
    )

    const textCell = (cellProps: GridCellProps) => (
        <InCellTextCell
          props={cellProps}
          enterEdit={enterEdit}
          onChange={itemChange}
          exitEdit={exitEdit}
          onKeyDown={onKeyDown}
          tabIndex={1}
        />
    )

    const handleResizeColumn = (props: GridColumnResizeEvent) => {
        saveResizeColumn(props, autoColumns, GRID_WIDTH.GRID_CLIENT_CONTACT);
    }

    return (
        <React.Fragment>
        <Modal1 show={isShowDeletedModal}
            title={`Delete Contact in row ${selectedIndex + 1}.`}
            message={'You are deleting an Contact, Continue?'}
            handleClose={() => setIsShowDeletedModal(false)}
            proceed={proceedHandler}/>

        {isShowModal && (
            <ContactForm 
                handleClose={() => setIsShowModal(false)} 
                contactValue={selectedContact}
                onSuccess={onSuccessHandler}
                dataIndex={selectedIndex}/>
        )}
        <Grid
            className='mt-5'
            resizable={true}
            reorderable={true}
            data={(addresses || []).filter((ops) => !ops.isDeleted)}
            cellRender={customCellRender}
            rowRender={customRowRender}
            onItemChange={itemChange}
            editField={EDIT_FIELD}
            style={{ height: '200px' }}
            onColumnResize={handleResizeColumn}
        >
            <Column 
                title=' '
                field={autoColumns[FIELD_CONTACT_LIST.actions].field}
                width={autoColumns[FIELD_CONTACT_LIST.actions].width}
                cell={ActionCell} 
                editable={false} 
                headerCell={addButtonHeader}/>
            <Column 
                field={autoColumns[FIELD_CONTACT_LIST.contactName].field}
                width={autoColumns[FIELD_CONTACT_LIST.contactName].width}
                title='Name' 
                cell={textCell}/>
            <Column 
                field={autoColumns[FIELD_CONTACT_LIST.position].field}
                width={autoColumns[FIELD_CONTACT_LIST.position].width}
                title='Position' 
                cell={textCell}/>
            <Column 
                field={autoColumns[FIELD_CONTACT_LIST.phone].field}
                width={autoColumns[FIELD_CONTACT_LIST.phone].width}
                title='Phone' 
                cell={phoneCell}/>
            <Column 
                field={autoColumns[FIELD_CONTACT_LIST.mobile].field}
                width={autoColumns[FIELD_CONTACT_LIST.mobile].width}
                title='Mobile' 
                cell={mobileCell}/>
            <Column 
                field={autoColumns[FIELD_CONTACT_LIST.email].field}
                width={autoColumns[FIELD_CONTACT_LIST.email].width}
                title='Email' 
                cell={textCell}/>
            <Column 
                field={autoColumns[FIELD_CONTACT_LIST.notes].field}
                width={autoColumns[FIELD_CONTACT_LIST.notes].width}
                title='Notes' 
                cell={textCell}/>
        </Grid>

        </React.Fragment>
    )
}

export { ContactComponent }