import React, { FC, useEffect, useState } from 'react';
import './EmailInput.css'; // Import your CSS file for styling

interface IProps {
    emails: string[]
    onAddDeleteEmail: (emails: string[]) => void
}

  
const EmailInput: FC<IProps> = ({emails, onAddDeleteEmail}) => {
  const [emailList, setEmailList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string>();

  useEffect(() => {
    setEmailList([...emails])
  }, [emails])
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: any) => {
    if (event.key === 'Enter' || event.key === ',' || event.key === ' ') {
      event.preventDefault();
      const newEmail = inputValue.trim();
      if (newEmail && isValidEmail(newEmail)) {
        // setEmailList([...emailList, newEmail]);
        onAddDeleteEmail([...emailList, newEmail])
        setInputValue('');
        setError(undefined)
      }

      if (!isValidEmail(newEmail))
       setError('Invalid Email Format')
    }
  };

  const handleRemoveEmail = (emailToRemove: any) => {
    const updatedEmailList = emailList.filter((email) => email !== emailToRemove);
    // setEmailList(updatedEmailList);
    onAddDeleteEmail(updatedEmailList)
  };

  const isValidEmail = (email: any) => {
    // Email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <React.Fragment>
        <div className="email-input-container">
        <div className="email-list">
            {emailList.map((email, index) => (
            <div className="email-token" key={index}>
                {email}
                <span className="remove-icon" onClick={() => handleRemoveEmail(email)}>
                &times;
                </span>
            </div>
            ))}
            <input
            type="text"
            className="email-input"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Type email addresses and press Enter"
            />
        </div>
        </div>
        {error && (
            <span className='text-danger'>{error}</span>
        )}
    </React.Fragment>
  );
};

export default EmailInput;