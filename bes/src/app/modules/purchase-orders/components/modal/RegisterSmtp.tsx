import React from 'react'
import { DialogActionsBar, Window } from "@progress/kendo-react-dialogs";
import { useForm } from 'react-hook-form'
import { IPurchaseReceiptData } from '../../models/purchase-model'
import { ISmtpRegister } from '../../../../shared/model/smtp-register';


type Props = {
  smtpRegister: ISmtpRegister,
  toggleDialog: () => void,
  savePasswordHandler: (smtpRegister: ISmtpRegister) => void,
}

const RegisterSmtp: React.FC<Props> = ({ smtpRegister, toggleDialog, savePasswordHandler }) => {

  const {
    handleSubmit,
    register,
    control,
  } = useForm({
    defaultValues: smtpRegister
  })

  const onSubmit = async (values: ISmtpRegister) => {
    savePasswordHandler(values)
  }

  return (
    <React.Fragment>

    <Window 
      title='Register Email' 
      onClose={toggleDialog} 
      initialHeight={200}
      initialWidth={400}>
      <form name='RegisterSmtp' onSubmit={handleSubmit(onSubmit)}>
        <table style={{width: '100%'}}>
            <tbody>
                <tr>
                    <th style={{width: '25px'}}></th>
                    <th></th>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="email">Email</label>
                    </td>
                    <td>
                        <input type="text" className='form-control' {...register('email')} disabled/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="password" >Password</label>
                    </td>
                    <td>
                        <input type="password" className='form-control' {...register('password')}/>
                    </td>
                </tr>
            </tbody>
        </table>
        <DialogActionsBar>
          <button type='submit' className="btn btn-outline-primary">
            Save
          </button>
          <button className="btn btn-outline-primary"
            onClick={toggleDialog}>
            Close
          </button>
        </DialogActionsBar>
      </form>
    </Window >
  </React.Fragment>
  )
}

export {RegisterSmtp}
