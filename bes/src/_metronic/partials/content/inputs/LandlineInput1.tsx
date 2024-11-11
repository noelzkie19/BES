import React, { FC, useEffect, useState } from 'react';
import { formatLandNumber, formatMobileNumber } from '../../../../app/shared/service/utils';

type Props = {
    phoneNumber: string
    onBlurHandler?: (input: string) => void
    onChangeHandler?: (input: string) => void
  }

const LandlineInput1: FC<Props> = ({phoneNumber, onBlurHandler, onChangeHandler}) => {
  const [formattedPhone, setFormattedPhone] = useState('');

  useEffect(() => {
     setFormattedPhone(formatLandNumber(phoneNumber))
  }, [phoneNumber])

  const handlePhoneChange = (event: any) => {
    const input = event.target.value;
    const formattedInput = formatLandNumber(input);
    setFormattedPhone(formattedInput)
    if (onChangeHandler)
      onChangeHandler(formattedInput);
  };


  const handlePhoneBlur = (event: any) => {
    const input = event.target.value;
    const formattedInput = formatLandNumber(input);
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
        placeholder="Enter your number (XX) 1234 5678"
      />
    </React.Fragment>
  );
}

export default LandlineInput1;