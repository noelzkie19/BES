import React from 'react'

interface IProps {}

export const AboutContext = React.createContext<IProps>({})

export const AboutContextProvider: React.FC = ({children}) => {
  const value = ''

  return <AboutContext.Provider value={value}>{children}</AboutContext.Provider>
}
