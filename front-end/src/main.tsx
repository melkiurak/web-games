import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { ApolloProvider } from '@apollo/client'
import client from './Service/gameServer'
const element = document.getElementById('root') as HTMLElement

createRoot(element).render(
  <StrictMode >
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
