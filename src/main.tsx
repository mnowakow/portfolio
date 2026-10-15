import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@material-tailwind/react'
import './index.css'
import App from './App.tsx'

// After a new deploy, an open tab may ask for project page chunks that no
// longer exist. Reloading picks up the new build instead of a blank page.
window.addEventListener('vite:preloadError', () => {
  window.location.reload()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider value={{}}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
