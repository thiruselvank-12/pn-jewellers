import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail } from 'react-icons/hi';
import useScrollReveal from '../../hooks/useScrollReveal';

export default function Newsletter() {
  const { ref, isVisible } = useScrollReveal();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section ref={ref} className="section-padding bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
          <HiOutlineMail className="w-7 h-7 text-gold" />
        </div>

        <h2 className="section-title">Stay in Touch</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          Be the first to know about new collections, exclusive offers, and artisan stories
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-3.5 rounded-lg border border-gray-200 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 font-accent text-sm text-primary placeholder-gray-400 transition-all duration-300"
            />
            <button
              type="submit"
              className="btn-gold !py-3.5 whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>

          {/* Success message */}
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-sm font-accent text-green-600"
            >
              ✓ Thank you! You'll hear from us soon.
            </motion.p>
          )}
        </form>

        <p className="mt-4 text-xs text-gray-400 font-accent">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </motion.div>
    </section>
  );
}
