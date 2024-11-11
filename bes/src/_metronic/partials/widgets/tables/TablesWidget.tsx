import React from 'react'

const TablesWidget: React.FC = () => {
  return <React.Fragment></React.Fragment>
}
export {TablesWidget}

// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React from 'react'

// type Props = {
//     title: string,
//     className: string,
//     tableData: []
// }

// const TablesWidget: React.FC<Props> = ({ title, className, tableData }) => {
//     return (
//         <div className='card card-custom'>
//             <div className='card-body'>
//                 <div className='container-fluid px-0 mb-10'>
//                     <div className='row justify-content-between align-items-center'>
//                         <h2 className='col'>Applications title</h2>
//                     </div>
//                 </div>
//                 <div className='table-responsive'>
//                     <table className='table table-rounded border table-striped gy-7 gs-7'>
//                         <thead>
//                             <tr className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'>
//                                 <th className='min-w-150px'>Actions</th>
//                                 <th className='min-w-150px'>SPID</th>
//                                 <th className='min-w-150px'>CRN</th>
//                                 <th className='min-w-200px'>Entity Name</th>
//                                 <th className='min-w-200px'>Contact Name</th>
//                                 <th className='min-w-200px'>Security</th>
//                                 <th className='min-w-200px'>Partner</th>
//                                 <th className='min-w-200px'>Securities Amount</th>
//                                 <th className='min-w-200px'>AR Fee Amount</th>
//                                 <th className='min-w-100px'></th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {tableData.map((item: IApplicationData, idx: number) => {
//                                 return (
//                                     <React.Fragment key={idx}>
//                                         <tr>
//                                             <td>
//                                                 <i
//                                                     className='bi bi-eye  cursor-pointer fs-3 text-info me-4'
//                                                     data-bs-toggle='modal'
//                                                     data-bs-target={`#application-form`}
//                                                     onClick={(ev: any) => {
//                                                         setReadonly(true)
//                                                         setEditData(item)
//                                                     }}
//                                                 ></i>
//                                                 <i
//                                                     className='bi bi-pencil cursor-pointer fs-3 text-primary me-4'
//                                                     data-bs-toggle='modal'
//                                                     data-bs-target={`#application-form`}
//                                                     onClick={(ev: any) => {
//                                                         setReadonly(false)
//                                                         setEditData(item)
//                                                     }}
//                                                 ></i>
//                                                 <i
//                                                     className='bi bi-trash3 cursor-pointer fs-3 text-danger'
//                                                     data-bs-toggle='modal'
//                                                     data-bs-target='#delete-modal'
//                                                     onClick={(ev: any) => {
//                                                         setDeleteData(item)
//                                                     }}
//                                                 ></i>
//                                             </td>
//                                             <td>{item?.information?.spid ?? 'N/A'}</td>
//                                             <td>{item?.information?.crn ?? 'N/A'}</td>
//                                             <td>{item?.information?.entityName ?? 'N/A'}</td>
//                                             <td>{item?.information?.contactName ?? 'N/A'}</td>
//                                             <td>{security?.name ?? 'N/A'}</td>
//                                             <td>{partner?.name ?? 'N/A'}</td>
//                                             <td>
//                                                 {convertToCurrency(item?.investmentDetails?.securitiesAmount ?? 'N/A')}
//                                             </td>
//                                             <td>{convertToCurrency(item?.investmentDetails?.arFeeAmount ?? 'N/A')}</td>
//                                             <td>
//                                                 <button
//                                                     className={`btn btn-${item.lodgeDate ? 'warning' : 'primary'}`}
//                                                     data-bs-toggle='modal'
//                                                     data-bs-target='#lodge-application-modal'
//                                                     onClick={(ev: any) => {
//                                                         ev.stopPropagation()
//                                                         setLodgeData(item)
//                                                     }}
//                                                 >
//                                                     {item.lodgeDate ? 'Re-lodge Application' : 'Lodge Application'}
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     </React.Fragment>
//                                 )
//                             })}
//                         </tbody>
//                     </table>
//                     {tableData.length === 0 && (
//                         <h1 className='d-flex flex-row justify-content-center align-items-center h-300px'>
//                             No records found
//                         </h1>
//                     )}
//                     <DeleteApplicationModal
//                         apiUrl={apiUrl}
//                         modalId='delete-modal'
//                         deleteCallback={applicationDeleted}
//                         applicationData={deleteData}
//                     />
//                     <LodgeApplicationModal
//                         apiUrl={apiUrl}
//                         applicationData={lodgeData}
//                         saveCallback={applicationLodged}
//                     />
//                 </div>

//                 <ul className='pagination py-5'>
//                     <li
//                         key='page-prev'
//                         className={`page-item previous${pageNumber === 1 ? ' disabled' : ''}`}
//                     >
//                         <button
//                             className='btn btn-sm btn-icon page-link'
//                             onClick={() => {
//                                 if (pageNumber > 1) setPageNumber(pageNumber - 1)
//                             }}
//                         >
//                             <i className='previous'></i>
//                         </button>
//                     </li>
//                     {Array(totalPages)
//                         .fill('')
//                         .map((_, idx) => {
//                             const page = idx + 1
//                             return (
//                                 <li className='page-item' key={`page-${page}`}>
//                                     <button
//                                         className={`btn btn-sm btn-icon ${pageNumber === page ? 'btn-primary' : 'btn-light'
//                                             } page-link`}
//                                         onClick={() => pageNumber !== page && setPageNumber(page)}
//                                     >
//                                         {page}
//                                     </button>
//                                 </li>
//                             )
//                         })}

//                     <li
//                         key='page-next'
//                         className={`page-item next${pageNumber === totalPages ? ' disabled' : ''}`}
//                     >
//                         <button
//                             className='btn btn-sm btn-icon page-link'
//                             onClick={() => {
//                                 if (pageNumber < totalPages) setPageNumber(pageNumber + 1)
//                             }}
//                         >
//                             <i className='next'></i>
//                         </button>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     )
// }

// export { TablesWidget }
