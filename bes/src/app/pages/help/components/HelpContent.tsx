import React from 'react'
import {Link} from 'react-router-dom'

const HelpContent: React.FC = () => {
  return (
    <React.Fragment>
      <div className='card card-custom'>
        <div className='card-body'>
          <div className='container-fluid px-0 mb-10'>
            <p>
              Visit our Help Centers to learn the ins-and-outs of BES and solve any problems you
              encounter.
            </p>
            <div className='row mt-10'>
              <div className='col-md-4 '>
                <Link to='/help/client' className='d-flex align-items-center'>
                  <i className='fas fa-fw fa-users me-5' style={{fontSize: '40px'}}></i> Clients{' '}
                </Link>
              </div>
              <div className='col-md-4 '>
                <Link to='' className='d-flex align-items-center'>
                  <i className='fas fa-fw fa-users me-5' style={{fontSize: '40px'}}></i> Suppliers{' '}
                </Link>
              </div>
              <div className='col-md-4 '>
                <Link to='' className='d-flex align-items-center'>
                  <i className='fas fa-fw fa-users me-5' style={{fontSize: '40px'}}></i> Deliveries{' '}
                </Link>
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-md-4 '>
                <Link to='' className='d-flex align-items-center'>
                  <i className='fas fa-fw fa-users me-5' style={{fontSize: '40px'}}></i>{' '}
                  Non-conformance{' '}
                </Link>
              </div>
              <div className='col-md-4 '>
                <Link to='' className='d-flex align-items-center'>
                  <i className='fas fa-fw fa-users me-5' style={{fontSize: '40px'}}></i> Job{' '}
                </Link>
              </div>
              <div className='col-md-4 '>
                <Link to='' className='d-flex align-items-center'>
                  <i className='fas fa-fw fa-users me-5' style={{fontSize: '40px'}}></i> Purchase
                  Orders{' '}
                </Link>
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-md-4 '>
                <Link to='' className='d-flex align-items-center'>
                  <i className='fas fa-fw fa-users me-5' style={{fontSize: '40px'}}></i> Stocks{' '}
                </Link>
              </div>

              <div className='col-md-4 '>
                <Link to='' className='d-flex align-items-center'>
                  <i className='fas fa-fw fa-users me-5' style={{fontSize: '40px'}}></i> Schedule{' '}
                </Link>
              </div>
              <div className='col-md-4 '>
                <Link to='/help/quote' className='d-flex align-items-center'>
                  <i className='fas fa-fw fa-users me-5' style={{fontSize: '40px'}}></i> Quotes{' '}
                </Link>
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-md-4 '>
                <Link to='' className='d-flex align-items-center'>
                  <i className='fas fa-fw fa-users me-5' style={{fontSize: '40px'}}></i> Users{' '}
                </Link>
              </div>
              <div className='col-md-4 '>
                <Link to='' className='d-flex align-items-center'>
                  <i className='fas fa-fw fa-users me-5' style={{fontSize: '40px'}}></i> Role{' '}
                </Link>
              </div>
              <div className='col-md-4 '>
                <Link to='' className='d-flex align-items-center'>
                  <i className='fas fa-fw fa-users me-5' style={{fontSize: '40px'}}></i> Change
                  Password{' '}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export {HelpContent}
