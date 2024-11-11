import * as React from "react";
import * as ReactDOM from "react-dom";
import { Grid, GridColumn as Column, GridFilterChangeEvent, GridColumnResizeEvent, GridCellProps, GridFilterCellProps } from "@progress/kendo-react-grid";
import { useState } from "react";
import { GridSetup } from "../../users/models/user-model";
import { INITIAL_DEL_GRIDSETUP, INITIAL_FILTER, INITIAL_GRIDSETUP, Tabs } from "../constant/config-default";
import { dateFormat, filterToObject } from "../../../shared/service/utils";
import { transformDeliverySort } from "../transformer/delivery-transformer";
import { FIELD_DEFAULT, FIELD_DELIVERED, FIELD_DELIVERED_COLUMN_KEY } from "../constant/delivery-default";
import { getDeliveryData } from "../api";
import { LoadingPanel } from "../../../shared/components/kendo/GridLoading";
import { FormatAmountCell } from "../../../shared/components/kendo/format/FormatAmountCell";
import { FormatDateCell } from "../../../shared/components/kendo/format/FormatDateCell";
import { DateFilterCell } from "./custom-cell/DateFilterCell";
import { DeliveryActionCell } from "./actioncell/DeliveryAction";
import { useEffectOnce } from "react-use";
import { CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { ActionEnum, ActionOption } from '../../../../_metronic/partials/widgets/grid/constant/ActionOption';
import { GridActionIconCell } from '../../../../_metronic/partials/widgets/grid/action/GridActionIconCell';
import { Skeleton } from "@progress/kendo-react-indicators";
import { DateFormatCell } from "../../../shared/components/kendo/format/DateFormatCell";
import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from "../../../shared/service/grid-setup-utils";
import { ClientFilterDropdownCell } from "../../../shared/components/kendo/filter/ClientFilterDropdownCellProps";
import { DeliveryContext } from "../context/DeliveryContext";

interface IProps {
  actionHandler: (dataItem: any, isEdit: boolean) => void,
  selectedTag: string,
  requestRefresh: boolean,
  doneRefresh: () => void
}
let fetchQue: any;

const DeliveredList: React.FC<IProps> = ({ actionHandler, selectedTag, requestRefresh, doneRefresh }) => {
  const requestInProgress = React.useRef(false);
  const [totalRows, setTotalRows] = useState<number>(0)

  const [gridDeliveredSetup, setGridDeliveredSetup] = useState<any>(INITIAL_DEL_GRIDSETUP)
  const [deliveredAutoColumns, setDeliveredAutoColumns] = useState<any[]>(FIELD_DELIVERED_COLUMN_KEY)
  const [data, setData] = React.useState<any>([])
  const [filter, setFilter] = useState<CompositeFilterDescriptor>(INITIAL_FILTER)
  const { clients, getAllClientsAsync } = React.useContext(DeliveryContext)

  useEffectOnce(() => {
    if (!clients || clients.length === 0) {
      getAllClientsAsync()
    }
  })


  const requestIfNeeded = (skip: any) => {
    for (let i = skip; i < skip + gridDeliveredSetup.take && i < data.length; i++) {
      if (data[i].id === undefined) {
        // request data only if not already fetched
        requestData(skip);
        return;
      }
    }
  };

  const requestData = (skipParameter: any) => {
    var { sort, take } = gridDeliveredSetup
    const search = requestRefresh ? '' : filterToObject(filter)
    const sortField = transformDeliverySort(sort, FIELD_DEFAULT)

    if (requestInProgress.current) {
      return;
    }
    requestInProgress.current = true;
    const skip = skipParameter;
    getDeliveryData(skip, take, sortField, search, Tabs.deliveries, selectedTag)
      .then((json) => {
        requestInProgress.current = false;

        const data = json.items || [];
        var totalC = json.totalCount || 0;
        if (totalRows === 0)
          setTotalRows(totalC)

        const newOrders =
          data.length === totalC
            ? [...data]
            : new Array(totalC).fill({}).map((e, i) => ({
              Index: i,
            }));


        data.forEach((delivery: any, i: any) => {
          newOrders[i + skip] = {
            Index: i + skip,
            ...delivery
          };

        });
        setData(newOrders);
        doneRefresh();
      });
  };

  React.useEffect(() => {
    if (requestRefresh) {
      setFilter(INITIAL_FILTER)
      setData([])
      setTotalRows(0);
      if (fetchQue) {
        clearTimeout(fetchQue);
      }
      fetchQue = setTimeout(function () {
        requestData(0);
      }, 100)
    }
  }, [requestRefresh])

  React.useEffect(() => {
    requestIfNeeded(gridDeliveredSetup.skip);
  }, [data]);

  useEffectOnce(() => {
    // request the first page on initial load
    const pendingColumnLocal = getResizeColumnByName(GRID_WIDTH.GRID_DELIVERY, FIELD_DELIVERED_COLUMN_KEY)
    if (pendingColumnLocal) {
      setDeliveredAutoColumns(pendingColumnLocal)
    }
    if (fetchQue) {
      clearTimeout(fetchQue);
    }
    fetchQue = setTimeout(function () {
      requestData(0);
    }, 500)
  });



  const pageChange = (event: any) => {
    requestIfNeeded(event.page.skip);
    setGridDeliveredSetup({
      ...gridDeliveredSetup,
      skip: event.page.skip,
      take: event.page.take,
    })
  };

  const handleSortChange = (pageProps: any) => {
    setGridDeliveredSetup({
      ...gridDeliveredSetup,
      sort: pageProps.sort,
    })
  }

  React.useEffect(() => {
    // In filter reset verything
    if (fetchQue) {
      clearTimeout(fetchQue);
    }
    fetchQue = setTimeout(function () {
      setData([])
      setTotalRows(0);
      requestData(0);
    }, 500)
  }, [filter])

  React.useEffect(() => {
    // In filter reset verything
    setData([])
    setTotalRows(0);
    if (fetchQue) {
      clearTimeout(fetchQue);
    }
    fetchQue = setTimeout(function () {
      requestData(0);
    }, 100)
  }, [gridDeliveredSetup.sort])



  const handleFilter = (filter: GridFilterChangeEvent) => {
    setFilter(filter.filter)
  }

  const handlePendingResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, deliveredAutoColumns, GRID_WIDTH.GRID_PENDING_DELIVERY);
  }

  const actionCell = (props: GridCellProps) => (
    <GridActionIconCell actions={[
      ActionOption.UndoDelivery,
      ActionOption.PrintDelivery
    ]}
      gridCellProps={props}
      changeHandler={actionHandler} />
  )


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

  const types: string[] = clients.map((client: any) => client.name).filter(name => name.trim() !== '');
  const ClientFilterCell: any = (props: GridFilterCellProps) => (
    <ClientFilterDropdownCell {...props} data={types} defaultItem={''} />
  )

  const gridSkip = isNaN(gridDeliveredSetup.skip) ? 0 : gridDeliveredSetup.skip;

  return (
    <React.Fragment>
      {/* {requestInProgress.current && LoadingPanel} */}
      <Grid
        data={data.slice(gridSkip, gridSkip + gridDeliveredSetup.take)}
        style={{
          height: "480px",
        }}
        rowHeight={15}
        total={totalRows}
        scrollable={"virtual"}
        onPageChange={pageChange}
        sortable={true}
        onSortChange={handleSortChange}
        filterable={true}
        onFilterChange={handleFilter}
        onColumnResize={handlePendingResizeColumn}
        resizable={true}
        dataItemKey={"id"}
        filter={filter}
        cellRender={loadingCell}
        {...gridDeliveredSetup}
      >
        <Column
          title=' '
          cell={actionCell}
          width={67}
          filterable={false}
        ></Column>
        <Column field={deliveredAutoColumns[FIELD_DELIVERED.deliveryNumber].field}
          title='Del No.'
          width={deliveredAutoColumns[FIELD_DELIVERED.deliveryDate].width}>
        </Column>
        <Column
          field={deliveredAutoColumns[FIELD_DELIVERED.deliveryDate].field}
          title='Del Date'
          cell={FormatDateCell}
          filterable={false}
          width={deliveredAutoColumns[FIELD_DELIVERED.deliveryDate].width}
        ></Column>
        <Column
          field={deliveredAutoColumns[FIELD_DELIVERED.createdByName].field}
          title='Created By'
          filterable={false}
          width={deliveredAutoColumns[FIELD_DELIVERED.createdByName].width}
        ></Column>

        <Column field={deliveredAutoColumns[FIELD_DELIVERED.quantityDelivered].field}
          title='Qty Sent'
          filterable={false}
          width={deliveredAutoColumns[FIELD_DELIVERED.quantityDelivered].width} >
        </Column>
        <Column field={deliveredAutoColumns[FIELD_DELIVERED.quantity].field}
          title='Qty Order'
          width={deliveredAutoColumns[FIELD_DELIVERED.quantity].width}
          filterable={false}
        ></Column>
        <Column field={deliveredAutoColumns[FIELD_DELIVERED.clientName].field}
          title='Client Name'
          width={deliveredAutoColumns[FIELD_DELIVERED.clientName].width}
          filterCell={ClientFilterCell}></Column>
        <Column field={deliveredAutoColumns[FIELD_DELIVERED.drawingNumber].field}
          title='Drawing'
          width={deliveredAutoColumns[FIELD_DELIVERED.drawingNumber].width}>
        </Column>
        {/*<Column field={deliveredAutoColumns[FIELD_DELIVERED.revisionNumber].field}*/}
        {/*  title='Rev'*/}
        {/*  width={deliveredAutoColumns[FIELD_DELIVERED.revisionNumber].width}*/}
        {/*  filterable={false}*/}
        {/*></Column>*/}
        <Column field={deliveredAutoColumns[FIELD_DELIVERED.description].field}
          title='Description'
          width={deliveredAutoColumns[FIELD_DELIVERED.description].width}
        ></Column>
        {/*<Column field={deliveredAutoColumns[FIELD_DELIVERED.orderNumber].field}*/}
        {/*  title='Order No.'*/}
        {/*  width={deliveredAutoColumns[FIELD_DELIVERED.orderNumber].width}></Column>*/}
        <Column field={deliveredAutoColumns[FIELD_DELIVERED.jobId].field}
          title='Job No.'
          width={deliveredAutoColumns[FIELD_DELIVERED.jobId].width}
        >
        </Column>
        {/*<Column field={deliveredAutoColumns[FIELD_DELIVERED.dueDate].field}*/}
        {/*  title='Due Date'*/}
        {/*  filterable={false}*/}
        {/*  width={deliveredAutoColumns[FIELD_DELIVERED.dueDate].width}*/}
        {/*  cell={DateFormatCell}>*/}
        {/*</Column>*/}
      </Grid>
    </React.Fragment>

  );
}

export { DeliveredList }
