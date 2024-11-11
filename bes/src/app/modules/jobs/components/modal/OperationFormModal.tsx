import { FC, useState } from "react"
import { IDataChecks } from "../../models/job-model"
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import { ComboBox} from "@progress/kendo-react-dropdowns"
import { NumericTextBox } from "@progress/kendo-react-inputs"

interface IProps {
    field: string
    checkData: IDataChecks
    resources: any
    proceedConfirm: (checkData: IDataChecks) => void
    toggleDialog: () => void
}

const OperationFormModal: FC<IProps> = ({ field, proceedConfirm, toggleDialog, checkData, resources }) => {

    const [operatorId, setOperatorId] = useState<number>(checkData.operatorId)
    const [hour, setHour] = useState<number>(checkData.hr)

    const onSubmit = () => {
        proceedConfirm({
            hr: hour,
            operatorId: operatorId
        })
    }

    return (
        <Dialog title={`Edit Operation Checks`} onClose={toggleDialog} >
            <div className='form-group'>
                <label className='form-label' htmlFor='hr'>
                    Hour
                </label>
                <NumericTextBox
                    width='100%'
                    onChange={(e: any) => setHour(e.target.value)}
                    defaultValue={hour}
                    min={0}
                />
            </div>
            <div className='form-group'>
                <div className='form-label'>
                    Operator
                </div>
                <ComboBox
                    className='form-control'
                    data={resources || []}
                    value={resources ? resources.find((c: any) => c.id === operatorId) : []}
                    onChange={(e) => setOperatorId(e.value.id)}
                    textField="text"
                    dataItemKey="id"/>
            </div>
            <DialogActionsBar>
                <button
                    className="btn btn-primary"
                    onClick={onSubmit}
                >
                    Proceed
                </button>
                <button
                   className='btn btn-outline-primary'
                    onClick={toggleDialog}
                >
                    Cancel
                </button>
            </DialogActionsBar>
        </Dialog>
    )
}

export { OperationFormModal }

