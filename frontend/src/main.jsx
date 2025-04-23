import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RoutesProvider } from './RouterProvider'
import { Provider } from 'react-redux'
import { store } from './store'
import { SuspenseLoadingScreen } from './components/LoadingComponent'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(

    <Provider store={store}>

<Suspense fallback={<SuspenseLoadingScreen/>}>
    <RoutesProvider  />
    </Suspense>
    </Provider>
  
)
