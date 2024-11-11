import {INewEditData} from '../models/new-qoute-model'

export const transformNewCopyQuote = (editData: INewEditData) => {
  return {
    ...editData,
    id: 0,
    quoteNumber: 'Q',
    quoteNumberSource: editData.quoteNumber,
    // materials: transformCopyQuoteMaterials(editData.materials),
    details: [],
  }
}

export const transformNewVersionQuote = (editData: INewEditData) => {
  return {
    ...editData,
    id: 0,
    jobId: 0,
    quoteNumber: 'Q',
    quoteNumberSource: editData.quoteNumber,
    //   materials: transformVersionQuoteMaterials(editData.materials),
    details: [],
  }
}
