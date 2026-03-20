import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import useScrollReveal from '../../hooks/useScrollReveal';
import { testimonials } from '../../data/products';

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal();
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="section-padding bg-primary text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title text-white">What Our Clients Say</h2>
        <div className="gold-divider" />
        <p className="section-subtitle !text-white/50">
          Trusted by thousands of discerning jewelry lovers
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-center px-8"
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${i < testimonials[current].rating ? 'text-gold' : 'text-white/20'}`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <p className="font-heading text-lg sm:text-xl lg:text-2xl text-white/90 italic leading-relaxed mb-8">
              "{testimonials[current].text}"
            </p>

            {/* Author */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                <span className="font-heading font-bold text-gold text-lg">
                  {testimonials[current].name.charAt(0)}
                </span>
              </div>
              <p className="font-accent font-semibold text-white text-sm tracking-wide">
                {testimonials[current].name}
              </p>
              <p className="font-accent text-white/40 text-xs tracking-wider">
                {testimonials[current].location}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-center gap-3 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-300"
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>
          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-gold w-6' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-300"
          >
            <HiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
