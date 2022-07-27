import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom'
import App from './App'
import { toolGroups } from './data'
import Home from './routes/Home'
import Category from './routes/Category'
import HashGenerator from './routes/generators/HashGenerator'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route exact path="" element={<Home />} />
          {toolGroups.map(toolGroup =>
            <Route
              key={toolGroup.slug}
              exact
              path={toolGroup.slug}
              element={<Category category={toolGroup.slug}/>}
            />
          )}
          <Route exact path="hash-generator" element={<HashGenerator />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
)
