import * as yup from 'yup'
export const aboutFormValidationSchema = yup.object().shape({
    id: yup.number(),
    address: yup.string().required('Required.'),
    phone: yup.string().required('Required.'),
    email: yup.string().required('Required.'),
    website: yup.string().required('Required.'),
    abn: yup.string().required('Required.'),
})