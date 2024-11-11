import { DropDownList } from "@progress/kendo-react-dropdowns"
import { IActionGridProps } from "../props/IAction"

export const GridActionDropdownCell = (props: IActionGridProps) => (
    <td className='k-command-cell'>
      <DropDownList
        disabled={(props.isCanEdit !== undefined) ? (!props.isCanEdit) : false}
        data={props.actions}
        textField='text'
        defaultItem={{text: 'Action', value: 'Action'}}
        onChange={(event) => {
          props.changeHandler(event, props.gridCellProps.dataItem, props.gridCellProps.dataIndex)
        }}
      />
    </td>
)
