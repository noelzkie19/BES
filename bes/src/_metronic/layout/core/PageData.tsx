/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, createContext, useContext, useEffect, useState} from 'react'
import { UserModel } from '../../../app/modules/auth/models/UserModel'
import { GetLoginUser } from '../../../app/shared/service/redux-store'
import { useEffectOnce } from 'react-use'

export interface PageLink {
  title: string
  path: string
  isActive: boolean
  isSeparator?: boolean
}

export interface PageDataContextModel {
  pageTitle?: string
  setPageTitle: (_title: string) => void
  pageDescription?: string
  setPageDescription: (_description: string) => void
  pageBreadcrumbs?: Array<PageLink>
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => void,
  currentUser: UserModel,
  setCurrentUser: (_userModel: UserModel) => void,
  userAccessModule: IUserAccessModule
}

export interface IUserAccessModule {
  quote: boolean,
  jobs: boolean,
  purchaseOrder: boolean,
  deliveries: boolean,
  stocks: boolean,
  clients: boolean,
  schedules: boolean,
  suppliers: boolean,
  nonConformance: boolean,
  settings: boolean,
  isAdmin: boolean
}

export const INITIAL_ACCESS: IUserAccessModule = {
  quote: true,
  jobs: true,
  purchaseOrder: true,
  deliveries: true,
  stocks: true,
  clients: true,
  schedules: true,
  suppliers: true,
  nonConformance: true,
  settings: true,
  isAdmin: true
}


export const Initial_User: UserModel = {
  id: 0,
  username: '',
  password: '',
  email: '',
  firstName: '',
  lastName: '',
  userRoleDisplay: '',
  isResetPasswordRequired: false
}


const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: (_title: string) => {},
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => {},
  setPageDescription: (_description: string) => {},
  setCurrentUser: (_userModel: UserModel) => {} ,
  currentUser: Initial_User,
  userAccessModule: INITIAL_ACCESS,
  
})

const PageDataProvider: React.FC = ({children}) => {
  const [pageTitle, setPageTitle] = useState<string>('')
  const [pageDescription, setPageDescription] = useState<string>('')
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([])
  const [currentUser, setCurrentUser] = useState<UserModel>(GetLoginUser())
  const [userAccessModule, setUserAccessModule] = useState<IUserAccessModule>({...INITIAL_ACCESS})

  useEffectOnce(() => {
    if (currentUser && currentUser.userRoles && currentUser.userRoles?.length > 0) {
      const adminRole = currentUser.userRoles.find(x => x == 'Administrator');
      if (!adminRole) {
        setUserAccessModule((userAccessModule: any) => {
          return {
            ...userAccessModule,
            // quote: false,
            // purchaseOrder: false,
            // deliveries: false,
            // stocks: false,
            // clients: false,
            // jobs: false,
            // suppliers: false,
            // nonConformance: false,
            isAdmin: false
          }
        })
      } else {
        setUserAccessModule((userAccessModule: any) => {
          return {
            ...userAccessModule,
            ...INITIAL_ACCESS
          }
        })
      }
    }
  })


  const value: PageDataContextModel = {
    pageTitle,
    setPageTitle,
    pageDescription,
    setPageDescription,
    pageBreadcrumbs,
    setPageBreadcrumbs,
    currentUser,
    setCurrentUser,
    userAccessModule
  }
  return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

function usePageData() {
  return useContext(PageDataContext)
}

type Props = {
  description?: string
  breadcrumbs?: Array<PageLink>
}

const PageTitle: FC<Props> = ({children, description, breadcrumbs}) => {
  const {setPageTitle, setPageDescription, setPageBreadcrumbs} = usePageData()
  useEffect(() => {
    if (children) {
      setPageTitle(children.toString())
    }
    return () => {
      setPageTitle('')
    }
  }, [children])

  useEffect(() => {
    if (description) {
      setPageDescription(description)
    }
    return () => {
      setPageDescription('')
    }
  }, [description])

  useEffect(() => {
    if (breadcrumbs) {
      setPageBreadcrumbs(breadcrumbs)
    }
    return () => {
      setPageBreadcrumbs([])
    }
  }, [breadcrumbs])

  return <></>
}

const PageDescription: React.FC = ({children}) => {
  const {setPageDescription} = usePageData()
  useEffect(() => {
    if (children) {
      setPageDescription(children.toString())
    }
    return () => {
      setPageDescription('')
    }
  }, [children])
  return <></>
}

export { PageDescription, PageTitle, PageDataProvider, usePageData }
