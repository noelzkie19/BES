import {Modal} from 'react-bootstrap-v5'
import React, {useEffect, useState} from 'react'
import {getQuotesPrint} from '../../api'

interface IProps {
  show: boolean
  handleClose: () => void
  versions?: string[]
  currentQuote: string
  printQuote: (data: any) => void
}

const PrintQuoteOptionModal: React.FC<IProps> = ({
  show,
  handleClose,
  versions,
  currentQuote,
  printQuote,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('single')
  const [selectedQuotePrint, setSelectedQuotePrint] = useState<string>('itemised')
  const [selectedQuote, setSelectedQuote] = useState<string[]>([])

  const generatePrintRecord = () => {
    let toPrintQuote = selectedQuote
    if (selectedQuote.length === 0) {
      // 0 means single
      toPrintQuote = [currentQuote]
    }
    let printPayload = {
      isItemised: selectedQuotePrint === 'itemised',
      quotes: toPrintQuote,
    }
    getQuotesPrint(printPayload).then((result) => {
      printQuote(result.data)
    })
  }

  const CheckBoxVersions = (props: any) => (
    <div className='col-2'>
      <input
        // key={props.quoteVersion}
        type='checkbox'
        name='completed'
        className='form-check-input ms-5'
        disabled={selectedTag === 'single'}
        checked={isQuoteChecked(props.quoteVersion)}
        onChange={(e) => {
          const v_selectedQuote = selectedQuote
          const indx =
            selectedQuote.length === 0
              ? -1
              : selectedQuote.findIndex((x) => x == props.quoteVersion)
          if (e.target.checked) {
            if (indx < 0) {
              v_selectedQuote.push(props.quoteVersion)
            }
          } else {
            if (indx >= 0) {
              v_selectedQuote.splice(indx, 1)
            }
          }
          setSelectedQuote([...v_selectedQuote])
        }}
      />{' '}
      <span className='ms-2'>{props.quoteVersion}</span>
    </div>
  )

  const isQuoteChecked = (quoteVersion: string): boolean => {
    const indx = selectedQuote.length === 0 ? -1 : selectedQuote.findIndex((x) => x == quoteVersion)
    if (indx >= 0) {
      return true
    }
    return false
  }

  useEffect(() => {
    console.log(selectedQuote)
  }, [selectedQuote])

  const handleStatusChange = (newStatus: string) => {
    if (newStatus === 'single') {
      setSelectedQuote([])
    }
    setSelectedTag(newStatus)
  }
  const handleQuotePrintChange = (newStatus: string) => {
    setSelectedQuotePrint(newStatus)
  }

  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      {/* <Modal.Header closeButton>
        <Modal.Title>Print Options</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <h4>Print Options</h4>
        <div className='row mt-5'>
          <div className={`col-2 d-flex flex-row`}>
            <input
              type='radio'
              value='single'
              name='quote'
              className='form-check-input'
              checked={selectedTag == 'single'}
              onChange={() => handleStatusChange('single')}
            />{' '}
            <span className='ms-2'>This Quote Only</span>
          </div>
        </div>
        <div className='row mt-2'>
          <div className={`col-2 d-flex flex-row`}>
            <input
              type='radio'
              value='multiple'
              name='quote'
              className='form-check-input'
              checked={selectedTag == 'multiple'}
              onChange={() => handleStatusChange('multiple')}
            />{' '}
            <span className='ms-2'>Multiple Version</span>
          </div>
          <div className='col-10'>
            <div className='row'>
              {versions &&
                versions.map((version, i) => {
                  return <CheckBoxVersions quoteVersion={version} key={i} />
                })}
            </div>
          </div>
        </div>
        <h4 className='mt-5'>Quote Summary vs Itemised</h4>
        <div className='row mt-5'>
          <div className={`col d-flex flex-row`}>
            <input
              type='radio'
              value='itemised'
              name='summaryitemised'
              className='form-check-input'
              checked={selectedQuotePrint == 'itemised'}
              onChange={() => handleQuotePrintChange('itemised')}
            />{' '}
            <span className='ms-2'>Show Itemised price</span>
            <input
              type='radio'
              value='quoteOnly'
              name='summaryitemised'
              className='form-check-input ms-2'
              checked={selectedQuotePrint == 'quoteOnly'}
              onChange={() => handleQuotePrintChange('quoteOnly')}
            />{' '}
            <span className='ms-2'>This Quote Only</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type='button' className='btn btn-primary' onClick={generatePrintRecord}>
          Print
        </button>
        <button type='button' className='btn btn-outline-primary' onClick={handleClose}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export {PrintQuoteOptionModal}
