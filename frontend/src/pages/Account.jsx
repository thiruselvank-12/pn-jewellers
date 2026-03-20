import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineUser, HiOutlineShoppingBag, HiOutlineHeart, HiOutlineCog, HiLogout } from 'react-icons/hi';
import useAuthStore from '../store/authStore';
import useWishlistStore from '../store/wishlistStore';
import { formatPrice } from '../data/products';

export default function Account() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const wishlistItems = useWishlistStore((s) => s.items);
  const removeFromWishlist = useWishlistStore((s) => s.removeItem);

  if (!isAuthenticated) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
            <HiOutlineUser className="w-10 h-10 text-gold" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-primary mb-3">Welcome to PN Jewellers</h2>
          <p className="font-accent text-sm text-gray-500 mb-8 max-w-sm mx-auto">
            Sign in to view your orders, manage your wishlist, and enjoy a personalized experience.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/login" className="btn-gold">Sign In</Link>
            <Link to="/login" className="btn-outline-gold">Create Account</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-primary">My Account</h1>
              <p className="font-accent text-sm text-gray-500 mt-1">Welcome back, {user?.name || 'Guest'}</p>
            </div>
            <button onClick={logout} className="flex items-center gap-2 text-sm font-accent text-gray-500 hover:text-red-500 transition-colors">
              <HiLogout className="w-4 h-4" /> Sign Out
            </button>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: HiOutlineShoppingBag, label: 'Orders', value: '0', desc: 'Track your orders' },
              { icon: HiOutlineHeart, label: 'Wishlist', value: wishlistItems.length.toString(), desc: 'Saved items' },
              { icon: HiOutlineCog, label: 'Settings', value: '', desc: 'Profile & preferences' },
            ].map((card) => (
              <div key={card.label} className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-card hover:shadow-card-hover transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <card.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="font-accent font-semibold text-sm text-primary">{card.label} {card.value && `(${card.value})`}</p>
                  <p className="text-xs font-accent text-gray-400">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Wishlist */}
          <div className="bg-white rounded-xl p-6 shadow-card">
            <h2 className="font-heading text-lg font-semibold text-primary mb-5">My Wishlist</h2>
            {wishlistItems.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-4xl mb-3">💝</p>
                <p className="font-accent text-sm text-gray-500 mb-4">Your wishlist is empty</p>
                <Link to="/collections" className="btn-outline-gold text-xs">Explore Collections</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-bg">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">💎</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.slug}`} className="font-heading text-sm font-semibold text-primary hover:text-gold transition-colors line-clamp-1">{item.name}</Link>
                      <p className="font-accent text-sm font-bold text-primary mt-0.5">{formatPrice(item.price)}</p>
                    </div>
                    <button onClick={() => removeFromWishlist(item.id)} className="text-xs font-accent text-gray-400 hover:text-red-500 transition-colors">Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
