import {IAlert} from '../../../shared/components/CustomAlert'
import {Resource,GridSetup} from '../models/resource-model'

export const RESOURCE_FORM_DEFAULT: Resource = {
  id: 0,
  name: '',
  description: '',
  hourlyRate: 0,
  isActive: true,
}

export const TOASTER_DEFAULT: IAlert = {
  message: ``,
  header: ``,
  type: 'success',
}
export const Initial_GridSetup: GridSetup = {
  sort: [{ field: 'id', dir: 'desc' }],
  skip: 0,
  take: 35,
  filter: {
      logic: "and",
      filters: [],
  }
}