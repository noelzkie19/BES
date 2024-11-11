import { createContext, useEffect, useState } from "react"
import { UserModel } from "../../../app/modules/auth/models/UserModel"
import { GetLoginUser } from "../../../app/shared/service/redux-store"
import { usePageData } from "./PageData"

export interface UserAccessModule {
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

  export const INITIAL_ACCESS: UserAccessModule = {
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
  

export interface UserAccessContextModel {
    userAccessModule: UserAccessModule,
    updateAccessModule: () => void
  }

  
  const UserAccessContext = createContext<UserAccessContextModel>({
    userAccessModule: INITIAL_ACCESS,
    updateAccessModule: () => {} ,
  })
  
  const UserAccessProvider: React.FC = ({children}) => {
    const {currentUser} = usePageData()
    const [userAccessModule, setUserAccessModule] = useState<UserAccessModule>(INITIAL_ACCESS)

    useEffect(() => {
      updateAccessModule()
    }, [currentUser])

    const updateAccessModule = () => {
      if (currentUser && currentUser.userRoles && currentUser.userRoles?.length > 0) {
        const adminRole = currentUser.userRoles.find(x => x == 'Administrator');
        if (!adminRole) {
          setUserAccessModule(userAccessModule => {
            return {
              ...userAccessModule,
              quote: false,
              purchaseOrder: false,
              deliveries: false,
              stocks: false,
              clients: false,
              schedules: false,
              suppliers: false,
              nonConformance: false,
              isAdmin: false
            }
          })
        } else {
          setUserAccessModule(userAccessModule => {
            return {
              ...userAccessModule,
              ...INITIAL_ACCESS
            }
          })
        }
      }
    }

    

    useEffect(() => {
      console.log('context')
      console.log(userAccessModule)
    }, [userAccessModule])
    
    
    const value: UserAccessContextModel = {
      userAccessModule,
      updateAccessModule
    }
    return <UserAccessContext.Provider value={value}>{children}</UserAccessContext.Provider>
  }

  export { UserAccessProvider, UserAccessContext }