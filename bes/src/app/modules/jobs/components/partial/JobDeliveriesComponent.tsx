
import {
    Grid,
    GridCellProps,
    GridColumn as Column
} from '@progress/kendo-react-grid'
import React, { useEffect, useState } from 'react'
import { DateFormatCell } from '../../../../shared/components/kendo/format/DateFormatCell';
import { IJobDelivery, JobNote } from '../../models/job-model';

const JobDeliveriesComponent: React.FC<any> = (props: any) => {
    
    const [jobDeliveries, setJobDeliveries] = useState<IJobDelivery[]>(props.jobDeliveries)

    useEffect(() => {
        if (props.jobDeliveries) {
            setJobDeliveries(props.jobDeliveries)
        }
    }, [props.jobDeliveries])

    return (
        <React.Fragment>
            <Grid
                className='mt-5'
                resizable={true}
                data={(jobDeliveries || [])}
            >
                <Column field='deliveryNumber' title='Delivery Number' />
                <Column field='deliveryDate' title='Delivery Date' cell={DateFormatCell}></Column>
                <Column field='quantitySent' title='Quantity Sent'></Column>
                <Column field='createdBy' title='Created By'></Column>
            </Grid>

        </React.Fragment>
    )
}

export { JobDeliveriesComponent }