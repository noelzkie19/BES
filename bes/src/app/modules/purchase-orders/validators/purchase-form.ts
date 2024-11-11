import * as yup from 'yup'

export const purchaseFormValidationSchema = yup.object().shape({
    id: yup.number(),
    supplierId: yup.mixed().test({
        test: function (value) {
            const numberVal = Number(value)
            if (!value) return this.createError({ message: 'Required.' })
            else if (isNaN(numberVal)) return this.createError({ message: 'Invalid value.' })
            else if (numberVal <= 0)
                return this.createError({ message: 'This field is required' })
            return true
        }
    })
})
