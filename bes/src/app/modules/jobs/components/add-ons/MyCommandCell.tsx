// import {IJobData} from '../../models/job-model'
// interface Props {
//   dataItem: any
//   add: (dataItem: IJobData) => void
//   update: (dataItem: IJobData) => void
//   discard: (dataItem: IJobData) => void
//   edit: (dataItem: IJobData) => void
//   remove: (dataItem: IJobData) => void
//   editField: string
// }
// export const MyCommandCell = (props: Props) => {
//   console.log(props)
//   const {dataItem} = props
//   const inEdit = dataItem[props.editField]
//   const isNewItem = dataItem.id === undefined

//   return inEdit ? (
//     <td className='k-command-cell'>
//       <button
//         className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command'
//         onClick={() => (isNewItem ? props.add(dataItem) : props.update(dataItem))}
//       >
//         {isNewItem ? 'Add' : 'Update'}
//       </button>
//       {/* <button
//         className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command'
//         onClick={() => (isNewItem ? props.discard(dataItem) : props.cancel(dataItem))}
//       >
//         {isNewItem ? 'Discard' : 'Cancel'}
//       </button> */}
//     </td>
//   ) : (
//     <td className='k-command-cell'>
//       <button className='btn btn-primary me-5' onClick={() => props.edit(dataItem)}>
//         Edit
//       </button>
//       <button
//         className='btn btn-danger'
//         onClick={() =>
//           window.confirm('Confirm deleting: ' + dataItem.ProductName) && props.remove(dataItem)
//         }
//       >
//         Remove
//       </button>
//     </td>
//   )
// }

const MyCommandCell: React.FC = () => {
  return (
    <div className='row'>
     
    </div>
  )
}

export default MyCommandCell
