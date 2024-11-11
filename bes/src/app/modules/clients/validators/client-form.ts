import * as yup from 'yup'
export const clientFormValidationSchema = yup.object().shape({
    id: yup.number(),
    clientId: yup.string(),
    name: yup.string().required('Required.'),
    phone: yup.string(),
    fax: yup.string(),
    email: yup.string(),
    contactPerson: yup.string(),
    operatingHrs: yup.string(),
    clientType: yup.string()
})


export const addressFormValidationSchema = yup.object().shape({
    id: yup.number(),
    addressType: yup.string(),
    street: yup.string().required('Required.'),
    suburb: yup.string().required('Required.'),
    state: yup.string().required('Required.'),
    postCode: yup.string().required('Required.'),
    refId: yup.number()
})


export const contactFormValidationSchema = yup.object().shape({
    id: yup.number(),
    contactName: yup.string().required('Required.'),
    position: yup.string().required('Required.'),
    phone: yup.string().required('Required.'),
    mobile: yup.string().required('Required.'),
    email: yup.string().required('Required.'),
    refId: yup.number()
})


