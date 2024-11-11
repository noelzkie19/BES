
import * as yup from 'yup'
export const jobFormValidationSchema = yup.object().shape({
    id: yup.number(),
    // jobId: yup.string(),
    description: yup.string().required('Description Required.'),
    clientId: yup.mixed().test({
        test: function (value) {
            const numberVal = Number(value)
            if (!value) return this.createError({ message: 'Required.' })
            else if (isNaN(numberVal)) return this.createError({ message: 'Invalid value.' })
            else if (numberVal <= 0)
                return this.createError({ message: 'This field is required' })
            return true
        }
    }),
    jobTypeId: yup.mixed().test({
        test: function (value) {
            const numberVal = Number(value)
            if (!value) return this.createError({ message: 'Required.' })
            else if (isNaN(numberVal)) return this.createError({ message: 'Invalid value.' })
            else if (numberVal <= 0)
                return this.createError({ message: 'This field is required' })
            return true
        }
    }),
    // quantity: yup.number(),
    // quantityDelivered: yup.number(),
    // orderNumber: yup.mixed().test({
    //     test: function (val) {
    //         const value = val;
    //         const regex =  /([\w-]+)/;
    //         if (!value) return this.createError({ message: 'Required.' })
    //         else if (!value.match(regex)) return this.createError({ message: 'Alphanumeric only.' })
    //         return true
    //     }
    // }),
    // drawingNumber: yup.mixed().test({
    //     test: function (val) {
    //         const value = val;
    //         const regex = /([\w-]+)/;
    //         if (!value) return this.createError({ message: 'Required.' })
    //         else if (!value.match(regex)) return this.createError({ message: 'Alphanumeric only.' })
    //         return true
    //     }
    // }),
    // revisionNumber: yup.mixed().test({
    //     test: function (val) {
    //         const value = val;
    //         const regex =  /([\w-]+)/;
    //         if (!value) return this.createError({ message: 'Required.' })
    //         else if (!value.match(regex)) return this.createError({ message: 'Alphanumeric only.' })
    //         return true
    //     }
    // }),
    // ncrNumber: yup.string(),
    // materialCostVariable: yup.number().min(0, 'Cannot Exceed minimum percent').max(100, 'Cannot Exceed maximum percent.')
})


export const printFormValidationSchema = yup.object().shape({
    // to: yup.mixed().test({
    //     test: function (val, schema) {
    //         const value = val;
    //         if (value < schema.parent.from) 
    //         return this.createError({ message: 'Date To must be greater than Date From.' })
    //         return true
    //     }
    // })
})
