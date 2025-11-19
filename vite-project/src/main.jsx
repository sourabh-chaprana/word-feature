

/* global Office */
// import '/@vite/client'
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// const container = document.getElementById('root')
// const root = createRoot(container)

// const renderApp = () => {
//   root.render(
//     <StrictMode>
//       <App />
//     </StrictMode>,
//   )
// }

// const boot = async () => {
//   if (typeof Office !== 'undefined' && typeof Office.onReady === 'function') {
//     await Office.onReady()
//   }
//   renderApp()
// }

// boot().catch((error) => console.error('Failed to initialize the task pane', error))

// src/main.jsx
/* global Office, Word */
// src/main.jsx
/* global Office, Word */
// import '/@vite/client'
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// const container = document.getElementById('root')
// const root = createRoot(container)

// const renderApp = () => {
//   root.render(
//     <StrictMode>
//       <App />
//     </StrictMode>,
//   )
// }

// const boot = async () => {
//   try {
//     // Wait for Office.js to initialize if available
//     // Suppress errors when running outside Office
//     if (typeof Office !== 'undefined' && typeof Office.onReady === 'function') {
//       try {
//         await Office.onReady()
//         console.log('Office.js initialized')
        
//         // Check if Word is available after Office.onReady()
//         if (typeof Word !== 'undefined') {
//           console.log('Word API is available')
//         } else {
//           console.log('Word API is not available (running outside Word)')
//         }
//       } catch (officeError) {
//         // Suppress Office.js errors when running in browser
//         console.log('Office.js loaded but not in Office client (browser mode)')
//       }
//     } else {
//       console.log('Office.js not detected (running in browser)')
//     }
//   } catch (error) {
//     // Suppress initialization errors in browser
//     console.log('Running in browser mode - Office.js not required')
//   }
  
//   // Render app regardless of Office.js availability
//   renderApp()
// }

// boot().catch((error) => {
//   // Suppress boot errors - app will still render
//   console.log('App initialized in browser mode')
//   renderApp()
// })
/* global Office */
/* global Office */

/* global Office */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

const renderApp = () => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

const boot = async () => {
  if (typeof Office !== 'undefined' && typeof Office.onReady === 'function') {
    try {
      await Office.onReady()
      console.log('Office.js initialized')
    } catch (officeError) {
      console.log('Office.js loaded but not in Office client (browser mode)')
    }
  } else {
    console.log('Office.js not detected (running in browser)')
  }

  renderApp()
}

boot().catch((error) => {
  console.log('App initialized in browser mode')
  renderApp()
})