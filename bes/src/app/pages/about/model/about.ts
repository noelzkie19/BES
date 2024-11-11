export interface IAbout {
    id?: number
    address: string
    phone: string
    email: string
    website: string
    abn: string
}

export interface IAboutState {
    about?: IAbout
}

export const initialAboutState: IAboutState = {
    about: undefined
}