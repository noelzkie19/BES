
import {
    Grid,
    GridCellProps,
    GridColumn as Column,
    GridColumnResizeEvent,
} from '@progress/kendo-react-grid'
import { Checkbox, CheckboxChangeEvent } from '@progress/kendo-react-inputs';
import React, { useContext, useEffect, useState } from 'react'
import { Modal1 } from '../../../../../_metronic/partials/modals/Modal1';
import { GridActionDropdownCell } from '../../../../../_metronic/partials/widgets/grid/action/GridActionDropdownCell';
import { ActionEnum, ActionOption } from '../../../../../_metronic/partials/widgets/grid/constant/ActionOption';
import { BooleanCell } from '../../../../shared/components/kendo/format/BooleanCell';
import { transformStatesOption } from '../../../jobs/transformers/job-transformer';
import { Address_Action, FIELD_ADDRESS_KEY, FIELD_ADDRESS_LIST, Supplier_Action } from '../../constant/config-defaults';
import { SUPPLIER_ADDRESS_DEFAULT } from '../../constant/supplier-defaults';
import { SupplierContext } from '../../context/SupplierContext';
import { ISupplierAddress } from '../../models/supplier-model';
import { AddressForm } from '../modal/AddressForm';
import { GridActionIconCell } from '../../../../../_metronic/partials/widgets/grid/action/GridActionIconCell';
import { CellRender, RowRender } from '../../../../shared/components/kendo/renderer';
import { InCellSelect } from '../../../../shared/components/kendo/incell/InCellSelect';
import { FIELD_ADDRESS_COLUMN_KEY } from '../../constant/tab-key';
import { onKeyDownHandler } from '../../../../shared/service/utils';
import { InCellTextCell } from '../../../../shared/components/kendo/incell/InCellTextCell';
import { AddButtonHeader } from '../../../../../_metronic/partials/content/button/kendo/AddButtonHeader';
import { useEffectOnce } from 'react-use';
import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from '../../../../shared/service/grid-setup-utils';

const EDIT_FIELD = 'inEdit'
const AddressComponent: React.FC<any> = (props: any) => {

    const { isCanEdit } = useContext(SupplierContext)
    
    const [addresses, setAddresses] = useState<ISupplierAddress[]>(props.operations)
    const [isShowModal, setIsShowModal] = useState<boolean>(false)
    const [selectedAddress, setSelectedAddress] = useState<ISupplierAddress>()
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isShowDeletedModal, setIsShowDeletedModal] = useState<boolean>(false)
    const [isTabKey, setIsTabKey] = useState<boolean>(false)
    const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_ADDRESS_KEY)
    
    useEffect(() => {
        if (props.supplierAddresses) {
            setAddresses(props.supplierAddresses)
        }
    }, [props.supplierAddresses])

    useEffectOnce(() => {
        const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_SUPPLIER_ADDRESS)
        if (columnLocal) {
            setAutoColumns(columnLocal)
        }
    })

    const changeDefaultHandler = (event: CheckboxChangeEvent, dataIndex: number) => {
        addresses.map((address, index) => {
            address.default = (index === dataIndex) ? event.value : false;
        })
        props.resetAddress(addresses)
    }

    const addNewAddress = () => {
        props.addAddress({...SUPPLIER_ADDRESS_DEFAULT})
        setSelectedIndex(0)
        setIsEdit(false)

        // setIsShowModal(true)
        // setIsEdit(false)
        // setSelectedAddress({...SUPPLIER_ADDRESS_DEFAULT})
    }

    const onSuccessHandler = (values: ISupplierAddress, dataIndex: number) => {
        setIsShowModal(false)
        if ((values.refId && (values.refId > 0)) || isEdit) { 
            props.updateAddress(dataIndex, {...values})
        } else
            props.addAddress(values)
    }

    // const ActionCell = (props: GridCellProps) => {
    //    return (<GridActionDropdownCell actions={Address_Action} changeHandler={actionHandler} gridCellProps={props} isCanEdit={isCanEdit}/>)
    // }

    const actionHandler = (event: any, dataItem: any, dataIndex: number) => {
        if (!isCanEdit) return;
        setSelectedIndex(dataIndex)
        setSelectedAddress(dataItem)
        switch(event.value.value) {
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
        if (selectedAddress?.refId && selectedAddress?.refId > 0) {
            props.updateAddress(selectedIndex, { ...selectedAddress, isDeleted: true })
        } else {
            props.removeAddAddress(selectedIndex)
        }
    }
    const actionCell = (props: GridCellProps) => (
        <GridActionIconCell actions={[
            ActionOption.Delete
        ]}
        gridCellProps={props}
        changeHandler={actionHandler} />
    )

    
    const enterEdit = (_: any, field: any, dataIndex: any) => {
        if (!isCanEdit) return;
        addresses.forEach((item, index) => {
            var newData = {
                ...item,
                [EDIT_FIELD]: dataIndex === index ? field : undefined,
                isEdit: dataIndex === index,
            }
            props.updateAddress(index, newData)
        })
    }

    const exitEdit = () => {
        if (isTabKey) {
            setIsTabKey(false)
            return;
        }
        addresses.forEach((item, index) => {
            var newData = {
                ...item,
                [EDIT_FIELD]: undefined,
                isEdit: false,
            }
            props.updateAddress(index, newData)
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
                data.default = event.dataIndex === idx
                addresses[idx] = data;
            })
            props.resetAddress(addresses)
        } else {
            props.updateAddress(idx, event.dataItem)
            // preload operation for exit edit
            addresses[idx] = event.dataItem
            setAddresses(addresses)
        }
    }

    const onKeyDown = (event: any) => {
        var newData: any = []
      
        const { nextField, dataIndex} = 
          onKeyDownHandler(event, FIELD_ADDRESS_COLUMN_KEY)
      
          addresses.forEach((item: any, index) => {
              newData.push({
                ...item,
                [event.field]: event.dataIndex === index ? event.value: item[event.field],
                [EDIT_FIELD]: dataIndex === index ? nextField : undefined,
                isEdit: dataIndex === index,
              })
        })
        props.replaceAddress(newData)
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
            tabIndex={0}
        />
    )

    const booleanFormatCell = (cellProps: GridCellProps) => (
        <td className='k-command-cell' tabIndex={0}>
            <Checkbox 
                value={cellProps.dataItem.default} 
                onKeyDown={onKeyDown}
                onChange={(event) => changeDefaultHandler(event, cellProps.dataIndex)} />
        </td>
    )

    
    const selectStatesFormatCell = (cellProps: GridCellProps) => (
        <InCellSelect
            props={cellProps}
            enterEdit={enterEdit}
            onChange={itemChange}
            exitEdit={exitEdit}
            data={transformStatesOption(props.optionStates)}
            onKeyDown={onKeyDown}
            tabIndex={0}
        />
    )


    const textCell = (cellProps: GridCellProps) => (
        <InCellTextCell
          props={cellProps}
          enterEdit={enterEdit}
          onChange={itemChange}
          exitEdit={exitEdit}
          onKeyDown={onKeyDown}
          tabIndex={0}
        />
    )

    
    const addButtonHeader = (props: any) => {
        return (
         <AddButtonHeader title={props.title} clickHandler={addNewAddress} isCanEdit={isCanEdit}></AddButtonHeader>
        );
    };

    
    const handleResizeColumn = (props: GridColumnResizeEvent) => {
        saveResizeColumn(props, autoColumns, GRID_WIDTH.GRID_SUPPLIER_ADDRESS);
      }
      
    return (
        <React.Fragment>
        <Modal1 show={isShowDeletedModal}
            title={`Delete Address in row ${selectedIndex + 1}.`}
            message={'You are deleting an Address, Continue?'}
            handleClose={() => setIsShowDeletedModal(false)}
            proceed={proceedHandler}/>
        {isShowModal && (
            <AddressForm 
                handleClose={() => setIsShowModal(false)} 
                addressValue={selectedAddress}
                optionStates={transformStatesOption(props.optionStates)}
                onSuccess={onSuccessHandler}
                dataIndex={selectedIndex}/>
        )}
        {/* <button
            type='button'
            className='btn btn-primary col-auto me-auto'
            onClick={addNewAddress}
            disabled={!isCanEdit}
            
            >
            New Address
            </button> */}
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
                    field={autoColumns[FIELD_ADDRESS_LIST.actions].field}
                    width={autoColumns[FIELD_ADDRESS_LIST.actions].width}
                    cell={actionCell} 
                    editable={false} 
                    headerCell={addButtonHeader}/>
                <Column
                    title='Default'
                    field={autoColumns[FIELD_ADDRESS_LIST.default].field}
                    width={autoColumns[FIELD_ADDRESS_LIST.default].width}
                    cell={booleanFormatCell}
                />
                <Column 
                    field={autoColumns[FIELD_ADDRESS_LIST.street].field}
                    width={autoColumns[FIELD_ADDRESS_LIST.street].width}
                    title='Street Address' 
                    cell={textCell}/>
                <Column 
                    field={autoColumns[FIELD_ADDRESS_LIST.suburb].field}
                    width={autoColumns[FIELD_ADDRESS_LIST.suburb].width}
                    title='Suburb' 
                    cell={textCell}/>
                <Column
                    field={autoColumns[FIELD_ADDRESS_LIST.state].field}
                    width={autoColumns[FIELD_ADDRESS_LIST.state].width}
                    title='State'
                    cell={selectStatesFormatCell}
                    editable={props.isCanEdit}
                />
                <Column 
                    field={autoColumns[FIELD_ADDRESS_LIST.postalCode].field}
                    width={autoColumns[FIELD_ADDRESS_LIST.postalCode].width}
                    title='Postcode' 
                    cell={textCell}/>
            </Grid>

        </React.Fragment>
    )
}

export { AddressComponent }