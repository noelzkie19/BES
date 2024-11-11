
import { IGridProps } from "../props/IList"
import {
    Grid,
    GridCellProps,
    GridColumn as Column,
} from '@progress/kendo-react-grid'
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@progress/kendo-react-indicators";
import { GridActionDropdownCell } from "../action/GridActionDropdownCell";

export const GridList = (props: IGridProps) => {
    const requestInProgress = useRef(false);
    const sessionSkip = useRef(0);
    const [data, setData] = useState<any[]>([]);

    const rowCellFormat = (cellProps: GridCellProps) => (
        <td className='k-command-cell'>
            {cellProps.dataItem[cellProps.field ? cellProps.field : '']}
        </td>
    )
    
    useEffect(() => {
        if (props.dataProps.totalRows <= 0 || props.dataProps.data.length === 0) {
            return;
        }
        const newRecord =
        data.length === props.dataProps.totalRows
          ? [...data]
          : new Array(props.dataProps.totalRows).fill({}).map((e, i) => ({
              index: i,
            }));
        const lastRecord = newRecord.filter(x => x.id !== undefined);
        
        let cntrow = 0;
        props.dataProps.data.forEach((record) => {
            const exist = newRecord.filter(x => x.id === record.id);
            if (exist && exist.length > 0) {
                return;
            }
            cntrow++;
            newRecord[cntrow + (lastRecord.length - 1)] = {
                index: cntrow + (lastRecord.length - 1),
                ...record,
            };


        });

        setData(newRecord)
    }, [props.dataProps]);

    const ActionCell = (actionProps: GridCellProps) => {
        return (<GridActionDropdownCell 
            actions={props.actionProps.actions} 
            changeHandler={props.actionHandler}
            gridCellProps={actionProps} />)
     }

    const pageChange = (pageProps: any) => {
        const lastRecord = data.filter(x => x.id !== undefined);
        if (sessionSkip.current >= lastRecord.length) {
            
            return;
        }
        requestIfNeeded(pageProps)
    }

    const loadingCell = (tdElement: any, props: any) => {
        const field = props.field || "";
        if (props.dataItem[field] === undefined) {
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
      };

    const requestIfNeeded = (pageProps: any) => {
        const skip = sessionSkip.current;
        const lastRecord = data.filter(x => x.id !== undefined);
        for (let i = lastRecord.length; i < lastRecord.length + props.gridSetup.take && i < data.length; i++) {
            if (data[i].id === undefined) {
              // request data only if not already fetched
              const lastRecord = data.filter(x => x.id !== undefined);
              sessionSkip.current = lastRecord.length;
              props.onPageChange({...pageProps, page: {
                    skip: lastRecord.length,
                    take: pageProps.page.take
                }})
              return;
            }
          }
    }
    return (
        <Grid data={data.slice(sessionSkip.current, sessionSkip.current + props.gridSetup.take)}
            resizable={true}
            reorderable={true}
            total={props.dataProps.totalRows}
            onPageChange={pageChange}
            scrollable={"virtual"}
            dataItemKey={"id"}
            cellRender={loadingCell}
            {...props.gridSetup}
            >
            {/* <Column cell={ActionCell} editable={false} width={150}/> */}
            
            {props.selectedColumns.map((col, i) => {
                return (<Column
                title={col.columnTitle}
                field={col.columnName}
                key={i}
                cell={rowCellFormat}
                ></Column>)
            })}

        </Grid>
)
}