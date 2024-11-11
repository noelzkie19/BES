
import axios from 'axios'
export const EMAIL_AUTH_URL = `${process.env.REACT_APP_API_URL}/emailauth`

export const validateExistsEmailAuth = async (
    email: string
) => {
    try {
        const data = await axios.get(`${EMAIL_AUTH_URL}/validateexistsemailauth?email=${email}`)
        return [data, null] 
    } catch(ex) {
        return [null, ex] 
    }
}


export const registerEmailAuth = async (
    email: string,
    password: string
) => {
    try {
        const data = await axios.post(`${EMAIL_AUTH_URL}/createemailauth`,
        {
            email: email,
            password: password
        })
        return [data, null] 
    } catch(ex) {
        return [null, ex] 
    }
}
