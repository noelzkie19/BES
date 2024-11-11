import { filterBy } from '@progress/kendo-data-query';
import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import React from 'react'
import { transforOption } from '../../transformer/quote-transformer';
interface IProps {
  quoteVersions: any
  quoteDefault: any
  selectedQuote: (selectedQuote: any) => void,
}
const QuoteOption = (props: IProps) => {
  const [data, setData] = React.useState(transforOption(props.quoteVersions).slice());

  const filterData = (filter: any) => {
    const data = transforOption(props.quoteVersions).slice();
    return filterBy(data, filter);
  };
  const filterChange = (event: any) => {
    setData(filterData(event.filter));
  };
  
  const changeHandler = (event: DropDownListChangeEvent) => {
    props.selectedQuote(event.value);
  };
  

  return (
    <React.Fragment>
      <div className='text-center'>
      <div className='form-label'>Version</div>
       <DropDownList
        data={data}
        textField="text"
        filterable={true}
        onFilterChange={filterChange}
        defaultValue={props.quoteDefault}
        style={{
          width: "300px",
        }}
        onChange={changeHandler}
      />
      </div>
    
    </React.Fragment>
   
  )
}
export { QuoteOption }
