
import React, { useRef, useState } from 'react';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

import PrintJobDetails from '../toPrint/PrintJobDetails';
import { Button } from 'react-bootstrap-v5';
import { updateDuplicateprint } from '../../api';

const JobPrintButton = (props: any) => {
    const componentRefJobDetails = useRef<any>()
    const onAfterPrint = () => {
        props.afterJobPrintHandler();
        updateDuplicateprint(props.jobDetails.id);
    };


    return (
        <React.Fragment>
            <div style={{ display: 'none' }}>
                <PrintJobDetails
                    refs={componentRefJobDetails}
                    purchaseOrder={props.purchaseOrder}
                    operations={props.operations}
                    jobDetails={props.jobDetails}
                    users={props.users}
                    resources={props.resources}
                />
            </div>
            {componentRefJobDetails.current && (
                <ReactToPrint
                content={() => componentRefJobDetails.current}
                pageStyle={`@media print {
                    @page {
                        size: landscape;
                    }
                }`}
                onAfterPrint={onAfterPrint}
                >
                <PrintContextConsumer>
                    {({ handlePrint }) => (
                        <button type='button' className='btn btn-primary btn-action' tabIndex={20}
                            ref={props.btnRef} onClick={handlePrint}>Print Job Card</button>
                    )}
                </PrintContextConsumer>
                </ReactToPrint>
            )}
         
        </React.Fragment>
    );
};

export { JobPrintButton }