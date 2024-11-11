import React, { FC, useEffect, useState } from 'react';
import { formatPhoneNumber } from '../../../../app/shared/service/utils';

type Props = {
    phoneNumber: string
    onChangeHandler?: (input: string) => void
    onBlurHandler?: (input: string) => void
    onChangeHandlerFilter?: (event: any, phone: string) => void
    tabIndex?: number
  }

const PhoneInput1: FC<Props> = ({phoneNumber, onChangeHandler, onBlurHandler, tabIndex, onChangeHandlerFilter }) => {
  const [formattedPhone, setFormattedPhone] = useState('');

  useEffect(() => {
     setFormattedPhone(formatPhoneNumber(phoneNumber))
  }, [phoneNumber])

  const handlePhoneChange = (event: any) => {
    const input = event.target.value;
    const formattedInput = formatPhoneNumber(input);
    setFormattedPhone(formattedInput)
    if (onChangeHandler)
      onChangeHandler(formattedInput);
    if (onChangeHandlerFilter)
      onChangeHandlerFilter(event, formattedInput);
  };
  const handlePhoneBlur = (event: any) => {
    const input = event.target.value;
    const formattedInput = formatPhoneNumber(input);
    if (onBlurHandler)
    onBlurHandler(formattedInput);
  };

  return (
    <React.Fragment>
      <input
        type="text"
        className='form-control'
        value={formattedPhone}
        onChange={handlePhoneChange}
        onBlur={handlePhoneBlur}
        placeholder="Enter your number XX 1234 5678"
        tabIndex={tabIndex}
      />
    </React.Fragment>
  );
}

export default PhoneInput1;
