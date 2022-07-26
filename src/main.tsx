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
import CronParser from './routes/converters/CronParser'
import HTMLEncoderDecoder from './routes/encodersDecoders/HTMLEncoderDecoder'
import URLEncoderDecoder from './routes/encodersDecoders/URLEncoderDecoder'
// import GZipCompressDecompress from './routes/encodersDecoders/GZipCompressDecompress'
import JWTDecoder from './routes/encodersDecoders/JWTDecoder'
import JSONFormatter from './routes/formatters/JSONFormatter'
import SQLFormatter from './routes/formatters/SQLFormatter'
import HashGenerator from './routes/generators/HashGenerator'
import UUIDGenerator from './routes/generators/UUIDGenerator'
import LoremIpsumGenerator from './routes/generators/LoremIpsumGenerator'
import InspectorCaseConverter from './routes/text/InspectorCaseConverter'
import TextComparer from './routes/text/TextComparer'
import MarkdownPreview from './routes/text/MarkdownPreview'

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
          <Route path="cron-parser" element={<CronParser />} />
          <Route path="html-encoder-decoder" element={<HTMLEncoderDecoder />} />
          <Route path="url-encoder-decoder" element={<URLEncoderDecoder />} />
          <Route path="jwt-decoder" element={<JWTDecoder />} />
          {/*<Route path="gzip-compress-decompress" element={<GZipCompressDecompress />} />*/}
          <Route path="json-formatter" element={<JSONFormatter />} />
          <Route path="sql-formatter" element={<SQLFormatter />} />
          <Route path="hash-generator" element={<HashGenerator />} />
          <Route path="uuid-generator" element={<UUIDGenerator />} />
          <Route path="lorem-ipsum-generator" element={<LoremIpsumGenerator />} />
          <Route path="inspector-case-converter" element={<InspectorCaseConverter />} />
          <Route path="text-comparer" element={<TextComparer />} />
          <Route path="markdown-preview" element={<MarkdownPreview />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
)
