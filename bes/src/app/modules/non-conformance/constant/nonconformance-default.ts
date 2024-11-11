import { IAlert } from "../../../shared/components/CustomAlert";
import { INonConformance } from "../models/nonconformance-model";

export const NON_CONFORMANCEFORM_DEFAULT: INonConformance = {
  id: 0,
  ncrNumber: '',
  clientNcrNumber: '',
  recordedBy: '',
  dateRecorded: new Date(),
  jobNumber: 0,
  natureOfNonConference: '',
  operator: '',
  determineCause: '',
  otherCause: '',
  correctedAction: '',
  action: 0,
  actionDate: new Date(),
  reviewOfCorrectiveAction: '',
  reviewDate: new Date(),
  undertakenBy: 0,
  completedDate: new Date(),
  ncrClearedBy: 0,
  ncrClearedDate: new Date(),
  note: '',
  purchaseNumber: '',
  correctiveNotes: '',
  natureNotes: '',
  linkTo: '',
  clientName: '',
  displayJobId: '',
  iunderTakenBy: 0
}


export const TOASTER_DEFAULT: IAlert = {
    message: ``,
    header: ``,
    type: 'success'
}

