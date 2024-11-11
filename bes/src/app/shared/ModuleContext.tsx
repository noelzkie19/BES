import React, { useMemo, useState } from "react";
import { useAsyncFn } from "react-use";
import { getAllJobTypes } from "../modules/jobs/api";
import { ISelectedJobTypeData } from "../modules/jobs/models/job-model";
interface IProps {
    jobTypes: ISelectedJobTypeData[],
    getAllJobTypesAsync: (...args: any[]) => Promise<void>,
    fetchingJobTypes: boolean
}

export const ModuleContext = React.createContext<IProps>({
    jobTypes: [],
    getAllJobTypesAsync: async (...args: any[]) => { },
    fetchingJobTypes: false
})


export const ModuleContextProvider: React.FC = ({ children }) => {
    const [jobTypes, setJobTypes] = useState<[]>([])

    const [{ loading: fetchingJobTypes }, getAllJobTypesAsync] = useAsyncFn(async () => {
     
      const response = await getAllJobTypes();
      const jobTypes = response.data;
      setJobTypes(jobTypes as any);
      return response.data;
    }, [setJobTypes])

   
    const value: IProps = useMemo(() => {
        return {
            jobTypes,
            getAllJobTypesAsync,
            fetchingJobTypes,
        }
    }, [jobTypes, getAllJobTypesAsync, fetchingJobTypes]);
    return (
        <ModuleContext.Provider value={value}>{children}</ModuleContext.Provider>
    )
}
