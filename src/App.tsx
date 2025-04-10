import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Home } from './pages/Home';
import { FaqDetail } from './pages/FaqDetail';
import { AskQuestion } from './pages/AskQuestion';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { Layout } from './components/Layout';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="faq/:id" element={<FaqDetail />} />
            <Route path="ask" element={<AskQuestion />} />
            <Route path="setup" element={<AdminLogin />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;