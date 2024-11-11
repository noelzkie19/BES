import axios from 'axios'
import {UserModel} from '../models/UserModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/authenticate/verify-token`
export const LOGIN_URL = `${API_URL}/authenticate/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot-password`
export const RESET_PASSWORD_URL = `${API_URL}/authenticate/reset-password`
export const CHANGE_PASSWORD_URL = `${API_URL}/authenticate/change-password`
export const USER_ISCHANGEPASSWORDREQUIRED = `${API_URL}/user/update-changepassword-required`

// Server should return AuthModel
export function login (email: string, password: string) {
  return new Promise((resolve, reject) => {
    axios.post(LOGIN_URL, {
      email,
      password,
    }).then(resolve).catch(reject)
  });
}

// Server should return AuthModel
export function register(email: string, firstname: string, lastname: string, password: string, password_confirmation: string) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
// export function requestPassword(email: string) {
//   return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
//     email
//   })
// }

export function getUserByToken(token:string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    apiToken: token
  })
}

export const resetPassword = async (email: string, password: string, token: string) => {
  return await axios.post(`${RESET_PASSWORD_URL}` ,{
    email: email,
    resetPasswordToken: token,
    password: password
  })
}

export const changePassword = async (oldPassword: string, password: string,email:any) => {
  return await axios.post(`${CHANGE_PASSWORD_URL}` ,{
    password: oldPassword,
    newPassword: password,
    email: email
  })
}

export const updateChangePasswordIsRequired = async (id: number) => {
  return await axios.post(`${USER_ISCHANGEPASSWORDREQUIRED}` ,{
    id: id,
  })
}