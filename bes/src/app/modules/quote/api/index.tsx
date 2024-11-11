import axios from 'axios'
import {SortDescriptor} from '@progress/kendo-data-query'
import {SEARCH_DEFAULT} from '../constant/quote-default'
import {IQuote, IQuoteSearch} from '../models/quote-model'
import {INewEditData} from '../models/new-qoute-model'

export const QUOTE_URL = `${process.env.REACT_APP_API_URL}/quote`
export const CLIENT_URL = `${process.env.REACT_APP_API_URL}/client`

export const getQuotes = async (
  skip: number,
  take: number,
  pageSort: SortDescriptor,
  search?: any,
  advanceSearch?: string,
  includeVersion?: boolean
) => {
  try {
    const response = await axios.post(`${QUOTE_URL}/getquoteswithpagination`, {
      skip,
      take,
      ...search,
      advanceSearch,
      sort: `${pageSort.field} ${pageSort.dir}`,
      includeVersion: includeVersion,
    })
    return response?.data ?? []
  } catch (err) {
    return []
  }
}

export const deleteQuote = async (form: any) => {
  return await axios.delete(`${QUOTE_URL}?id=${form.id}`)
}

export const getAllClients = async (keyword: any) => {
  return await axios.get(`${CLIENT_URL}/getclientlist`)
}
export const getClientById = async (id: number) => {
  try {
    const data = await axios.get(`${CLIENT_URL}/getclientbyid?id=${id}`)
    return [data, null]
  } catch (ex) {
    return [null, ex]
  }
}

export const createQuote = async (form: IQuote) => {
  const payload: IQuote = form
  payload.delivered = true
  payload.quantityDelivered = 1
  payload.date = new Date()
  const response = await axios.post(`${QUOTE_URL}`, payload)
  return response?.data ?? []
}

export const createNewQuote = async (form: INewEditData) => {
  const payload: INewEditData = form
  const response = await axios.post(`${QUOTE_URL}`, payload)
  return response?.data ?? []
}

export const updateQuote = async (form: IQuote) => {
  const payload: IQuote = form
  payload.delivered = true
  payload.quantityDelivered = 1
  payload.date = new Date()
  const response = await axios.put(`${QUOTE_URL}`, payload)
  return response?.data ?? []
}

export const updateNewQuote = async (form: INewEditData) => {
  const payload: INewEditData = form
  const response = await axios.put(`${QUOTE_URL}`, payload)
  return response?.data ?? []
}

export const confirmQuote = async (form: IQuote) => {
  const payload: IQuote = form
  payload.delivered = true
  payload.quantityDelivered = 1
  payload.date = new Date()
  const response = await axios.post(`${QUOTE_URL}/confirmquote`, payload)
  return response?.data ?? []
}

export const printQuote = async (form: IQuote) => {
  const payload: IQuote = form
  payload.delivered = true
  // payload.jobTypeId = 1
  payload.quantityDelivered = 1
  payload.date = new Date()
  // payload.revisionNumber = "20"
  // payload.drawingNumber = "22"
  await axios.post(`${QUOTE_URL}/printquote`, payload)
}

export const convertQuoteToJob = async (form: IQuote) => {
  const payload: IQuote = form
  payload.delivered = true
  // payload.jobTypeId = 1
  payload.quantityDelivered = 1
  payload.date = new Date()
  // payload.revisionNumber = "20"
  // payload.drawingNumber = "22"
  await axios.post(`${QUOTE_URL}/convertquotetojob`, payload)
}
export const getQuoteByid = async (id: any) => {
  try {
    const data = await axios.get(`${QUOTE_URL}/getquotebyid?id=${id}`)
    return [data, null]
  } catch (ex) {
    return [null, ex]
  }
}
export const getQuoteWithVersion = async (quoteNumber: any) => {
  try {
    const data = await axios.get(`${QUOTE_URL}/getquotewithversion?quoteNumber=${quoteNumber}`)
    return [data, null]
  } catch (ex) {
    return [null, ex]
  }
}
export const sendEmailQuotePdf = (
  file: any,
  sendTo: any,
  userName: any,
  clientName: any,
  quoteId: any,
  id: any,
  clientId: any
) => {
  return new Promise((resolve, reject) => {
    var form = new FormData()
    form.append('sendTo', sendTo)
    form.append('userName', userName)
    form.append('Attachment', file)
    form.append('clientName', clientName)
    form.append('quoteId', quoteId)
    form.append('id', id)
    form.append('clientId', clientId)
    axios
      .post(`${QUOTE_URL}/sendemailquotepdf`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(resolve)
      .catch(reject)
  })
}

export const updatePrintDate = async (quoteId: number) => {
  return await axios.patch(`${QUOTE_URL}/updatequotedateprint`, {
    id: quoteId,
  })
}

export const createQuoteVersion = async (quoteId: number) => {
  return await axios.post(`${QUOTE_URL}/createquoteversion`, {
    id: quoteId,
  })
}

export const createCopyQuote = async (quoteId: number) => {
  return await axios.post(`${QUOTE_URL}/createcopyquote`, {
    id: quoteId,
  })
}

export const getQuotesPrint = async (printPayload: any) => {
  return await axios.post(`${QUOTE_URL}/getquotesprint`, printPayload)
}
