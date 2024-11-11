import * as yup from 'yup'
export const resourceFormValidationSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required('Required.'),
  description: yup.string().required('Required.'),
  // hourlyRate: yup.string().required('Required.'),
  hourlyRate: yup.number().test({
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
