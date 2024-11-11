import * as React from "react";
import { Grid, GridColumn as Column, GridFilterChangeEvent, GridColumnResizeEvent, GridCellProps, GridFilterCellProps } from "@progress/kendo-react-grid";
import { useEffect, useState } from "react";
import { INITIAL_FILTER, INITIAL_GRIDSETUP, Tabs } from "../constant/config-default";
import { dateFormat, filterToObject } from "../../../shared/service/utils";
import { transformDeliverySort } from "../transformer/delivery-transformer";
import { FIELD_DEFAULT } from "../constant/delivery-default";
import { getDeliveryData } from "../api";
import { GRID_WIDTH, getResizeColumnByName, saveResizeColumn } from "../../../shared/service/grid-setup-utils";
import { FIELD_PENDING, FIELD_PENDING_DELIVERY_COLUMN_KEY } from "../constant/pending-default";
import { BooleanCell } from "../../../shared/components/kendo/format/BooleanCell";
import { NumberCell } from "../../../shared/components/kendo/inline/NumberCell";
import { DeliveryJob } from "../models/delivery-model";
import { CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { LoadingCell } from "../../../shared/components/kendo/LoadingCell";
import { ClientFilterDropdownCell } from "../../../shared/components/kendo/filter/ClientFilterDropdownCellProps";
import { DeliveryContext } from "../context/DeliveryContext";
import { useEffectOnce } from "react-use";

interface IProps {
  handleChangeData: (event: DeliveryJob[]) => void,
  requestReload: boolean,
  handleDoneReload: (event: boolean) => void,
  requestRefresh: boolean,
  doneRefresh: () => void
}
let fetchQue: any;
const PendingDeliveryList: React.FC<IProps> = ({handleChangeData, requestReload, handleDoneReload, requestRefresh, doneRefresh}) => {
  const [selectedData, setSelectedData] = useState<DeliveryJob[]>([])
  const requestInProgress = React.useRef(false);
  const [totalRows, setTotalRows] = useState<number>(0)

  const [gridPendingSetup, setGridPendingSetup] = useState<any>(INITIAL_GRIDSETUP)
  const [pendingAutoColumns, setPendingAutoColumns] = useState<any[]>(FIELD_PENDING_DELIVERY_COLUMN_KEY)
  const [data, setData] = React.useState<any>([]);
  const [filter, setFilter] = useState<CompositeFilterDescriptor>(INITIAL_FILTER)
  const {clients, getAllClientsAsync} = React.useContext(DeliveryContext)

  useEffectOnce(() => {
    if (!clients || clients.length === 0) {
      getAllClientsAsync()
    }
  })

  useEffect(() => {
    if(requestReload) {
      setSelectedData([...[]])
      setData([])
      setTotalRows(0);
      if (fetchQue) {
        clearTimeout(fetchQue);
      }
      fetchQue = setTimeout(function() { 
      requestData(0);
      }, 100)
    }
  }, [requestReload])

  useEffect(() => {
    if (requestRefresh) {
      setFilter(INITIAL_FILTER)
      setData([])
      setTotalRows(0);
      if (fetchQue) {
        clearTimeout(fetchQue);
      }
      fetchQue = setTimeout(function() { 
        requestData(0);
      }, 100)
    }
  }, [requestRefresh])

  const requestIfNeeded = (skip: any) => {
    for (let i = skip; i < skip + gridPendingSetup.take && i < data.length; i++) {
      if (data[i].id === undefined) {
        // request data only if not already fetched
        requestData(skip);
        return;
      }
    }
  };

  const requestData = (skipParameter: any) => {
    var {sort, take} = gridPendingSetup
    const search = requestRefresh ? '' : filterToObject(filter)
    const sortField = transformDeliverySort(sort, FIELD_DEFAULT)

    if (requestInProgress.current) {
      return;
    }
    requestInProgress.current = true;
    const skip = skipParameter; 
    getDeliveryData(skip, take, sortField, search, Tabs.pendingDeliveries, '')
      .then((json) => {
        requestInProgress.current = false;
        const data = json.items;
        var totalC = json.totalCount;
        if (totalRows === 0)
          setTotalRows(totalC)

        const newOrders =
        data.length === totalC
            ? [...data]
            : new Array(totalC).fill({}).map((e, i) => ({
                Index: i,
              }));
        let selectedDataCache = selectedData;

        if (requestReload || requestRefresh) 
          selectedDataCache = [];

        data.forEach((delivery: any, i: any) => {
          const selectedCache = selectedDataCache.find(x => x.jobId === delivery.jobId)
          newOrders[i + skip] = {
            Index: i + skip,
            ...delivery,
            isSelected: selectedCache ? true : false,
            qtyToSend: selectedCache?.quantitySent
          };
          
        });
        setData(newOrders);
        handleDoneReload(false)
        doneRefresh()
      });
  };

  React.useEffect(() => {
    requestIfNeeded(gridPendingSetup.skip);
  }, [data]);

  React.useEffect(() => {
    // request the first page on initial load
    const pendingColumnLocal = getResizeColumnByName(GRID_WIDTH.GRID_PENDING_DELIVERY, FIELD_PENDING_DELIVERY_COLUMN_KEY)
    if (pendingColumnLocal) {
      setPendingAutoColumns(pendingColumnLocal)
    }
    if (fetchQue) {
      clearTimeout(fetchQue);
    }
    fetchQue = setTimeout(function() { 
    requestData(0);
    }, 100)
  }, []);

  

  const pageChange = (event: any) => {
    requestIfNeeded(event.page.skip);
    setGridPendingSetup({
      ...gridPendingSetup,
      skip: event.page.skip,
      take: event.page.take,
    })
  };

  React.useEffect(() => {
       // In filter reset verything
      if (fetchQue) {
        clearTimeout(fetchQue);
      }
      fetchQue = setTimeout(function() { 
       setData([])
       setTotalRows(0);
       requestData(0);
      }, 500)
  }, [filter])

  React.useEffect(() => {
      // In filter reset verything
      if (fetchQue) {
        clearTimeout(fetchQue);
      }
      fetchQue = setTimeout(function() { 
        setData([])
        setTotalRows(0);
        requestData(0);
      }, 100)
  }, [gridPendingSetup.sort])



  const handleSortChange = (pageProps: any) => {
      setGridPendingSetup({
        ...gridPendingSetup,
        sort: pageProps.sort,
      })
  }
  const handleFilter = (filter: GridFilterChangeEvent) => {
    setFilter(filter.filter)
    // setGridPendingSetup({
    //   ...INITIAL_GRIDSETUP,
    //   filter: filter.filter,
    // })
  }
  
  const handlePendingResizeColumn = (props: GridColumnResizeEvent) => {
    saveResizeColumn(props, pendingAutoColumns, GRID_WIDTH.GRID_PENDING_DELIVERY);
  }

  const itemChange = (event: any) => {
    const {dataItem, field} = event
    const newData = data.map((item: any) =>
      item.jobId === dataItem.jobId
        ? {
            ...item,
            [field]: event.value,
            quantitySent: dataItem.isSelected ? dataItem.qtyToSend : 0,
          }
        : item
    )
    
    const selected = selectedData.find(x => x.jobId === dataItem.jobId)
    let cacheSelectedData: any = selectedData;
    if (dataItem.isSelected) {
      if (!selected)
      cacheSelectedData.push(dataItem)
      else {
        const index = cacheSelectedData.indexOf(selected)
        cacheSelectedData[index].quantitySent = dataItem.qtyToSend;
      }
    } else {
      if (selected) {
        const index = selectedData.indexOf(selected)
        if (index > -1)
        cacheSelectedData.splice(index, 1);
      }
    }
    setSelectedData(cacheSelectedData)
    handleChangeData(cacheSelectedData)
    setData(newData)
  }

  const types: string[] = clients.map((client: any) => client.name).filter(name => name.trim() !== '');
  const ClientFilterCell: any = (props: GridFilterCellProps) => (
    <ClientFilterDropdownCell {...props} data={types} defaultItem={''} />
  )
  const gridSkip = isNaN(gridPendingSetup.skip) ? 0 : gridPendingSetup.skip;

  return (
      <React.Fragment>
        {/* {requestInProgress.current && LoadingPanel} */}
        <Grid
          data={data.slice(gridSkip, gridSkip + gridPendingSetup.take)}
          style={{
            height: "500px",
          }}
          rowHeight={15}
          onItemChange={itemChange}
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
          cellRender={LoadingCell}
          {...gridPendingSetup}
          >
          <Column
            field={pendingAutoColumns[FIELD_PENDING.isSelected].field}
            title='Send'
            cell={BooleanCell}
            width={pendingAutoColumns[FIELD_PENDING.isSelected].width}
            filterable={false}
          ></Column>
          <Column
            field={pendingAutoColumns[FIELD_PENDING.qtyToSend].field}
            title='Qty Send'
            cell={NumberCell}
            filterable={false}
            width={pendingAutoColumns[FIELD_PENDING.qtyToSend].width}
          ></Column>
          <Column field={pendingAutoColumns[FIELD_PENDING.clientName].field}
            title='Client Name' 
            width={pendingAutoColumns[FIELD_PENDING.clientName].width}
            filterCell={ClientFilterCell}
            >
          </Column>
          <Column field={pendingAutoColumns[FIELD_PENDING.orderNumber].field}
            title='Order No.'
            width={pendingAutoColumns[FIELD_PENDING.orderNumber].width}></Column>
          <Column field={pendingAutoColumns[FIELD_PENDING.jobId].field} 
            title='Job No.'
            width={pendingAutoColumns[FIELD_PENDING.jobId].width}>
          </Column>
          <Column field={pendingAutoColumns[FIELD_PENDING.drawingNumber].field} 
            title='Drawing'
            width={pendingAutoColumns[FIELD_PENDING.drawingNumber].width}>
          </Column>
          <Column field={pendingAutoColumns[FIELD_PENDING.revisionNumber].field} 
            title='Rev'
            width={pendingAutoColumns[FIELD_PENDING.revisionNumber].width}
            filterable={false}>
          </Column>
          <Column field={pendingAutoColumns[FIELD_PENDING.description].field} 
            title='Description'
            width={pendingAutoColumns[FIELD_PENDING.description].width}>
          </Column>
          <Column field={pendingAutoColumns[FIELD_PENDING.quantity].field}
            title='Qty' 
            filterable={false}
            width={pendingAutoColumns[FIELD_PENDING.quantity].width}></Column>
          <Column
              field={pendingAutoColumns[FIELD_PENDING.quantityDelivered].field}
              title='Sent'
              filterable={false}
              width={pendingAutoColumns[FIELD_PENDING.quantityDelivered].width}
          ></Column>
          <Column
            field={pendingAutoColumns[FIELD_PENDING.dueDate].field}
            title='Due Date'
            filterable={false}
            width={pendingAutoColumns[FIELD_PENDING.dueDate].width}
            cell={(props: GridCellProps) => (
              <td className='k-command-cell'>
                <span>{dateFormat(props.dataItem.dueDate)}</span>
              </td>
            )}
          ></Column>
      </Grid>
      </React.Fragment>
      
  );
}

export { PendingDeliveryList }
