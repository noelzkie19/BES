import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs'
import {
  Grid,
  GridColumn as Column,
  GridCellProps,
  GridColumnResizeEvent,
} from '@progress/kendo-react-grid'
import {DeliveryJob} from '../../models/delivery-model'
import {useEffect, useState, useRef, ChangeEventHandler} from 'react'
import {CellRender, RowRender} from '../../../../shared/components/kendo/renderer'
import {InlineCellAmountCell} from '../../../../shared/components/kendo/incell/InCellAmountCell'
import {onKeyDownHandler} from '../../../../shared/service/utils'
import {InCellTextCell} from '../../../../shared/components/kendo/incell/InCellTextCell'
import {InCellNumericCell} from '../../../../shared/components/kendo/incell/InCellNumericCell'
import {InCellDropDownCell} from '../../../../shared/components/kendo/incell/InCellDropDownCell'
import {FIELD_DOCKET, FIELD_DOCKET_COLUMN_KEY} from '../../constant/delivery-docket-default'
import {
  GRID_WIDTH,
  getResizeColumnByName,
  saveResizeColumn,
} from '../../../../shared/service/grid-setup-utils'
import {useEffectOnce} from 'react-use'
import {ISupplierData} from '../../../suppliers/models/supplier-model'
import {getSuppliers} from '../../../purchase-orders/api'
import {CustomAlert, IAlert} from '../../../../shared/components/CustomAlert'
import {Controller, useFieldArray, useForm, useWatch} from 'react-hook-form'
import Select from 'react-select'
import {transforOption} from '../../transformer/delivery-transformer'
import PhoneInput1 from '../../../../../_metronic/partials/content/inputs/PhoneInput1'

interface IProps {
  handleSend: (deliveries: DeliveryJob[]) => void
  handleClose: () => void
  selectedData: DeliveryJob[]
}
const EDIT_FIELD = 'inEdit'

const DeliveryDocketModal: React.FC<IProps> = ({handleSend, handleClose, selectedData}) => {
  const [data, setData] = useState<DeliveryJob[]>(selectedData)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isTabKey, setIsTabKey] = useState<boolean>(false)
  const [autoColumns, setAutoColumns] = useState<any[]>(FIELD_DOCKET_COLUMN_KEY)
  const [suppliers, setSuppliers] = useState<ISupplierData[]>([])
  const [toaster, setToaster] = useState<IAlert | undefined>()
  const [courier, setCourier] = useState<string>('')
  const [courierCost, setCourierCost] = useState<string>('')
  const [deliveryNote, setDeliveryNote] = useState<string>('')

  const [contactPhone, setContactPhone] = useState<string>('')
  const [contactPerson, setContactPerson] = useState<string>('')

  const courierCostInputRef = useRef(null)
  const deliveryNoteTextareaRef = useRef(null)

  const getReferences = async () => {
    const suppliers: any = await getSuppliers()
    setSuppliers(suppliers.data)
  }

  useEffectOnce(() => {
    const columnLocal = getResizeColumnByName(GRID_WIDTH.GRID_DELIVERY_DOCKET)
    if (columnLocal) {
      setAutoColumns(columnLocal)
    }

    getReferences()
  })

  const itemChange = (event: any) => {
    if (isTabKey) {
      setIsTabKey(true)
      return
    }
    let field = event.field || ''
    const idx = data.findIndex((po) => po.isEdit)
    data[idx] = {
      ...event.dataItem,
      [field]: event.value,
    }
    setData([...data])
  }

  const onKeyDown = (event: any) => {
    var newData: any = []
    const {nextField, dataIndex} = onKeyDownHandler(
      {...event, colIndex: event.colIndex + 1},
      FIELD_DOCKET_COLUMN_KEY
    )

    data.forEach((item: any, index) => {
      newData.push({
        ...item,
        [event.field]: event.dataIndex === index ? event.value : item[event.field],
        [EDIT_FIELD]: dataIndex === index ? nextField : undefined,
        isEdit: dataIndex === index,
      })
    })
    setData([...newData])
    setIsTabKey(true)
  }

  const docketEnterEdit = (_: any, field: any, dataIndex: any) => {
    var newData = (data || []).map((item, index) => ({
      ...item,
      [EDIT_FIELD]: dataIndex === index ? field : undefined,
      isEdit: dataIndex === index,
    }))

    setData([...newData])
  }

  const docketExitEdit = () => {
    if (isTabKey) {
      setIsTabKey(false)
      return
    }
    var newData = (data || []).map((item, index) => ({
      ...item,
      [EDIT_FIELD]: undefined,
      isEdit: false,
    }))
    setData([...newData])
  }

  const customRowRender = (tr: any, props: any) => (
    <RowRender originalProps={props} tr={tr} exitEdit={docketExitEdit} editField={EDIT_FIELD} />
  )

  const customCellRender = (td: any, props: any) => (
    <CellRender
      originalProps={props}
      td={td}
      enterEdit={docketEnterEdit}
      editField={EDIT_FIELD}
      exitEdit={docketExitEdit}
    />
  )

  const NumericCell = (cellProps: GridCellProps) => (
    <InCellNumericCell
      props={cellProps}
      enterEdit={docketEnterEdit}
      onChange={itemChange}
      exitEdit={docketExitEdit}
      onKeyDown={onKeyDown}
      tabIndex={0}
    />
  )

  const closeToasterHandler = () => {
    setToaster(undefined)
  }

  const handleSendHandler = () => {
    const noQty = data.filter((item) => item.quantitySent < 1)
    console.log(noQty)
    if (noQty && noQty.length > 0) {
      setToaster({
        message: 'You need to set a minimum of one item.',
        header: 'Qty Send',
        type: 'danger',
        closeToaster: closeToasterHandler,
      })
      return false
    }

    let supplierNumber = 0
    const num = parseInt(courier, 10)
    if (!isNaN(num)) {
      supplierNumber = num
    }

    const notes = deliveryNote
    const freight = parseFloat(courierCost)

    if (isNaN(freight) || freight <= 0) {
      setToaster({
        message: 'Have you filled in the Courier Cost?',
        header: 'Courier Cost Entered?',
        type: 'danger',
        closeToaster: closeToasterHandler,
      })
      return false
    }

    const newData = data.map((item) => ({
      ...item,
      supplierNumber: supplierNumber,
      notes: notes,
      freight: freight,
      contactPerson: contactPerson,
      contactPhone: contactPhone,
    }))

    setData(newData)
    setIsSaving(true)
    handleSend(newData)
  }

  const handleResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, autoColumns, GRID_WIDTH.GRID_DELIVERY_DOCKET)
  }

  const {control} = useForm({
    reValidateMode: 'onSubmit',
  })

  const contactPhoneChange = (phone: string) => {
    setContactPhone(phone)
  }

  const contactPersonChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value
    setContactPerson(newValue)
  }

  const courierCostChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value
    const parsedValue = parseFloat(newValue)

    if (!isNaN(parsedValue) && parsedValue > 0 && parsedValue <= 922337203685477) {
      setCourierCost(newValue)
    } else {
      setCourierCost('')
    }
  }

  return (
    <Dialog title='Delivery Docket' onClose={handleClose}>
      {toaster && <CustomAlert {...toaster} />}
      <div style={{width: '800px'}}>
        <Grid
          data={data}
          cellRender={customCellRender}
          rowRender={customRowRender}
          onItemChange={itemChange}
          editField={EDIT_FIELD}
          onColumnResize={handleResizeColumn}
          resizable={true}
        >
          <Column
            field={autoColumns[FIELD_DOCKET.jobId].field}
            title='Job No.'
            editable={false}
            width={autoColumns[FIELD_DOCKET.jobId].width}
          ></Column>
          <Column
            field={autoColumns[FIELD_DOCKET.description].field}
            title='Job Desc.'
            editable={false}
            width={autoColumns[FIELD_DOCKET.description].width}
          ></Column>
          <Column
            field={autoColumns[FIELD_DOCKET.quantitySent].field}
            title='Qty Send'
            editor='numeric'
            cell={NumericCell}
            width={autoColumns[FIELD_DOCKET.quantitySent].width}
          ></Column>
        </Grid>
      </div>
      <table className='mt-5 mb-4 w-100'>
        <tbody>
          <tr>
            <td>
              <label className='form-label'>Courier</label>
            </td>
            <td className='w-50'>
              <Controller
                control={control}
                name='courier'
                render={({field: {value, name, onChange}}) => {
                  return (
                    <Select
                      options={transforOption(suppliers)}
                      onChange={(event: any) => setCourier(event.value)}
                      className='controllerSelect'
                      name={name}
                      value={transforOption(suppliers).find((spp: any) => spp.value === value)}
                      tabIndex={1}
                      autoFocus
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({...base, zIndex: 10003}),
                      }}
                    ></Select>
                  )
                }}
              ></Controller>
            </td>
            <td className='text-center'>
              <label className='form-label'>Courier Cost</label>
            </td>
            <td>
              <input
                className='form-control'
                type='number'
                ref={courierCostInputRef}
                value={courierCost}
                onChange={courierCostChange}
              ></input>
            </td>
          </tr>
          <tr>
            <td>
              <label className='form-label'>Delivery Note</label>
            </td>
            <td colSpan={3}>
              <textarea
                className='form-control'
                ref={deliveryNoteTextareaRef}
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>
              <label className='form-label'>Contact Person</label>
            </td>
            <td>
              <input
                className='form-control'
                type='text'
                defaultValue={contactPerson}
                onChange={contactPersonChange}
              ></input>
            </td>
            <td className='text-center'>
              <label className='form-label'>Contact Phone</label>
            </td>
            <td>
              <PhoneInput1
                phoneNumber={contactPhone}
                onChangeHandler={contactPhoneChange}
              ></PhoneInput1>
            </td>
          </tr>
        </tbody>
      </table>
      <DialogActionsBar>
        <button className='btn btn-primary' disabled={isSaving} onClick={() => handleSendHandler()}>
          Create
        </button>
        <button className='btn btn-outline-primary' onClick={handleClose}>
          Cancel
        </button>
      </DialogActionsBar>
    </Dialog>
  )
}

export {DeliveryDocketModal}
