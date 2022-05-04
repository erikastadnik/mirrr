import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import { createRoot } from 'react-dom/client'

import { configureStore } from '@reduxjs/toolkit'
import './index.css'
import dataReducer from './reducers/dataReducer'

const store = configureStore({
  reducer: {
    data: dataReducer
  }
  })


const container = document.getElementById('root')
const root = createRoot(container)
root.render(<Provider store={store}>
  <App />
</Provider>)

