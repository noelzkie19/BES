import {SortDescriptor} from '@progress/kendo-data-query'
import axios from 'axios'
import {Resource} from '../models/resource-model'

export const RESOURCE_URL = `${process.env.REACT_APP_API_URL}/resource`

export const getResources = async (
  skip: number,
  take: number,
  pageSort: SortDescriptor,
  search?: string
) => {
  return await axios.post(`${RESOURCE_URL}/getresourceswithpagination`, {
    skip,
    take,
    sort: `${pageSort.field} ${pageSort.dir}`,
    search,
  })
}

export const createResource = async (form: Resource) => {
  const payload: Resource = form
  const response = await axios.post(`${RESOURCE_URL}`, payload)
  return response?.data ?? []
}

export const updateResource = async (form: Resource) => {
  const payload: Resource = form
  return await axios.put(`${RESOURCE_URL}`, payload)
}
export const deleteResource = async (form: Resource) => {
  return await axios.delete(`${RESOURCE_URL}?id=${form.id}`)
}


export const getResourceById = async (id: number) => {
  const response = await axios.get(`${RESOURCE_URL}/getresourcebyid?id=${id}`)
  return response?.data ?? []
}

