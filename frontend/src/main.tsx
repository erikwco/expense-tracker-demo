import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// -----------------------------------------------------------
// Router configuration
// -----------------------------------------------------------
import { routeTree } from './routeTree.gen.ts'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Tanstack query configuration
const queryClient = new QueryClient();

// Create a new router instance
// NOTE: We pass here queryClient to satisfy the interface in the main.tsx 
// required for createRouteWithContext
const router = createRouter({ routeTree, context: { queryClient, user: null } })

// Register Router Instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
