export const MaterialDeleteActionCell = (props: any) => {
    return (
        <td className='k-command-cell'>
            <i
                className='bi bi-trash cursor-pointer fs-3 text-danger'
                onClick={() => {
                    if (props.dataProps.dataItem.refId > 0) {
                        props.updateMaterial(props.dataProps.dataIndex, {
                            ...props.dataProps.dataItem,
                            isDeleted: true
                        })
                    } else
                        props.removeMaterial(props.dataProps.dataIndex)
                }}
            ></i>
        </td>
    )
}




export const MaterialListActionCell = (dataProps: any) => (
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