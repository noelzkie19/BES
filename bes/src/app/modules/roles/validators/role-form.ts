import * as yup from 'yup'
export const roleFormValidationSchema = yup.object().shape({
    id: yup.string(),
    name: yup.string().required('Required.'),
    displayId: yup.number()
})
