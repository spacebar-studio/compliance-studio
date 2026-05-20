import { Routes, Route } from 'react-router-dom'
import { useVersion } from './context/VersionContext'

import V1Welcome from './pages/Welcome'
import V1SetupProduct from './pages/SetupProduct'
import V1SetupBrand from './pages/SetupBrand'
import V1SetupReview from './pages/SetupReview'
import V1SetupSuccess from './pages/SetupSuccess'
import V1ProductsHome from './pages/ProductsHome'
import V1ProductDashboard from './pages/ProductDashboard'
import V1Settings from './pages/Settings'

import V2Welcome from './pages/v2/Welcome'
import V2SetupProduct from './pages/v2/SetupProduct'
import V2SetupBrand from './pages/v2/SetupBrand'
import V2SetupReview from './pages/v2/SetupReview'
import V2SetupSuccess from './pages/v2/SetupSuccess'
import V2ProductsHome from './pages/v2/ProductsHome'
import V2ProductDashboard from './pages/v2/ProductDashboard'
import V2Settings from './pages/v2/Settings'

import V3Welcome from './pages/v3/Welcome'
import V3SetupProduct from './pages/v3/SetupProduct'
import V3SetupBrand from './pages/v3/SetupBrand'
import V3SetupReview from './pages/v3/SetupReview'
import V3SetupSuccess from './pages/v3/SetupSuccess'
import V3ProductsHome from './pages/v3/ProductsHome'
import V3ProductDashboard from './pages/v3/ProductDashboard'
import V3Settings from './pages/v3/Settings'

import V4Welcome from './pages/v4/Welcome'
import V4Setup from './pages/v4/Setup'
import V4SetupSuccess from './pages/v4/SetupSuccess'

import AllScreens from './pages/AllScreens'
import ViewSwitcher from './components/ViewSwitcher'

function pick<T>(version: string, v1: T, v2: T, v3: T, v4?: T): T {
  if (version === 'v4' && v4 !== undefined) return v4
  return version === 'v3' ? v3 : version === 'v2' ? v2 : v1
}

export default function App() {
  const { version } = useVersion()

  return (
    <>
      <Routes>
        <Route path="/" element={pick(version, <V1Welcome />, <V2Welcome />, <V3Welcome />, <V4Welcome />)} />
        <Route path="/setup" element={pick(version, <V1SetupProduct />, <V2SetupProduct />, <V3SetupProduct />, <V4Setup />)} />
        <Route path="/setup/brand" element={pick(version, <V1SetupBrand />, <V2SetupBrand />, <V3SetupBrand />, <V4Setup />)} />
        <Route path="/setup/review" element={pick(version, <V1SetupReview />, <V2SetupReview />, <V3SetupReview />, <V4Setup />)} />
        <Route path="/setup/success" element={pick(version, <V1SetupSuccess />, <V2SetupSuccess />, <V3SetupSuccess />, <V4SetupSuccess />)} />
        <Route path="/products" element={pick(version, <V1ProductsHome />, <V2ProductsHome />, <V3ProductsHome />)} />
        <Route path="/products/:id" element={pick(version, <V1ProductDashboard />, <V2ProductDashboard />, <V3ProductDashboard />)} />
        <Route path="/settings" element={pick(version, <V1Settings />, <V2Settings />, <V3Settings />)} />
        <Route path="/all-screens" element={<AllScreens />} />
      </Routes>
      <ViewSwitcher />
    </>
  )
}
