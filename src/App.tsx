import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

// Layout & Common Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/layout/ToastContainer';
import { AuthModal } from './components/common/AuthModal';
import { CheckoutModal } from './components/common/CheckoutModal';

// Pages
import { HomePage } from './pages/HomePage';
import { WebinarsPage } from './pages/WebinarsPage';
import { WebinarDetailPage } from './pages/WebinarDetailPage';
import { LiveRoomPage } from './pages/LiveRoomPage';
import { DrawDemoPage } from './pages/DrawDemoPage';
import { ReplaysPage } from './pages/ReplaysPage';
import { AccountPage } from './pages/AccountPage';
import { AdminPage } from './pages/AdminPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Animated Page Wrapper for smooth 12px slide + fade transitions
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#0A0B0D] text-white flex flex-col font-sans selection:bg-[#C9A227]/30 selection:text-white antialiased">
        {/* Navigation Bar */}
        <Navbar />

        {/* Global Modals & Notifications */}
        <AuthModal />
        <CheckoutModal />
        <ToastContainer />

        {/* Dynamic Route Pages */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <HomePage />
                </PageWrapper>
              }
            />
            <Route
              path="/webinars"
              element={
                <PageWrapper>
                  <WebinarsPage />
                </PageWrapper>
              }
            />
            <Route
              path="/webinars/:id"
              element={
                <PageWrapper>
                  <WebinarDetailPage />
                </PageWrapper>
              }
            />
            <Route
              path="/live/:id"
              element={
                <PageWrapper>
                  <LiveRoomPage />
                </PageWrapper>
              }
            />
            <Route
              path="/draw/:id"
              element={
                <PageWrapper>
                  <DrawDemoPage />
                </PageWrapper>
              }
            />
            <Route
              path="/replays"
              element={
                <PageWrapper>
                  <ReplaysPage />
                </PageWrapper>
              }
            />
            <Route
              path="/account"
              element={
                <PageWrapper>
                  <AccountPage />
                </PageWrapper>
              }
            />
            <Route
              path="/admin"
              element={
                <PageWrapper>
                  <AdminPage />
                </PageWrapper>
              }
            />
            {/* Fallback */}
            <Route
              path="*"
              element={
                <PageWrapper>
                  <HomePage />
                </PageWrapper>
              }
            />
          </Routes>
        </main>

        {/* Tactical Luxury Footer */}
        <Footer />
      </div>
    </Router>
  );
}
