import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

const savedTheme = localStorage.getItem('dxwm-theme-v3') || 'anime'
document.body.setAttribute('data-theme', savedTheme)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
