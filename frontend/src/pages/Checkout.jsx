import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCheck, HiLockClosed, HiShieldCheck } from 'react-icons/hi';
import useCartStore from '../store/cartStore';
import { formatPrice } from '../data/products';

const steps = ['Address', 'Payment', 'Confirmation'];

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const [currentStep, setCurrentStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [address, setAddress] = useState({ name: '', phone: '', street: '', city: '', state: '', pin: '' });

  const subtotal = getTotal();
  const shipping = subtotal > 50000 ? 0 : 499;
  const tax = Math.round(subtotal * 0.03);
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
    setCurrentStep(2);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-5xl mb-4">🛒</p>
          <h2 className="font-heading text-2xl font-bold text-primary mb-3">No items to checkout</h2>
          <Link to="/collections" className="btn-gold mt-4 inline-block">Browse Collections</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-accent font-bold transition-all duration-500 ${
                  i <= currentStep ? 'bg-gold text-primary-dark' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i < currentStep ? <HiCheck className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`mt-2 text-xs font-accent font-medium ${i <= currentStep ? 'text-primary' : 'text-gray-400'}`}>
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-all duration-500 ${
                  i < currentStep ? 'bg-gold' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Address */}
        {currentStep === 0 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-6 sm:p-8 shadow-card">
            <h2 className="font-heading text-xl font-semibold text-primary mb-6">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'name', label: 'Full Name', placeholder: 'Enter your full name', full: false },
                { key: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', full: false },
                { key: 'street', label: 'Street Address', placeholder: 'House no., Street, Area', full: true },
                { key: 'city', label: 'City', placeholder: 'City', full: false },
                { key: 'state', label: 'State', placeholder: 'State', full: false },
                { key: 'pin', label: 'PIN Code', placeholder: '6-digit PIN', full: false },
              ].map((field) => (
                <div key={field.key} className={field.full ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs font-accent font-semibold text-gray-500 tracking-wider uppercase mb-1.5">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={address[field.key]}
                    onChange={(e) => setAddress({ ...address, [field.key]: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 font-accent text-sm text-primary transition-all duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button onClick={() => setCurrentStep(1)} className="btn-gold">Continue to Payment</button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Payment */}
        {currentStep === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-6 sm:p-8 shadow-card">
            <h2 className="font-heading text-xl font-semibold text-primary mb-6">Payment</h2>

            {/* Order Summary */}
            <div className="bg-bg rounded-xl p-5 mb-6">
              <h3 className="font-accent font-semibold text-sm text-primary mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm font-accent">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">GST (3%)</span><span>{formatPrice(tax)}</span></div>
                <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold text-base">
                  <span>Total</span><span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3 mb-8">
              {['Razorpay (UPI, Cards, Netbanking)', 'Cash on Delivery'].map((method, i) => (
                <label key={method} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-gold/50 cursor-pointer transition-all duration-300">
                  <input type="radio" name="payment" defaultChecked={i === 0} className="w-4 h-4 accent-gold" />
                  <span className="font-accent text-sm text-primary">{method}</span>
                </label>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mb-6 text-xs font-accent text-gray-400">
              <HiShieldCheck className="w-4 h-4 text-green-500" />
              <span>256-bit SSL encrypted • Your data is safe</span>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setCurrentStep(0)} className="btn-outline-gold flex-1">Back</button>
              <button onClick={handlePlaceOrder} className="btn-gold flex-1">
                <HiLockClosed className="w-4 h-4" /> Place Order — {formatPrice(total)}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 2 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-8 sm:p-12 shadow-card text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
                <HiCheck className="w-10 h-10 text-green-500" />
              </div>
            </motion.div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-3">Order Placed Successfully!</h2>
            <p className="font-accent text-sm text-gray-500 mb-2">Order #PN{Date.now().toString().slice(-8)}</p>
            <p className="font-accent text-sm text-gray-500 mb-8 max-w-md mx-auto">
              Thank you for your purchase. You'll receive an email confirmation and tracking updates shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/account" className="btn-outline-gold">View Orders</Link>
              <Link to="/collections" className="btn-gold">Continue Shopping</Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
