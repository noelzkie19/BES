
import * as yup from 'yup'
export const operationFormValidationSchema = yup.object().shape({
    id: yup.number(),
    refId: yup.number()
})


