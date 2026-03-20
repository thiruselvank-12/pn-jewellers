import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiX, HiMinus, HiPlus, HiShieldCheck, HiLockClosed } from 'react-icons/hi';
import useCartStore from '../store/cartStore';
import { formatPrice } from '../data/products';

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getTotal = useCartStore((s) => s.getTotal);

  const subtotal = getTotal();
  const shipping = subtotal > 50000 ? 0 : 499;
  const tax = Math.round(subtotal * 0.03);
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center px-4">
          <p className="text-6xl mb-6">🛍️</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-3">Your Bag is Empty</h2>
          <p className="font-accent text-sm text-gray-500 mb-8 max-w-sm mx-auto">
            Discover our exquisite collections and find the perfect piece for every occasion.
          </p>
          <Link to="/collections" className="btn-gold">Explore Collections</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-8">
          Shopping Bag <span className="text-gray-400 font-accent text-lg font-normal">({items.length} {items.length === 1 ? 'item' : 'items'})</span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={`${item.id}-${item.selectedMetal}-${item.selectedSize}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl bg-bg group"
              >
                {/* Image placeholder */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                  <span className="text-3xl">💎</span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/product/${item.slug}`} className="font-heading text-sm sm:text-base font-semibold text-primary hover:text-gold transition-colors line-clamp-1">
                        {item.name}
                      </Link>
                      <div className="mt-1 space-y-0.5">
                        <p className="text-xs font-accent text-gray-500">{item.selectedMetal}</p>
                        {item.selectedStone && <p className="text-xs font-accent text-gray-500">Stone: {item.selectedStone}</p>}
                        {item.selectedSize && <p className="text-xs font-accent text-gray-500">Size: {item.selectedSize}</p>}
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, item.selectedMetal, item.selectedStone, item.selectedSize)}
                      className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
                    >
                      <HiX className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                      <button onClick={() => updateQuantity(item.id, item.selectedMetal, item.selectedStone, item.selectedSize, item.quantity - 1)} className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <HiMinus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-sm font-accent font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.selectedMetal, item.selectedStone, item.selectedSize, item.quantity + 1)} className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <HiPlus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-heading font-bold text-primary">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="sticky top-28 p-6 bg-bg rounded-xl">
              <h3 className="font-heading text-lg font-semibold text-primary mb-5">Order Summary</h3>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm font-accent">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm font-accent">
                  <span className="text-gray-500">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm font-accent">
                  <span className="text-gray-500">GST (3%)</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-heading font-semibold text-primary">Total</span>
                  <span className="font-heading text-xl font-bold text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              <Link to="/checkout" className="btn-gold w-full mb-4">
                <HiLockClosed className="w-4 h-4" /> Secure Checkout
              </Link>

              <div className="flex items-center justify-center gap-2 text-xs font-accent text-gray-400">
                <HiShieldCheck className="w-4 h-4 text-green-500" />
                <span>Secure & encrypted payment</span>
              </div>

              {shipping === 0 && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
                  <p className="text-xs font-accent text-green-700 font-medium">🎉 You qualify for free shipping!</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
