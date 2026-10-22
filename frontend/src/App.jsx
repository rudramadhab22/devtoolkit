import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import JsonFormatterPage from './pages/tools/JsonFormatterPage'
import Base64Page from './pages/tools/Base64Page'
import UuidGeneratorPage from './pages/tools/UuidGeneratorPage'
import JwtDecoderPage from './pages/tools/JwtDecoderPage'
import SqlFormatterPage from './pages/tools/SqlFormatterPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools/json-formatter" element={<JsonFormatterPage />} />
          <Route path="/tools/base64" element={<Base64Page />} />
          <Route path="/tools/uuid-generator" element={<UuidGeneratorPage />} />
          <Route path="/tools/jwt-decoder" element={<JwtDecoderPage />} />
          <Route path="/tools/sql-formatter" element={<SqlFormatterPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App