import {IAlert} from '../../../shared/components/CustomAlert'
import { GridSetup } from '../models/resource-model'


export const Initial_GridSetup: GridSetup = {
  sort: [{ field: 'id', dir: 'desc' }],
  skip: 0,
  take: 35,
  filter: {
      logic: "and",
      filters: [],
  }
}
