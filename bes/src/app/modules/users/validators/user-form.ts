import * as yup from 'yup'
export const userFormValidationSchema = yup.object().shape({
    id: yup.number(),
    userName: yup.string().required('Required.'),
    email: yup.string().required('Required.'),
    firstName: yup.string().required('Required.'),
    lastName: yup.string().required('Required.'),
    isActive: yup.bool(),
    roles: yup.string(),
    // newPassword: yup.string()
    // .when('newPassword', {
    //     is: (value: string) => value !== undefined && value !== '',
    //     then: yup.string()
    //       .min(6, 'Minimum 6 characters')
    //       .max(50, 'Maximum 50 characters'),
    //     otherwise: yup.string(),
    // })

    newPassword: yup.mixed().test({
        test: function (val, schema) {
            const value = val;
            if (value && value.length > 0) {
                if (value.length < 6) 
                return this.createError({ message: 'Minimum 6 characters' })
                if (value.length > 50) 
                return this.createError({ message: 'Maximum 50 characters' })

                const hasUpperCase = /[A-Z]/.test(value);
                const hasLowerCase = /[a-z]/.test(value);
                const hasNumber = /[0-9]/.test(value);
                const hasSymbol = /["!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/.test(value);
                let validConditions = 0;
                const numberOfMustBeValidConditions = 4;
                const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbol];
                conditions.forEach((condition) =>
                    condition ? validConditions++ : null
                );
                if (validConditions >= numberOfMustBeValidConditions) {
                    return true;
                } 
                return  this.createError({ message: 'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One special case Character' });
            } else {
                return true
            }
        }
    })
    
})
