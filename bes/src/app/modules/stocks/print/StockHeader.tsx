const StockHeader: React.FC = () => {
    return (
        <div className='grid-3 no-break mb-5 mt-5'>
            <div className='row'>
                <div className='col-4'>
                    <img src='/images/logo.svg' alt='BES logo' className='h-50px' />
                </div>
                <div className='col-4'>
                    <p className={`text-center mb-5 jobNumber`}> Stock Report</p>
                </div>
                <div className='col-4'></div>
            </div>
        </div>
    )
}

export default StockHeader
