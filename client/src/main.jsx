import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from "react-router-dom"
import ContextApiProvider from './ContextApi/ContextApiProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ContextApiProvider>
    <ChakraProvider>
    <App />
    </ChakraProvider>
 
  </ContextApiProvider>
    
  </BrowserRouter>
 
)
