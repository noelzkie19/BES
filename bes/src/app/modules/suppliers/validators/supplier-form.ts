import * as yup from 'yup'

const regex = '^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$';

export const supplierFormValidationSchema = yup.object().shape({
    id: yup.number(),
    supplierId: yup.string(),
    name: yup.string().required('Required.'),
    phone: yup.string(),
    fax: yup.string(),
    email: yup.string(),
    contactPerson: yup.string(),
    operatingHrs: yup.string(),
    // phone: yup.mixed().test({
    //     test: function (val) {
    //         const value = val;
    //         if (value < schema.parent.from) 
    //             return this.createError({ message: 'Date To must be greater than Date From.' })
           
           
    //             return true
    //     }
    // })
})


export const addressFormValidationSchema = yup.object().shape({
    id: yup.number(),
    addressType: yup.string(),
    street: yup.string(),
    suburb: yup.string(),
    state: yup.string(),
    postCode: yup.string(),
    postalAddress: yup.string(),
    postalSuburb: yup.string(),
    postalState: yup.string(),
    postalPostCode: yup.string(),
    refId: yup.number()
})


export const contactFormValidationSchema = yup.object().shape({
    id: yup.number(),
    contactName: yup.string().required('Required.'),
    position: yup.string(),
    phone: yup.string(),
    mobile: yup.string(),
    email: yup.string()
})

export const printFormValidationSchema = yup.object().shape({
    to: yup.mixed().test({
        test: function (val, schema) {
            const value = val;
            if (value < schema.parent.from) 
            return this.createError({ message: 'Date To must be greater than Date From.' })
            return true
        }
    })
})
