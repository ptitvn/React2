import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './components/bt6/store/store.ts'
// import { store } from './components/bt5/store/store.ts'
// import { store } from './components/bt4/store/store.ts'
// import { store } from './components/bt3/store/store.ts'
// import { store } from './components/bt2/store/store.ts'
// import { store } from './components/bt1/store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
