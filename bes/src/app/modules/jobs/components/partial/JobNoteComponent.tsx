
import {
    Grid,
    GridCellProps,
    GridColumn as Column
} from '@progress/kendo-react-grid'
import React, { useEffect, useState } from 'react'
import { AddButtonHeader } from '../../../../../_metronic/partials/content/button/kendo/AddButtonHeader';
import { GridActionIconCell } from '../../../../../_metronic/partials/widgets/grid/action/GridActionIconCell';
import { ActionEnum, ActionOption } from '../../../../../_metronic/partials/widgets/grid/constant/ActionOption';
import { InCellTextCell } from '../../../../shared/components/kendo/incell/InCellTextCell';
import { CellRender, RowRender } from '../../../../shared/components/kendo/renderer';
import { JOB_NOTE_DEFAULT } from '../../constant/job-default'
import { JobNote } from '../../models/job-model';
import { JobNotesModal } from '../modal/JobNotesModal';
import { Modal1 } from '../../../../../_metronic/partials/modals/Modal1';

const EDIT_FIELD = 'inEdit'
const JobNoteComponent: React.FC<any> = (props: any) => {
    
    const [jobNotes, setJobNotes] = useState<JobNote[]>(props.jobNotes)
    const [isShowModal, setIsShowModal] = useState<boolean>(false)
    const [selectedJobNote, setSelectedJobNote] = useState<JobNote>(JOB_NOTE_DEFAULT)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isShowDeletedModal, setIsShowDeletedModal] = useState<boolean>(false)

    useEffect(() => {
        if (props.jobNotes) {
            setJobNotes(props.jobNotes)
        }
    }, [props.jobNotes])
    
    const addJobNote = () => {
        props.addJobNotes({...JOB_NOTE_DEFAULT})
        setSelectedIndex(0)
        setIsEdit(false)
    }

    const closeHandler = () => {
        setIsShowModal(false)
        setIsEdit(false)
        setSelectedIndex(0)
    }

    const enterEdit = (_: any, field: any, dataIndex: any) => {
        if (!props.isCanEdit) return;
        jobNotes.forEach((item, index) => {
            var newData = {
                ...item,
                [EDIT_FIELD]: dataIndex === index ? field : undefined,
               isEdit: dataIndex === index,
            }
           props.updateJobNotes(index, newData)
       })
    }

    const exitEdit = () => {
        jobNotes.forEach((item, index) => {
            var newData = {
                ...item,
                [EDIT_FIELD]: undefined,
                isEdit: false,
            }
            props.updateJobNotes(index, newData)
        })
    }

    
    const itemChange = (event: any) => {
        let field = event.field || ''
        event.dataItem[field] = event.value
        const idx = jobNotes.findIndex((po) => po.isEdit)

        props.updateJobNotes(idx, event.dataItem)
        // preload Notes for exit edit
        jobNotes[idx] = event.dataItem
        setJobNotes(jobNotes)
    }

    const customRowRender = (tr: any, props: any) => (
        <RowRender originalProps={props} tr={tr} exitEdit={exitEdit} editField={EDIT_FIELD} />
    )

    const customCellRender = (td: any, cellProps: GridCellProps) => (
        <CellRender
            originalProps={cellProps}
            td={td}
            enterEdit={enterEdit}
            editField={EDIT_FIELD}
            exitEdit={exitEdit}
        />
   )

   const textCell = (cellProps: GridCellProps) => (
        <InCellTextCell
        props={cellProps}
        enterEdit={enterEdit}
        onChange={itemChange}
        exitEdit={exitEdit}
        />
   )



    const ActionCell = (props: GridCellProps) => (
        <GridActionIconCell actions={[
            ActionOption.Delete
        ]}
        gridCellProps={props}
        changeHandler={actionHandler} />
    )


     const actionHandler = (event: any, dataItem: any, dataIndex: number) => {
        if (!props.isCanEdit) return;
        setSelectedIndex(dataIndex)
        setSelectedJobNote(dataItem)
        switch(event) {
          case ActionEnum.Edit: 
            setIsShowModal(true)
            setIsEdit(true)
            break;
          case ActionEnum.Delete: 
            setIsShowDeletedModal(true)
            break;
        }
      }

      
    const proceedHandler = () => {
        setIsShowDeletedModal(false)
        if (selectedJobNote.refId && selectedJobNote.refId > 0) {
            props.updateJobNotes(selectedIndex, { ...selectedJobNote, isDeleted: true })
        } else {
            props.removeJobNotes(selectedJobNote)
        }
    }



    const addButtonHeader = (bprops: any) => {
        return (
         <AddButtonHeader title={bprops.title} clickHandler={addJobNote} isCanEdit={props.isCanEdit}></AddButtonHeader>
        );
    };
 
    return (
        <React.Fragment>
        <Modal1 show={isShowDeletedModal}
            title={`Delete Note in row ${selectedIndex + 1}.`}
            message={'You are deleting an Note, Continue?'}
            handleClose={() => setIsShowDeletedModal(false)}
            proceed={proceedHandler}/>
            {
                isShowModal && (
                    <JobNotesModal 
                        jobNote={selectedJobNote}
                        toggleDialog={closeHandler}
                        proceedConfirm={proceedHandler}
                        />
                )
            }
        <Grid
            className='mt-5'
            resizable={true}
            reorderable={true}
            style={{width: '100%', height: '20vh'}}
            data={(jobNotes || []).filter((ops) => !ops.isDeleted)}
            cellRender={customCellRender}
            rowRender={customRowRender}
            onItemChange={itemChange}
            editField={EDIT_FIELD}
        >
            
            <Column cell={ActionCell} editable={false} 
                headerCell={addButtonHeader}
                width={80}/>
            <Column field='note' title='Note' editable={props.isCanEdit} cell={textCell}/>
            {/* <Column field='date' title='Date' editable={false} cell={DateFormatCell}></Column>
            <Column field='createdByName' title='Created By' editable={false}></Column> */}
        </Grid>

        </React.Fragment>
    )
}

export { JobNoteComponent }