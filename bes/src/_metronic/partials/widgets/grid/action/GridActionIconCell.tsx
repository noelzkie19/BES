import { IActionGridIconProps } from "../props/IAction"

export const GridActionIconCell = (props: IActionGridIconProps) => (
    <td className='k-command-cell text-center' key={props.gridCellProps.dataIndex}>
        { 
            (props.actions || []).map((action, i) => (
                <i
                key={`${action.icon}-${i}`}
                className={`bi bi-${action.icon} cursor-pointer fs-3 me-4 ${action.color}`}
                title={action.hoverText}
            
                onClick={() => props.changeHandler(action.action, 
                        props.gridCellProps.dataItem, 
                        props.gridCellProps.dataIndex)}
                ></i>
            ))
        }
    </td>
)

