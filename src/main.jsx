import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {router} from "./Routes.jsx"
import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider } from 'react-router-dom'
import {store} from "./store/store.js"
import { Provider } from 'react-redux'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
     <Provider store={store}>
      <RouterProvider router={router}/>
     </Provider>
     </ClerkProvider>
  </StrictMode>,
)
