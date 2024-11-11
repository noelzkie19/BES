
export const DeliveryActionCell = (dataProps: any) => (
    <td className='k-command-cell'>
        {/* <i
            className='bi bi-pencil cursor-pointer fs-3 text-info me-4'
            id='edit'
            onClick={() => dataProps.onAction(dataProps.props.dataItem, true)}
        ></i> */}
        <i
            className='bi bi-arrow-counterclockwise cursor-pointer fs-3 text-danger'
            id='undo'
            onClick={() => dataProps.onAction(dataProps.props.dataItem, false)}
        ></i>
    </td>
)