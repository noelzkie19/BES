import React from 'react'
import {Link} from 'react-router-dom'

const ClientContent: React.FC = () => {
  return (
    <React.Fragment>
      <h3>Manage Client</h3>
      <div className='row mt-5'>
        <div className='col-md-6 '>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel lectus vel urna varius
          bibendum non at justo. Etiam feugiat, libero vitae molestie mattis, lacus nisi elementum
          sapien, accumsan luctus ligula elit ac neque.
        </div>
        <div className='col-md-6 '>
          <img src='/images/help/clients/1.png' alt='BES logo' className='w-100' />
        </div>
      </div>
      <hr />
      <h3>Create Client</h3>
      <div className='row mt-5'>
        <div className='col-md-6 '>
          <p>To create a landing page:</p>
          <ol>
            <li>Navigate to the "Clients" area from the left hand menu.</li>
            <li>Click the "New Client" button</li>
            <li>Populate all the required fields</li>

            <li>Once you're done click "Save" button</li>
          </ol>
        </div>
        <div className='col-md-6 '>
          <img src='/images/help/clients/1.png' alt='BES logo' className='w-100' />
        </div>
      </div>
      <hr />
      <h3>Edit Client</h3>
      <div className='row mt-5'>
        <div className='col-md-6 '>
          <p>To create a landing page:</p>
          <ol>
            <li>Navigate to the "Clients" area from the left hand menu.</li>
            <li>Click the "New Client" button</li>
            <li>Populate all the required fields</li>

            <li>Once you're done click "Save" button</li>
          </ol>
        </div>
        <div className='col-md-6 '>
          <img src='/images/help/clients/1.png' alt='BES logo' className='w-100' />
        </div>
      </div>
      <hr />
    </React.Fragment>
  )
}

export {ClientContent}
