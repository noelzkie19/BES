import * as yup from 'yup'

export const purchaseReceiptFormValidationSchema = yup.object().shape({
    quantity: yup.mixed().test({
        test: function (value) {
            const numberVal = Number(value)
            if (!value) return this.createError({ message: 'Required.' })
            else if (isNaN(numberVal)) return this.createError({ message: 'Invalid value.' })
            else if (numberVal <= 0)
                return this.createError({ message: 'This field is required' })
            return true
        }
    }),
    // packingSlipNumber: yup.mixed().test({
    //     test: function (value) {
    //         const numberVal = Number(value)
    //         if (!value) return this.createError({ message: 'Required.' })
    //         else if (isNaN(numberVal)) return this.createError({ message: 'Invalid value.' })
    //         else if (numberVal <= 0)
    //             return this.createError({ message: 'This field is required' })
    //         return true
    //     }
    // }),
    // heatNumber: yup.mixed().test({
    //     test: function (value) {
    //         const numberVal = Number(value)
    //         if (!value) return this.createError({ message: 'Required.' })
    //         else if (isNaN(numberVal)) return this.createError({ message: 'Invalid value.' })
    //         else if (numberVal <= 0)
    //             return this.createError({ message: 'This field is required' })
    //         return true
    //     }
    // }),
    packingSlipNumber: yup.string().required('Required.'),
    // heatNumber: yup.string().required('Required.'),
    goodInspctReceivedBy: yup.string().required('Required.'),
    supplierName: yup.string().required('Required.')
})