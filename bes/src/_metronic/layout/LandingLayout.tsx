import React, {useEffect} from 'react'
import {ScrollTop} from './components/ScrollTop'
import {Content} from './components/ContentLanding'
import {PageDataProvider} from './core'

const LandingLayout: React.FC = ({children}) => {
  return (
    <PageDataProvider>
        <Content>{children}</Content>
    </PageDataProvider>
  )
}

export {LandingLayout}
