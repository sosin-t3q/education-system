// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </BrowserRouter>
    </ReactKeycloakProvider>
  // </React.StrictMode>
)
