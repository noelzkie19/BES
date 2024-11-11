

interface IMyProps {
  jobDetails: any
}
const HeaderPrintJob: React.FC<IMyProps> = ({ jobDetails }) => {
  return (
    <div className='grid-3 no-break mb-5'>
      {
        (jobDetails && jobDetails.jobDatePrinted && jobDetails.isDuplicate) && (
          <div className='row mb-2'>
            <div className='col-12'>
              <h1>Duplicate</h1>
            </div>
          </div>
        )
      }
      <div className='row'>
        <div className='col-4'>
          <img src='/images/logo.svg' alt='BES logo' className='h-50px' />
        </div>
        <div className='col-4'>
        {jobDetails != null
                    ?  <p className={`text-center mb-5 jobNumber`}>Job # { jobDetails.jobId}</p>
                    :  <p className={`text-center mb-5 jobNumber`}>Job # </p>
                  }
         
        </div>
        <div className='col-4'></div>
      </div>
    </div>
  )
}

export default HeaderPrintJob
