import { Skeleton } from "@progress/kendo-react-indicators";

export const GoToPageCell = (gridProps: any) => {

    const { dataItem } = gridProps.props;
    const field = gridProps.props.field || "";
    const dataValue = dataItem[field] ?  dataItem[field] : '';
    return (
        (dataItem[field] === undefined) ? (
            <td>
            {" "}
            <Skeleton
            shape={"text"}
            style={{
                width: "100%",
            }}
            />
        </td>
        ) : // default rendering for this cell
        (
            <td className="k-command-cell" onDoubleClick={() => gridProps.goToPage(dataItem.id)}>
                {dataValue.toString()}
            </td>
        )
    );
};