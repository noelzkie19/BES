import React, { useMemo, useState } from "react";
import { useAsyncFn } from "react-use";
import { IAlert } from "../../../shared/components/CustomAlert";
import { IUser } from "../../users/models/user-model";
import { getAllClients, getAllJobTypes, getAllResources, getAllUsers } from "../api";
import { JOB_FORM_DEFAULT, TOASTER_DEFAULT } from "../constant/job-default";
import { IJobData, IResourcesData, ISelectedClientData, ISelectedJobTypeData } from "../models/job-model";


interface IProps {
  selectedData: IJobData,
  setSelectedData: (data: IJobData) => void,
  contextToaster: IAlert | undefined,
  setContextToaster: (alert: IAlert | undefined) => void,
  clients: ISelectedClientData[],
  getAllClientsAsync: (...args: any[]) => Promise<void>,
  fetchingClient: boolean,
  // jobTypes: ISelectedJobTypeData[],
  // getAllJobTypesAsync: (...args: any[]) => Promise<void>,
  // fetchingJobTypes: boolean,
  // isCanEdit: boolean,
  // setIsCanEdit: (isCanEdit: boolean) => void,
  setContextResources: (resources: []) => void
  contextResources: [],
  // getAllResourcesAsync: (...args: any[]) => Promise<void>,
  // fetchingResources: boolean,
  setContextUsers: (IUser: []) => void
  contextUsers: [],
  // getAllUsersAsync: (...args: any[]) => Promise<void>,
  // fetchingUsers: boolean
}



export const JobContext = React.createContext<IProps>({
  selectedData: JOB_FORM_DEFAULT,
  setSelectedData: (data: IJobData) => { },
  contextToaster: TOASTER_DEFAULT,
  setContextToaster: (data: IAlert | undefined) => { },
  clients: [],
  getAllClientsAsync: async (...args: any[]) => { },
  fetchingClient: false,
  // jobTypes: [],
  // getAllJobTypesAsync: async (...args: any[]) => { },
  // fetchingJobTypes: false,
  // isCanEdit: false,
  // setIsCanEdit: (isCanEdit: boolean) => {},
  setContextResources: (data: []) => { },
  contextResources: [],
  // getAllResourcesAsync: async (...args: any[]) => { },
  // fetchingResources: false,
  setContextUsers: (data: []) => { },
  contextUsers: [],
  // getAllUsersAsync: async (...args: any[]) => { },
  // fetchingUsers: false
})


export const JobContextProvider: React.FC = ({ children }) => {
  const [selectedData, setSelectedData] = useState<IJobData>(JOB_FORM_DEFAULT)
  const [contextToaster, setContextToaster] = useState<IAlert | undefined>()
  const [clients , setClients] = useState<[]>([])
  // const [jobTypes , setJobTypes] = useState<[]>([])
  // const [isCanEdit, setIsCanEdit] = useState<boolean>(false)
  const [contextResources, setContextResources] = useState<[]>([])
  const [contextUsers, setContextUsers] = useState<[]>([])

  const [{ loading: fetchingClient }, getAllClientsAsync] = useAsyncFn(async (...args) => {
    const response = await getAllClients();
    const clients = response.data;
    setClients(clients as any);
    return response.data;
  }, [setClients])

  // const [{ loading: fetchingJobTypes }, getAllJobTypesAsync] = useAsyncFn(async (...args) => {
  //   const [keyword] = args;
  //   const response = await getAllJobTypes(keyword);
  //   const jobTypes = response.data;
  //   setJobTypes(jobTypes as any);
  //   return response.data;
  // }, [setJobTypes])

  // const [{ loading: fetchingResources }, getAllResourcesAsync] = useAsyncFn(async (...args) => {
  //   const [keyword] = args;
  //   const response = await getAllResources(keyword);
  //   setResources(response.data as any);
  // }, [setJobTypes])

  // const [{ loading: fetchingUsers }, getAllUsersAsync] = useAsyncFn(async (...args) => {
  //   const [keyword] = args;
  //   const response = await getAllUsers(keyword);
  //   setUsers(response.data as any);
  // }, [setUsers])


  // const value: IProps = useMemo(() => {
  //       return {
  //         selectedData,
  //         setSelectedData,
  //         contextToaster,
  //         setContextToaster,
  //         clients,
  //         getAllClientsAsync,
  //         fetchingClient,
  //         jobTypes,
  //         getAllJobTypesAsync,
  //         fetchingJobTypes,
  //         isCanEdit,
  //         setIsCanEdit,
  //         resources,
  //         getAllResourcesAsync,
  //         fetchingResources,
  //         users, 
  //         getAllUsersAsync, 
  //         fetchingUsers
  //       }
  // }, [selectedData, setSelectedData, contextToaster, setContextToaster, clients , getAllClientsAsync , fetchingClient,
  //   jobTypes, getAllJobTypesAsync, fetchingJobTypes, isCanEdit, setIsCanEdit, resources, getAllResourcesAsync, fetchingResources,
  //   users, getAllUsersAsync, fetchingUsers])
  const value: IProps = useMemo(() => { 
    return {
          selectedData,
          setSelectedData,
          contextToaster,
          setContextToaster,
          contextUsers,
          contextResources,
          setContextResources,
          setContextUsers,
          getAllClientsAsync,
          fetchingClient,
          clients
    } 
  }, [contextToaster, setContextToaster, selectedData, setSelectedData, contextUsers, contextResources,
    setContextResources, setContextUsers]);
  return (
      <JobContext.Provider value={value}>{children}</JobContext.Provider>
    )
}
  