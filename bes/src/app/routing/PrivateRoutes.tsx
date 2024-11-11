import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {SettingWrapper} from '../pages/settings/components/SettingWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {ChagePassword} from '../modules/auth/components/ChangePassword'
import CreateQuotePage from '../modules/quote/CreateQuotePage'
import { ModuleContextProvider } from '../shared/ModuleContext'
export function PrivateRoutes() {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))

  const ClientPage = lazy<React.FC>(() => import('../modules/clients/ClientPage'))
  const CreateClientPage = lazy<React.FC>(() => import('../modules/clients/CreateClientPage'))
  const UserAccountPage = lazy<React.FC>(() => import('../modules/users/UserAccountPage'))
  const RolePage = lazy<React.FC>(() => import('../modules/roles/RolePage'))
  const CreateRolePage = lazy<React.FC>(() => import('../modules/roles/CreateRolePage'))
  const PurchaseOrderPage = lazy<React.FC>(
    () => import('../modules/purchase-orders/PurchaseOrderPage')
  )
  const CreatePurchaseOrderPage = lazy<React.FC>(
    () => import('../modules/purchase-orders/CreatePurchaseOrderPage')
  )
  const SupplierPage = lazy<React.FC>(() => import('../modules/suppliers/SupplierPage'))
  const CreateSupplierPage = lazy<React.FC>(() => import('../modules/suppliers/CreateSupplierPage'))
  const JobPage = lazy<React.FC>(() => import('../modules/jobs/JobPage'))
  const CreateJobPage = lazy<React.FC>(() => import('../modules/jobs/CreateJobPage'))
  const DeliveryPage = lazy<React.FC>(() => import('../modules/deliveries/DeliveryPage'))
  const CreateDeliveryPage = lazy<React.FC>(
    () => import('../modules/deliveries/CreateDeliveryPage')
  )
  const StockPage = lazy<React.FC>(() => import('../modules/stocks/StockPage'))
  const QuotePage = lazy<React.FC>(() => import('../modules/quote/QuotePage'))
  const CreateStockPage = lazy<React.FC>(() => import('../modules/stocks/CreateStockPage'))
  const NonConformancePage = lazy<React.FC>(
    () => import('../modules/non-conformance/NonConformancePage')
  )
  const CreateNonConformancePage = lazy<React.FC>(
    () => import('../modules/non-conformance/CreateNonConformancePage')
  )

  const SchedulePage = lazy<React.FC>(() => import('../modules/schedule/SchedulePage'))

  const AboutPage = lazy<React.FC>(() => import('../pages/about/AboutPage'))
  const HelpPage = lazy<React.FC>(() => import('../pages/help/HelpPage'))
  const ResourcePage = lazy<React.FC>(() => import('../pages/resource/ResourcePage'))
  
  return (
    <ModuleContextProvider>
      <Suspense fallback={<FallbackView />}>
        <Switch>
          <Route path='/builder' component={BuilderPageWrapper} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/crafted/pages/wizards' component={WizardsPage} />
          <Route path='/crafted/widgets' component={WidgetsPage} />
          <Route path='/crafted/account' component={AccountPage} />
          <Route path='/apps/chat' component={ChatPage} />
          <Route path='/menu-test' component={MenuTestPage} />
          <Route path='/client' render={() => <ClientPage />} />
          <Route path='/client/new' render={() => <CreateClientPage />} />
          <Route path='/user' render={() => <UserAccountPage />} />
          <Route path='/role' render={() => <RolePage />} />
          <Route path='/role/new' render={() => <CreateRolePage />} />
          <Route path='/supplier' render={() => <SupplierPage />} />
          <Route path='/supplier/new' render={() => <CreateSupplierPage />} />
          <Route path='/job' render={() => <JobPage />} />
          <Route path='/job/new' render={() => <CreateJobPage />} />
          <Route path='/job/new?copy=true' render={() => <CreateJobPage />} />
          <Route path='/delivery' render={() => <DeliveryPage />} />
          <Route path='/delivery/new' render={() => <CreateDeliveryPage />} />
          <Route path='/purchase-order' render={() => <PurchaseOrderPage />} />
          <Route path='/purchase-order/new' render={() => <CreatePurchaseOrderPage />} />
          <Route path='/stock' render={() => <StockPage />} />
          <Route path='/stock/new' render={() => <CreateStockPage />} />
          <Route path='/quote' render={() => <QuotePage />} />
          <Route path='/quote/new' render={() => <CreateQuotePage />} />
          <Route path='/non-conformance' render={() => <NonConformancePage />} />
          <Route path='/non-conformance/new' render={() => <CreateNonConformancePage />} />
          <Route path='/schedule' render={() => <SchedulePage />} />
          <Route path='/about' render={() => <AboutPage />} />
          <Route path='/help' render={() => <HelpPage />} />
          <Route path='/resource' render={() => <ResourcePage />} />
          <Route path='/resource/new' render={() => <ResourcePage />} />
          <Route path='/settings' component={SettingWrapper} />
          <Route path='/change-password' component={ChagePassword} />
          <Redirect from='/auth' to='/dashboard' />
          <Redirect exact from='/' to='/dashboard' />
          <Redirect to='error/404' />
        </Switch>
      </Suspense>
    </ModuleContextProvider>
  )
}
