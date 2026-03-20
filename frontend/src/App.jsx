import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const ProductListing = lazy(() => import('./pages/ProductListing'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Account = lazy(() => import('./pages/Account'));
const Login = lazy(() => import('./pages/Login'));

// Page loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
        <p className="font-accent text-sm text-gray-400 tracking-widest uppercase">Loading</p>
      </div>
    </div>
  );
}

// Page transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Suspense fallback={<PageLoader />}><Home /></Suspense></PageTransition>} />
        <Route path="/collections" element={<PageTransition><Suspense fallback={<PageLoader />}><ProductListing /></Suspense></PageTransition>} />
        <Route path="/product/:slug" element={<PageTransition><Suspense fallback={<PageLoader />}><ProductDetail /></Suspense></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Suspense fallback={<PageLoader />}><Cart /></Suspense></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><Suspense fallback={<PageLoader />}><Checkout /></Suspense></PageTransition>} />
        <Route path="/account" element={<PageTransition><Suspense fallback={<PageLoader />}><Account /></Suspense></PageTransition>} />
        <Route path="/login" element={<PageTransition><Suspense fallback={<PageLoader />}><Login /></Suspense></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
