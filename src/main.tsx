import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./styles/app.scss"
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <Toaster position='bottom-center'/>
  </React.StrictMode>,
)
