
import * as yup from 'yup'
export const quoteFormValidationSchema = yup.object().shape({
    id: yup.number(),
    number: yup.number(),
    description: yup.string(),
    quantity: yup.number(),
    costPerItem: yup.number(),
    totalCost: yup.number(),
    orderNumber: yup.string(),
    drawingNumber:  yup.string(),
    revisionNumber:  yup.string(),
    ncrNumber: yup.string(),
    estimationCost: yup.number(),
    setupText:  yup.string(),
    completedBy:  yup.string(),
    paymentTerms:  yup.string(),
    clientId: yup.mixed().test({
            test: function (val) {
                const value = val;
                if (!value) return this.createError({ message: 'Client is Required.' })

                else if (value <= 0) return this.createError({ message: 'Client is Required.' })

                return true
            }
     }),
    jobId: yup.number(),
    estLeadTime: yup.string(),
    // estLeadTime: yup.mixed().test({
    //     test: function (val) {
    //         const value = val;
    //         const regex =  /([\w-]+)/;
    //         if (!value) return this.createError({ message: 'Required.' })
    //         else if (!value.match(regex)) return this.createError({ message: 'Alphanumeric only.' })
    //         return true
    //     }
    // }),
})
