import * as yup from 'yup'
export const stockFormValidationSchema = yup.object().shape({
    id: yup.number(),
    clientName: yup.string(),
    description: yup.string().required('Required.'),
    notes: yup.string().required('Required.'),
    drawing: yup.string().required('Required.'),
    revision: yup.string().required('Required.'),
    quantity: yup.number().required('Required.'),
    jobId: yup.number().required('Required.'),
    clientId: yup.string().required('Required'),
})
