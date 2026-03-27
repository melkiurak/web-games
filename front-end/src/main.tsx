import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { ApolloProvider } from '@apollo/client'
import client from './Service/gameServer'
import { BrowserRouter } from 'react-router'
const element = document.getElementById('root') as HTMLElement

createRoot(element).render(
  <StrictMode >
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
)
