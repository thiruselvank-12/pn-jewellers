import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineUser, HiOutlineSearch, HiMenu, HiX } from 'react-icons/hi';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';

const navLinks = [
  { name: 'Collections', path: '/collections' },
  { name: 'Rings', path: '/collections?category=rings' },
  { name: 'Chains', path: '/collections?category=chains' },
  { name: 'Earrings', path: '/collections?category=earrings' },
  { name: 'Bridal', path: '/collections?category=bridal' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const cartCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navBg = scrolled || !isHome
    ? 'bg-white/95 backdrop-blur-lg shadow-[0_1px_0_rgba(212,175,55,0.15)]'
    : 'bg-transparent';

  const textColor = scrolled || !isHome ? 'text-primary' : 'text-white';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">PN</span>
              </div>
              <div className="flex flex-col">
                <span className={`font-heading font-bold text-lg leading-tight tracking-wide ${textColor} transition-colors duration-300`}>
                  PN Jewellers
                </span>
                <span className="text-gold text-[10px] font-accent font-medium tracking-[0.2em] uppercase">
                  Since 1975
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-accent text-sm font-medium tracking-wide uppercase ${textColor} transition-colors duration-300 hover:text-gold group`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button className={`p-2 rounded-full transition-all duration-300 hover:bg-gold/10 ${textColor}`}>
                <HiOutlineSearch className="w-5 h-5" />
              </button>

              <Link
                to="/wishlist"
                className={`relative p-2 rounded-full transition-all duration-300 hover:bg-gold/10 ${textColor}`}
              >
                <HiOutlineHeart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-primary-dark text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>

              <Link
                to="/cart"
                className={`relative p-2 rounded-full transition-all duration-300 hover:bg-gold/10 ${textColor}`}
              >
                <HiOutlineShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-primary-dark text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              <Link
                to="/account"
                className={`hidden sm:block p-2 rounded-full transition-all duration-300 hover:bg-gold/10 ${textColor}`}
              >
                <HiOutlineUser className="w-5 h-5" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 rounded-full transition-all duration-300 hover:bg-gold/10 ${textColor}`}
              >
                {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pt-20 bg-white/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center gap-6 pt-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.path}
                    className="font-heading text-2xl text-primary hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <Link to="/account" className="btn-outline-gold text-sm">
                  My Account
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
