import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { VersionProvider } from './context/VersionContext'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <VersionProvider>
        <App />
      </VersionProvider>
    </BrowserRouter>
  </StrictMode>,
)
