import React, { FC, useEffect, useState } from 'react';
import { formatPhoneNumber } from '../../../../app/shared/service/utils';

type Props = {
    phoneNumber: string
    onChangeHandler?: (input: string) => void
    onBlurHandler?: (input: string) => void
    tabIndex?: number
  }

const PhoneInput2: FC<Props> = ({phoneNumber, onChangeHandler, onBlurHandler, tabIndex }) => {
  const [formattedPhone, setFormattedPhone] = useState('');

  useEffect(() => {
     setFormattedPhone(phoneNumber)
  }, [phoneNumber])

  const handlePhoneChange = (event: any) => {
    const input = event.target.value;
    const formattedInput = input;
    setFormattedPhone(formattedInput)
    if (onChangeHandler)
    onChangeHandler(formattedInput);
  };
  const handlePhoneBlur = (event: any) => {
    const input = event.target.value;
    const formattedInput = input;
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
        placeholder="Enter your number 12345678"
        tabIndex={tabIndex}
      />
    </React.Fragment>
  );
}

export default PhoneInput2;