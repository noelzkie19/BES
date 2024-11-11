import {EditorUtils} from '@progress/kendo-react-editor'
import {useInternationalization} from '@progress/kendo-react-intl'
import moment from 'moment'

const SQL_DATE_FORMAT = 'yyyyMMdd hh:mm:ss'
export const GRID_PENDING_DELIVERY_STATE = 'gridPendingDeliveryState'
export const GRID_DELIVERY_STATE = 'gridDeliveryState'

const mappings: any = {
  eq: "{0} = '{1}'",
  neq: "{0} != '{1}'",
  isnull: '{0} IS NULL',
  isnotnull: '{0} IS NOT NULL',
  lt: "{0} < '{1}'",
  lte: "{0} <= '{1}'",
  gt: "{0} > '{1}'",
  gte: "{0} >= '{1}'",
  startswith: "{0} LIKE '{1}%'",
  doesnotstartwith: "{0} NOT LIKE '{1}%'",
  contains: "{0} LIKE '%{1}%'",
  doesnotcontain: "{0} NOT LIKE '%{1}%'",
  isempty: "{0} = ''",
  isnotempty: "{0} != ''",
}

export const ANDREW_SIGNATURE_MESSAGE =
  '<p>' +
  'Kind regards,' +
  '<p></p>' +
  `Andrew Cairns <br class='ProseMirror-trailingBreak'> Managing Director` +
  '<p></p>' +
  `Brisbane Engineering Services <br class='ProseMirror-trailingBreak'>` +
  `4/12 Maiella Street Stapylton Qld 4207 <br class='ProseMirror-trailingBreak'>` +
  `Ph: 07 3807 9918 <br class='ProseMirror-trailingBreak'>` +
  '<span style="text-decoration: underline; text-decoration-color: blue; color: blue">www.be-services.com.au</span>' +
  '<p></p>' +
  `<p style="font-size: 12px;"><b>ALL DELIVERIES/COLLECTIONS: Unit 4, 12 Maiella Street, Stapylton, Qld, 4207, Australia<br class='ProseMirror-trailingBreak'>` +
  `BETWEEN: Mon-Thu 7.00am to 3.30pm and Fri 7.00am to 1.00pm</b></p>` +
  `<img src="https://bes.c9solutions.com.au/images/signature/signature-1.png" alt="no-image-found" height="200px"></img><br class='ProseMirror-trailingBreak'>` +
  `<img src="https://bes.c9solutions.com.au/images/signature/signature-2.png" alt="no-image-found" height="200px"></img>` +
  '</p>'

export const LARA_SIGNATURE_MESSAGE =
  '<p>' +
  'Kind regards,' +
  '<p></p>' +
  `Lara Cairns` +
  '<p></p>' +
  `Brisbane Engineering Services <br class='ProseMirror-trailingBreak'>` +
  `4/12 Maiella Street Stapylton Qld 4207 <br class='ProseMirror-trailingBreak'>` +
  `Ph: 07 3807 9918 <br class='ProseMirror-trailingBreak'>` +
  '<span style="text-decoration: underline; text-decoration-color: blue; color: blue">www.be-services.com.au</span>' +
  '<p></p>' +
  `<p style="font-size: 12px;"><b>ALL DELIVERIES/COLLECTIONS: Unit 4, 12 Maiella Street, Stapylton, Qld, 4207, Australia<br class='ProseMirror-trailingBreak'>` +
  `BETWEEN: Mon-Thu 7.00am to 3.30pm and Fri 7.00am to 1.00pm</b></p>` +
  `<img src="https://bes.c9solutions.com.au/images/signature/signature-1.png" alt="no-image-found" height="200px"></img><br class='ProseMirror-trailingBreak'>` +
  `<img src="https://bes.c9solutions.com.au/images/signature/signature-2.png" alt="no-image-found" height="200px"></img>` +
  '</p>'

export const toSQLExpression = (filter: any) => {
  if (!filter) return
  var {filters} = filter
  var result = ''
  for (let i = 0; i < filters.length; i++) {
    if (i !== 0) {
      result += ` ${filter.logic} `
    }

    var {operator, field, value} = filters[i]
    var mapping = mappings[operator]
    let type: typeof value

    if (type === 'date') {
      value = value.toString(value, SQL_DATE_FORMAT)
    }
    var query = mapping.replace('{0}', field).replace('{1}', value)
    result += query
  }

  return result
}

export const toObjectExpression = (filter: any) => {
  var data: any = {}
  ;((filter !== null && filter.filters) || []).forEach((filter: any) => {
    var {field, value} = filter
    data[field] = value
  })
  return data
}

export const toLinQExpression = (filter: any) => {
  let data: any = ''
  ;((filter !== null && filter.filters) || []).forEach((filter: any, index: number) => {
    if (index > 0) data += ' and '
    var {field, value, type} = filter
    value = value.trim()
    if (typeof 0 === type) {
      data += `${field} = (${value})`
    } else if (typeof true === type) {
      if (field === 'InActive') {
        data += `${field}.equals(${value !== 'Active'} || ${value === 'Delivered'})`
      } else data += `${field}.equals(${value === 'Active'} || ${value === 'Delivered'})`
    } else if (typeof new Date() === type) {
      if (value) {
        const newValue = dateFormat(value)
        data += `${field} = DateTime.ParseExact("${newValue}", "dd/MM/yyyy", null)`
      }
    } else {
      data += `${field}.startswith("${value}")`
    }
  })
  return data
}

// mm/dd/yyyy date args
export const dateFormat = (date: any) => {
  if (!date) return null
  date = new Date(date)
  return moment(date).format('DD/MM/YYYY')
}

// dd/mm/yyyy to dates (With Seconds)
export const dateFormatDDMMYYY = (dateString: any) => {
  if (!dateString) return null
  var dateParts = dateString.split('/')

  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).setSeconds(1)
}

// dd/mm/yyyy to dates
export const stringToDateFormat = (dateString: any) => {
  if (!dateString) return null
  const dateParts = dateString.split('/')
  const newDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
  const rDate: any = moment(newDate).add(1, 'seconds')
  return rDate._d
}

export const validateDate = (date: Date) => {
  if (!moment(date).isValid()) return false

  if (date.getFullYear() < 1900) return false

  return true
}

export const CurrencyFormatter = (value: number) => {
  const intl = useInternationalization()
  if (!value) return intl.formatNumber(0, 'c')

  return intl.formatNumber(value, 'c')
}

export const userCanEdit = (roles?: string[]) => {
  const data = (roles || ['']).find((role: string) => role === 'Administrator')
  return data !== undefined
}

export const unique = (value: any, index: any, self: any) => {
  return self.indexOf(self.find((t: any) => t.clientId === value.clientId)) === index
}
export const filterToObject = (filter: any) => {
  var data = {}
  ;((filter !== null && filter.filters) || []).forEach((filter: any) => {
    var {field, value} = filter
    if (value) var newVal = typeof value === 'string' ? value.trim() : value
    data = {
      ...data,
      [field]: newVal,
    }
  })
  return data
}

export const onKeyDownHandler = (event: any, fieldColumnKey: any) => {
  let {dataItem, dataIndex, colIndex} = event
  const {field} = fieldColumnKey[fieldColumnKey.length - 1]
  if (event.field === field) {
    colIndex = 0
    dataIndex++
  }

  let nextField = fieldColumnKey[colIndex].field
  let nextEditable = fieldColumnKey[colIndex].editable

  while (!nextEditable) {
    colIndex++
    // if last field is not editable
    if (colIndex == fieldColumnKey.length && !nextEditable) {
      colIndex = 0
      dataIndex++
    }

    nextField = fieldColumnKey[colIndex].field
    nextEditable = fieldColumnKey[colIndex].editable
  }
  return {dataItem, nextField, dataIndex}
}

export const formatMobileNumber = (input: any) => {
  // Remove all non-digit characters
  if (!input) {
    return ''
  }
  const cleanedInput = input.replace(/\D/g, '')

  // Format the number as 'xxx xxx xxx'
  let formattedNumber = ''
  if (cleanedInput.length > 0) {
    formattedNumber += cleanedInput.slice(0, 4)
  }
  if (cleanedInput.length >= 4) {
    formattedNumber += ' ' + cleanedInput.slice(4, 7)
  }
  if (cleanedInput.length >= 8) {
    formattedNumber += ' ' + cleanedInput.slice(7, 10)
  }
  return formattedNumber
}

export const formatPhoneNumber = (input: any) => {
  if (!input) {
    return ''
  }
  // Remove all non-digit characters
  const cleanedInput = input.replace(/\D/g, '')

  // Format the number as 'xx 1234 5678'
  let formattedNumber = ''
  if (cleanedInput.length > 0) {
    formattedNumber += cleanedInput.slice(0, 2)
  }
  if (cleanedInput.length >= 3) {
    formattedNumber += ' ' + cleanedInput.slice(2, 6)
  }
  if (cleanedInput.length >= 7) {
    formattedNumber += ' ' + cleanedInput.slice(6, 10)
  }

  return formattedNumber
}

export const formatLandNumber = (input: any) => {
  if (!input) {
    return ''
  }
  // Remove all non-digit characters
  const cleanedInput = input.replace(/\D/g, '')

  // Format the number as '0X 1234 5678'
  let formattedNumber = '(61) '
  if (cleanedInput.length > 0) {
    formattedNumber += cleanedInput.slice(0, 4)
  }
  if (cleanedInput.length >= 4) {
    formattedNumber += ' ' + cleanedInput.slice(4, 8)
  }

  return formattedNumber
}

export const gtsComputation = (quantity: number, unitPrice: number, gst: boolean) => {
  return gst ? quantity * unitPrice * 0.1 : 0
}

export const insertImageFiles = ({view, files, nodeType, position, attrs = {}}: any) => {
  if (EditorUtils.canInsert(view.state, nodeType)) {
    files.forEach((file: any) => {
      let reader = new FileReader()
      reader.onload = function (e: any) {
        const image = nodeType.createAndFill({
          ...attrs,
          src: e.target.result,
        })
        if (position) {
          view.dispatch(view.state.tr.insert(position.pos, image))
        } else {
          EditorUtils.insertNode(view, image, true)
        }
      }
      reader.readAsDataURL(file)
    })
  }
}

export const extractImages64Id = (content: string) => {
  let imageBaseId: string[] = []
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')
  const imgElements: any = doc.getElementsByTagName('img')

  for (let img of imgElements) {
    const imgUrl = img.getAttribute('src')
    const extracted = extractBase64ImageData(imgUrl)
    if (extracted && extracted.base64Data) {
      imageBaseId.push(extracted?.base64Data)
    }
  }

  return imageBaseId
}

export const extractBase64ImageData: any = (inputString: string) => {
  const pattern = /data:image\/(.*);base64,(.*)/
  const match = inputString.match(pattern)

  if (match && match.length === 3) {
    const mimeType = match[1]
    const base64Data = match[2]
    return {
      mimeType,
      base64Data,
    }
  } else {
    return null
  }
}

export const dateFormatddMMMyy = (inputDate: Date): string => {
  return moment(inputDate).format('DD-MMM-YY')
}

export const capitapizeText = (value: any) => {
  // Remove non-text characters using a regular expression
  const sanitizedValue = value.replace(/[^a-zA-Z]/g, '')
  // Capitalize the sanitized value
  const capitalizedValue = sanitizedValue.toUpperCase()
  return capitalizedValue
}
