import {GridFooterCellProps} from '@progress/kendo-react-grid'


export const footerTotal = (props: GridFooterCellProps) => {
  const field = props.field || ''
   return (
    <td colSpan={props.colSpan} style={props.style}>
      0m
    </td>
  )
}
