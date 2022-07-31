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
import Settings from './routes/Settings'
import Category from './routes/Category'
import Search from './routes/Search'
import HashGenerator from './routes/generators/HashGenerator'
import UUIDGenerator from './routes/generators/UUIDGenerator'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="search" element={<Search />} />
          {toolGroups.map(toolGroup =>
            <Route
              key={toolGroup.slug}
              path={toolGroup.slug}
              element={<Category category={toolGroup.slug}/>}
            />
          )}
          <Route path="hash-generator" element={<HashGenerator />} />
          <Route path="uuid-generator" element={<UUIDGenerator />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
)
