import { Skeleton } from "@progress/kendo-react-indicators";

export const LoadingCell = (tdElement: any, props: any) => {
    const field = props.field || "";

    if (field === 'expanded') {
      if (props.dataItem.expandedItemCnt != undefined && props.dataItem.expandedItemCnt === 0) {
        return (
          <td></td>
        )
      }
    } else if (props.dataItem[field] === undefined) {
      // shows loading cell if no data
      return (
        <td>
          {" "}
          <Skeleton
            shape={"text"}
            style={{
              width: "100%",
            }}
          />
        </td>
      );
    } // default rendering for this cell

    return tdElement;
}

