import React, { FC, useEffect, useState } from 'react';
import { formatMobileNumber } from '../../../../app/shared/service/utils';

type Props = {
    phoneNumber: string
    onBlurHandler?: (input: string) => void
    onChangeHandler?: (input: string) => void
  }

const MobileInput1: FC<Props> = ({phoneNumber, onBlurHandler, onChangeHandler}) => {
  const [formattedPhone, setFormattedPhone] = useState('');

  useEffect(() => {
     setFormattedPhone(formatMobileNumber(phoneNumber))
  }, [phoneNumber])

  const handlePhoneChange = (event: any) => {
    const input = event.target.value;
    const formattedInput = formatMobileNumber(input);
    setFormattedPhone(formattedInput)
    if (onChangeHandler)
      onChangeHandler(formattedInput);
  };


  const handlePhoneBlur = (event: any) => {
    const input = event.target.value;
    const formattedInput = formatMobileNumber(input);
    if (onBlurHandler)
    onBlurHandler(formattedInput);
  };

  return (
    <React.Fragment>
      <input
        type="text"
        className='form-control'
        value={formattedPhone}
        onBlur={handlePhoneBlur}
        onChange={handlePhoneChange}
        placeholder="Enter your number 1111 111 111"
      />
    </React.Fragment>
  );
}

export default MobileInput1;