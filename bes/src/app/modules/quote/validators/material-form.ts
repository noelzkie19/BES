
import * as yup from 'yup'
export const materialFormValidationSchema = yup.object().shape({
    id: yup.number()
})
