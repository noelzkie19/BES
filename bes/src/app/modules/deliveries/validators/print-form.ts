
import * as yup from 'yup'
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
