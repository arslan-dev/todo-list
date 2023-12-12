import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'
import { Provider } from 'react-redux'
import { RootState, setupStore } from './app/store'

const preloadedState: RootState = {
  todos: {
    items: [
      {id: "1", title: "Alpha", done: true},
      {id: "2", title: "Bravo", done: false},
      {id: "3", title: "Charlie", done: false},
    ]
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={setupStore(preloadedState)} >
      <App />
    </Provider>
  </React.StrictMode>,
)
