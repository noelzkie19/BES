import axios from 'axios'
import { IAbout } from '../model/about'

export const ABOUT_URL = `${process.env.REACT_APP_API_URL}/about`

export const getAbouts = async () => {
    try {
        const data = await axios.get(`${ABOUT_URL}`)
        return [data, null]
    } catch (ex) {
      return [null, ex]
    }
}

export const updateAbout = async (about: IAbout) => {
    return await axios.put(`${ABOUT_URL}`, about)
}

