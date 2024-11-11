import * as yup from 'yup'

export const purchaseLineFormValidationSchema = yup.object().shape({
    id: yup.number(),
})
