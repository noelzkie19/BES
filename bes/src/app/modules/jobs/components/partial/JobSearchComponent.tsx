import React, { useEffect, useRef } from "react";
import { KTSVG } from "../../../../../_metronic/helpers";

interface IProps {
    search: (search: string) => void;
    shouldClearSearch: boolean;
  }

const JobSearchComponent: React.FC<IProps> = ({search , shouldClearSearch}) => {
    const inputSearch = useRef<any>(null)

    useEffect(() => {
        if (shouldClearSearch && inputSearch.current) {
          inputSearch.current.value = ''; // Clear the search input
        }
    }, [shouldClearSearch]);
    
    return (
        <div className="row">
         <div className='row align-items-center mt-2 pe-2'>
            <div className='d-flex my-2 col-12 mb-5'>
                <div className='d-flex align-items-center position-relative w-100'>
                <KTSVG
                    path='/media/icons/duotune/general/gen021.svg'
                    className='svg-icon-3 position-absolute ms-3'
                />
                <input
                    type='text'
                    id='kt_filter_search'
                    className='form-control form-control-white form-search ps-9'
                    placeholder='Search'
                    ref={inputSearch}
                />
                <button className='btn btn-primary col-auto btn-search'
                    onClick={() => search(inputSearch.current.value)}>Search</button>
                </div>
                
            </div>
          </div>
        </div>
    );
};

export { JobSearchComponent }