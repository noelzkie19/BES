import React, {FC, useEffect, useState} from 'react'
import { CustomAlert, IAlert } from '../../../../../app/shared/components/CustomAlert'
import { Editor1 } from '../../../widgets/editor/Editor1'
import EmailInput from '../../../widgets/input/EmailInput1'
import { Window, DialogActionsBar } from "@progress/kendo-react-dialogs";
import ImageUpload from '../Upload';
import { IFile } from '../../../../../app/modules/purchase-orders/models/file';

interface IProps {
  supplierEmail: string
  onClose: () => void
  onSend: (content: string) => void
  purchaseNumber: string
  fileName: string
  showPreview: () => void
  errorMsg: string
  content: string
  subject: string
  addRemoveEmail: (emails: string[]) => void
  changeContent: (content: string) => void
  changeSubject: (subject: string) => void
  addRemoveCC: (emails: string[]) => void
  addRemoveBcc: (emails: string[]) => void
  files: IFile[],
  setFiles: (emails: IFile[]) => void
}
const FileAttachments = (props: any) => (
  <div style={{
    backgroundColor: '#f5f5f5',
    border: '1px solid transparent',
    fontWeight: 'bold',
    margin: '5px 5px 9px',
    overflowY: 'hidden',
    padding: '4px 4px 4px 8px',
    maxWidth: '248px',
    cursor:'pointer'
  }} key={props.keyValue || 0}>
  <div style={{
    display: 'inline-block',
    overflow: 'hidden',
    padding: '3px 0',
    textOverflow: 'ellipsis',
    verticalAlign: 'bottom',
    whiteSpace: 'nowrap',
    maxWidth: '315px',
    color: '#15c'
  }}>
    <i className="fas fa-paperclip me-2"></i>
    <span onClick={() => {
        if (props.showPreview)
          props.showPreview()
      }}> {props.fileName}</span>
      
    <i className="fas fa-trash ms-2" onClick={() => {
      if (props.deleteFile)
        props.deleteFile(props.keyValue)
    }}></i>
  </div>
</div>
)


const SendPOModal: FC<IProps> = ({ 
    supplierEmail, 
    onClose, 
    onSend, 
    fileName, 
    showPreview, 
    errorMsg, 
    content, 
    addRemoveEmail, 
    changeContent, 
    subject, 
    changeSubject,
    addRemoveCC,
    addRemoveBcc,
    files,
    setFiles
  }) => {
  const [customAlert, setAlert] = useState<IAlert | undefined>(undefined)
  const [currentContent, setCurrentContent] = useState<string>(content)
  const [emails, setEmails] = useState<string[]>([])
  const [subjects, setSubjects] = useState<string>('')
  const [emailCcs, setEmailCcs] = useState<string[]>([])
  const [emailBccs, setEmailBccs] = useState<string[]>([])
  const [attachments, setAttachments] = useState<IFile[]>(files)

  useEffect(() => {
    if (files) {
      setAttachments(files)
    }
  }, [files])
  

  useEffect(() => {
    setCurrentContent(content)
  }, [content])

  useEffect(() => {
    setSubjects(subject)
  }, [subject])

  useEffect(() => {
    const newString = supplierEmail === '' ? [] : [supplierEmail]
    setEmails(newString)
    addRemoveEmail(newString)
  }, [supplierEmail])

  useEffect(() => {
    if (errorMsg) {
      setAlert({
        message: `Please Review/Click Attachment before we proceed `,
        header: `Preview the Purchase Order.`,
        type: 'danger'
      })
    } else setAlert(undefined)
  }, [errorMsg])



  return (
    <Window title={'Email Purchase Order'} onClose={onClose} initialHeight={720} initialWidth={900}>
      {customAlert && <CustomAlert {...customAlert} />}
        
        <div className='row'>
            <div className='col-1'>To:</div>
            <div className='col-11'>
              <EmailInput emails={emails} onAddDeleteEmail={(newEmails) => {
                setEmails([...newEmails])
                addRemoveEmail([...newEmails])
              }}></EmailInput>
              {/* <input type="text"  className='form-control' defaultValue={supplierEmail}/> */}
            </div>
        </div>
        <div className='row'>
            <div className='col-1'>Cc:</div>
            <div className='col-11'>
              <EmailInput emails={emailCcs} onAddDeleteEmail={(newCcs) => {
                setEmailCcs([...newCcs])
                addRemoveCC([...newCcs])
              }}></EmailInput>
              {/* <input type="text"  className='form-control' defaultValue={supplierEmail}/> */}
            </div>
        </div>
        <div className='row'>
            <div className='col-1'>Bcc:</div>
            <div className='col-11'>
              <EmailInput emails={emailBccs} onAddDeleteEmail={(newBccs) => {
                setEmailBccs([...newBccs])
                addRemoveBcc([...newBccs])
              }}></EmailInput>
              {/* <input type="text"  className='form-control' defaultValue={supplierEmail}/> */}
            </div>
        </div>
        <div className='row mt-3'>
            <div className='col-1'>Subject:</div>
            <div className='col-11'><input type="text" className='form-control' value={subjects} 
              onChange={(event) => {
                changeSubject(event.target.value)
            }} /></div>
        </div>
        <div className='row mt-5'>
          <div className='col-12'>
            <div className="d-flex flex-row">
              {attachments.map((att, i) => (
                <FileAttachments showPreview={showPreview} fileName={att.title} keyValue={i} 
                  deleteFile={(i: number) => {
                  attachments.splice(i, 1);
                  setFiles([...attachments])
                }}/>
              ))}
              
              <ImageUpload 
                  addFiles={(newfile: any) => {
                    setFiles([...attachments, newfile])
                  }}></ImageUpload>
            </div>
          </div>
        </div>
        <Editor1 content={content} changeHandler={(event) => {
          changeContent(event)
        }}></Editor1>
        <DialogActionsBar>
          <button type='button' className='btn btn-primary'
              onClick={() => {
                if (emails.length === 0) {
                  setAlert({
                    message: `Please add atleast one email address.`,
                    header: `Preview the Purchase Order.`,
                    type: 'danger'
                  })
                  return
                }
                onSend(currentContent)
              }}>
              Proceed
            </button>
            <button className='btn btn-danger'
              onClick={onClose}>
              Cancel
            </button>
        </DialogActionsBar>
    </Window>
  )
}

export {SendPOModal}
