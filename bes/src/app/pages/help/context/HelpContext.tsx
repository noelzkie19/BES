import React from 'react'

interface IProps {}

export const HelpContext = React.createContext<IProps>({})

export const HelpContextProvider: React.FC = ({children}) => {
  const value = ''

  return <HelpContext.Provider value={value}>{children}</HelpContext.Provider>
}
