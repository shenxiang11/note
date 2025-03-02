import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'xgplayer/dist/index.min.css'
import App from './App.tsx'

function render() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

render();
