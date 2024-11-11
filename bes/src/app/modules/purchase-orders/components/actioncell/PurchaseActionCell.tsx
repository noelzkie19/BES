export const PurchaseLineDeleteActionCell = (props: any) => {

    return (
        <td className='k-command-cell'>
            <i
                className='bi bi-trash cursor-pointer fs-3 text-danger'
                onClick={() => {
                    if (props.dataProps.dataItem.refId > 0) {
                        props.updatePurchaseLines(props.dataProps.dataIndex, {
                            ...props.dataProps.dataItem,
                            isDeleted: true
                        })
                    } else
                        props.removePurchaseLines(props.dataProps.dataIndex)
                }}
            ></i>
        </td>
    )
}


export const PurchaseLineActionCell = (props: any) => {

    return (
        <td className='k-command-cell'>
            <span className='d-flex'>
                <button className="btn btn-sm btn-primary me-1"
                    onClick={() => props.addReceiptHandler(props.props, 'receipt')}>
                    REC
                </button>
                <button className="btn btn-sm btn-info"
                    onClick={() => props.viewReceiptHistory(props.props, 'history')}>
                    HIST
                </button>
            </span>
        </td>
    )
}


export const PurchaseListActionCell = (dataProps: any) => (
    <td className='k-command-cell'>
        <i
            className='bi bi-pencil cursor-pointer fs-3 text-info me-4'
            onClick={() => {
                dataProps.onEditAction(dataProps.props.dataItem)
            }}
        ></i>
        <i
            className='bi bi-trash cursor-pointer fs-3 text-danger'
            id='delete'
            onClick={(event) => {
                dataProps.onDeleteAction(event, dataProps.props.dataItem)
            }}
        ></i>
    </td>
)