import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import App from './App'
import Home from './routes/Home'
import HashGenerator from './routes/generators/HashGenerator'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route exact path="" element={<Home />} />
          <Route exact path="hash-generator" element={<HashGenerator />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
)
