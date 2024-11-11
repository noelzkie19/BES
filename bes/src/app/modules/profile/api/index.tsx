import axios from 'axios'

export const USER_URL = `${process.env.REACT_APP_API_URL}/user`
export const ROLE_URL = `${process.env.REACT_APP_API_URL}/role`


export const getUserByEmail = async (email: string) => {
    try {
        const data = await axios.get(`${USER_URL}/getuserbyemail?email=${email}`)
        return [data, null] 
    } catch(ex) {
        return [null, ex] 
    }
}

