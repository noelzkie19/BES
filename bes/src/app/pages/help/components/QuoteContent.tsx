import React from 'react'
import {Link} from 'react-router-dom'

const QuoteContent: React.FC = () => {
  return (
    <React.Fragment>
      <h3>Convert to Job</h3>
      <div className='row mt-5'>
        <div className='col-md-6 '>
        <p>If the Quotes status is already Complete, the user can see the Convert to Job action button.</p>
          <ol>
            <li>Choose the Quote that has the status to Complete</li>
            <li>Click the Convert to Job in action</li>
            <li>The job should appear on the Jobs list</li>
            <li>The Quote ID should be referenced on the Job that was created from the converted quote.  </li>
          </ol>
        </div>
        <div className='col-md-6 '>
          <img src='/images/help/quotes/1.png' alt='BES logo' className='w-100' />
        </div>
      </div>
      <hr />
      <h3>Versioning Quote</h3>
      <div className='row mt-5'>
        <div className='col-md-6 '>
          <ol>
            <li>Navigate in the Quote menu in the left-hand menu or in the dashboard</li>
            <li>Choose a Quote from the list</li>
            <li>Click the Edit action button on the Quote</li>
            <li>Click the Versioning button </li>
            <li>Input the fields</li>
            <li>Click the Save Draft</li>
            <li>Once the Version is successfully Save, check the Quote that you choose from number 2</li>
            <li>Then click the drop-down to see the successful Versions</li>
          </ol>
        </div>
        <div className='col-md-6 '>
          <img src='/images/help/quotes/2.png' alt='BES logo' className='w-100' />
        </div>
      </div>
      <hr />
      <h3>Copy Quote</h3>
      <div className='row mt-5'>
        <div className='col-md-6 '>
          <ol>
            <li>Navigate in the Quote menu in the left-hand menu or in the dashboard</li>
            <li>Choose a Quote in the list</li>
            <li>Click the Edit button of the Quote</li>
            <li>Click the Copy Quote button</li>
            <li>It should be able to copy an existing Quote to a new Quotation</li>
          </ol>
        </div>
      </div>
      <hr />
      <h3>Confirm Quote</h3>
      <div className='row mt-5'>
        <div className='col-md-6 '>
          <p>Change status from On Going to For Client Confirmation.</p>
          <ol>
            <li>Navigate to the "Quote" area from the left-hand menu.</li>
            <li>Click the "Edit" button for the Quote that has an On Going status</li>
            <li>Once the user click the “Confirm” button and choose the “Proceed” button in the modal</li>
            <li>The status will change to “For Client Confirmation”</li>
          </ol>
        </div>
        <div className='col-md-6 '>
          <img src='/images/help/quotes/3.png' alt='BES logo' className='w-100' />
        </div>
      </div>
      <hr />
      <h3>Edit Quote</h3>
      <div className='row mt-5'>
        <div className='col-md-6 '>
          <ol>
            <li>Navigate to the "Quote" area from the left hand menu.</li>
            <li>Click the "Edit" button</li>
            <li>Populate all the required fields</li>
            <li>Once you're done click "Save Draft" button</li>
            <li>Modified Field should be seen in a certain Quote</li>
          </ol>
        </div>
        <div className='col-md-6 '>
          <img src='/images/help/quotes/4.png' alt='BES logo' className='w-100' />
        </div>
      </div>
      <hr />
      <h3>Create Quotes</h3>
      <div className='row mt-5'>
        <div className='col-md-6 '>
          <p>To create a landing page:</p>
          <ol>
            <li>Navigate to the "Quotes" menu from the left-hand menu or in the dashboard</li>
            <li>Click the "New Quotes" button</li>
            <li>Populate all the required fields</li>
            <li>Once you're done click the "Save Draft" button</li>
          </ol>
        </div>
        <div className='col-md-6 '>
          <img src='/images/help/quotes/5.png' alt='BES logo' className='w-100' />
        </div>
      </div>
      <hr />
    </React.Fragment>
  )
}

export {QuoteContent}
